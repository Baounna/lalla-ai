"use client";

import Link from "next/link";
import { useLang } from "@/lib/language";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/Logo";
import {
  Sparkles,
  Heart,
  Lightbulb,
  Target,
  Code2,
  TrendingUp,
  Printer,
  ArrowRight,
  Compass,
  ChevronRight,
} from "lucide-react";

export default function PitchPage() {
  const { t, lang } = useLang();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-16 space-y-16 print:py-4 print:space-y-8">
      <div className="flex justify-between items-center print:hidden">
        <Button
          onClick={() => window.print()}
          variant="outline"
          className="rounded-full"
        >
          <Printer className="me-2 h-4 w-4" />
          {t.pitch.download}
        </Button>
        <Link href="/">
          <Button variant="ghost" className="rounded-full">
            {t.common.backHome} →
          </Button>
        </Link>
      </div>

      <section className="text-center space-y-6 py-12 print:py-6">
        <div className="flex justify-center">
          <Logo size={96} className="drop-shadow-2xl print:drop-shadow-none" />
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge className="bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-200 border-0">
            {t.pitch.badges.hackathon}
          </Badge>
          <Badge className="bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950 dark:text-fuchsia-200 border-0">
            {t.pitch.badges.team}
          </Badge>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-br from-rose-600 via-pink-600 to-fuchsia-600 bg-clip-text text-transparent leading-tight">
          {t.pitch.title}
        </h1>
        <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
          {t.pitch.subtitle}
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
          {t.pitch.badges.theme}
        </p>
      </section>

      <Section icon={Target} kicker={t.pitch.problem.kicker} accent="rose">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
          {t.pitch.problem.title}
        </h2>
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          {t.pitch.problem.stats.map((s, i) => (
            <Card
              key={i}
              className="p-6 text-center bg-gradient-to-br from-rose-500 to-pink-600 text-white border-0"
            >
              <div className="text-4xl md:text-5xl font-black mb-1">{s.value}</div>
              <div className="text-sm text-rose-100">{s.label}</div>
            </Card>
          ))}
        </div>
        <p className="text-base md:text-lg text-zinc-700 dark:text-zinc-200 leading-relaxed">
          {t.pitch.problem.body}
        </p>
      </Section>

      <Section icon={Lightbulb} kicker={t.pitch.solution.kicker} accent="pink">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          {t.pitch.solution.title}
        </h2>
        <p className="text-base md:text-lg text-zinc-700 dark:text-zinc-200 leading-relaxed mb-6">
          {t.pitch.solution.body}
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {t.pitch.solution.pillars.map((p, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-rose-100 dark:border-rose-950"
            >
              <div className="text-3xl flex-shrink-0">{p.icon}</div>
              <div>
                <h3 className="font-bold mb-1">{p.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section icon={Compass} kicker={t.pitch.conception.kicker} accent="pink">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          {t.pitch.conception.title}
        </h2>
        <p className="text-base md:text-lg text-zinc-700 dark:text-zinc-200 leading-relaxed mb-6">
          {t.pitch.conception.body}
        </p>
        <div className="grid gap-3 md:grid-cols-2 mb-6">
          {t.pitch.conception.principles.map((p, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-gradient-to-br from-white to-pink-50 dark:from-zinc-900 dark:to-pink-950/30 border border-pink-100 dark:border-pink-950"
            >
              <div className="text-xs font-mono font-bold text-pink-500 mb-1">{p.num}</div>
              <h3 className="font-bold mb-1">{p.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30 rounded-2xl p-5 border border-pink-100 dark:border-pink-950">
          <p className="text-xs font-bold text-pink-600 dark:text-pink-300 uppercase tracking-wider mb-3">
            {lang === "fr" ? "Parcours utilisatrice" : "User journey"}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {t.pitch.conception.journey.map((j, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 rounded-xl px-3 py-2 border border-pink-200 dark:border-pink-900">
                  <span className="text-xs font-mono font-bold text-pink-500">{j.step}</span>
                  <span className="text-sm font-medium">{j.label}</span>
                </div>
                {i < t.pitch.conception.journey.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-pink-400 rtl:rotate-180 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section icon={Sparkles} kicker={t.pitch.features.kicker} accent="fuchsia">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
          {t.pitch.features.title}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {t.pitch.features.list.map((f, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-gradient-to-br from-white to-rose-50 dark:from-zinc-900 dark:to-rose-950/30 border border-rose-100 dark:border-rose-950"
            >
              <div className="text-xs font-mono font-bold text-rose-500 mb-2">{f.num}</div>
              <h3 className="text-lg font-bold mb-1">{f.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section icon={TrendingUp} kicker={t.pitch.innovation.kicker} accent="purple">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
          {t.pitch.innovation.title}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {t.pitch.innovation.points.map((p, i) => (
            <Card key={i} className="p-5 border-purple-100 dark:border-purple-950 bg-white dark:bg-zinc-900">
              <div className="text-3xl mb-3">{p.icon}</div>
              <h3 className="font-bold text-lg mb-1">{p.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{p.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section icon={Heart} kicker={t.pitch.impact.kicker} accent="rose">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          {t.pitch.impact.title}
        </h2>
        <p className="text-base md:text-lg text-zinc-700 dark:text-zinc-200 leading-relaxed mb-6">
          {t.pitch.impact.body}
        </p>
        <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
          {t.pitch.impact.metrics.map((m, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl text-center bg-gradient-to-br from-rose-500 to-pink-500 text-white"
            >
              <div className="text-3xl md:text-4xl font-black">{m.value}</div>
              <div className="text-xs text-rose-100 mt-1">{m.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section icon={Code2} kicker={t.pitch.tech.kicker} accent="indigo">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
          {t.pitch.tech.title}
        </h2>
        <ul className="grid gap-2 md:grid-cols-2">
          {t.pitch.tech.list.map((line, i) => (
            <li
              key={i}
              className="flex items-start gap-2 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
            >
              <Code2 className="h-4 w-4 mt-1 text-indigo-500 flex-shrink-0" />
              <span className="text-sm">{line}</span>
            </li>
          ))}
        </ul>
      </Section>

      <section className="text-center bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 text-white rounded-3xl p-8 md:p-14 shadow-2xl print:bg-rose-500 print:shadow-none">
        <Badge className="bg-white/20 text-white border-0 mb-4">
          {t.pitch.closing.kicker}
        </Badge>
        <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
          {t.pitch.closing.title}
        </h2>
        <p className="text-base md:text-xl mb-8 max-w-2xl mx-auto text-rose-50 leading-relaxed">
          {t.pitch.closing.body}
        </p>
        <Link href="/">
          <Button
            size="lg"
            className="bg-white text-rose-600 hover:bg-rose-50 rounded-full px-8 h-12 text-base shadow-xl"
          >
            {t.pitch.closing.cta}
            <ArrowRight className="ms-2 h-5 w-5 rtl:rotate-180" />
          </Button>
        </Link>
        <div className="mt-10 pt-6 border-t border-white/20 text-sm text-rose-50">
          <p className="font-semibold">{t.pitch.badges.team}</p>
          <p className="opacity-80 mt-1">{t.pitch.badges.hackathon}</p>
          <p className="font-mono text-xs mt-2 opacity-70">lalla-ai.vercel.app</p>
        </div>
      </section>

      <p className="text-xs text-center text-muted-foreground print:block hidden">
        {lang === "fr" ? "Page de présentation - Lalla AI" : "Pitch page - Lalla AI"}
      </p>
    </div>
  );
}

function Section({
  icon: Icon,
  kicker,
  accent,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  kicker: string;
  accent: "rose" | "pink" | "fuchsia" | "purple" | "indigo";
  children: React.ReactNode;
}) {
  const colors = {
    rose: "from-rose-500 to-rose-600 text-rose-700",
    pink: "from-pink-500 to-pink-600 text-pink-700",
    fuchsia: "from-fuchsia-500 to-fuchsia-600 text-fuchsia-700",
    purple: "from-purple-500 to-purple-600 text-purple-700",
    indigo: "from-indigo-500 to-indigo-600 text-indigo-700",
  }[accent];

  return (
    <section className="space-y-4 break-inside-avoid print:break-inside-avoid">
      <div className="flex items-center gap-3">
        <div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colors.split(" text-")[0]} flex items-center justify-center text-white shadow-lg`}
        >
          <Icon className="h-6 w-6" />
        </div>
        <Badge className={`bg-transparent ${colors.split(" ")[2]} border-0 text-sm font-bold uppercase tracking-wider`}>
          {kicker}
        </Badge>
      </div>
      {children}
    </section>
  );
}
