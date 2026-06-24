"use client";

import { useMemo, useState } from "react";
import { useLang } from "@/lib/language";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope, Calculator, FileText, ShieldAlert, Copy, Check, ExternalLink } from "lucide-react";

/* ---- BI-RADS reference (ACR) ---- */
const BIRADS = [
  { cat: "0", en: ["Incomplete", "Recall for additional imaging and/or prior comparison"], fr: ["Incomplet", "Imagerie complémentaire et/ou comparaison avec antériorités"], malig: "—" },
  { cat: "1", en: ["Negative", "Routine screening"], fr: ["Négatif", "Dépistage de routine"], malig: "~0%" },
  { cat: "2", en: ["Benign", "Routine screening"], fr: ["Bénin", "Dépistage de routine"], malig: "0%" },
  { cat: "3", en: ["Probably benign", "Short-interval (6-month) follow-up"], fr: ["Probablement bénin", "Surveillance rapprochée (6 mois)"], malig: "≤2%" },
  { cat: "4A", en: ["Low suspicion", "Tissue biopsy recommended"], fr: ["Faible suspicion", "Biopsie recommandée"], malig: "2–10%" },
  { cat: "4B", en: ["Moderate suspicion", "Tissue biopsy recommended"], fr: ["Suspicion modérée", "Biopsie recommandée"], malig: "10–50%" },
  { cat: "4C", en: ["High suspicion", "Tissue biopsy recommended"], fr: ["Forte suspicion", "Biopsie recommandée"], malig: "50–95%" },
  { cat: "5", en: ["Highly suggestive of malignancy", "Biopsy + treatment planning"], fr: ["Très évocateur de malignité", "Biopsie + planification thérapeutique"], malig: "≥95%" },
  { cat: "6", en: ["Known biopsy-proven malignancy", "Clinically appropriate management"], fr: ["Malignité prouvée par biopsie", "Prise en charge appropriée"], malig: "100%" },
];
const DENSITY = ["A", "B", "C", "D"];

export default function ClinicianPage() {
  const { lang } = useLang();
  const fr = lang === "fr";
  const [tab, setTab] = useState<"birads" | "risk">("birads");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-200 px-4 py-1.5 rounded-full text-sm font-medium">
          <Stethoscope className="h-4 w-4" />
          {fr ? "Pour les professionnels de santé" : "For healthcare professionals"}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white leading-tight">
          {fr ? "Aide à la décision clinique" : "Clinical decision support"}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
          {fr
            ? "Des outils pour structurer le compte-rendu BI-RADS et synthétiser les facteurs de risque. Ils n'établissent aucun diagnostic."
            : "Tools to structure a BI-RADS report and summarize risk factors. They do not make any diagnosis."}
        </p>
      </header>

      <Card className="p-4 border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 flex items-start gap-3">
        <ShieldAlert className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-900 dark:text-amber-100">
          <span className="font-semibold">{fr ? "Aide à la décision — pas un dispositif de diagnostic. " : "Decision support — not a diagnostic device. "}</span>
          {fr
            ? "Ces outils n'interprètent pas d'images et ne remplacent pas le jugement clinique. Référence : ACR BI-RADS® / NCI."
            : "These tools do not interpret images and do not replace clinical judgment. Reference: ACR BI-RADS® / NCI."}
        </p>
      </Card>

      <div className="flex gap-2 justify-center">
        <Button variant={tab === "birads" ? "default" : "outline"} onClick={() => setTab("birads")} className={`rounded-full ${tab === "birads" ? "bg-indigo-600 hover:bg-indigo-700" : "border-indigo-200"}`}>
          <FileText className="me-2 h-4 w-4" /> {fr ? "Compte-rendu BI-RADS" : "BI-RADS report"}
        </Button>
        <Button variant={tab === "risk" ? "default" : "outline"} onClick={() => setTab("risk")} className={`rounded-full ${tab === "risk" ? "bg-indigo-600 hover:bg-indigo-700" : "border-indigo-200"}`}>
          <Calculator className="me-2 h-4 w-4" /> {fr ? "Profil de risque" : "Risk profile"}
        </Button>
      </div>

      {tab === "birads" ? <BiRadsBuilder fr={fr} /> : <RiskProfiler fr={fr} />}
    </div>
  );
}

