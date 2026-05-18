"use client";

import { useState } from "react";
import { useLang } from "@/lib/language";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Copy, Check } from "lucide-react";

const SITE_URL = "https://vibehack-nine.vercel.app";

export function ShareCard() {
  const { t, lang } = useLang();
  const [copied, setCopied] = useState(false);

  const shareText = `${t.share.nativeText} ${SITE_URL}`;

  function shareWhatsApp() {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(SITE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = SITE_URL;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  async function nativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t.share.nativeMessage,
          text: t.share.nativeText,
          url: SITE_URL,
        });
      } catch {
        // user cancelled
      }
    } else {
      copyLink();
    }
  }

  return (
    <Card className="p-6 md:p-8 bg-gradient-to-br from-emerald-50 via-rose-50 to-pink-50 dark:from-emerald-950/20 dark:via-rose-950/30 dark:to-pink-950/30 border-rose-200 dark:border-rose-900">
      <div className="text-center space-y-3 mb-5">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-rose-500 text-white shadow-lg">
          <Share2 className="h-7 w-7" />
        </div>
        <h2 className="text-2xl font-bold">{t.share.title}</h2>
        <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-300 max-w-md mx-auto">
          {t.share.desc}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          onClick={shareWhatsApp}
          className="flex-1 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full h-12 text-base font-medium shadow-lg"
        >
          <svg viewBox="0 0 24 24" className="me-2 h-5 w-5 fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {t.share.whatsapp}
        </Button>

        {typeof navigator !== "undefined" && (
          <Button
            onClick={nativeShare}
            variant="outline"
            className="flex-1 rounded-full h-12 text-base font-medium border-rose-200 hover:bg-rose-50 dark:hover:bg-rose-950"
          >
            {copied ? (
              <>
                <Check className="me-2 h-5 w-5 text-emerald-500" />
                {t.share.copied}
              </>
            ) : (
              <>
                <Copy className="me-2 h-5 w-5" />
                {lang === "ar" ? "نسخ ولا مشاركة" : "Copier ou partager"}
              </>
            )}
          </Button>
        )}
      </div>
    </Card>
  );
}
