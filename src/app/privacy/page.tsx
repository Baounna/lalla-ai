"use client";

import { useLang } from "@/lib/language";
import { Card } from "@/components/ui/card";
import { Lock, Camera, MessageCircle, ClipboardCheck, Bell, BarChart3 } from "lucide-react";

export default function PrivacyPage() {
  const { lang } = useLang();
  const fr = lang === "fr";

  const items = [
    { icon: Lock, en: ["No account, no sign-up", "Lalla needs no registration, no email, and no phone number. We don't ask who you are."], fr: ["Pas de compte, pas d'inscription", "Lalla ne demande aucune inscription, e-mail ou numéro de téléphone."] },
    { icon: Camera, en: ["Camera & pose AI run on your device", "The visual self-check and pose-detection AI run entirely in your browser. No image is uploaded or stored. If you save a photo, it stays on your device."], fr: ["Caméra & IA sur votre appareil", "L'examen visuel et l'IA de posture s'exécutent entièrement dans votre navigateur. Aucune image n'est envoyée ni enregistrée. Si vous enregistrez une photo, elle reste sur votre appareil."] },
    { icon: ClipboardCheck, en: ["Quiz answers aren't stored", "Your risk-check answers are analyzed to give you guidance, then discarded. We keep no record."], fr: ["Les réponses au quiz ne sont pas conservées", "Vos réponses sont analysées pour vous guider, puis supprimées. Aucun enregistrement n'est gardé."] },
    { icon: MessageCircle, en: ["AI chat", "To answer you, your chat messages are sent to the AI provider (Google / Anthropic) that generates the reply. They are not stored by Lalla. Please don't share identifying personal details in chat."], fr: ["Chat IA", "Pour vous répondre, vos messages sont envoyés au fournisseur d'IA (Google / Anthropic) qui génère la réponse. Ils ne sont pas conservés par Lalla. Évitez de partager des données personnelles identifiantes."] },
    { icon: Bell, en: ["Reminders stay local", "Monthly reminders use your own device/calendar. Nothing is sent to us."], fr: ["Les rappels restent locaux", "Les rappels mensuels utilisent votre appareil/calendrier. Rien ne nous est envoyé."] },
    { icon: BarChart3, en: ["No tracking", "We don't sell data and we don't run advertising trackers."], fr: ["Pas de pistage", "Nous ne vendons aucune donnée et n'utilisons pas de traceurs publicitaires."] },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 space-y-8">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-200 px-4 py-1.5 rounded-full text-sm font-medium">
          <Lock className="h-4 w-4" /> {fr ? "Confidentialité" : "Privacy"}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white leading-tight">
          {fr ? "Votre vie privée" : "Your privacy"}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300">
          {fr
            ? "Lalla est conçue pour être privée par défaut. Voici exactement ce qui se passe avec vos données."
            : "Lalla is built to be private by default. Here's exactly what happens with your data."}
        </p>
      </header>

      <div className="grid gap-3">
        {items.map((it) => {
          const t = fr ? it.fr : it.en;
          return (
            <Card key={t[0]} className="p-5 border-rose-100 dark:border-rose-950 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-300 flex-shrink-0">
                <it.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{t[0]}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{t[1]}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6 border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30">
        <p className="text-sm text-amber-900 dark:text-amber-100">
          {fr
            ? "Lalla AI est un outil éducatif et ne remplace pas un avis médical. Cette page décrit nos pratiques de confidentialité en termes simples ; ce n'est pas un contrat juridique."
            : "Lalla AI is an educational tool and does not replace medical advice. This page describes our privacy practices in plain language; it is not a legal contract."}
        </p>
      </Card>

      <p className="text-center text-xs text-zinc-400">{fr ? "Dernière mise à jour : 2026" : "Last updated: 2026"}</p>
    </div>
  );
}
