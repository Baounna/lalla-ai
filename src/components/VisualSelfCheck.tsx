"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PoseLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { useLang } from "@/lib/language";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, CameraOff, ChevronLeft, ChevronRight, Download, Lock, ShieldCheck, RefreshCw, CheckCircle2, AlertCircle, Cpu, Loader2 } from "lucide-react";
import Link from "next/link";

type Pt = { x: number; y: number; score: number };
type KMap = Record<string, Pt | undefined>;
type Status = "none" | "ok" | "raise" | "lower" | "hips";

// BlazePose (33-landmark) indices we use
const LM: Record<string, number> = {
  nose: 0, left_shoulder: 11, right_shoulder: 12, left_elbow: 13, right_elbow: 14,
  left_wrist: 15, right_wrist: 16, left_hip: 23, right_hip: 24,
};
const SKELETON: [string, string][] = [
  ["left_shoulder", "right_shoulder"], ["left_shoulder", "left_elbow"], ["left_elbow", "left_wrist"],
  ["right_shoulder", "right_elbow"], ["right_elbow", "right_wrist"], ["left_shoulder", "left_hip"],
  ["right_shoulder", "right_hip"], ["left_hip", "right_hip"],
];

const ok = (k?: Pt) => !!k && k.score > 0.5;
const above = (a?: Pt, b?: Pt) => !!a && !!b && a.y < b.y;
const dist = (a: Pt, b: Pt) => Math.hypot(a.x - b.x, a.y - b.y);

const CHECKS: ((k: KMap, sw: number) => Status)[] = [
  (k) => {
    if (!ok(k.left_shoulder) || !ok(k.right_shoulder)) return "none";
    if (above(k.left_wrist, k.left_shoulder) || above(k.right_wrist, k.right_shoulder)) return "lower";
    return "ok";
  },
  (k) => {
    if (!ok(k.left_shoulder) || !ok(k.right_shoulder)) return "none";
    return above(k.left_wrist, k.left_shoulder) && above(k.right_wrist, k.right_shoulder) ? "ok" : "raise";
  },
  (k, sw) => {
    if (!ok(k.left_hip) || !ok(k.right_hip) || !ok(k.left_wrist) || !ok(k.right_wrist)) return "none";
    const near = (w: Pt, h: Pt) => dist(w, h) < sw * 0.6;
    return near(k.left_wrist!, k.left_hip!) && near(k.right_wrist!, k.right_hip!) ? "ok" : "hips";
  },
];

const POSES = [
  { en: { title: "Arms relaxed at your sides", cue: "Stand naturally and face the camera.", look: ["Change in size or shape", "Skin redness, rash or sores", "New asymmetry between sides"] }, fr: { title: "Bras détendus le long du corps", cue: "Tenez-vous naturellement, face à la caméra.", look: ["Changement de taille ou de forme", "Rougeur, éruption ou plaie", "Nouvelle asymétrie entre les côtés"] } },
  { en: { title: "Raise both arms overhead", cue: "Lift your arms slowly and watch both sides move.", look: ["Skin dimpling or puckering", "Nipple pulling inward", "One side not moving like the other"] }, fr: { title: "Levez les deux bras au-dessus de la tête", cue: "Levez les bras lentement et observez les deux côtés.", look: ["Fossette ou plissement de la peau", "Mamelon rentré", "Un côté qui ne bouge pas comme l'autre"] } },
  { en: { title: "Press hands firmly on your hips", cue: "Push on your hips to flex the chest muscles.", look: ["Changes in breast contour", "Bulging or flattening", "Skin texture like orange peel"] }, fr: { title: "Mains fermement sur les hanches", cue: "Appuyez sur les hanches pour contracter les muscles.", look: ["Changements du contour du sein", "Bombement ou aplatissement", "Peau d'orange (texture)"] } },
];

