"use client";

import { useLang } from "@/lib/language";
import { Logo } from "@/components/Logo";
import Link from "next/link";
import { Stethoscope } from "lucide-react";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-16 border-t border-rose-100 dark:border-rose-950 py-8 text-center text-sm text-muted-foreground space-y-2">
      <p className="flex items-center justify-center gap-2 font-medium text-zinc-700 dark:text-zinc-200">
        <Logo size={18} />
        <span>{t.footer}</span>
      </p>
      <p className="text-xs opacity-70 max-w-md mx-auto">{t.common.disclaimer}</p>
      <Link href="/clinician" className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-300 hover:underline">
        <Stethoscope className="h-3.5 w-3.5" />
        {t.nav.clinician}
      </Link>
      <p className="text-xs opacity-50">© 2026 Lalla AI</p>
    </footer>
  );
}
