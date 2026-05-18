"use client";

import Link from "next/link";
import { useLang } from "@/lib/language";
import { Logo } from "@/components/Logo";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Printer, User, Monitor, Server, Brain, ArrowDown, Workflow } from "lucide-react";

export default function ArchitecturePage() {
  const { t, lang } = useLang();
  const a = t.architecture;
  const layerIcons = [User, Monitor, Server, Brain];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-16 space-y-14 print:py-4 print:space-y-8">
      <div className="flex justify-between items-center print:hidden">
        <Link href="/pitch">
          <Button variant="ghost" className="rounded-full">
            {a.backToPitch}
          </Button>
        </Link>
        <Button
          onClick={() => window.print()}
          variant="outline"
          className="rounded-full"
        >
          <Printer className="me-2 h-4 w-4" />
          {t.pitch.download}
        </Button>
      </div>

      <header className="text-center space-y-4">
        <div className="flex justify-center">
          <Logo size={64} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-indigo-600 via-purple-600 to-rose-600 bg-clip-text text-transparent leading-tight">
          {a.title}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300">{a.subtitle}</p>
      </header>

      <section className="space-y-5 break-inside-avoid">
        <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-200 border-0 text-sm">
          {a.arch.kicker}
        </Badge>
        <h2 className="text-2xl md:text-3xl font-bold">{a.arch.title}</h2>
        <p className="text-base text-zinc-600 dark:text-zinc-300">{a.arch.desc}</p>

        <div className="space-y-3 pt-4">
          {a.arch.layers.map((layer, i) => {
            const Icon = layerIcons[i] || Monitor;
            const colors = [
              "from-rose-500 to-pink-500",
              "from-pink-500 to-fuchsia-500",
              "from-fuchsia-500 to-purple-500",
              "from-purple-500 to-indigo-500",
            ][i];
            return (
              <div key={i}>
                <Card className="p-5 border-2 border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors} flex items-center justify-center text-white shadow-lg flex-shrink-0`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{layer.name}</h3>
                      <p className="text-xs text-zinc-500 font-mono mt-0.5">{layer.tech}</p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{layer.role}</p>
                    </div>
                  </div>
                </Card>
                {i < a.arch.layers.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ArrowDown className="h-6 w-6 text-zinc-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-5 break-inside-avoid">
        <Badge className="bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950 dark:text-fuchsia-200 border-0 text-sm">
          {a.usecase.kicker}
        </Badge>
        <h2 className="text-2xl md:text-3xl font-bold">{a.usecase.title}</h2>
        <p className="text-base text-zinc-600 dark:text-zinc-300">{a.usecase.desc}</p>

        <div className="grid md:grid-cols-[200px_1fr] gap-6 pt-4 items-center">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white shadow-xl">
              <User className="h-16 w-16" />
            </div>
            <p className="text-center font-bold mt-3">{a.usecase.actor}</p>
          </div>

          <Card className="p-6 border-2 border-dashed border-fuchsia-300 dark:border-fuchsia-800 bg-fuchsia-50/30 dark:bg-fuchsia-950/20">
            <p className="text-xs font-bold text-fuchsia-600 uppercase tracking-wider mb-4">
              {t.appName}
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {a.usecase.cases.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-white dark:bg-zinc-900 border border-fuchsia-200 dark:border-fuchsia-900"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </div>
                  <span className="text-sm">{c}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="space-y-5 break-inside-avoid">
        <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-200 border-0 text-sm">
          {a.sequence.kicker}
        </Badge>
        <h2 className="text-2xl md:text-3xl font-bold">{a.sequence.title}</h2>
        <p className="text-base text-zinc-600 dark:text-zinc-300">{a.sequence.desc}</p>

        <Card className="p-4 md:p-6 overflow-x-auto bg-gradient-to-br from-purple-50 to-rose-50 dark:from-purple-950/30 dark:to-rose-950/30 border-purple-200 dark:border-purple-900">
          <div className="min-w-[600px]">
            <div className="grid grid-cols-4 gap-2 mb-4">
              {a.sequence.actors.map((actor, i) => {
                const Icon = [User, Monitor, Server, Brain][i];
                return (
                  <div key={i} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-rose-500 text-white shadow-lg mb-2">
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-bold">{actor}</p>
                  </div>
                );
              })}
            </div>

            <div className="relative grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="border-l-2 border-dashed border-purple-300 dark:border-purple-700 mx-auto h-full"
                  style={{ minHeight: `${a.sequence.steps.length * 50}px` }}
                />
              ))}

              <div className="absolute inset-0 flex flex-col justify-around py-2">
                {a.sequence.steps.map((step, i) => {
                  const fromCol = step.from;
                  const toCol = step.to;
                  const isRight = toCol > fromCol;
                  const startPct = ((Math.min(fromCol, toCol) + 0.5) / 4) * 100;
                  const widthPct = (Math.abs(toCol - fromCol) / 4) * 100;
                  return (
                    <div
                      key={i}
                      className="relative h-8"
                      style={{ marginInlineStart: `${startPct}%`, width: `${widthPct}%` }}
                    >
                      <div className="absolute inset-0 flex items-center">
                        <div className="flex-1 h-0.5 bg-purple-400 relative">
                          {isRight ? (
                            <div className="absolute -end-1 top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-s-[6px] border-s-purple-500" />
                          ) : (
                            <div className="absolute -start-1 top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-e-[6px] border-e-purple-500" />
                          )}
                        </div>
                      </div>
                      <div
                        className="absolute inset-x-0 -top-3 text-center"
                      >
                        <span className="bg-white dark:bg-zinc-900 px-2 py-0.5 rounded text-xs font-medium border border-purple-200 dark:border-purple-800">
                          {step.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>

        <p className="text-sm text-zinc-500 italic">
          💡 {lang === "ar"
            ? "كل سهم كيمثل رسالة بين المكونات. الترتيب من الفوق للتحت."
            : "Chaque flèche représente un message entre composants. Lecture de haut en bas."}
        </p>
      </section>

      <section className="bg-gradient-to-br from-indigo-500 via-purple-500 to-rose-500 text-white rounded-3xl p-8 md:p-12 shadow-2xl text-center print:bg-purple-600 print:shadow-none">
        <Workflow className="h-12 w-12 mx-auto mb-4 opacity-90" />
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          {lang === "ar" ? "بنية بسيطة، قوية، آمنة" : "Architecture simple, robuste, sécurisée"}
        </h2>
        <p className="text-base md:text-lg max-w-2xl mx-auto opacity-90">
          {lang === "ar"
            ? "بلا قاعدة بيانات، بلا تسجيل، بلا تخزين. كلشي كيدور ف الوقت الحقيقي - وهادشي مقصود ديال التصميم."
            : "Pas de base de données, pas d'authentification, pas de stockage. Tout se passe en temps réel — par conception."}
        </p>
      </section>
    </div>
  );
}
