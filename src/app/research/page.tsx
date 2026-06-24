"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/language";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cpu, Upload, Loader2, AlertCircle, Activity, BookOpen, FlaskConical } from "lucide-react";

type Sample = { label: "malignant" | "benign"; px: number[] };
type Metrics = { accuracy: number; roc_auc: number; sensitivity_malignant: number; specificity_benign_normal: number; decision_threshold: number; dataset: string; n_test: number };
type Result = { prob: number; px01: number[]; cam: number[]; truth?: "malignant" | "benign" };

function jet(v: number): [number, number, number] {
  const c = (x: number) => Math.round(255 * Math.max(0, Math.min(1, x)));
  return [c(Math.min(4 * v - 1.5, -4 * v + 4.5)), c(Math.min(4 * v - 0.5, -4 * v + 3.5)), c(Math.min(4 * v + 0.5, -4 * v + 2.5))];
}
const softmax2 = (a: number, b: number) => { const m = Math.max(a, b); const ea = Math.exp(a - m), eb = Math.exp(b - m); return eb / (ea + eb); };

function drawGray(canvas: HTMLCanvasElement | null, px01: number[]) {
  if (!canvas) return;
  const off = document.createElement("canvas"); off.width = 28; off.height = 28;
  const octx = off.getContext("2d")!; const img = octx.createImageData(28, 28);
  for (let i = 0; i < 784; i++) { const g = Math.round(px01[i] * 255); img.data[i * 4] = g; img.data[i * 4 + 1] = g; img.data[i * 4 + 2] = g; img.data[i * 4 + 3] = 255; }
  octx.putImageData(img, 0, 0);
  const ctx = canvas.getContext("2d")!; ctx.imageSmoothingEnabled = true; ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(off, 0, 0, canvas.width, canvas.height);
}
function drawOverlay(canvas: HTMLCanvasElement | null, px01: number[], cam: number[]) {
  if (!canvas) return;
  drawGray(canvas, px01);
  const max = Math.max(...cam, 1e-6);
  const off = document.createElement("canvas"); off.width = 7; off.height = 7;
  const octx = off.getContext("2d")!; const img = octx.createImageData(7, 7);
  for (let i = 0; i < 49; i++) { const [r, g, b] = jet(cam[i] / max); img.data[i * 4] = r; img.data[i * 4 + 1] = g; img.data[i * 4 + 2] = b; img.data[i * 4 + 3] = 255; }
  octx.putImageData(img, 0, 0);
  const ctx = canvas.getContext("2d")!; ctx.imageSmoothingEnabled = true; ctx.globalAlpha = 0.5;
  ctx.drawImage(off, 0, 0, canvas.width, canvas.height); ctx.globalAlpha = 1;
}

function Thumb({ px, active, onClick }: { px: number[]; active: boolean; onClick: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => { drawGray(ref.current, px.map((v) => v / 255)); }, [px]);
  return (
    <button onClick={onClick} className={`rounded-lg overflow-hidden border-2 transition ${active ? "border-rose-500 scale-105" : "border-transparent hover:border-rose-200"}`}>
      <canvas ref={ref} width={56} height={56} className="block" />
    </button>
  );
}

