"use client";

import { useLang } from "@/lib/language";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Eye } from "lucide-react";
import Link from "next/link";
import { ReviewedNote } from "@/components/ReviewedNote";

/* Original, tasteful illustrations of the 12 warning signs, drawn on a soft circle
   (inspired by the globally-recognized "know your signs" visual format). */
function SignArt({ id }: { id: number }) {
  const base = (
    <>
      <circle cx="50" cy="50" r="34" fill="#fde4ee" />
      <circle cx="50" cy="50" r="34" fill="none" stroke="#f9a8c4" strokeWidth="1.5" />
    </>
  );
  const nip = <circle cx="50" cy="50" r="3.5" fill="#e6739f" />;
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {base}
      {id === 1 && <circle cx="62" cy="40" r="6" fill="#be123c" />}{/* hard lump */}
      {id === 2 && <path d="M50 16 q 6 12 -2 18 q -4 -8 2 -18 Z" fill="#e11d48" />}{/* dimple */}
      {id === 3 && <><g fill="#b45309">{[...Array(6)].map((_, i) => <circle key={i} cx={50 + Math.cos(i) * 5} cy={50 + Math.sin(i * 2) * 5} r="1.3" />)}</g>{nip}</>}{/* nipple crust */}
      {id === 4 && <><circle cx="50" cy="50" r="34" fill="#fecaca" /><circle cx="50" cy="50" r="34" fill="none" stroke="#ef4444" strokeWidth="2" />{nip}</>}{/* red / hot */}
      {id === 5 && <><path d="M50 53 q -3 8 0 12 q 3 -4 0 -12 Z" fill="#60a5fa" />{nip}</>}{/* fluid / discharge */}
      {id === 6 && <><path d="M30 38 q 12 6 0 14" fill="none" stroke="#9f1239" strokeWidth="2.5" />{nip}</>}{/* skin sunken */}
      {id === 7 && <><path d="M50 16 q 14 0 18 14 q -10 -4 -18 -2 q -4 -8 0 -12 Z" fill="#fbcfe1" stroke="#e11d48" strokeWidth="1.5" /><circle cx="60" cy="24" r="4" fill="#be123c" /></>}{/* visible bump */}
      {id === 8 && <><path d="M30 64 q 8 -10 18 -6 q 8 4 16 -4" fill="none" stroke="#6d28d9" strokeWidth="2" />{nip}</>}{/* growing vein */}
      {id === 9 && <><circle cx="50" cy="50" r="6" fill="none" stroke="#e6739f" strokeWidth="2" /><circle cx="50" cy="50" r="2.5" fill="#9d174d" /></>}{/* inverted nipple */}
      {id === 10 && <><circle cx="50" cy="52" r="40" fill="none" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3 3" />{nip}</>}{/* shape / size change */}
      {id === 11 && <><g fill="#d97706" opacity="0.8">{[...Array(13)].map((_, i) => <circle key={i} cx={36 + (i % 4) * 9} cy={38 + Math.floor(i / 4) * 8} r="1.6" />)}</g></>}{/* orange-peel texture */}
      {id === 12 && <><circle cx="58" cy="44" r="5" fill="none" stroke="#9f1239" strokeWidth="1.5" strokeDasharray="2 2" /><circle cx="40" cy="58" r="7" fill="none" stroke="#71717a" strokeWidth="2" /><line x1="45" y1="63" x2="50" y2="68" stroke="#71717a" strokeWidth="2" />{nip}</>}{/* invisible lump - feel it */}
    </svg>
  );
}

