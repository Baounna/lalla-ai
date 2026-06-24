"use client";

import { useLang } from "@/lib/language";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layers, Microscope, BookOpen } from "lucide-react";
import Link from "next/link";
import { ReviewedNote } from "@/components/ReviewedNote";

export default function TypesPage() {
  const { lang } = useLang();
  const fr = lang === "fr";

  const stages = [
    { n: "0", color: "from-emerald-500 to-green-500", w: "20%", en: ["Non-invasive (in situ)", "Abnormal cells are still inside the duct (DCIS). Highly treatable."], fr: ["Non invasif (in situ)", "Les cellules anormales sont encore dans le canal (CCIS). Très traitable."] },
    { n: "I", color: "from-lime-500 to-emerald-500", w: "38%", en: ["Small & localized", "Tumor ≤ 2 cm, little or no spread to lymph nodes."], fr: ["Petit & localisé", "Tumeur ≤ 2 cm, peu ou pas d'atteinte des ganglions."] },
    { n: "II", color: "from-amber-500 to-lime-500", w: "56%", en: ["Larger or some nodes", "Tumor 2–5 cm and/or limited lymph-node involvement."], fr: ["Plus grand ou quelques ganglions", "Tumeur 2–5 cm et/ou atteinte ganglionnaire limitée."] },
    { n: "III", color: "from-orange-500 to-amber-500", w: "78%", en: ["Locally advanced", "Larger, more lymph nodes, or skin/chest-wall involvement."], fr: ["Localement avancé", "Plus grand, plus de ganglions, ou atteinte de la peau/paroi."] },
    { n: "IV", color: "from-rose-500 to-red-600", w: "100%", en: ["Metastatic", "Spread to distant organs (bones, liver, lungs, brain)."], fr: ["Métastatique", "Propagation à des organes distants (os, foie, poumons, cerveau)."] },
  ];

  const types = [
    { en: ["DCIS (ductal carcinoma in situ)", "The earliest, non-invasive form — cells confined to the milk duct. Stage 0."], fr: ["CCIS (carcinome canalaire in situ)", "La forme la plus précoce, non invasive — cellules confinées au canal. Stade 0."] },
    { en: ["Invasive ductal carcinoma (IDC)", "The most common type (~80%). Starts in a duct and grows into nearby tissue."], fr: ["Carcinome canalaire infiltrant (CCI)", "Le type le plus fréquent (~80%). Naît dans un canal et envahit les tissus voisins."] },
    { en: ["Invasive lobular carcinoma (ILC)", "About 10%. Starts in the milk-producing lobules; can be harder to feel."], fr: ["Carcinome lobulaire infiltrant (CLI)", "Environ 10%. Naît dans les lobules ; parfois plus difficile à palper."] },
    { en: ["Triple-negative (TNBC)", "ER-, PR- and HER2-negative. More aggressive; treated mainly with chemotherapy."], fr: ["Triple négatif (TNBC)", "ER-, PR- et HER2-négatif. Plus agressif ; traité surtout par chimiothérapie."] },
    { en: ["HER2-positive", "Extra HER2 protein drives growth — but responds to targeted HER2 therapies."], fr: ["HER2-positif", "Un excès de protéine HER2 stimule la croissance — mais répond aux thérapies ciblées HER2."] },
    { en: ["Inflammatory breast cancer", "Rare and fast-growing; the breast looks red and swollen rather than a lump."], fr: ["Cancer du sein inflammatoire", "Rare et à croissance rapide ; le sein paraît rouge et enflé plutôt qu'une masse."] },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-12">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-200 px-4 py-1.5 rounded-full text-sm font-medium">
          <Layers className="h-4 w-4" />
          {fr ? "Comprendre · types & stades" : "Understand · types & stages"}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white leading-tight">
          {fr ? "Types et stades du cancer du sein" : "Types & stages of breast cancer"}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
          {fr
            ? "« Stade » indique l'étendue du cancer ; « type » indique quelles cellules sont touchées. Plus c'est détecté tôt, meilleur est le pronostic."
            : "“Stage” describes how far the cancer has spread; “type” describes which cells are involved. The earlier it's found, the better the outlook."}
        </p>
        <div className="flex justify-center"><ReviewedNote /></div>
      </header>

      {/* Stages ladder */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Layers className="h-6 w-6 text-rose-500" /> {fr ? "Les stades (0 → IV)" : "The stages (0 → IV)"}
        </h2>
        <div className="space-y-3">
          {stages.map((s) => {
            const t = fr ? s.fr : s.en;
            return (
              <div key={s.n} className="flex items-center gap-4">
                <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center font-bold text-lg shadow-lg`}>
                  {s.n}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-sm">{fr ? "Stade " : "Stage "}{s.n} · {t[0]}</h3>
                  </div>
                  <div className="h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden mb-1">
                    <div className={`h-full rounded-full bg-gradient-to-r ${s.color}`} style={{ width: s.w }} />
                  </div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{t[1]}</p>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-zinc-400">
          {fr
            ? "Le stade dépend de la taille (T), des ganglions (N) et des métastases (M) — le système TNM."
            : "Stage is based on tumor size (T), lymph nodes (N) and metastasis (M) — the TNM system."}
        </p>
      </section>

      {/* Types */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Microscope className="h-6 w-6 text-rose-500" /> {fr ? "Les types les plus courants" : "The most common types"}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {types.map((ty, i) => {
            const t = fr ? ty.fr : ty.en;
            return (
              <Card key={i} className="p-5 border-rose-100 dark:border-rose-950">
                <h3 className="font-bold text-sm mb-1">{t[0]}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{t[1]}</p>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white p-6 md:p-8 text-center space-y-3">
        <p className="text-lg font-semibold">
          {fr ? "Détecté au stade le plus précoce, le cancer du sein se guérit dans plus de 90 % des cas." : "Caught at the earliest stage, breast cancer is curable in more than 90% of cases."}
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-1">
          <Link href="/check"><Button className="bg-white text-rose-600 hover:bg-rose-50 rounded-full px-6">{fr ? "Auto-examen 3D" : "3D self-exam"}</Button></Link>
          <Link href="/diagnosed"><Button variant="outline" className="rounded-full px-6 border-white/40 text-white hover:bg-white/10">{fr ? "Je viens d'être diagnostiquée" : "I've just been diagnosed"}</Button></Link>
        </div>
      </section>

      <p className="text-center text-xs text-zinc-400 flex items-center justify-center gap-1.5">
        <BookOpen className="h-3.5 w-3.5" />
        {fr
          ? "Sources : American Cancer Society, National Breast Cancer Foundation, NCI. Contenu éducatif — pas un avis médical."
          : "Sources: American Cancer Society, National Breast Cancer Foundation, NCI. Educational content — not medical advice."}
      </p>
    </div>
  );
}
