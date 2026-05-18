"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/language";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, BellRing, Calendar, CheckCircle2, Heart } from "lucide-react";

function nextReminderDate(dayOfMonth: number): Date {
  const now = new Date();
  const d = new Date(now.getFullYear(), now.getMonth(), dayOfMonth);
  if (d <= now) d.setMonth(d.getMonth() + 1);
  return d;
}

function formatDate(d: Date, lang: "ar" | "fr") {
  return d.toLocaleDateString(lang === "ar" ? "ar-MA" : "fr-MA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ReminderPage() {
  const { lang, t } = useLang();
  const [day, setDay] = useState(15);
  const [enabled, setEnabled] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>("default");

  useEffect(() => {
    const savedDay = localStorage.getItem("reminderDay");
    const savedEnabled = localStorage.getItem("reminderEnabled");
    if (savedDay) setDay(parseInt(savedDay));
    if (savedEnabled === "true") setEnabled(true);
    if (typeof Notification !== "undefined") {
      setPermission(Notification.permission);
    }
  }, []);

  async function enable() {
    if (typeof Notification === "undefined") return;
    let perm = Notification.permission;
    if (perm === "default") {
      perm = await Notification.requestPermission();
    }
    setPermission(perm);
    if (perm === "granted") {
      setEnabled(true);
      localStorage.setItem("reminderEnabled", "true");
      localStorage.setItem("reminderDay", String(day));
      new Notification(t.appName, {
        body:
          lang === "ar"
            ? `راه فعلنا التذكير ديالك ختي 💖 غادي نذكرك يوم ${day} من كل شهر`
            : `Rappel activé 💖 Nous vous rappellerons le ${day} de chaque mois`,
        icon: "/favicon.ico",
      });
    }
  }

  function downloadICS() {
    const next = nextReminderDate(day);
    const dateStr = next.toISOString().split("T")[0].replace(/-/g, "");
    const title = lang === "ar" ? "الفحص الذاتي للثدي" : "Auto-examen mammaire";
    const desc =
      lang === "ar"
        ? "تذكير من لالة AI - وقت الفحص الذاتي الشهري"
        : "Rappel de Lalla AI - Auto-examen mensuel";
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Lalla AI//EN
BEGIN:VEVENT
UID:lalla-${Date.now()}@vibehack
DTSTAMP:${dateStr}T080000Z
DTSTART;VALUE=DATE:${dateStr}
SUMMARY:${title}
DESCRIPTION:${desc}
RRULE:FREQ=MONTHLY;INTERVAL=1
END:VEVENT
END:VCALENDAR`;
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lalla-reminder.ics";
    a.click();
    URL.revokeObjectURL(url);
  }

  const next = nextReminderDate(day);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 md:py-14 space-y-8">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-xl mb-2">
          {enabled ? <BellRing className="h-10 w-10" /> : <Bell className="h-10 w-10" />}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-rose-600 to-pink-600 bg-clip-text text-transparent leading-tight">
          {t.reminder.title}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300">{t.reminder.subtitle}</p>
      </header>

      <Card className="p-6 md:p-8 border-rose-100 dark:border-rose-950 bg-gradient-to-br from-rose-50 to-white dark:from-rose-950/30 dark:to-zinc-900 space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-rose-500" />
            {t.reminder.cardTitle}
          </h2>
          <p className="text-sm md:text-base text-zinc-700 dark:text-zinc-200 leading-relaxed">
            {t.reminder.cardDesc}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">{t.reminder.daySelector}</label>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
              <button
                key={d}
                onClick={() => {
                  setDay(d);
                  if (enabled) localStorage.setItem("reminderDay", String(d));
                }}
                className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                  day === d
                    ? "bg-rose-500 text-white shadow-lg scale-110"
                    : "bg-white dark:bg-zinc-800 hover:bg-rose-50 dark:hover:bg-rose-950 border border-zinc-200 dark:border-zinc-700"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-rose-200 dark:border-rose-900">
          <p className="text-sm text-muted-foreground mb-1">{t.reminder.next}</p>
          <p className="font-bold text-lg flex items-center gap-2">
            <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
            {formatDate(next, lang)}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={downloadICS}
            className="flex-1 bg-rose-500 hover:bg-rose-600 text-white rounded-full h-12"
          >
            <Calendar className="me-2 h-5 w-5" />
            {t.reminder.saveDate}
          </Button>
          <Button
            variant="outline"
            onClick={enable}
            disabled={enabled}
            className="flex-1 rounded-full h-12 border-rose-200 hover:bg-rose-50 dark:hover:bg-rose-950"
          >
            {enabled ? (
              <>
                <CheckCircle2 className="me-2 h-5 w-5" />
                {t.reminder.enabled}
              </>
            ) : (
              <>
                <Bell className="me-2 h-5 w-5" />
                {t.reminder.enable}
              </>
            )}
          </Button>
        </div>

        {permission === "denied" && (
          <p className="text-sm text-amber-600 dark:text-amber-400 text-center">
            ⚠️ {t.reminder.permission}
          </p>
        )}
      </Card>
    </div>
  );
}
