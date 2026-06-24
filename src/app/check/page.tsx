"use client";

import { useState } from "react";
import { useLang } from "@/lib/language";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, Calendar, Sparkles, Eye, Hand, ShowerHead, Bed, Box, Info } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const SelfCheck3D = dynamic(() => import("@/components/SelfCheck3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[340px] rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-zinc-900 animate-pulse" />
  ),
});

const stepIcons = [Eye, Eye, Eye, Bed, Hand, Hand, ShowerHead];

export default function CheckPage() {
  const { lang, t } = useLang();
  const [step, setStep] = useState(-1);
  const [completed, setCompleted] = useState<number[]>([]);

  const steps = t.check.steps;

  if (step === -1) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        <div className="text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-200 px-4 py-1.5 rounded-full text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            BSE · Breast Self-Examination
          </div>
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-rose-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            {t.check.title}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300">{t.check.subtitle}</p>
        </div>

        <Card className="p-6 md:p-8 mb-6 border-rose-100 dark:border-rose-950 bg-gradient-to-br from-rose-50 to-white dark:from-rose-950/30 dark:to-zinc-900">
          <div className="flex items-start gap-3 mb-4">
            <Calendar className="h-6 w-6 text-rose-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-bold mb-1">
                {lang === "fr" ? "Quand faire l'examen ?" : "When to do the exam?"}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                {lang === "fr"
                  ? "Chaque mois, une semaine après le début des règles. Sans règles, choisissez le même jour chaque mois."
                  : "Every month, one week after your period starts. If you don't have periods, pick the same day each month."}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 pt-3 border-t border-rose-100 dark:border-rose-900">
            <Info className="h-5 w-5 text-rose-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              {lang === "fr" ? (
                <>
                  L&apos;auto-examen ne suffit pas à lui seul : associez-le à une{" "}
                  <Link href="/screening" className="text-rose-600 dark:text-rose-300 underline">mammographie</Link> et à un examen clinique réguliers.
                </>
              ) : (
                <>
                  Self-exam alone isn&apos;t enough — combine it with regular{" "}
                  <Link href="/screening" className="text-rose-600 dark:text-rose-300 underline">mammograms</Link> and clinical exams.
                </>
              )}
            </p>
          </div>
        </Card>

        <div className="grid gap-3 mb-8 md:grid-cols-2">
          {steps.map((s, i) => {
            const Icon = stepIcons[i] || Hand;
            return (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-zinc-900 border border-rose-100 dark:border-rose-950">
                <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-950 flex items-center justify-center text-rose-600 dark:text-rose-300 flex-shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">{s.title}</span>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            onClick={() => setStep(0)}
            className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-10 h-12 text-base"
          >
            {t.check.start}
            <ChevronRight className="ms-2 h-5 w-5" />
          </Button>
        </div>

        <Card className="mt-10 p-6 border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h3 className="font-bold">{t.check.whenToSeeDoctor}</h3>
              <ul className="space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
                {t.check.doctorList.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (step >= steps.length) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center space-y-6">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-2xl mb-4">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-rose-600 to-pink-600 bg-clip-text text-transparent">
          {lang === "fr" ? "Bravo ! 🌸" : "Well done! 🌸"}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300">
          {lang === "fr"
            ? "Vous avez terminé l'auto-examen. Rappelez-vous : refaites-le chaque mois."
            : "You completed the self-exam. Remember: do it again every month."}
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <Link href="/reminder">
            <Button className="bg-rose-500 hover:bg-rose-600 rounded-full px-6 shadow-lg">
              {lang === "fr" ? "🔔 Activer le rappel mensuel" : "🔔 Enable monthly reminder"}
            </Button>
          </Link>
          <Link href="/chat">
            <Button variant="outline" className="rounded-full px-6">
              {lang === "fr" ? "Demander à Lalla" : "Ask Lalla"}
            </Button>
          </Link>
          <Button
            variant="ghost"
            onClick={() => {
              setStep(-1);
              setCompleted([]);
            }}
            className="rounded-full px-6"
          >
            {lang === "fr" ? "Refaire" : "Restart"}
          </Button>
        </div>
      </div>
    );
  }

  const current = steps[step];
  const Icon = stepIcons[step] || Hand;
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-10">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-200">
            {t.check.step} {step + 1} {t.check.of} {steps.length}
          </Badge>
          <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-rose-100 dark:bg-rose-950 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6 items-stretch">
        <div className="min-h-[340px] md:min-h-[440px]">
          <SelfCheck3D step={step} caption={current.title} />
        </div>

        <Card className="p-6 md:p-8 border-rose-100 dark:border-rose-950 shadow-xl bg-white/95 dark:bg-zinc-900/95 flex flex-col">
          <div className="mb-5">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-lg mb-4">
              <Icon className="h-8 w-8" />
            </div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-rose-400 mb-2 ms-1">
              <Box className="h-3 w-3" /> {t.check.guide3d}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">{current.title}</h2>
            <p className="text-base md:text-lg text-zinc-700 dark:text-zinc-200 leading-relaxed">
              {current.desc}
            </p>
          </div>

          <div className="mt-auto bg-rose-50 dark:bg-rose-950/40 rounded-xl p-4 border border-rose-100 dark:border-rose-900">
            <div className="flex gap-2 items-start">
              <Sparkles className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-rose-900 dark:text-rose-100">
                <span className="font-semibold">{t.check.tip}</span>
                {current.tip}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-between gap-3">
        <Button
          variant="outline"
          onClick={() => setStep(step - 1)}
          disabled={step === 0}
          className="rounded-full"
        >
          <ChevronLeft className="me-1 h-4 w-4" />
          {t.check.prev}
        </Button>
        <Button
          onClick={() => {
            if (!completed.includes(step)) setCompleted([...completed, step]);
            setStep(step + 1);
          }}
          className="bg-rose-500 hover:bg-rose-600 rounded-full px-6"
        >
          {step === steps.length - 1 ? t.check.done : t.check.next}
          <ChevronRight className="ms-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
