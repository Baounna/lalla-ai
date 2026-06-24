"use client";

import { useLang } from "@/lib/language";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShieldCheck, Sparkles, Cpu, BookOpen, Lock } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const { lang } = useLang();
  const fr = lang === "fr";

  const principles = [
    { icon: Heart, en: ["The woman first", "Built for real people, not imaginary users — warm, simple, and judgment-free."], fr: ["La femme d'abord", "Conçu pour de vraies personnes — chaleureux, simple, sans jugement."] },
    { icon: ShieldCheck, en: ["Educate, never diagnose", "Lalla explains and guides, and always points to a doctor. It never claims to diagnose."], fr: ["Éduquer, jamais diagnostiquer", "Lalla explique et guide, et oriente toujours vers un médecin. Elle ne diagnostique jamais."] },
    { icon: Lock, en: ["Privacy by design", "No sign-up, no accounts. The camera and pose AI run on your device.", ], fr: ["Confidentialité par conception", "Pas d'inscription, pas de compte. La caméra et l'IA fonctionnent sur votre appareil."] },
    { icon: BookOpen, en: ["Grounded in evidence", "Content aligned with ACS, WHO, BI-RADS (ACR) and NCI guidance, with sources cited."], fr: ["Fondé sur les preuves", "Contenu aligné sur l'ACS, l'OMS, BI-RADS (ACR) et le NCI, sources citées."] },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 space-y-10">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-200 px-4 py-1.5 rounded-full text-sm font-medium">
          <Sparkles className="h-4 w-4" /> {fr ? "À propos" : "About"}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white leading-tight">
          {fr ? "À propos de Lalla AI" : "About Lalla AI"}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300">
          {fr
            ? "Rendre les conseils sur la santé du sein clairs, privés et accessibles à chaque femme — partout."
            : "Making breast-health guidance clear, private, and accessible to every woman — everywhere."}
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold">{fr ? "Notre mission" : "Our mission"}</h2>
        <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
          {fr
            ? "Le cancer du sein est le cancer le plus fréquent chez les femmes — environ 1 sur 8 au cours de sa vie — et la survie dépasse 90 % lorsqu'il est détecté tôt. Pourtant, les conseils qui sauvent des vies restent souvent enfermés dans un langage clinique intimidant. Lalla AI transforme ces conseils en une expérience chaleureuse et interactive : comprendre, s'auto-examiner et savoir quand consulter."
            : "Breast cancer is the most common cancer in women — about 1 in 8 in her lifetime — and survival is over 90% when caught early. Yet the guidance that saves lives is often locked behind intimidating clinical language. Lalla AI turns that guidance into a warm, interactive experience: understand, self-examine, and know when to see a doctor."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold">{fr ? "Ce que c'est — et ce que ce n'est pas" : "What it is — and what it isn't"}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Card className="p-5 border-emerald-100 dark:border-emerald-950 bg-emerald-50/50 dark:bg-emerald-950/20">
            <h3 className="font-semibold mb-2 text-emerald-700 dark:text-emerald-300">{fr ? "C'est" : "It is"}</h3>
            <ul className="text-sm text-zinc-600 dark:text-zinc-300 space-y-1.5">
              {(fr
                ? ["Un compagnon éducatif", "Un guide d'auto-examen (3D + caméra)", "Une aide à comprendre le dépistage", "Un soutien chaleureux et privé"]
                : ["An educational companion", "A self-exam guide (3D + camera)", "Help understanding screening", "Warm, private support"]
              ).map((x) => <li key={x} className="flex gap-2"><span className="text-emerald-500">✓</span>{x}</li>)}
            </ul>
          </Card>
          <Card className="p-5 border-rose-100 dark:border-rose-950 bg-rose-50/50 dark:bg-rose-950/20">
            <h3 className="font-semibold mb-2 text-rose-700 dark:text-rose-300">{fr ? "Ce n'est pas" : "It is not"}</h3>
            <ul className="text-sm text-zinc-600 dark:text-zinc-300 space-y-1.5">
              {(fr
                ? ["Un dispositif de diagnostic", "Un détecteur de cancer", "Un remplacement du médecin", "Un avis médical"]
                : ["A diagnostic device", "A cancer detector", "A replacement for your doctor", "Medical advice"]
              ).map((x) => <li key={x} className="flex gap-2"><span className="text-rose-500">✕</span>{x}</li>)}
            </ul>
          </Card>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold">{fr ? "Nos principes" : "Our principles"}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {principles.map((p) => {
            const t = fr ? p.fr : p.en;
            return (
              <Card key={t[0]} className="p-5 border-rose-100 dark:border-rose-950">
                <p.icon className="h-6 w-6 text-rose-500 mb-2" />
                <h3 className="font-semibold mb-1">{t[0]}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{t[1]}</p>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Cpu className="h-6 w-6 text-rose-500" /> {fr ? "La technologie" : "The technology"}</h2>
        <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
          {fr
            ? "Lalla réunit un guide d'auto-examen 3D (Three.js), une IA de détection de posture sur appareil (MediaPipe), un simulateur de densité mammographique, un compagnon IA, et même un vrai réseau de neurones convolutif exécuté dans votre navigateur (ONNX). Le tout construit avec Next.js et déployé sur Vercel."
            : "Lalla brings together a 3D self-exam guide (Three.js), on-device pose-detection AI (MediaPipe), a mammogram-density simulator, an AI companion, and even a real convolutional neural network running in your browser (ONNX). Built with Next.js and deployed on Vercel."}
        </p>
        <p className="text-sm text-zinc-400">
          {fr ? "Né d'un projet de hackathon « Code for Health », repensé pour les femmes du monde entier." : "Started as a “Code for Health” hackathon project, rebuilt for women everywhere."}
        </p>
      </section>

      <Card className="p-6 border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 text-center">
        <p className="text-sm text-amber-900 dark:text-amber-100">
          {fr
            ? "Lalla AI est un outil éducatif. Il ne pose pas de diagnostic et ne remplace pas un professionnel de santé. Consultez toujours un médecin pour tout changement."
            : "Lalla AI is an educational tool. It does not diagnose and does not replace a healthcare professional. Always see a doctor for any change."}
        </p>
      </Card>

      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/check"><Button size="lg" className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-8 h-12">{fr ? "Commencer" : "Get started"}</Button></Link>
        <Link href="/privacy"><Button size="lg" variant="outline" className="rounded-full px-8 h-12 border-rose-200">{fr ? "Confidentialité" : "Privacy"}</Button></Link>
      </div>
    </div>
  );
}
