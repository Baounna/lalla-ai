"use client";

import { useLang } from "@/lib/language";
import { Logo } from "@/components/Logo";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-16 border-t border-rose-100 dark:border-rose-950 py-6 text-center text-sm text-muted-foreground">
      <p className="flex items-center justify-center gap-2">
        <Logo size={18} />
        <span>{t.footer}</span>
      </p>
      <p className="mt-1 text-xs opacity-70">{t.common.disclaimer}</p>
    </footer>
  );
}
