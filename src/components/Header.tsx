"use client";

import Link from "next/link";
import { useLang } from "@/lib/language";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/Logo";

export function Header() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/chat", label: t.nav.chat },
    { href: "/check", label: t.nav.check },
    { href: "/visual", label: t.nav.visual },
    { href: "/screening", label: t.nav.screening },
    { href: "/quiz", label: t.nav.quiz },
    { href: "/learn", label: t.nav.learn },
    { href: "/doctors", label: t.nav.doctors },
    { href: "/reminder", label: t.nav.reminder },
    { href: "/clinician", label: t.nav.clinician },
  ];

  // Desktop bar shows the core journey; the rest live in the mobile menu to avoid crowding.
  const primary = links.filter((l) =>
    ["/", "/chat", "/check", "/visual", "/screening", "/learn"].includes(l.href),
  );

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-zinc-950/80 border-b border-rose-100 dark:border-rose-950">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Logo size={32} />
          <span>{t.appName}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {primary.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 rounded-full text-sm hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={() => setOpen(!open)}
            className="px-3 py-1.5 rounded-full text-sm hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors text-zinc-500"
          >
            {lang === "fr" ? "Plus" : "More"}
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex rounded-full border border-rose-200 dark:border-rose-900 overflow-hidden text-xs font-medium">
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1 ${lang === "en" ? "bg-rose-500 text-white" : "text-zinc-600 dark:text-zinc-300"}`}
            >
              EN
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
        <nav className="border-t border-rose-100 dark:border-rose-950 px-4 py-2 grid grid-cols-2 md:grid-cols-3 gap-1 bg-white dark:bg-zinc-950">
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
