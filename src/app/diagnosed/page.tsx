"use client";

import { useState } from "react";
import { useLang } from "@/lib/language";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Heart,
  Wind,
  FileText,
  Layers,
  Users,
  UserCheck,
  CalendarHeart,
  Stethoscope,
  Scissors,
  Radiation,
  Microscope,
  HeartHandshake,
  ListChecks,
  Printer,
  BookOpen,
  Check,
} from "lucide-react";

export default function DiagnosedPage() {
  const { lang } = useLang();
  const fr = lang === "fr";
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  const steps = [
    {
      icon: Wind,
      t: fr ? "Respirez — vous avez le temps" : "Take a breath — you have time",
      d: fr
        ? "Un diagnostic n'est pas une urgence à décider en un jour. Vous avez le temps de comprendre et de choisir."
        : "A diagnosis is rarely an emergency to decide in a day. You have time to understand and to choose.",
    },
    {
      icon: FileText,
      t: fr ? "Obtenez votre compte-rendu complet" : "Get your full pathology report",
      d: fr
        ? "Demandez une copie de votre rapport d'anatomopathologie. Il décrit votre type exact de cancer."
        : "Ask for a copy of your pathology report. It describes your exact type of cancer.",
    },
    {
      icon: Layers,
      t: fr ? "Comprenez votre type et votre stade" : "Understand your type & stage",
      d: fr
        ? "Type, grade, stade et statut hormonal/HER2 guident tout le traitement."
        : "Type, grade, stage, and hormone/HER2 status guide your whole treatment.",
    },
    {
      icon: Users,
      t: fr ? "Constituez votre équipe soignante" : "Build your care team",
      d: fr
        ? "Vous serez entourée d'un oncologue, d'un chirurgien et d'un radiothérapeute qui travaillent ensemble."
        : "You'll be supported by an oncologist, a surgeon, and a radiation specialist working together.",
    },
    {
      icon: UserCheck,
      t: fr ? "Envisagez un deuxième avis" : "Consider a second opinion",
      d: fr
        ? "Demander un autre avis est normal et bien vu. Il peut confirmer le plan ou ouvrir d'autres options."
        : "Asking for another opinion is normal and welcomed. It can confirm the plan or open new options.",
    },
    {
      icon: CalendarHeart,
      t: fr ? "Faites-vous accompagner aux rendez-vous" : "Bring someone to appointments",
      d: fr
        ? "Une personne de confiance peut prendre des notes et poser les questions que vous oubliez."
        : "A trusted person can take notes and ask the questions you forget.",
    },
  ];

  const team = [
    {
      icon: Stethoscope,
      t: fr ? "Oncologue médical" : "Medical oncologist",
      d: fr ? "Pilote la chimiothérapie et les traitements généraux." : "Leads chemotherapy and systemic treatments.",
    },
    {
      icon: Scissors,
      t: fr ? "Chirurgien du sein" : "Breast surgeon",
      d: fr ? "Réalise la tumorectomie ou la mastectomie." : "Performs the lumpectomy or mastectomy.",
    },
    {
      icon: Radiation,
      t: fr ? "Radiothérapeute" : "Radiation oncologist",
      d: fr ? "Planifie et délivre la radiothérapie." : "Plans and delivers radiation therapy.",
    },
    {
      icon: Microscope,
      t: fr ? "Anatomopathologiste" : "Pathologist",
      d: fr ? "Analyse vos tissus pour identifier le cancer." : "Studies your tissue to identify the cancer.",
    },
    {
      icon: HeartHandshake,
      t: fr ? "Infirmière en sénologie" : "Breast care nurse",
      d: fr ? "Vous guide et vous soutient à chaque étape." : "Guides and supports you at every step.",
    },
  ];

  const questionGroups = [
    {
      group: fr ? "À propos de mon diagnostic" : "About my diagnosis",
      questions: fr
        ? [
            "Quel type de cancer du sein ai-je exactement ?",
            "À quel stade en suis-je, et qu'est-ce que cela signifie ?",
            "Quel est le grade de la tumeur ?",
            "Quel est mon statut hormonal (RE/RP) et HER2 ?",
          ]
        : [
            "What exact type of breast cancer do I have?",
            "What stage is it, and what does that mean?",
            "What is the grade of the tumor?",
            "What is my hormone receptor (ER/PR) and HER2 status?",
          ],
    },
    {
      group: fr ? "Traitement" : "Treatment",
      questions: fr
        ? [
            "Quelles sont mes options de traitement ?",
            "Quels sont les risques et les effets secondaires ?",
            "Comment cela affectera-t-il ma vie quotidienne et mon travail ?",
            "Tumorectomie ou mastectomie : qu'est-ce qui me convient ?",
          ]
        : [
            "What are my treatment options?",
            "What are the risks and side effects?",
            "How will this affect my daily life and work?",
            "Lumpectomy or mastectomy — which is right for me?",
          ],
    },
    {
      group: fr ? "Pratique" : "Practical",
      questions: fr
        ? [
            "Puis-je demander un deuxième avis ?",
            "Quels sont les coûts et qu'est-ce qui est pris en charge ?",
            "Quels services de soutien sont disponibles ?",
            "Le traitement peut-il affecter ma fertilité ?",
          ]
        : [
            "Can I get a second opinion?",
            "What are the costs, and what is covered?",
            "What support services are available?",
            "Could treatment affect my fertility?",
          ],
    },
  ];

  let qIndex = 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-14 print:py-4">
      {/* Hero */}
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-200 px-4 py-1.5 rounded-full text-sm font-medium">
          <Heart className="h-4 w-4" />
          {fr ? "Nouveau diagnostic · Vous n'êtes pas seule" : "Newly diagnosed · You're not alone"}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white leading-tight">
          {fr ? "Vous venez d'être diagnostiquée ? Voici la suite" : "Just diagnosed? Here's what's next"}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
          {fr
            ? "Recevoir un diagnostic est bouleversant. Prenez les choses une étape à la fois — voici des repères calmes pour vous aider à avancer, avec confiance."
            : "Hearing a diagnosis is overwhelming. Take it one step at a time — here are calm, clear pointers to help you move forward with confidence."}
        </p>
      </header>

      {/* First steps */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Wind className="h-6 w-6 text-rose-500" />
          {fr ? "Premières étapes" : "First steps"}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {steps.map((s, i) => (
            <Card key={s.t} className="px-5 py-4 ring-rose-100 dark:ring-rose-950">
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-lg bg-rose-100 dark:bg-rose-950 flex items-center justify-center text-rose-600 dark:text-rose-300 flex-shrink-0 relative">
                  <s.icon className="h-5 w-5" />
                  <span className="absolute -top-2 -end-2 w-5 h-5 rounded-full bg-rose-500 text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">
                    {s.t}
                    {i === 2 && (
                      <Link href="/types" className="ms-2 text-xs font-normal text-rose-500 underline">
                        {fr ? "voir les types" : "see types"}
                      </Link>
                    )}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{s.d}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Care team */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Users className="h-6 w-6 text-rose-500" />
          {fr ? "Constituez votre équipe soignante" : "Build your care team"}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <div
              key={m.t}
              className="flex gap-3 items-start p-4 rounded-xl bg-gradient-to-br from-rose-50 to-white dark:from-rose-950/30 dark:to-zinc-900 border border-rose-100 dark:border-rose-950"
            >
              <div className="w-10 h-10 rounded-lg bg-rose-100 dark:bg-rose-950 flex items-center justify-center text-rose-600 dark:text-rose-300 flex-shrink-0">
                <m.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{m.t}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{m.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Questions checklist */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ListChecks className="h-6 w-6 text-rose-500" />
            {fr ? "Questions à poser à votre médecin" : "Questions to ask your doctor"}
          </h2>
          <Button
            onClick={() => window.print()}
            variant="outline"
            className="rounded-full border-rose-200 hover:bg-rose-50 dark:hover:bg-rose-950 print:hidden"
          >
            <Printer className="me-2 h-4 w-4" />
            {fr ? "Imprimer / Enregistrer en PDF" : "Print / Save as PDF"}
          </Button>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {fr
            ? "Cochez ce qui vous concerne, puis imprimez la liste pour votre prochain rendez-vous."
            : "Tick the ones that matter to you, then print the list for your next appointment."}
        </p>

        <div className="space-y-5">
          {questionGroups.map((g) => (
            <Card key={g.group} className="px-5 py-4 ring-rose-100 dark:ring-rose-950">
              <h3 className="font-bold text-rose-700 dark:text-rose-300 mb-1">{g.group}</h3>
              <ul className="space-y-2">
                {g.questions.map((q) => {
                  const idx = qIndex++;
                  const isChecked = checked.has(idx);
                  return (
                    <li key={idx}>
                      <button
                        onClick={() => toggle(idx)}
                        className="flex items-start gap-3 text-start w-full group"
                      >
                        <span
                          className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            isChecked
                              ? "bg-rose-500 border-rose-500 text-white"
                              : "border-rose-300 dark:border-rose-800 group-hover:border-rose-500"
                          }`}
                        >
                          {isChecked && <Check className="h-3 w-3" />}
                        </span>
                        <span
                          className={`text-sm ${
                            isChecked
                              ? "line-through text-zinc-400"
                              : "text-zinc-700 dark:text-zinc-200"
                          }`}
                        >
                          {q}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* Sources */}
      <section className="border-t border-rose-100 dark:border-rose-950 pt-6 print:hidden">
        <h3 className="text-sm font-semibold flex items-center gap-2 text-zinc-500 mb-2">
          <BookOpen className="h-4 w-4" /> {fr ? "Sources & références" : "Sources & references"}
        </h3>
        <p className="text-xs text-zinc-400 leading-relaxed">
          {fr
            ? "Contenu éducatif aligné sur l'American Cancer Society (ACS), Susan G. Komen et Breast Cancer Now. Ces repères ne posent pas de diagnostic et ne remplacent pas votre équipe soignante : parlez toujours de votre situation avec vos vrais médecins."
            : "Educational content aligned with the American Cancer Society (ACS), Susan G. Komen, and Breast Cancer Now. This guidance does not diagnose and does not replace your care team — always talk through your situation with your real doctors."}
        </p>
      </section>
    </div>
  );
}
