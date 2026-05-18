"use client";

import { useLang } from "@/lib/language";
import { Heart } from "lucide-react";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-16 border-t border-rose-100 dark:border-rose-950 py-6 text-center text-sm text-muted-foreground">
      <p className="flex items-center justify-center gap-1">
        <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
        <span>{t.footer}</span>
      </p>
      <p className="mt-1 text-xs opacity-70">{t.common.disclaimer}</p>
    </footer>
  );
}
