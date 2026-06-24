"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/language";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, CameraOff, ChevronLeft, ChevronRight, Download, Lock, ShieldCheck, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

type Pose = {
  en: { title: string; cue: string; look: string[] };
  fr: { title: string; cue: string; look: string[] };
};

const POSES: Pose[] = [
  {
    en: {
      title: "Arms relaxed at your sides",
      cue: "Stand naturally and face the camera.",
      look: ["Change in size or shape", "Skin redness, rash or sores", "Any new asymmetry between sides"],
    },
    fr: {
      title: "Bras détendus le long du corps",
      cue: "Tenez-vous naturellement, face à la caméra.",
      look: ["Changement de taille ou de forme", "Rougeur, éruption ou plaie", "Nouvelle asymétrie entre les deux côtés"],
    },
  },
  {
    en: {
      title: "Raise both arms overhead",
      cue: "Lift your arms slowly and watch both sides move.",
      look: ["Skin dimpling or puckering", "Nipple pulling inward (retraction)", "One side not moving like the other"],
    },
    fr: {
      title: "Levez les deux bras au-dessus de la tête",
      cue: "Levez les bras lentement et observez les deux côtés.",
      look: ["Fossette ou plissement de la peau", "Mamelon rentré (rétraction)", "Un côté qui ne bouge pas comme l'autre"],
    },
  },
  {
    en: {
      title: "Press hands firmly on your hips",
      cue: "Push on your hips to flex the chest muscles.",
      look: ["Changes in breast contour", "Bulging or flattening", "Skin texture like orange peel"],
    },
    fr: {
      title: "Mains fermement sur les hanches",
      cue: "Appuyez sur les hanches pour contracter les muscles.",
      look: ["Changements du contour du sein", "Bombement ou aplatissement", "Peau d'orange (texture)"],
    },
  },
];