export default function SignsPage() {
  const { lang } = useLang();
  const fr = lang === "fr";

  const signs = [
    { en: ["Thick area / hard lump", "A new lump or thickening in the breast or armpit."], fr: ["Zone épaisse / masse dure", "Une nouvelle masse ou un épaississement dans le sein ou l'aisselle."] },
    { en: ["Dimple", "A dent or pulling-in of the skin."], fr: ["Fossette", "Un creux ou un repli de la peau."] },
    { en: ["Nipple crust", "Crusting, scaling or a rash on the nipple."], fr: ["Croûte du mamelon", "Croûtes, desquamation ou éruption sur le mamelon."] },
    { en: ["Red or hot skin", "Skin that is red, warm or inflamed."], fr: ["Peau rouge ou chaude", "Peau rouge, chaude ou enflammée."] },
    { en: ["Nipple discharge", "New fluid, especially clear or bloody."], fr: ["Écoulement du mamelon", "Un nouvel écoulement, surtout clair ou sanglant."] },
    { en: ["Skin sunken", "An area of skin pulled inward."], fr: ["Peau enfoncée", "Une zone de peau tirée vers l'intérieur."] },
    { en: ["Visible bump", "A lump you can see on the surface."], fr: ["Bosse visible", "Une masse visible à la surface."] },
    { en: ["Growing vein", "A new, unusually prominent vein."], fr: ["Veine apparente", "Une veine nouvelle, anormalement visible."] },
    { en: ["Inverted nipple", "A nipple newly turned inward."], fr: ["Mamelon rétracté", "Un mamelon récemment rentré vers l'intérieur."] },
    { en: ["Change in size/shape", "One breast looks different from before."], fr: ["Changement de taille/forme", "Un sein semble différent d'avant."] },
    { en: ["Orange-peel skin", "Skin texture like the peel of an orange."], fr: ["Peau d'orange", "Une texture de peau comme une peau d'orange."] },
    { en: ["Invisible lump", "A lump you feel but cannot see."], fr: ["Masse non visible", "Une masse que l'on sent mais que l'on ne voit pas."] },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-10">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-200 px-4 py-1.5 rounded-full text-sm font-medium">
          <Eye className="h-4 w-4" />
          {fr ? "Connaître les signes · sauver des vies" : "Know the signs · save lives"}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white leading-tight">
          {fr ? "Les 12 signes du cancer du sein" : "The 12 signs of breast cancer"}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
          {fr
            ? "Un cancer du sein ne se manifeste pas que par une masse. Voici 12 changements à connaître — si vous en remarquez un, consultez un médecin."
            : "Breast cancer isn't only a lump. Here are 12 changes to know — if you notice any of them, see a doctor."}
        </p>
        <div className="flex justify-center"><ReviewedNote /></div>
      </header>

      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {signs.map((s, i) => {
          const t = fr ? s.fr : s.en;
          return (
            <Card key={i} className="p-4 text-center border-rose-100 dark:border-rose-950 hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <div className="w-20 h-20 mx-auto mb-3">
                <SignArt id={i + 1} />
              </div>
              <h2 className="font-bold text-sm mb-1">{t[0]}</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{t[1]}</p>
            </Card>
          );
        })}
      </section>

      <Card className="p-6 border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-bold">{fr ? "Un signe ne veut pas dire cancer" : "A sign doesn't mean cancer"}</h3>
            <p className="text-sm text-amber-900 dark:text-amber-100">
              {fr
                ? "La plupart des changements ne sont pas un cancer. Mais seul un médecin peut le confirmer — ne tardez pas à consulter pour tout changement nouveau ou persistant."
                : "Most changes are not cancer. But only a doctor can confirm — don't wait to get any new or lasting change checked."}
            </p>
          </div>
        </div>
      </Card>

      <section className="flex flex-wrap justify-center gap-3">
        <Link href="/check">
          <Button size="lg" className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-8 h-12">
            {fr ? "Apprendre l'auto-examen 3D" : "Learn the 3D self-exam"}
          </Button>
        </Link>
        <Link href="/visual">
          <Button size="lg" variant="outline" className="rounded-full px-8 h-12 border-rose-200 hover:bg-rose-50 dark:hover:bg-rose-950">
            {fr ? "Examen visuel à la caméra" : "Camera visual check"}
          </Button>
        </Link>
      </section>

      <p className="text-center text-xs text-zinc-400 max-w-2xl mx-auto">
        {fr
          ? "Contenu éducatif aligné sur les campagnes internationales de sensibilisation (Know Your Lemons, CoppaFeel!, Breast Cancer Now). Ne remplace pas un avis médical."
          : "Educational content aligned with international awareness campaigns (Know Your Lemons, CoppaFeel!, Breast Cancer Now). Not a substitute for medical advice."}
      </p>
    </div>
  );
}
