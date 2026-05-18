"use client";

import Link from "next/link";
import { useLang } from "@/lib/language";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/chat", label: t.nav.chat },
    { href: "/check", label: t.nav.check },
    { href: "/quiz", label: t.nav.quiz },
    { href: "/learn", label: t.nav.learn },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-zinc-950/80 border-b border-rose-100 dark:border-rose-950">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Heart className="h-6 w-6 text-rose-500 fill-rose-500" />
          <span>{t.appName}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 rounded-full text-sm hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex rounded-full border border-rose-200 dark:border-rose-900 overflow-hidden text-xs font-medium">
            <button
              onClick={() => setLang("ar")}
              className={`px-3 py-1 ${lang === "ar" ? "bg-rose-500 text-white" : "text-zinc-600 dark:text-zinc-300"}`}
            >
              العربية
            </button>
            <button
              onClick={() => setLang("fr")}
              className={`px-3 py-1 ${lang === "fr" ? "bg-rose-500 text-white" : "text-zinc-600 dark:text-zinc-300"}`}
            >
              FR
            </button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label="menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-rose-100 dark:border-rose-950 px-4 py-2 flex flex-col gap-1 bg-white dark:bg-zinc-950">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-3 py-2 rounded-lg text-sm hover:bg-rose-50 dark:hover:bg-rose-950"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
