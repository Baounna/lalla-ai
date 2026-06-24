"use client";

import { useLang } from "@/lib/language";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScanLine, Sparkles, ShieldCheck, Clock, Layers, Radiation, CalendarCheck, BookOpen } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const MammogramSimulator = dynamic(() => import("@/components/MammogramSimulator"), {
  ssr: false,
  loading: () => <div className="w-full min-h-[420px] rounded-2xl bg-zinc-100 dark:bg-zinc-900 animate-pulse" />,
});

export default function ScreeningPage() {
  const { lang } = useLang();
  const fr = lang === "fr";

  const expect = [
    {
      icon: ScanLine,
      t: fr ? "Une radio à faible dose" : "A low-dose X-ray",
      d: fr
        ? "La mammographie utilise une très faible dose de rayons X pour photographier l'intérieur du sein."
        : "A mammogram uses a very low dose of X-rays to take pictures of the inside of the breast.",
    },
    {
      icon: Layers,
      t: fr ? "Une légère compression" : "A brief compression",
      d: fr
        ? "Le sein est posé sur une plaque et compressé quelques secondes pour une image nette."
        : "The breast is placed on a plate and compressed for a few seconds to get a clear image.",
    },
    {
      icon: Clock,
      t: fr ? "Environ 20 minutes" : "About 20 minutes",
      d: fr
        ? "L'examen complet est rapide. La compression peut être inconfortable mais brève."
        : "The whole exam is quick. The compression can feel uncomfortable but is brief.",
    },
    {
      icon: ShieldCheck,
      t: fr ? "Des résultats fiables" : "Reliable results",
      d: fr
        ? "Un radiologue lit les images et les classe avec le score BI-RADS."
        : "A radiologist reads the images and grades them with the BI-RADS score.",
    },
  ];

  const ages = [
    { age: "40–44", en: "Optional yearly mammogram (your choice)", fr: "Mammographie annuelle optionnelle (à votre choix)" },
    { age: "45–54", en: "Mammogram every year", fr: "Mammographie chaque année" },
    { age: "55+", en: "Mammogram every 1–2 years", fr: "Mammographie tous les 1 à 2 ans" },
    { age: fr ? "Risque élevé" : "High risk", en: "MRI + mammogram yearly, often from age 30", fr: "IRM + mammographie chaque année, souvent dès 30 ans" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-14">
      {/* Hero */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-200 px-4 py-1.5 rounded-full text-sm font-medium">
          <Radiation className="h-4 w-4" />
          {fr ? "Mammographie · Dépistage par rayons X" : "Mammography · X-ray screening"}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-rose-600 to-pink-600 bg-clip-text text-transparent leading-tight">
          {fr ? "Le dépistage par mammographie" : "Mammography screening"}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
          {fr
            ? "La mammographie est l'examen de référence pour détecter un cancer du sein avant qu'il ne se sente. Voici comment ça marche — et pourquoi la densité du sein compte."
            : "A mammogram is the gold-standard test to catch breast cancer before it can be felt. Here's how it works — and why breast density matters."}
        </p>
      </section>

      {/* What is a mammogram */}
      <section className="grid gap-6 md:grid-cols-2 items-center">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ScanLine className="h-6 w-6 text-rose-500" />
            {fr ? "Qu'est-ce qu'une mammographie ?" : "What is a mammogram?"}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {fr
              ? "C'est une radiographie (rayons X) du sein. Sur l'image, la graisse apparaît sombre et le tissu dense apparaît blanc. Le radiologue cherche des masses, des micro-calcifications ou des distorsions — souvent invisibles et impalpables à ce stade."
              : "It's an X-ray of the breast. On the image, fat looks dark and dense tissue looks white. The radiologist looks for masses, micro-calcifications, or distortions — often invisible and impossible to feel at this stage."}
          </p>
          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {fr
              ? "Détecté tôt à la mammographie, le cancer du sein se guérit dans plus de 90 % des cas."
              : "When caught early on a mammogram, breast cancer is curable in more than 90% of cases."}
          </p>
        </div>
        <div className="grid gap-3">
          {expect.map((e) => (
            <div key={e.t} className="flex gap-3 items-start p-4 rounded-xl bg-white dark:bg-zinc-900 border border-rose-100 dark:border-rose-950">
              <div className="w-10 h-10 rounded-lg bg-rose-100 dark:bg-rose-950 flex items-center justify-center text-rose-600 dark:text-rose-300 flex-shrink-0">
                <e.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{e.t}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{e.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Simulator */}
      <section className="space-y-4">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-rose-400">
            <Sparkles className="h-4 w-4" /> {fr ? "Simulation interactive" : "Interactive simulation"}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">
            {fr ? "Pourquoi la densité du sein compte" : "Why breast density matters"}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
            {fr
              ? "Changez la catégorie de densité (A → D) et observez comme une même anomalie devient plus difficile à voir quand le tissu est dense. Utilisez « Localiser l'anomalie » pour la révéler."
              : "Switch the density category (A → D) and watch how the same finding becomes harder to see as tissue gets denser. Use “Locate finding” to reveal it."}
          </p>
        </div>
        <MammogramSimulator />
        <p className="text-center text-xs text-zinc-400 max-w-2xl mx-auto">
          {fr
            ? "Illustration éducative générée — ce n'est pas une vraie radiographie ni un diagnostic."
            : "Educational generated illustration — this is not a real X-ray or a diagnosis."}
        </p>
      </section>

      {/* When to get screened */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <CalendarCheck className="h-6 w-6 text-rose-500" />
          {fr ? "Quand se faire dépister ?" : "When to get screened"}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {ages.map((a) => (
            <div key={a.age} className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-rose-50 to-white dark:from-rose-950/30 dark:to-zinc-900 border border-rose-100 dark:border-rose-950">
              <span className="text-lg font-bold text-rose-600 dark:text-rose-300 min-w-[90px]">{a.age}</span>
              <span className="text-sm text-zinc-600 dark:text-zinc-300">{fr ? a.fr : a.en}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-zinc-400">
          {fr
            ? "Repères basés sur l'American Cancer Society / ACOG. Discutez toujours du calendrier qui vous convient avec votre médecin."
            : "Guidance based on the American Cancer Society / ACOG. Always discuss the right schedule for you with your doctor."}
        </p>
      </section>

      {/* CTA */}
      <section className="flex flex-wrap justify-center gap-3">
        <Link href="/check">
          <Button size="lg" className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-8 h-12">
            {fr ? "Faire l'auto-examen 3D" : "Try the 3D self-exam"}
          </Button>
        </Link>
        <Link href="/reminder">
          <Button size="lg" variant="outline" className="rounded-full px-8 h-12 border-rose-200 hover:bg-rose-50 dark:hover:bg-rose-950">
            <CalendarCheck className="me-2 h-5 w-5" />
            {fr ? "Activer un rappel" : "Set a reminder"}
          </Button>
        </Link>
      </section>

      {/* Sources */}
      <section className="border-t border-rose-100 dark:border-rose-950 pt-6">
        <h3 className="text-sm font-semibold flex items-center gap-2 text-zinc-500 mb-2">
          <BookOpen className="h-4 w-4" /> {fr ? "Sources & références" : "Sources & references"}
        </h3>
        <p className="text-xs text-zinc-400 leading-relaxed">
          {fr
            ? "Contenu éducatif aligné sur l'American Cancer Society, l'OMS, Johns Hopkins Medicine et le système BI-RADS (ACR). Lalla AI ne pose pas de diagnostic et ne remplace pas un professionnel de santé."
            : "Educational content aligned with the American Cancer Society, WHO, Johns Hopkins Medicine, and the BI-RADS system (ACR). Lalla AI does not diagnose and does not replace a healthcare professional."}
        </p>
      </section>
    </div>
  );
}
