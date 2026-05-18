"use client";

import { useLang } from "@/lib/language";
import { Logo } from "@/components/Logo";
import Link from "next/link";
import { Presentation } from "lucide-react";

export function Footer() {
  const { t, lang } = useLang();
  return (
    <footer className="mt-16 border-t border-rose-100 dark:border-rose-950 py-6 text-center text-sm text-muted-foreground space-y-2">
      <p className="flex items-center justify-center gap-2">
        <Logo size={18} />
        <span>{t.footer}</span>
      </p>
      <p className="text-xs opacity-70">{t.common.disclaimer}</p>
      <Link
        href="/pitch"
        className="inline-flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-300 hover:underline"
      >
        <Presentation className="h-3.5 w-3.5" />
        {lang === "ar" ? "شوفي العرض التقديمي" : "Voir la présentation"}
      </Link>
    </footer>
  );
}