export function VisualSelfCheck() {
  const { lang } = useLang();
  const fr = lang === "fr";
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [stage, setStage] = useState<"intro" | "live" | "done">("intro");
  const [step, setStep] = useState(0);
  const [error, setError] = useState<null | "denied" | "unsupported">(null);
  const [shots, setShots] = useState<(string | null)[]>([null, null, null]);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const startCamera = useCallback(async () => {
    setError(null);
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setError("unsupported");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
    } catch {
      setError("denied");
    }
  }, []);

  useEffect(() => {
    if (stage === "live") startCamera();
    else stopCamera();
    return () => stopCamera();
  }, [stage, startCamera, stopCamera]);

  function capture() {
    const v = videoRef.current;
    if (!v || !v.videoWidth) return;
    const canvas = document.createElement("canvas");
    canvas.width = v.videoWidth;
    canvas.height = v.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1); // mirror to match the selfie preview
    ctx.drawImage(v, 0, 0);
    const url = canvas.toDataURL("image/jpeg", 0.85);
    setShots((s) => s.map((x, i) => (i === step ? url : x)));
  }

  const pose = (fr ? POSES[step].fr : POSES[step].en);

  /* ---------- Intro ---------- */
  if (stage === "intro") {
    return (
      <Card className="p-6 md:p-8 border-rose-100 dark:border-rose-950">
        <div className="flex items-start gap-3 mb-5 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900">
          <Lock className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-emerald-900 dark:text-emerald-100">
            <span className="font-semibold">{fr ? "100 % privé. " : "100% private. "}</span>
            {fr
              ? "Votre caméra reste sur votre appareil. Aucune image n'est envoyée ni enregistrée par Lalla — vous seule décidez de télécharger une photo."
              : "Your camera stays on your device. No image is sent or stored by Lalla — only you decide to download a photo."}
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-2">{fr ? "Auto-examen visuel guidé" : "Guided visual self-check"}</h2>
        <p className="text-zinc-600 dark:text-zinc-300 mb-5 leading-relaxed">
          {fr
            ? "La caméra vous guide à travers les 3 positions de l'inspection visuelle, comme devant un miroir. Lalla vous montre quoi observer à chaque étape — sans rien analyser ni diagnostiquer."
            : "The camera guides you through the 3 visual-inspection positions, like a mirror. Lalla shows you what to look for at each step — it does not analyze or diagnose anything."}
        </p>

        <div className="flex flex-wrap gap-3">
          <Button size="lg" onClick={() => { setStep(0); setStage("live"); }} className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-8 h-12">
            <Camera className="me-2 h-5 w-5" />
            {fr ? "Activer la caméra" : "Start camera"}
          </Button>
          <Button size="lg" variant="outline" onClick={() => { setStep(0); setStage("done"); }} className="rounded-full px-6 h-12 border-rose-200">
            {fr ? "Voir seulement la checklist" : "Just the checklist"}
          </Button>
        </div>

        <p className="mt-5 text-xs text-zinc-400 flex items-center gap-1.5">
          <AlertCircle className="h-3.5 w-3.5" />
          {fr
            ? "Cet outil est éducatif. Il ne détecte pas le cancer et ne remplace pas un médecin."
            : "This tool is educational. It does not detect cancer and does not replace a doctor."}
        </p>
      </Card>
    );
  }

  /* ---------- Done / checklist summary ---------- */
  if (stage === "done") {
    return (
      <Card className="p-6 md:p-8 border-rose-100 dark:border-rose-950 space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-lg mb-3">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold">{fr ? "Récapitulatif visuel" : "Visual check summary"}</h2>
          <p className="text-zinc-600 dark:text-zinc-300">
            {fr ? "Les signes visuels à connaître à chaque position :" : "The visual signs to know for each position:"}
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {POSES.map((p, i) => {
            const pp = fr ? p.fr : p.en;
            return (
              <div key={i} className="rounded-xl border border-rose-100 dark:border-rose-950 p-4 bg-white dark:bg-zinc-900">
                {shots[i] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={shots[i] as string} alt="" className="w-full h-32 object-cover rounded-lg mb-3" />
                )}
                <h3 className="font-semibold text-sm mb-2">{pp.title}</h3>
                <ul className="space-y-1">
                  {pp.look.map((l) => (
                    <li key={l} className="text-xs text-zinc-500 dark:text-zinc-400 flex gap-1.5">
                      <span className="text-rose-400 mt-0.5">•</span>{l}
                    </li>
                  ))}
                </ul>
                {shots[i] && (
                  <a href={shots[i] as string} download={`visual-check-${i + 1}.jpg`} className="mt-3 inline-flex items-center gap-1 text-xs text-rose-500 hover:underline">
                    <Download className="h-3 w-3" /> {fr ? "Télécharger" : "Download"}
                  </a>
                )}
              </div>
            );
          })}
        </div>

        <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 p-4 flex gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-900 dark:text-amber-100">
            {fr
              ? "Si vous remarquez l'un de ces signes — ou tout changement nouveau — consultez un médecin. La détection précoce sauve des vies."
              : "If you notice any of these signs — or any new change — see a doctor. Early detection saves lives."}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Button onClick={() => { setShots([null, null, null]); setStep(0); setStage("live"); }} className="bg-rose-500 hover:bg-rose-600 rounded-full px-6">
            <RefreshCw className="me-2 h-4 w-4" /> {fr ? "Recommencer avec la caméra" : "Redo with camera"}
          </Button>
          <Link href="/check">
            <Button variant="outline" className="rounded-full px-6 border-rose-200">{fr ? "Auto-examen 3D" : "3D self-exam"}</Button>
          </Link>
        </div>
      </Card>
    );
  }

  /* ---------- Live camera ---------- */
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <ShieldCheck className="h-4 w-4" /> {fr ? "Sur votre appareil · rien n'est envoyé" : "On your device · nothing is sent"}
        </span>
        <span className="text-sm text-muted-foreground">{step + 1} / {POSES.length}</span>
      </div>

      <div className="relative rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-2xl aspect-[3/4] max-h-[60vh] mx-auto">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-zinc-300 gap-3">
            <CameraOff className="h-10 w-10 text-zinc-500" />
            <p className="text-sm max-w-xs">
              {error === "denied"
                ? fr
                  ? "Caméra non autorisée. Autorisez l'accès dans votre navigateur, ou utilisez la checklist."
                  : "Camera not allowed. Enable access in your browser, or use the checklist."
                : fr
                ? "Votre navigateur ne gère pas la caméra. Essayez Chrome ou Safari, ou utilisez la checklist."
                : "Your browser doesn't support the camera. Try Chrome or Safari, or use the checklist."}
            </p>
            <Button onClick={() => setStage("done")} variant="outline" className="rounded-full text-white border-white/30 hover:bg-white/10">
              {fr ? "Voir la checklist" : "Open checklist"}
            </Button>
          </div>
        ) : (
          <>
            <video ref={videoRef} playsInline muted className="absolute inset-0 w-full h-full object-cover" style={{ transform: "scaleX(-1)" }} />
            {/* framing silhouette guide */}
            <svg viewBox="0 0 300 400" className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
              <g fill="none" stroke="#fb7185" strokeWidth="2" strokeDasharray="6 6">
                <circle cx="150" cy="78" r="40" />
                <path d="M70 360 C 70 230, 95 150, 150 150 C 205 150, 230 230, 230 360" />
              </g>
            </svg>
            {shots[step] && (
              <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-full bg-emerald-500/90 text-white">
                <CheckCircle2 className="h-3 w-3" /> {fr ? "capturée" : "captured"}
              </span>
            )}
          </>
        )}
      </div>

      {/* pose instructions */}
      <Card className="p-5 border-rose-100 dark:border-rose-950">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-rose-500 text-white text-sm font-bold">{step + 1}</span>
          <h3 className="font-bold text-lg">{pose.title}</h3>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3 ms-9">{pose.cue}</p>
        <div className="ms-9">
          <p className="text-xs font-semibold uppercase tracking-wide text-rose-400 mb-1">{fr ? "À observer" : "Look for"}</p>
          <ul className="space-y-1">
            {pose.look.map((l) => (
              <li key={l} className="text-sm text-zinc-600 dark:text-zinc-300 flex gap-2"><span className="text-rose-400 mt-0.5">•</span>{l}</li>
            ))}
          </ul>
        </div>
      </Card>

      <div className="flex items-center justify-between gap-3">
        <Button variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="rounded-full">
          <ChevronLeft className="me-1 h-4 w-4" /> {fr ? "Précédent" : "Back"}
        </Button>

        {!error && (
          <Button onClick={capture} variant="secondary" className="rounded-full bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-950 dark:text-rose-200">
            <Camera className="me-2 h-4 w-4" /> {shots[step] ? (fr ? "Reprendre" : "Retake") : (fr ? "Photo (optionnel)" : "Snap (optional)")}
          </Button>
        )}

        {step < POSES.length - 1 ? (
          <Button onClick={() => setStep((s) => s + 1)} className="bg-rose-500 hover:bg-rose-600 rounded-full px-6">
            {fr ? "Suivant" : "Next"} <ChevronRight className="ms-1 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={() => setStage("done")} className="bg-rose-500 hover:bg-rose-600 rounded-full px-6">
            {fr ? "Terminer" : "Finish"} <ChevronRight className="ms-1 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

export default VisualSelfCheck;