export function VisualSelfCheck() {
  const { lang } = useLang();
  const fr = lang === "fr";
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const detectorRef = useRef<PoseLandmarker | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef(0);
  const stepRef = useRef(0);

  const [stage, setStage] = useState<"intro" | "live" | "done">("intro");
  const [step, setStep] = useState(0);
  const [error, setError] = useState<null | "denied" | "unsupported">(null);
  const [shots, setShots] = useState<(string | null)[]>([null, null, null]);
  const [modelLoading, setModelLoading] = useState(true);
  const [status, setStatus] = useState<Status>("none");

  useEffect(() => { stepRef.current = step; }, [step]);

  const stopAll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const toMap = (pts: Pt[]): KMap => {
    const m: KMap = {};
    for (const name in LM) m[name] = pts[LM[name]];
    return m;
  };

  const draw = useCallback((pts: Pt[] | null) => {
    const video = videoRef.current, canvas = canvasRef.current;
    if (!video || !canvas) return;
    const r = video.getBoundingClientRect();
    if (canvas.width !== Math.round(r.width)) canvas.width = Math.round(r.width);
    if (canvas.height !== Math.round(r.height)) canvas.height = Math.round(r.height);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!pts || !video.videoWidth) return;

    const scale = Math.max(canvas.width / video.videoWidth, canvas.height / video.videoHeight);
    const ox = (canvas.width - video.videoWidth * scale) / 2, oy = (canvas.height - video.videoHeight * scale) / 2;
    const mp = (k: Pt) => ({ x: k.x * scale + ox, y: k.y * scale + oy });
    const k = toMap(pts);

    // exam region from shoulders + hips
    if (ok(k.left_shoulder) && ok(k.right_shoulder)) {
      const a = mp(k.left_shoulder!), b = mp(k.right_shoulder!);
      const left = Math.min(a.x, b.x), right = Math.max(a.x, b.x), topY = Math.min(a.y, b.y);
      const hipY = ok(k.left_hip) && ok(k.right_hip) ? (mp(k.left_hip!).y + mp(k.right_hip!).y) / 2 : topY + (right - left);
      const padX = (right - left) * 0.12;
      const x = left - padX, y = topY + 8, w = right - left + padX * 2, h = Math.max(20, (topY + (hipY - topY) * 0.62) - topY);
      ctx.fillStyle = "rgba(244,63,94,0.14)"; ctx.strokeStyle = "rgba(244,63,94,0.9)"; ctx.lineWidth = 2;
      const rad = 14;
      ctx.beginPath();
      ctx.moveTo(x + rad, y); ctx.arcTo(x + w, y, x + w, y + h, rad); ctx.arcTo(x + w, y + h, x, y + h, rad);
      ctx.arcTo(x, y + h, x, y, rad); ctx.arcTo(x, y, x + w, y, rad); ctx.closePath();
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = "rgba(225,29,72,0.95)"; ctx.font = "600 12px system-ui";
      ctx.fillText(fr ? "zone à examiner" : "exam area", x + 6, y - 6);
    }

    ctx.strokeStyle = "rgba(251,113,133,0.85)"; ctx.lineWidth = 3;
    for (const [p, q] of SKELETON) {
      const A = k[p], B = k[q];
      if (ok(A) && ok(B)) { const a = mp(A!), b = mp(B!); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
    }
    for (const name in LM) {
      const P = k[name];
      if (ok(P)) { const p = mp(P!); ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = "#e11d48"; ctx.beginPath(); ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2); ctx.fill(); }
    }
  }, [fr]);

  const loop = useCallback(() => {
    const det = detectorRef.current, video = videoRef.current;
    if (det && video && video.readyState >= 2 && video.videoWidth) {
      let ts = performance.now();
      if (ts <= lastTsRef.current) ts = lastTsRef.current + 1;
      lastTsRef.current = ts;
      try {
        const res = det.detectForVideo(video, ts);
        const lm = res.landmarks?.[0];
        const pts: Pt[] | null = lm ? lm.map((l) => ({ x: (1 - l.x) * video.videoWidth, y: l.y * video.videoHeight, score: l.visibility ?? 1 })) : null;
        draw(pts);
        if (pts) {
          const k = toMap(pts);
          const sw = ok(k.left_shoulder) && ok(k.right_shoulder) ? dist(k.left_shoulder!, k.right_shoulder!) : 100;
          setStatus(CHECKS[stepRef.current](k, sw));
        } else setStatus("none");
      } catch { /* skip frame */ }
    }
    rafRef.current = requestAnimationFrame(loop);
  }, [draw]);

  useEffect(() => {
    if (stage !== "live") { stopAll(); return; }
    let cancelled = false;
    (async () => {
      setError(null);
      if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) { setError("unsupported"); return; }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: 640, height: 480 }, audio: false });
        if (cancelled) { stream.getTracks().forEach((t) => t.stop()); return; }
        streamRef.current = stream;
        if (videoRef.current) { videoRef.current.srcObject = stream; await videoRef.current.play().catch(() => {}); }
      } catch { setError("denied"); return; }

      try {
        if (!detectorRef.current) {
          setModelLoading(true);
          const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm");
          detectorRef.current = await PoseLandmarker.createFromOptions(vision, {
            baseOptions: { modelAssetPath: "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task", delegate: "GPU" },
            runningMode: "VIDEO",
            numPoses: 1,
          });
        }
        if (cancelled) return;
        setModelLoading(false);
        loop();
      } catch { setModelLoading(false); }
    })();
    return () => { cancelled = true; stopAll(); };
  }, [stage, stopAll, loop]);

  function capture() {
    const v = videoRef.current;
    if (!v || !v.videoWidth) return;
    const canvas = document.createElement("canvas");
    canvas.width = v.videoWidth; canvas.height = v.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.translate(canvas.width, 0); ctx.scale(-1, 1);
    ctx.drawImage(v, 0, 0);
    setShots((s) => s.map((x, i) => (i === step ? canvas.toDataURL("image/jpeg", 0.85) : x)));
  }

  const pose = fr ? POSES[step].fr : POSES[step].en;
  const statusText = {
    ok: fr ? "✓ Position détectée — parfait" : "✓ Position detected — perfect",
    raise: fr ? "Levez les deux bras au-dessus de la tête" : "Raise both arms overhead",
    lower: fr ? "Baissez les bras le long du corps" : "Lower your arms to your sides",
    hips: fr ? "Posez les mains sur les hanches" : "Put your hands on your hips",
    none: fr ? "Reculez pour que le haut du corps soit visible" : "Step back so your upper body is visible",
  }[status];

  if (stage === "intro") {
    return (
      <Card className="p-6 md:p-8 border-rose-100 dark:border-rose-950">
        <div className="flex items-start gap-3 mb-5 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900">
          <Lock className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-emerald-900 dark:text-emerald-100">
            <span className="font-semibold">{fr ? "100 % privé. " : "100% private. "}</span>
            {fr ? "L'IA de détection de posture s'exécute entièrement sur votre appareil. Aucune image n'est envoyée ni enregistrée." : "The pose-detection AI runs entirely on your device. No image is sent or stored."}
          </p>
        </div>
        <h2 className="text-2xl font-bold mb-2">{fr ? "Auto-examen visuel guidé par IA" : "AI-guided visual self-check"}</h2>
        <p className="text-zinc-600 dark:text-zinc-300 mb-3 leading-relaxed">
          {fr ? "Une IA de détection de posture (MediaPipe) repère votre corps en temps réel, met en évidence la zone à examiner et vérifie que votre position correspond à chaque étape." : "On-device pose-detection AI (MediaPipe) tracks your body in real time, highlights the area to examine, and checks that your position matches each step."}
        </p>
        <p className="text-xs text-zinc-400 flex items-center gap-1.5 mb-5">
          <AlertCircle className="h-3.5 w-3.5" />
          {fr ? "L'IA détecte la posture du corps, pas le cancer. Outil éducatif — ne remplace pas un médecin." : "The AI detects body pose, not cancer. Educational tool — does not replace a doctor."}
        </p>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" onClick={() => { setStep(0); setStage("live"); }} className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-8 h-12"><Camera className="me-2 h-5 w-5" /> {fr ? "Activer la caméra + IA" : "Start camera + AI"}</Button>
          <Button size="lg" variant="outline" onClick={() => { setStep(0); setStage("done"); }} className="rounded-full px-6 h-12 border-rose-200">{fr ? "Voir seulement la checklist" : "Just the checklist"}</Button>
        </div>
      </Card>
    );
  }

  if (stage === "done") {
    return (
      <Card className="p-6 md:p-8 border-rose-100 dark:border-rose-950 space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-lg mb-3"><CheckCircle2 className="h-8 w-8" /></div>
          <h2 className="text-2xl font-bold">{fr ? "Récapitulatif visuel" : "Visual check summary"}</h2>
          <p className="text-zinc-600 dark:text-zinc-300">{fr ? "Les signes visuels à connaître à chaque position :" : "The visual signs to know for each position:"}</p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {POSES.map((p, i) => {
            const pp = fr ? p.fr : p.en;
            return (
              <div key={i} className="rounded-xl border border-rose-100 dark:border-rose-950 p-4 bg-white dark:bg-zinc-900">
                {shots[i] && (/* eslint-disable-next-line @next/next/no-img-element */ <img src={shots[i] as string} alt="" className="w-full h-32 object-cover rounded-lg mb-3" />)}
                <h3 className="font-semibold text-sm mb-2">{pp.title}</h3>
                <ul className="space-y-1">{pp.look.map((l) => <li key={l} className="text-xs text-zinc-500 dark:text-zinc-400 flex gap-1.5"><span className="text-rose-400 mt-0.5">•</span>{l}</li>)}</ul>
                {shots[i] && <a href={shots[i] as string} download={`visual-check-${i + 1}.jpg`} className="mt-3 inline-flex items-center gap-1 text-xs text-rose-500 hover:underline"><Download className="h-3 w-3" /> {fr ? "Télécharger" : "Download"}</a>}
              </div>
            );
          })}
        </div>
        <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 p-4 flex gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-900 dark:text-amber-100">{fr ? "Si vous remarquez l'un de ces signes — ou tout changement nouveau — consultez un médecin." : "If you notice any of these signs — or any new change — see a doctor."}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button onClick={() => { setShots([null, null, null]); setStep(0); setStage("live"); }} className="bg-rose-500 hover:bg-rose-600 rounded-full px-6"><RefreshCw className="me-2 h-4 w-4" /> {fr ? "Recommencer avec la caméra" : "Redo with camera"}</Button>
          <Link href="/check"><Button variant="outline" className="rounded-full px-6 border-rose-200">{fr ? "Auto-examen 3D" : "3D self-exam"}</Button></Link>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400"><ShieldCheck className="h-4 w-4" /> {fr ? "Sur votre appareil · rien n'est envoyé" : "On your device · nothing is sent"}</span>
        <span className="text-sm text-muted-foreground">{step + 1} / {POSES.length}</span>
      </div>

      <div className="relative rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-2xl aspect-[3/4] max-h-[60vh] mx-auto">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-zinc-300 gap-3">
            <CameraOff className="h-10 w-10 text-zinc-500" />
            <p className="text-sm max-w-xs">{error === "denied" ? (fr ? "Caméra non autorisée. Autorisez l'accès, ou utilisez la checklist." : "Camera not allowed. Enable access, or use the checklist.") : (fr ? "Caméra non gérée. Essayez Chrome ou Safari." : "Camera not supported. Try Chrome or Safari.")}</p>
            <Button onClick={() => setStage("done")} variant="outline" className="rounded-full text-white border-white/30 hover:bg-white/10">{fr ? "Voir la checklist" : "Open checklist"}</Button>
          </div>
        ) : (
          <>
            <video ref={videoRef} playsInline muted className="absolute inset-0 w-full h-full object-cover" style={{ transform: "scaleX(-1)" }} />
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
            <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-cyan-300/90 bg-black/30 backdrop-blur px-2 py-1 rounded-full"><Cpu className="h-3 w-3" /> {fr ? "IA de posture · sur appareil" : "Pose AI · on-device"}</div>
            {modelLoading && <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white gap-2"><Loader2 className="h-7 w-7 animate-spin" /><p className="text-sm">{fr ? "Chargement de l'IA…" : "Loading the AI…"}</p></div>}
            {!modelLoading && (
              <div className="absolute bottom-3 left-3 right-3 flex justify-center">
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur ${status === "ok" ? "bg-emerald-500/90 text-white" : "bg-white/85 dark:bg-zinc-900/85 text-zinc-700 dark:text-zinc-200"}`}>
                  {status === "ok" ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5 text-amber-500" />}{statusText}
                </span>
              </div>
            )}
            {shots[step] && <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-full bg-emerald-500/90 text-white"><CheckCircle2 className="h-3 w-3" /> {fr ? "capturée" : "captured"}</span>}
          </>
        )}
      </div>

      <Card className="p-5 border-rose-100 dark:border-rose-950">
        <div className="flex items-center gap-2 mb-1"><span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-rose-500 text-white text-sm font-bold">{step + 1}</span><h3 className="font-bold text-lg">{pose.title}</h3></div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3 ms-9">{pose.cue}</p>
        <div className="ms-9">
          <p className="text-xs font-semibold uppercase tracking-wide text-rose-400 mb-1">{fr ? "À observer" : "Look for"}</p>
          <ul className="space-y-1">{pose.look.map((l) => <li key={l} className="text-sm text-zinc-600 dark:text-zinc-300 flex gap-2"><span className="text-rose-400 mt-0.5">•</span>{l}</li>)}</ul>
        </div>
      </Card>

      <div className="flex items-center justify-between gap-3">
        <Button variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="rounded-full"><ChevronLeft className="me-1 h-4 w-4" /> {fr ? "Précédent" : "Back"}</Button>
        {!error && <Button onClick={capture} variant="secondary" className="rounded-full bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-950 dark:text-rose-200"><Camera className="me-2 h-4 w-4" /> {shots[step] ? (fr ? "Reprendre" : "Retake") : (fr ? "Photo" : "Snap")}</Button>}
        {step < POSES.length - 1 ? (
          <Button onClick={() => setStep((s) => s + 1)} className="bg-rose-500 hover:bg-rose-600 rounded-full px-6">{fr ? "Suivant" : "Next"} <ChevronRight className="ms-1 h-4 w-4" /></Button>
        ) : (
          <Button onClick={() => setStage("done")} className="bg-rose-500 hover:bg-rose-600 rounded-full px-6">{fr ? "Terminer" : "Finish"} <ChevronRight className="ms-1 h-4 w-4" /></Button>
        )}
      </div>
    </div>
  );
}

export default VisualSelfCheck;
