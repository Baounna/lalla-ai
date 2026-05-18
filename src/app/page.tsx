"use client";

import Link from "next/link";
import { useLang } from "@/lib/language";
import { MessageCircle, ListChecks, ClipboardCheck, BookOpen, Heart, Shield, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { t } = useLang();

  const features = [
    { href: "/chat", icon: MessageCircle, color: "from-rose-500 to-pink-500", data: t.features.chat },
    { href: "/check", icon: ListChecks, color: "from-pink-500 to-fuchsia-500", data: t.features.check },
    { href: "/quiz", icon: ClipboardCheck, color: "from-fuchsia-500 to-purple-500", data: t.features.quiz },
    { href: "/learn", icon: BookOpen, color: "from-purple-500 to-rose-500", data: t.features.learn },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-16 space-y-16">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-200 px-4 py-1.5 rounded-full text-sm font-medium">
          <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
          {t.tagline}
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-br from-rose-600 via-pink-600 to-fuchsia-600 bg-clip-text text-transparent leading-tight">
          {t.hero.title}
        </h1>
        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
          {t.hero.subtitle}
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link href="/chat">
            <Button size="lg" className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-8 h-12 text-base">
              <MessageCircle className="me-2 h-5 w-5" />
              {t.hero.cta}
            </Button>
          </Link>
          <Link href="/learn">
            <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base border-rose-200 hover:bg-rose-50 dark:hover:bg-rose-950">
              {t.hero.learn}
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {features.map((f) => (
          <Link key={f.href} href={f.href}>
            <Card className="p-6 h-full hover:shadow-xl hover:-translate-y-1 transition-all border-rose-100 dark:border-rose-950 bg-white/80 dark:bg-zinc-900/80 backdrop-blur">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} text-white mb-4 shadow-lg`}>
                <f.icon className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold mb-2">{f.data.title}</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{f.data.desc}</p>
            </Card>
          </Link>
        ))}
      </section>

      <section className="bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-3xl p-8 md:p-12 shadow-2xl">
        <div className="grid gap-6 md:grid-cols-3 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-bold mb-2">36%</div>
            <p className="text-rose-100">من السرطانات عند النساء المغربيات</p>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold mb-2">+90%</div>
            <p className="text-rose-100">نسبة الشفاء مع الكشف المبكر</p>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold mb-2">11K</div>
            <p className="text-rose-100">حالة جديدة كل عام ف المغرب</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="flex gap-3 items-start">
          <Shield className="h-6 w-6 text-rose-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold">الخصوصية أولاً</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">معلوماتك تبقى عندك</p>
          </div>
        </div>
        <div className="flex gap-3 items-start">
          <Heart className="h-6 w-6 text-rose-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold">بحب وفهم</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">واجهة دافئة وبسيطة</p>
          </div>
        </div>
        <div className="flex gap-3 items-start">
          <Users className="h-6 w-6 text-rose-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold">للمغربيات</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">بالدارجة والفرنسية</p>
          </div>
        </div>
      </section>
    </div>
  );
}
