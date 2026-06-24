"use client";

import { useLang } from "@/lib/language";
import { ShieldCheck } from "lucide-react";

export function ReviewedNote() {
  const { lang } = useLang();
  return (
    <p className="inline-flex items-center gap-1.5 text-xs text-zinc-400">
      <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
      {lang === "fr"
        ? "Contenu éducatif aligné sur l'ACS, l'OMS et BI-RADS · Mis à jour en 2026"
        : "Educational content aligned with ACS, WHO & BI-RADS · Updated 2026"}
    </p>
  );
}
