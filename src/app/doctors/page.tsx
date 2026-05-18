"use client";

import { useState } from "react";
import { useLang } from "@/lib/language";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, Building2, Search } from "lucide-react";

export default function DoctorsPage() {
  const { lang, t } = useLang();
  const [search, setSearch] = useState("");

  const centers = t.doctors.centers;
  const filtered = centers.filter(
    (c) =>
      c.city.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-200 px-4 py-1.5 rounded-full text-sm font-medium">
          <Building2 className="h-4 w-4" />
          {t.doctors.title}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-rose-600 via-pink-600 to-fuchsia-600 bg-clip-text text-transparent leading-tight">
          {t.doctors.subtitle}
        </h1>
      </header>

      <a
        href="tel:0801003003"
        className="block bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-3xl p-6 md:p-8 shadow-2xl hover:shadow-rose-300 transition-shadow"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-rose-100 text-sm mb-1">📞 {t.doctors.nationalHotline}</p>
            <p className="text-3xl md:text-4xl font-bold tracking-wider">0801 003 003</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-full p-4">
            <Phone className="h-8 w-8" />
          </div>
        </div>
      </a>

      <div className="relative">
        <Search className="absolute top-1/2 -translate-y-1/2 start-3 h-5 w-5 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t.doctors.findNear}
          className="w-full ps-10 pe-4 py-3 rounded-full border border-rose-200 dark:border-rose-900 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-rose-400 text-base"
        />
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        {filtered.map((c, i) => (
          <Card
            key={i}
            className="p-5 border-rose-100 dark:border-rose-950 hover:shadow-lg transition-shadow bg-white/90 dark:bg-zinc-900/90 backdrop-blur"
          >
            <Badge className="bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-200 mb-3 border-0">
              {c.city}
            </Badge>
            <h3 className="font-bold text-lg mb-2">{c.name}</h3>
            <p className="text-sm text-muted-foreground mb-4 flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              {c.address}
            </p>
            <a href={`tel:${c.phone}`}>
              <Button className="w-full bg-rose-500 hover:bg-rose-600 rounded-full">
                <Phone className="me-2 h-4 w-4" />
                {t.doctors.callNow} · {c.phone}
              </Button>
            </a>
          </Card>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground py-8">
            {lang === "ar" ? "ما لقيناش نتائج" : "Aucun résultat"}
          </p>
        )}
      </section>

      <Card className="p-6 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900 text-center">
        <p className="text-sm text-amber-900 dark:text-amber-100">
          {lang === "ar"
            ? "💡 إيلا حسيتي بأي تغيير ف صدرك، ماتترددي - شوفي الطبيب فالقريب. الكشف المبكر كينقذ الحياة."
            : "💡 Si vous ressentez le moindre changement, n'hésitez pas — consultez rapidement. La détection précoce sauve des vies."}
        </p>
      </Card>
    </div>
  );
}
