"use client";

import { useState } from "react";
import { useLang } from "@/lib/language";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, ChevronLeft, ChevronRight, Loader2, CheckCircle2, AlertTriangle, AlertCircle, Heart } from "lucide-react";
import Link from "next/link";

type Result = {
  level: "low" | "moderate" | "high";
  title: string;
  summary: string;
  advice: string[];
  next_step: string;
  urgent: boolean;
};

export default function QuizPage() {
  const { lang, t, dir } = useLang();
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(t.quiz.questions.length).fill(null));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const questions = t.quiz.questions;
  const progress = ((index + 1) / questions.length) * 100;

  async function submit(allAnswers: string[]) {
    setLoading(true);
    const payload = questions.map((q, i) => ({ q: q.q, a: allAnswers[i] }));
    const res = await fetch("/api/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: payload, lang }),
    });
    const data: Result = await res.json();
    setResult(data);
    setLoading(false);
  }

  function selectOption(opt: string) {
    const updated = [...answers];
    updated[index] = opt;
    setAnswers(updated);
    if (index === questions.length - 1) {
      submit(updated as string[]);
    } else {
      setTimeout(() => setIndex(index + 1), 200);
    }
  }

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 md:py-16 text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-500 text-white shadow-xl mb-2">
          <ClipboardCheck className="h-10 w-10" />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-fuchsia-600 to-purple-600 bg-clip-text text-transparent">
          {t.quiz.title}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300">{t.quiz.subtitle}</p>
        <div className="pt-4">
          <Button
            size="lg"
            onClick={() => setStarted(true)}
            className="bg-gradient-to-r from-fuchsia-500 to-purple-500 hover:from-fuchsia-600 hover:to-purple-600 text-white rounded-full px-10 h-12 text-base shadow-lg"
          >
            {t.quiz.start}
          </Button>
        </div>
        <Card className="mt-8 p-4 text-sm text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900 border-rose-100 dark:border-rose-950">
          🔒 {lang === "fr"
            ? "Vos réponses sont privées et ne sont pas stockées. L'IA les analyse en direct."
            : "Your answers are private and not stored. The AI analyzes them in real time."}
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-rose-500 mx-auto" />
        <p className="text-lg text-zinc-600 dark:text-zinc-300">{t.quiz.processing}</p>
      </div>
    );
  }

  if (result) {
    const config = {
      low: { color: "from-emerald-500 to-green-500", bg: "from-emerald-50 to-green-50", icon: CheckCircle2, label: lang === "fr" ? "Faible" : "Low" },
      moderate: { color: "from-amber-500 to-orange-500", bg: "from-amber-50 to-orange-50", icon: AlertTriangle, label: lang === "fr" ? "Modéré" : "Moderate" },
      high: { color: "from-rose-500 to-red-500", bg: "from-rose-50 to-red-50", icon: AlertCircle, label: lang === "fr" ? "Élevé" : "High" },
    }[result.level] || { color: "from-rose-500 to-pink-500", bg: "from-rose-50 to-pink-50", icon: Heart, label: "" };

    return (
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12 space-y-6">
        <div className="text-center">
          <Badge className="mb-3">{t.quiz.result}</Badge>
        </div>

        <Card className={`p-6 md:p-8 bg-gradient-to-br ${config.bg} dark:from-zinc-900 dark:to-zinc-900 border-2`}>
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${config.color} flex items-center justify-center text-white shadow-lg`}>
              <config.icon className="h-7 w-7" />
            </div>
            <div>
              <Badge className={`bg-gradient-to-r ${config.color} text-white border-0`}>
                {lang === "fr" ? "Niveau de risque : " : "Risk level: "}{config.label}
              </Badge>
              <h2 className="text-2xl font-bold mt-1">{result.title}</h2>
            </div>
          </div>
          <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-200">
            {result.summary}
          </p>
        </Card>

        {result.advice.length > 0 && (
          <Card className="p-6">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
              {lang === "fr" ? "Conseils personnalisés" : "Personalized advice"}
            </h3>
            <ul className="space-y-2">
              {result.advice.map((a, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-rose-500 mt-1">✓</span>
                  <span className="text-sm md:text-base">{a}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        <Card className={`p-6 border-2 ${result.urgent ? "border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/30" : "border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30"}`}>
          <h3 className="font-bold mb-2 flex items-center gap-2">
            {result.urgent ? (
              <AlertCircle className="h-5 w-5 text-rose-600" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            )}
            {lang === "fr" ? "Prochaine étape" : "Next step"}
          </h3>
          <p className="text-sm md:text-base">{result.next_step}</p>
        </Card>

        <div className="flex flex-wrap gap-3 justify-center pt-2">
          {(result.urgent || result.level === "high") && (
            <Link href="/doctors">
              <Button className="bg-rose-600 hover:bg-rose-700 rounded-full shadow-lg">
                {lang === "fr" ? "📞 Voir un médecin" : "📞 See a doctor"}
              </Button>
            </Link>
          )}
          <Link href="/chat">
            <Button className="bg-rose-500 hover:bg-rose-600 rounded-full">
              {lang === "fr" ? "Parler à Lalla" : "Talk to Lalla"}
            </Button>
          </Link>
          <Link href="/check">
            <Button variant="outline" className="rounded-full">
              {lang === "fr" ? "Auto-examen" : "Self-exam"}
            </Button>
          </Link>
          <Link href="/reminder">
            <Button variant="outline" className="rounded-full">
              {lang === "fr" ? "🔔 Activer le rappel" : "🔔 Enable reminder"}
            </Button>
          </Link>
          <Button
            variant="ghost"
            onClick={() => {
              setStarted(false);
              setIndex(0);
              setAnswers(Array(questions.length).fill(null));
              setResult(null);
            }}
            className="rounded-full"
          >
            {lang === "fr" ? "Refaire le test" : "Retake the test"}
          </Button>
        </div>
      </div>
    );
  }

  const q = questions[index];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-10">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950 dark:text-fuchsia-200">
            {index + 1} / {questions.length}
          </Badge>
          <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-fuchsia-100 dark:bg-fuchsia-950 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-fuchsia-500 to-purple-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <Card className="p-6 md:p-10 mb-6 border-rose-100 dark:border-rose-950 shadow-xl bg-white/95 dark:bg-zinc-900/95">
        <h2 className="text-xl md:text-2xl font-bold mb-6">{q.q}</h2>
        <div className="space-y-3">
          {q.options.map((opt) => (
            <button
              key={opt}
              onClick={() => selectOption(opt)}
              className={`w-full text-start px-5 py-4 rounded-2xl border-2 transition-all hover:border-fuchsia-400 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-950/30 ${
                answers[index] === opt
                  ? "border-fuchsia-500 bg-fuchsia-50 dark:bg-fuchsia-950/40"
                  : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setIndex(Math.max(0, index - 1))}
          disabled={index === 0}
          className="rounded-full"
        >
          {dir === "rtl" ? <ChevronRight className="me-1 h-4 w-4" /> : <ChevronLeft className="me-1 h-4 w-4" />}
          {lang === "fr" ? "Précédent" : "Previous"}
        </Button>
        <span className="text-sm text-muted-foreground self-center">
          {lang === "fr" ? "Choisissez une réponse" : "Choose an answer"}
        </span>
      </div>
    </div>
  );
}