export default function ResearchPage() {
  const { lang } = useLang();
  const fr = lang === "fr";
  const sessionRef = useRef<{ run: (f: Record<string, unknown>) => Promise<Record<string, { data: Float32Array }>>; } | null>(null);
  const ortRef = useRef<{ Tensor: new (t: string, d: Float32Array, dims: number[]) => unknown } | null>(null);
  const inCanvas = useRef<HTMLCanvasElement>(null);
  const camCanvas = useRef<HTMLCanvasElement>(null);

  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [samples, setSamples] = useState<Sample[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [selIdx, setSelIdx] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const ort = await import("onnxruntime-web");
        ort.env.wasm.numThreads = 1;
        ort.env.wasm.wasmPaths = "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.27.0/dist/";
        const [session, s, m] = await Promise.all([
          ort.InferenceSession.create("/models/breast_cnn.onnx"),
          fetch("/models/breast_samples.json").then((r) => r.json()),
          fetch("/models/breast_metrics.json").then((r) => r.json()),
        ]);
        if (cancelled) return;
        sessionRef.current = session as never;
        ortRef.current = ort as never;
        setSamples(s); setMetrics(m); setStatus("ready");
      } catch { if (!cancelled) setStatus("error"); }
    })();
    return () => { cancelled = true; };
  }, []);

  const infer = useCallback(async (px01: number[], truth?: "malignant" | "benign") => {
    const session = sessionRef.current, ort = ortRef.current;
    if (!session || !ort) return;
    setBusy(true);
    try {
      const input = new ort.Tensor("float32", Float32Array.from(px01), [1, 1, 28, 28]);
      const out = await session.run({ input });
      const logits = out.logits.data; const cam = Array.from(out.cam.data);
      const prob = softmax2(logits[0], logits[1]);
      setResult({ prob, px01, cam, truth });
    } catch { /* ignore */ } finally { setBusy(false); }
  }, []);

  useEffect(() => {
    if (result) { drawGray(inCanvas.current, result.px01); drawOverlay(camCanvas.current, result.px01, result.cam); }
  }, [result]);

  function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    const url = URL.createObjectURL(file); const im = new Image();
    im.onload = () => {
      const c = document.createElement("canvas"); c.width = 28; c.height = 28;
      const ctx = c.getContext("2d")!; ctx.drawImage(im, 0, 0, 28, 28);
      const d = ctx.getImageData(0, 0, 28, 28).data; const px01: number[] = [];
      for (let i = 0; i < 784; i++) px01.push((d[i * 4] + d[i * 4 + 1] + d[i * 4 + 2]) / 3 / 255);
      URL.revokeObjectURL(url); setSelIdx(null); infer(px01);
    };
    im.src = url;
  }

  const thr = metrics?.decision_threshold ?? 0.5;
  const pred = result ? (result.prob >= thr ? "malignant" : "benign") : null;
  const pct = (v?: number) => (v == null ? "—" : `${Math.round(v * 100)}%`);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-10">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-200 px-4 py-1.5 rounded-full text-sm font-medium">
          <FlaskConical className="h-4 w-4" /> {fr ? "Recherche · IA en direct dans le navigateur" : "Research · live AI in your browser"}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white leading-tight">
          {fr ? "CNN d'imagerie mammaire + Grad-CAM" : "Breast-imaging CNN + Grad-CAM"}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
          {fr
            ? "Un vrai réseau de neurones convolutif s'exécute ici, dans votre navigateur (ONNX), et met en évidence où il regarde. Démo de recherche — pas un diagnostic."
            : "A real convolutional neural network runs right here, in your browser (ONNX), and highlights where it looks. Research demo — not a diagnosis."}
        </p>
      </header>

      <Card className="p-4 border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/30 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-rose-900 dark:text-rose-100">
          <span className="font-semibold">{fr ? "Démo de recherche. " : "Research demo. "}</span>
          {fr
            ? "Entraîné sur BreastMNIST (échographie mammaire 28×28, ~780 images) — PAS des mammographies, PAS un dispositif clinique. Le même pipeline s'applique aux mammographies avec plus de données."
            : "Trained on BreastMNIST (28×28 breast ultrasound, ~780 images) — NOT mammograms, NOT a clinical device. The same pipeline applies to mammograms with more data."}
        </p>
      </Card>

      {status === "loading" && <div className="flex items-center justify-center gap-2 py-16 text-zinc-500"><Loader2 className="h-6 w-6 animate-spin" /> {fr ? "Chargement du modèle…" : "Loading the model…"}</div>}
      {status === "error" && <div className="text-center py-16 text-rose-500">{fr ? "Impossible de charger le modèle dans ce navigateur." : "Could not load the model in this browser."}</div>}

      {status === "ready" && (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            {/* input picker */}
            <div className="space-y-4">
              <h2 className="font-bold flex items-center gap-2"><Cpu className="h-5 w-5 text-indigo-500" /> {fr ? "Choisir une image" : "Choose an image"}</h2>
              <p className="text-sm text-zinc-500">{fr ? "8 vraies images de test (échographie) :" : "8 real test images (ultrasound):"}</p>
              <div className="grid grid-cols-4 gap-2">
                {samples.map((s, i) => <Thumb key={i} px={s.px} active={selIdx === i} onClick={() => { setSelIdx(i); infer(s.px.map((v) => v / 255), s.label); }} />)}
              </div>
              <label className="inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-300 cursor-pointer hover:underline">
                <Upload className="h-4 w-4" /> {fr ? "…ou importer une image" : "…or upload an image"}
                <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
              </label>
            </div>

            {/* result */}
            <div className="space-y-3">
              <h2 className="font-bold flex items-center gap-2"><Activity className="h-5 w-5 text-indigo-500" /> {fr ? "Prédiction & Grad-CAM" : "Prediction & Grad-CAM"}</h2>
              {!result ? (
                <p className="text-sm text-zinc-400 py-8 text-center">{fr ? "Sélectionnez une image pour lancer le réseau." : "Select an image to run the network."}</p>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center"><canvas ref={inCanvas} width={180} height={180} className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-black" /><p className="text-[11px] text-zinc-400 mt-1">{fr ? "Entrée (28×28)" : "Input (28×28)"}</p></div>
                    <div className="text-center"><canvas ref={camCanvas} width={180} height={180} className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-black" /><p className="text-[11px] text-zinc-400 mt-1">Grad-CAM</p></div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div><p className="text-xs text-zinc-500">{fr ? "Prédiction" : "Prediction"}</p><p className={`text-xl font-bold ${pred === "malignant" ? "text-rose-600" : "text-emerald-600"}`}>{pred === "malignant" ? (fr ? "malin" : "malignant") : (fr ? "bénin / normal" : "benign / normal")}</p></div>
                    <div className="text-right"><p className="text-xs text-zinc-500">P({fr ? "malin" : "malignant"})</p><p className="text-xl font-bold">{pct(result.prob)}</p></div>
                  </div>
                  <div className="h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden"><div className={`h-full ${result.prob >= thr ? "bg-rose-500" : "bg-emerald-500"}`} style={{ width: `${Math.round(result.prob * 100)}%` }} /></div>
                  {result.truth && (
                    <p className={`text-sm rounded-lg px-3 py-2 ${pred === result.truth ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300" : "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300"}`}>
                      {fr ? "Vérité terrain : " : "True label: "}<b>{result.truth === "malignant" ? (fr ? "malin" : "malignant") : (fr ? "bénin / normal" : "benign / normal")}</b> — {pred === result.truth ? (fr ? "correct ✅" : "correct ✅") : (fr ? "erreur" : "miss")}
                    </p>
                  )}
                  {busy && <p className="text-xs text-zinc-400 flex items-center gap-1"><Loader2 className="h-3 w-3 animate-spin" /> {fr ? "Inférence…" : "Running…"}</p>}
                </>
              )}
            </div>
          </div>

          {/* metrics */}
          {metrics && (
            <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { l: fr ? "Exactitude" : "Accuracy", v: metrics.accuracy },
                { l: "ROC-AUC", v: metrics.roc_auc },
                { l: fr ? "Sensibilité" : "Sensitivity", v: metrics.sensitivity_malignant },
                { l: fr ? "Spécificité" : "Specificity", v: metrics.specificity_benign_normal },
              ].map((m) => (
                <Card key={m.l} className="p-4 text-center border-indigo-100 dark:border-indigo-950">
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">{m.l === "ROC-AUC" ? m.v.toFixed(3) : pct(m.v)}</p>
                  <p className="text-xs text-zinc-500">{m.l}</p>
                </Card>
              ))}
            </section>
          )}

          <details className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
            <summary className="font-semibold cursor-pointer flex items-center gap-2"><BookOpen className="h-4 w-4 text-indigo-500" /> {fr ? "Méthodologie & limites" : "Methodology & limitations"}</summary>
            <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-300 space-y-2 leading-relaxed">
              <p>{fr ? "Modèle : petit CNN PyTorch (3 blocs conv → global-average-pool → linéaire), exporté en ONNX et exécuté ici via onnxruntime-web. La carte Grad-CAM est calculée à partir des activations de la dernière couche conv." : "Model: a small PyTorch CNN (3 conv blocks → global-average-pool → linear), exported to ONNX and run here via onnxruntime-web. The Grad-CAM map is computed from the last conv layer's activations."}</p>
              <p>{fr ? `Données : ${metrics?.dataset}. Seuil de décision ${thr.toFixed(2)} choisi sur la validation (Youden's J). Jeu de test : ${metrics?.n_test} images.` : `Data: ${metrics?.dataset}. Decision threshold ${thr.toFixed(2)} chosen on the validation set (Youden's J). Test set: ${metrics?.n_test} images.`}</p>
              <p className="text-zinc-400">{fr ? "Limites : petit jeu de données basse résolution, échographie (pas mammographie), non validé en externe, non réglementé. Démonstration de compétences, pas un outil clinique." : "Limitations: small, low-resolution dataset, ultrasound (not mammography), not externally validated, not regulated. A skills demonstration, not a clinical tool."}</p>
            </div>
          </details>
        </>
      )}
    </div>
  );
}
