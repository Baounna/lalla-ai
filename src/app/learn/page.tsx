"use client";

import { useLang } from "@/lib/language";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Phone, MapPin, Calendar, Heart, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const sectionIcons = [BookOpen, Calendar, Sparkles, Heart];

export default function LearnPage() {
  const { lang, t } = useLang();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-10">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-200 px-4 py-1.5 rounded-full text-sm font-medium">
          <BookOpen className="h-4 w-4" />
          {lang === "fr" ? "Connaissances" : "Knowledge"}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-purple-600 via-fuchsia-600 to-rose-600 bg-clip-text text-transparent leading-tight">
          {t.learn.title}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300">{t.learn.subtitle}</p>
      </header>

      <section className="grid gap-5 md:grid-cols-2">
        {t.learn.sections.map((s, i) => {
          const Icon = sectionIcons[i] || BookOpen;
          const colors = [
            "from-rose-500 to-pink-500",
            "from-fuchsia-500 to-purple-500",
            "from-purple-500 to-indigo-500",
            "from-pink-500 to-rose-500",
          ][i] || "from-rose-500 to-pink-500";

          return (
            <Card key={i} className="p-6 border-rose-100 dark:border-rose-950 hover:shadow-lg transition-shadow bg-white/90 dark:bg-zinc-900/90 backdrop-blur">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${colors} text-white mb-4 shadow-lg`}>
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold mb-2">{s.title}</h2>
              <p className="text-sm md:text-base text-zinc-700 dark:text-zinc-200 leading-relaxed">{s.body}</p>
            </Card>
          );
        })}
      </section>

      <section className="bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 rounded-3xl p-6 md:p-10 text-white shadow-2xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
          <Phone className="h-7 w-7" />
          {t.learn.resources}
        </h2>
        <ul className="space-y-3">
          {t.learn.resourcesList.map((r, i) => (
            <li key={i} className="flex items-start gap-3 bg-white/10 backdrop-blur rounded-xl p-4">
              <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <span className="text-sm md:text-base">{r}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="text-center bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 rounded-3xl p-8 md:p-10 border border-rose-100 dark:border-rose-950">
        <Heart className="h-12 w-12 text-rose-500 fill-rose-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-3">
          {lang === "fr" ? "Besoin d'aide ?" : "Need help?"}
        </h3>
        <p className="text-zinc-600 dark:text-zinc-300 mb-6 max-w-md mx-auto">
          {lang === "fr"
            ? "Lalla est là pour répondre à toutes vos questions, en toute confidentialité"
            : "Lalla is here to answer all your questions, in complete confidentiality"}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/chat">
            <Button className="bg-rose-500 hover:bg-rose-600 rounded-full px-6">
              {lang === "fr" ? "Parler à Lalla" : "Talk to Lalla"}
              <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
            </Button>
          </Link>
          <Link href="/check">
            <Button variant="outline" className="rounded-full px-6">
              {lang === "fr" ? "Commencer l'examen" : "Start the exam"}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
