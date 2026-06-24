"use client";

import { useLang } from "@/lib/language";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Globe, HeartHandshake, ExternalLink } from "lucide-react";

const HELPLINES = [
  { flag: "🇺🇸", org: "American Cancer Society", country: { en: "United States", fr: "États-Unis" }, num: "1-800-227-2345", tel: "18002272345", hours: { en: "24/7", fr: "24h/24" }, url: "https://www.cancer.org" },
  { flag: "🇺🇸", org: "Susan G. Komen", country: { en: "United States", fr: "États-Unis" }, num: "1-877-465-6636", tel: "18774656636", hours: { en: "Mon–Fri", fr: "Lun–Ven" }, url: "https://www.komen.org" },
  { flag: "🇬🇧", org: "Breast Cancer Now", country: { en: "United Kingdom", fr: "Royaume-Uni" }, num: "0808 800 6000", tel: "08088006000", hours: { en: "Mon–Sat", fr: "Lun–Sam" }, url: "https://breastcancernow.org" },
  { flag: "🇦🇺", org: "Breast Cancer Network Australia", country: { en: "Australia", fr: "Australie" }, num: "1800 500 258", tel: "1800500258", hours: { en: "Mon–Fri", fr: "Lun–Ven" }, url: "https://www.bcna.org.au" },
  { flag: "🇲🇦", org: "Fondation Lalla Salma", country: { en: "Morocco", fr: "Maroc" }, num: "0801 003 003", tel: "0801003003", hours: { en: "Where Lalla began", fr: "L'origine de Lalla" }, url: "https://www.contrelecancer.ma" },
];

export default function DoctorsPage() {
  const { lang } = useLang();
  const fr = lang === "fr";
  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=breast+cancer+screening+near+me";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-200 px-4 py-1.5 rounded-full text-sm font-medium">
          <HeartHandshake className="h-4 w-4" />
          {fr ? "Dépistage & soutien" : "Screening & support"}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-rose-600 via-pink-600 to-fuchsia-600 bg-clip-text text-transparent leading-tight">
          {fr ? "Trouver de l'aide près de chez vous" : "Find screening & support near you"}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
          {fr
            ? "Où que vous soyez, vous n'êtes pas seule. Trouvez un centre de dépistage et des lignes d'assistance de confiance."
            : "Wherever you are, you're not alone. Find a screening center and trusted helplines."}
        </p>
      </header>

      {/* Find a center near you */}
      <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="block bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-3xl p-6 md:p-8 shadow-2xl hover:shadow-rose-300 transition-shadow">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-rose-100 text-sm mb-1">{fr ? "📍 Centres de dépistage" : "📍 Screening centers"}</p>
            <p className="text-2xl md:text-3xl font-bold">{fr ? "Trouver un centre près de moi" : "Find a center near me"}</p>
            <p className="text-rose-100 text-sm mt-1">{fr ? "Ouvre une recherche de mammographie sur la carte" : "Opens a mammogram search on the map"}</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-full p-4">
            <MapPin className="h-8 w-8" />
          </div>
        </div>
      </a>

      {/* International helplines */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Globe className="h-6 w-6 text-rose-500" /> {fr ? "Lignes d'assistance internationales" : "International helplines"}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {HELPLINES.map((h) => (
            <Card key={h.org} className="p-5 border-rose-100 dark:border-rose-950 hover:shadow-lg transition-shadow bg-white/90 dark:bg-zinc-900/90 backdrop-blur">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{h.flag}</span>
                <div>
                  <h3 className="font-bold leading-tight">{h.org}</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{fr ? h.country.fr : h.country.en} · {fr ? h.hours.fr : h.hours.en}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <a href={`tel:${h.tel}`} className="flex-1">
                  <Button className="w-full bg-rose-500 hover:bg-rose-600 rounded-full">
                    <Phone className="me-2 h-4 w-4" /> {h.num}
                  </Button>
                </a>
                <a href={h.url} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border border-rose-200 dark:border-rose-900 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950" aria-label="website">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </Card>
          ))}
        </div>
        <p className="text-xs text-zinc-400 text-center">
          {fr
            ? "Dans un autre pays ? Contactez votre société nationale du cancer ou votre service de santé local. En cas d'urgence, appelez les services d'urgence."
            : "In another country? Contact your national cancer society or local health service. In an emergency, call your local emergency number."}
        </p>
      </section>

      <Card className="p-6 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900 text-center">
        <p className="text-sm text-amber-900 dark:text-amber-100">
          {fr
            ? "Si vous ressentez le moindre changement, n'hésitez pas — consultez rapidement. La détection précoce sauve des vies."
            : "If you notice any change, don't hesitate — see a doctor soon. Early detection saves lives."}
        </p>
      </Card>
    </div>
  );
}
