"use client";

import { useLang } from "@/lib/language";
import { Camera } from "lucide-react";
import dynamic from "next/dynamic";

const VisualSelfCheck = dynamic(() => import("@/components/VisualSelfCheck"), {
  ssr: false,
  loading: () => <div className="w-full min-h-[420px] rounded-2xl bg-zinc-100 dark:bg-zinc-900 animate-pulse" />,
});

export default function VisualPage() {
  const { lang } = useLang();
  const fr = lang === "fr";

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 space-y-8">
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-200 px-4 py-1.5 rounded-full text-sm font-medium">
          <Camera className="h-4 w-4" />
          {fr ? "Inspection visuelle · IA sur appareil" : "Visual inspection · on-device AI"}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white leading-tight">
          {fr ? "Auto-examen visuel guidé par IA" : "AI-guided visual self-check"}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
          {fr
            ? "Une IA de détection de posture suit votre corps en temps réel, met en évidence la zone à examiner et vérifie votre position — entièrement sur votre appareil."
            : "On-device pose-detection AI tracks your body in real time, highlights the area to examine, and checks your position — all on your device."}
        </p>
      </section>

      <VisualSelfCheck />
    </div>
  );
}