/* ---------------- BI-RADS structured report builder ---------------- */
function BiRadsBuilder({ fr }: { fr: boolean }) {
  const [cat, setCat] = useState("2");
  const [density, setDensity] = useState("B");
  const [side, setSide] = useState<"R" | "L" | "B">("R");
  const [finding, setFinding] = useState("");
  const [copied, setCopied] = useState(false);

  const entry = BIRADS.find((b) => b.cat === cat)!;
  const sideLabel = fr
    ? { R: "Sein droit", L: "Sein gauche", B: "Bilatéral" }[side]
    : { R: "Right breast", L: "Left breast", B: "Bilateral" }[side];

  const report = useMemo(() => {
    const e = fr ? entry.fr : entry.en;
    const lines = fr
      ? [
          `COMPTE-RENDU DE MAMMOGRAPHIE (structuré)`,
          ``,
          `Latéralité : ${sideLabel}`,
          `Densité mammaire (ACR) : ${density}`,
          finding ? `Constatation : ${finding}` : null,
          ``,
          `IMPRESSION — BI-RADS ${cat} : ${e[0]}`,
          `Probabilité de malignité : ${entry.malig}`,
          `Conduite à tenir : ${e[1]}.`,
          ``,
          `(Aide à la décision — jugement clinique requis.)`,
        ]
      : [
          `MAMMOGRAPHY REPORT (structured)`,
          ``,
          `Laterality: ${sideLabel}`,
          `Breast density (ACR): ${density}`,
          finding ? `Finding: ${finding}` : null,
          ``,
          `IMPRESSION — BI-RADS ${cat}: ${e[0]}`,
          `Likelihood of malignancy: ${entry.malig}`,
          `Management: ${e[1]}.`,
          ``,
          `(Decision support — clinical judgment required.)`,
        ];
    return lines.filter((l) => l !== null).join("\n");
  }, [cat, density, side, finding, entry, fr, sideLabel]);

  function copy() {
    navigator.clipboard?.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Card className="p-5 space-y-5 border-indigo-100 dark:border-indigo-950">
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">{fr ? "Catégorie BI-RADS" : "BI-RADS category"}</p>
          <div className="grid grid-cols-3 gap-2">
            {BIRADS.map((b) => (
              <button key={b.cat} onClick={() => setCat(b.cat)} className={`h-10 rounded-lg text-sm font-bold transition ${cat === b.cat ? "bg-indigo-600 text-white shadow" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:bg-indigo-50 dark:hover:bg-zinc-700"}`}>
                {b.cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">{fr ? "Densité (ACR)" : "Density (ACR)"}</p>
          <div className="grid grid-cols-4 gap-2">
            {DENSITY.map((d) => (
              <button key={d} onClick={() => setDensity(d)} className={`h-10 rounded-lg text-sm font-bold transition ${density === d ? "bg-rose-500 text-white shadow" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:bg-rose-50 dark:hover:bg-zinc-700"}`}>
                {d}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">{fr ? "Latéralité" : "Laterality"}</p>
          <div className="grid grid-cols-3 gap-2">
            {(["R", "L", "B"] as const).map((s) => (
              <button key={s} onClick={() => setSide(s)} className={`h-10 rounded-lg text-sm font-medium transition ${side === s ? "bg-indigo-600 text-white shadow" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:bg-indigo-50 dark:hover:bg-zinc-700"}`}>
                {fr ? { R: "Droit", L: "Gauche", B: "Bilat." }[s] : { R: "Right", L: "Left", B: "Bilat." }[s]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">{fr ? "Constatation (optionnel)" : "Finding (optional)"}</p>
          <input
            value={finding}
            onChange={(e) => setFinding(e.target.value)}
            placeholder={fr ? "ex. masse spiculée 12 mm, QSE" : "e.g. 12 mm spiculated mass, UOQ"}
            className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm"
          />
        </div>
      </Card>

      <Card className="p-5 border-indigo-100 dark:border-indigo-950 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold">{fr ? "Compte-rendu généré" : "Generated report"}</h3>
          <Button size="sm" variant="outline" onClick={copy} className="rounded-full border-indigo-200 h-8">
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            <span className="ms-1 text-xs">{copied ? (fr ? "Copié" : "Copied") : (fr ? "Copier" : "Copy")}</span>
          </Button>
        </div>
        <pre className="flex-1 whitespace-pre-wrap text-xs leading-relaxed bg-zinc-50 dark:bg-zinc-950 rounded-lg p-4 border border-zinc-100 dark:border-zinc-800 font-mono text-zinc-700 dark:text-zinc-200">
{report}
        </pre>
      </Card>
    </div>
  );
}

/* ---------------- Risk-factor profiler ---------------- */
function RiskProfiler({ fr }: { fr: boolean }) {
  const [age, setAge] = useState(45);
  const [relatives, setRelatives] = useState(0);
  const [menarche, setMenarche] = useState("12-13");
  const [firstBirth, setFirstBirth] = useState("<25");
  const [biopsy, setBiopsy] = useState(false);
  const [atypia, setAtypia] = useState(false);
  const [dense, setDense] = useState(false);
  const [brca, setBrca] = useState(false);

  // Transparent, qualitative point model (educational — NOT the validated NCI/Tyrer-Cuzick tool).
  const score = useMemo(() => {
    let s = 0;
    if (age >= 50) s += 2; else if (age >= 40) s += 1;
    s += relatives * 2;
    if (menarche === "<12") s += 1;
    if (firstBirth === ">30" || firstBirth === "none") s += 1;
    if (biopsy) s += 1;
    if (atypia) s += 3;
    if (dense) s += 1;
    if (brca) s += 6;
    return s;
  }, [age, relatives, menarche, firstBirth, biopsy, atypia, dense, brca]);

  const tier = score >= 6 ? "high" : score >= 3 ? "moderate" : "average";
  const tierData = {
    average: {
      color: "from-emerald-500 to-green-500",
      en: ["Average risk", "Mammography per age guidelines (e.g. ACS: yearly 45–54). Breast awareness; report changes."],
      fr: ["Risque moyen", "Mammographie selon l'âge (ex. ACS : annuelle 45–54). Surveillance ; signaler tout changement."],
    },
    moderate: {
      color: "from-amber-500 to-orange-500",
      en: ["Above-average risk", "Discuss earlier/annual mammography and supplemental imaging. Consider formal risk modeling."],
      fr: ["Risque au-dessus de la moyenne", "Discuter mammographie annuelle/précoce et imagerie complémentaire. Envisager une modélisation formelle du risque."],
    },
    high: {
      color: "from-rose-500 to-red-500",
      en: ["High risk", "Consider annual MRI + mammogram, often from age 30, and genetic counseling referral."],
      fr: ["Risque élevé", "Envisager IRM + mammographie annuelles, souvent dès 30 ans, et orientation en conseil génétique."],
    },
  }[tier];
  const td = fr ? tierData.fr : tierData.en;

  const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="flex items-center justify-between gap-4 py-2 border-b border-zinc-100 dark:border-zinc-800">
      <span className="text-sm text-zinc-600 dark:text-zinc-300">{label}</span>
      {children}
    </div>
  );
  const seg = (active: boolean) => `px-3 py-1.5 rounded-lg text-sm transition ${active ? "bg-indigo-600 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"}`;

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Card className="p-5 space-y-1 border-indigo-100 dark:border-indigo-950">
        <Row label={fr ? "Âge" : "Age"}>
          <span className="flex items-center gap-2">
            <input type="range" min={25} max={80} value={age} onChange={(e) => setAge(+e.target.value)} className="accent-indigo-600" />
            <span className="font-bold text-sm w-8 text-end">{age}</span>
          </span>
        </Row>
        <Row label={fr ? "Parentes 1er degré atteintes" : "1st-degree relatives affected"}>
          <div className="flex gap-1">
            {[0, 1, 2].map((n) => (
              <button key={n} onClick={() => setRelatives(n)} className={seg(relatives === n)}>{n === 2 ? "2+" : n}</button>
            ))}
          </div>
        </Row>
        <Row label={fr ? "Âge des 1res règles" : "Age at menarche"}>
          <div className="flex gap-1">
            {["<12", "12-13", "14+"].map((m) => (
              <button key={m} onClick={() => setMenarche(m)} className={seg(menarche === m)}>{m}</button>
            ))}
          </div>
        </Row>
        <Row label={fr ? "Âge au 1er enfant" : "Age at first birth"}>
          <div className="flex gap-1">
            {["<25", ">30", "none"].map((b) => (
              <button key={b} onClick={() => setFirstBirth(b)} className={seg(firstBirth === b)}>{b === "none" ? (fr ? "aucun" : "none") : b}</button>
            ))}
          </div>
        </Row>
        {[
          { v: biopsy, set: setBiopsy, l: fr ? "Biopsie antérieure" : "Prior biopsy" },
          { v: atypia, set: setAtypia, l: fr ? "Hyperplasie atypique" : "Atypical hyperplasia" },
          { v: dense, set: setDense, l: fr ? "Seins denses (C/D)" : "Dense breasts (C/D)" },
          { v: brca, set: setBrca, l: fr ? "BRCA1/2 ou syndrome" : "BRCA1/2 or syndrome" },
        ].map((x) => (
          <Row key={x.l} label={x.l}>
            <button onClick={() => x.set(!x.v)} className={seg(x.v)}>{x.v ? (fr ? "Oui" : "Yes") : (fr ? "Non" : "No")}</button>
          </Row>
        ))}
      </Card>

      <Card className="p-5 border-indigo-100 dark:border-indigo-950 flex flex-col">
        <div className={`rounded-xl bg-gradient-to-br ${tierData.color} text-white p-5 mb-4`}>
          <p className="text-xs uppercase tracking-wider opacity-90">{fr ? "Profil de risque (estimation)" : "Risk profile (estimate)"}</p>
          <p className="text-2xl font-bold">{td[0]}</p>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">{td[1]}</p>
        <p className="text-xs text-zinc-400 mt-auto">
          {fr
            ? "Estimation pédagogique à partir de facteurs de risque — ce n'est PAS l'outil validé. Pour une estimation validée, utilisez l'outil du NCI ou Tyrer-Cuzick (IBIS)."
            : "Educational estimate from risk factors — this is NOT the validated tool. For a validated estimate use the NCI tool or Tyrer-Cuzick (IBIS)."}
        </p>
        <a href="https://bcrisktool.cancer.gov/" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-300 hover:underline">
          <ExternalLink className="h-3 w-3" /> NCI Breast Cancer Risk Assessment Tool
        </a>
      </Card>
    </div>
  );
}
