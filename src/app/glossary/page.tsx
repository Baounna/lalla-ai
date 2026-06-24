"use client";

import { useState, useMemo } from "react";
import { useLang } from "@/lib/language";
import { Card } from "@/components/ui/card";
import { BookOpen, Search, X } from "lucide-react";

type Term = { term_en: string; term_fr: string; def_en: string; def_fr: string };

const TERMS: Term[] = [
  {
    term_en: "Benign",
    term_fr: "Bénin",
    def_en: "Not cancer. A benign lump or tumor does not spread to other parts of the body.",
    def_fr: "Non cancéreux. Une masse ou tumeur bénigne ne se propage pas à d'autres parties du corps.",
  },
  {
    term_en: "BI-RADS",
    term_fr: "BI-RADS",
    def_en: "A standardized score (0–6) radiologists use to describe mammogram findings and how suspicious they are.",
    def_fr: "Un score standardisé (0–6) utilisé par les radiologues pour décrire les résultats d'une mammographie et leur niveau de suspicion.",
  },
  {
    term_en: "Biopsy",
    term_fr: "Biopsie",
    def_en: "A procedure that removes a small sample of tissue so it can be examined under a microscope for cancer cells.",
    def_fr: "Un acte qui prélève un petit échantillon de tissu afin de l'examiner au microscope à la recherche de cellules cancéreuses.",
  },
  {
    term_en: "BRCA1 / BRCA2",
    term_fr: "BRCA1 / BRCA2",
    def_en: "Genes that normally protect against cancer. Inherited mutations in them raise the risk of breast and ovarian cancer.",
    def_fr: "Des gènes qui protègent normalement contre le cancer. Des mutations héréditaires augmentent le risque de cancer du sein et de l'ovaire.",
  },
  {
    term_en: "Breast density",
    term_fr: "Densité mammaire",
    def_en: "The amount of glandular and connective tissue versus fat in the breast. Dense breasts make mammograms harder to read.",
    def_fr: "La proportion de tissu glandulaire et conjonctif par rapport à la graisse dans le sein. Les seins denses rendent la mammographie plus difficile à lire.",
  },
  {
    term_en: "Calcifications",
    term_fr: "Calcifications",
    def_en: "Tiny calcium deposits seen on a mammogram. Most are harmless, but certain patterns can be an early sign of cancer.",
    def_fr: "De minuscules dépôts de calcium visibles à la mammographie. La plupart sont inoffensifs, mais certains aspects peuvent être un signe précoce de cancer.",
  },
  {
    term_en: "Carcinoma",
    term_fr: "Carcinome",
    def_en: "Cancer that begins in the cells lining organs or ducts. Most breast cancers are carcinomas.",
    def_fr: "Un cancer qui débute dans les cellules tapissant les organes ou les canaux. La plupart des cancers du sein sont des carcinomes.",
  },
  {
    term_en: "Chemotherapy",
    term_fr: "Chimiothérapie",
    def_en: "Drugs that kill or slow fast-growing cancer cells throughout the body, given through a vein or as pills.",
    def_fr: "Des médicaments qui détruisent ou ralentissent les cellules cancéreuses à croissance rapide dans tout le corps, administrés par voie veineuse ou en comprimés.",
  },
  {
    term_en: "DCIS (ductal carcinoma in situ)",
    term_fr: "CCIS (carcinome canalaire in situ)",
    def_en: "The earliest, non-invasive form of breast cancer, where abnormal cells stay inside the milk duct.",
    def_fr: "La forme la plus précoce et non invasive du cancer du sein, où des cellules anormales restent à l'intérieur du canal galactophore.",
  },
  {
    term_en: "Estrogen receptor (ER)",
    term_fr: "Récepteur des œstrogènes (RE)",
    def_en: "A protein on some cancer cells. ER-positive cancers grow in response to estrogen and respond to hormone therapy.",
    def_fr: "Une protéine présente sur certaines cellules cancéreuses. Les cancers RE-positifs se développent sous l'effet des œstrogènes et répondent à l'hormonothérapie.",
  },
  {
    term_en: "Grade",
    term_fr: "Grade",
    def_en: "How abnormal cancer cells look under a microscope (1–3). Higher grade cells tend to grow and spread faster.",
    def_fr: "À quel point les cellules cancéreuses paraissent anormales au microscope (1–3). Un grade élevé indique une croissance et une propagation plus rapides.",
  },
  {
    term_en: "HER2",
    term_fr: "HER2",
    def_en: "A protein that can make cancer grow faster. HER2-positive cancers can be treated with targeted drugs.",
    def_fr: "Une protéine qui peut accélérer la croissance du cancer. Les cancers HER2-positifs peuvent être traités par des médicaments ciblés.",
  },
  {
    term_en: "Hormone therapy",
    term_fr: "Hormonothérapie",
    def_en: "Treatment that blocks hormones from fueling hormone-receptor-positive breast cancer, often taken for years.",
    def_fr: "Un traitement qui empêche les hormones d'alimenter un cancer du sein à récepteurs hormonaux positifs, souvent pris pendant plusieurs années.",
  },
  {
    term_en: "In situ",
    term_fr: "In situ",
    def_en: "Latin for 'in place'. Cancer cells that have not spread beyond where they started.",
    def_fr: "Du latin « sur place ». Des cellules cancéreuses qui ne se sont pas propagées au-delà de leur point de départ.",
  },
  {
    term_en: "Invasive ductal carcinoma",
    term_fr: "Carcinome canalaire infiltrant",
    def_en: "The most common breast cancer. It starts in a milk duct and grows into the surrounding breast tissue.",
    def_fr: "Le cancer du sein le plus fréquent. Il débute dans un canal galactophore et envahit le tissu mammaire environnant.",
  },
  {
    term_en: "Invasive lobular carcinoma",
    term_fr: "Carcinome lobulaire infiltrant",
    def_en: "A breast cancer that begins in the milk-producing lobules and spreads into nearby tissue.",
    def_fr: "Un cancer du sein qui débute dans les lobules producteurs de lait et envahit les tissus voisins.",
  },
  {
    term_en: "Lump",
    term_fr: "Masse / Grosseur",
    def_en: "A swelling or thickening that can be felt in the breast. Many lumps are benign, but any new one should be checked.",
    def_fr: "Un gonflement ou un épaississement palpable dans le sein. Beaucoup sont bénins, mais toute nouvelle masse doit être examinée.",
  },
  {
    term_en: "Lumpectomy",
    term_fr: "Tumorectomie",
    def_en: "Surgery that removes the tumor and a small margin of healthy tissue, keeping most of the breast.",
    def_fr: "Une chirurgie qui retire la tumeur et une petite marge de tissu sain, en conservant la majeure partie du sein.",
  },
  {
    term_en: "Lymph node",
    term_fr: "Ganglion lymphatique",
    def_en: "Small bean-shaped glands that filter fluid and trap cells. Breast cancer can spread to nodes under the arm first.",
    def_fr: "De petites glandes en forme de haricot qui filtrent la lymphe. Le cancer du sein peut d'abord se propager aux ganglions sous le bras.",
  },
  {
    term_en: "Malignant",
    term_fr: "Malin",
    def_en: "Cancerous. A malignant tumor can invade nearby tissue and spread to other parts of the body.",
    def_fr: "Cancéreux. Une tumeur maligne peut envahir les tissus voisins et se propager à d'autres parties du corps.",
  },
  {
    term_en: "Mammogram",
    term_fr: "Mammographie",
    def_en: "A low-dose X-ray of the breast used to find cancer early, often before a lump can be felt.",
    def_fr: "Une radiographie à faible dose du sein utilisée pour détecter un cancer tôt, souvent avant qu'une masse soit palpable.",
  },
  {
    term_en: "Margins",
    term_fr: "Marges",
    def_en: "The edge of tissue removed in surgery. 'Clear' margins mean no cancer cells are found at the edge.",
    def_fr: "Le bord du tissu retiré lors de la chirurgie. Des marges « saines » signifient qu'aucune cellule cancéreuse n'est trouvée au bord.",
  },
  {
    term_en: "Mastectomy",
    term_fr: "Mastectomie",
    def_en: "Surgery that removes the whole breast. It may be recommended for larger or multiple tumors.",
    def_fr: "Une chirurgie qui retire la totalité du sein. Elle peut être recommandée pour des tumeurs plus grandes ou multiples.",
  },
  {
    term_en: "Metastasis",
    term_fr: "Métastase",
    def_en: "The spread of cancer from the breast to distant organs such as the bones, liver, lungs, or brain.",
    def_fr: "La propagation du cancer du sein vers des organes distants comme les os, le foie, les poumons ou le cerveau.",
  },
  {
    term_en: "MRI",
    term_fr: "IRM",
    def_en: "Magnetic resonance imaging. A detailed scan using magnets, sometimes added to screening for high-risk women.",
    def_fr: "Imagerie par résonance magnétique. Un examen détaillé utilisant des aimants, parfois ajouté au dépistage des femmes à haut risque.",
  },
  {
    term_en: "Oncologist",
    term_fr: "Oncologue",
    def_en: "A doctor who specializes in diagnosing and treating cancer, including planning chemotherapy and other systemic treatments.",
    def_fr: "Un médecin spécialisé dans le diagnostic et le traitement du cancer, y compris la chimiothérapie et les autres traitements généraux.",
  },
  {
    term_en: "Pathology",
    term_fr: "Anatomopathologie",
    def_en: "The study of tissue and cells to diagnose disease. The pathology report describes your exact cancer type.",
    def_fr: "L'étude des tissus et des cellules pour diagnostiquer une maladie. Le compte-rendu d'anatomopathologie décrit votre type exact de cancer.",
  },
  {
    term_en: "Prognosis",
    term_fr: "Pronostic",
    def_en: "The likely course and outcome of a disease, based on type, stage, and other factors.",
    def_fr: "L'évolution et l'issue probables d'une maladie, selon le type, le stade et d'autres facteurs.",
  },
  {
    term_en: "Progesterone receptor (PR)",
    term_fr: "Récepteur de la progestérone (RP)",
    def_en: "A protein on some cancer cells. PR-positive cancers may respond well to hormone therapy.",
    def_fr: "Une protéine présente sur certaines cellules cancéreuses. Les cancers RP-positifs peuvent bien répondre à l'hormonothérapie.",
  },
  {
    term_en: "Radiation therapy",
    term_fr: "Radiothérapie",
    def_en: "Treatment that uses targeted high-energy rays to destroy cancer cells, often after lumpectomy.",
    def_fr: "Un traitement qui utilise des rayons à haute énergie ciblés pour détruire les cellules cancéreuses, souvent après une tumorectomie.",
  },
  {
    term_en: "Radiologist",
    term_fr: "Radiologue",
    def_en: "A doctor who reads imaging tests such as mammograms, ultrasounds, and MRIs to look for abnormalities.",
    def_fr: "Un médecin qui interprète les examens d'imagerie comme les mammographies, échographies et IRM pour repérer les anomalies.",
  },
  {
    term_en: "Recurrence",
    term_fr: "Récidive",
    def_en: "The return of cancer after a period when it could not be detected, either in the breast or elsewhere.",
    def_fr: "Le retour du cancer après une période où il était indétectable, dans le sein ou ailleurs.",
  },
  {
    term_en: "Remission",
    term_fr: "Rémission",
    def_en: "A decrease in or disappearance of signs of cancer. Complete remission means no detectable cancer remains.",
    def_fr: "Une diminution ou une disparition des signes du cancer. Une rémission complète signifie qu'aucun cancer n'est détectable.",
  },
  {
    term_en: "Screening",
    term_fr: "Dépistage",
    def_en: "Testing for cancer in people without symptoms, mainly through regular mammograms, to find it early.",
    def_fr: "Le dépistage du cancer chez des personnes sans symptômes, principalement par des mammographies régulières, pour le détecter tôt.",
  },
  {
    term_en: "Sentinel node",
    term_fr: "Ganglion sentinelle",
    def_en: "The first lymph node cancer is most likely to reach. It is biopsied to check if cancer has begun to spread.",
    def_fr: "Le premier ganglion que le cancer est le plus susceptible d'atteindre. On le biopsie pour vérifier si le cancer a commencé à se propager.",
  },
  {
    term_en: "Stage",
    term_fr: "Stade",
    def_en: "How far cancer has spread, from 0 (in situ) to IV (metastatic). It guides treatment choices.",
    def_fr: "L'étendue de la propagation du cancer, du stade 0 (in situ) au stade IV (métastatique). Il oriente le choix du traitement.",
  },
  {
    term_en: "Tamoxifen",
    term_fr: "Tamoxifène",
    def_en: "A hormone therapy pill that blocks estrogen from feeding hormone-receptor-positive breast cancer.",
    def_fr: "Un comprimé d'hormonothérapie qui empêche les œstrogènes d'alimenter un cancer du sein à récepteurs hormonaux positifs.",
  },
  {
    term_en: "Triple-negative",
    term_fr: "Triple négatif",
    def_en: "Breast cancer that lacks ER, PR, and HER2. It needs chemotherapy rather than hormone or HER2-targeted drugs.",
    def_fr: "Un cancer du sein dépourvu de RE, RP et HER2. Il nécessite une chimiothérapie plutôt qu'une hormonothérapie ou un traitement anti-HER2.",
  },
  {
    term_en: "Tumor",
    term_fr: "Tumeur",
    def_en: "An abnormal mass of tissue. Tumors can be benign (not cancer) or malignant (cancer).",
    def_fr: "Une masse anormale de tissu. Les tumeurs peuvent être bénignes (non cancéreuses) ou malignes (cancéreuses).",
  },
  {
    term_en: "Ultrasound",
    term_fr: "Échographie",
    def_en: "An imaging test using sound waves, often used to tell whether a lump is a fluid cyst or a solid mass.",
    def_fr: "Un examen d'imagerie utilisant des ultrasons, souvent utilisé pour distinguer un kyste liquidien d'une masse solide.",
  },
];

export default function GlossaryPage() {
  const { lang } = useLang();
  const fr = lang === "fr";
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? TERMS.filter(
          (t) =>
            t.term_en.toLowerCase().includes(q) ||
            t.term_fr.toLowerCase().includes(q) ||
            t.def_en.toLowerCase().includes(q) ||
            t.def_fr.toLowerCase().includes(q)
        )
      : TERMS;
    return [...list].sort((a, b) =>
      (fr ? a.term_fr : a.term_en).localeCompare(fr ? b.term_fr : b.term_en, fr ? "fr" : "en")
    );
  }, [query, fr]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-10">
      {/* Hero */}
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-200 px-4 py-1.5 rounded-full text-sm font-medium">
          <BookOpen className="h-4 w-4" />
          {fr ? "A–Z · Termes en langage simple" : "A–Z · Plain-language terms"}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-rose-600 to-pink-600 bg-clip-text text-transparent leading-tight">
          {fr ? "Glossaire du cancer du sein" : "Breast cancer glossary"}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
          {fr
            ? "Comprendre les mots que les médecins utilisent. Cherchez un terme ci-dessous et lisez une définition claire, en une ou deux phrases."
            : "Understand the words doctors use. Search a term below and read a clear definition in one or two plain sentences."}
        </p>
      </header>

      {/* Search */}
      <div className="max-w-xl mx-auto space-y-2">
        <div className="relative">
          <Search className="absolute start-4 top-1/2 -translate-y-1/2 h-5 w-5 text-rose-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={fr ? "Rechercher un terme…" : "Search a term…"}
            className="w-full h-12 ps-12 pe-12 rounded-full border border-rose-200 dark:border-rose-950 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label={fr ? "Effacer" : "Clear"}
              className="absolute end-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-rose-500"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          {filtered.length}{" "}
          {fr
            ? filtered.length === 1
              ? "terme trouvé"
              : "termes trouvés"
            : filtered.length === 1
            ? "term"
            : "terms"}
        </p>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <Card className="text-center py-12 px-6">
          <p className="text-zinc-600 dark:text-zinc-300 font-medium">
            {fr ? "Aucun terme trouvé." : "No terms found."}
          </p>
          <p className="text-sm text-zinc-400 mt-1">
            {fr
              ? "Essayez un autre mot, par exemple « biopsie » ou « stade »."
              : "Try another word, for example “biopsy” or “stage”."}
          </p>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((t) => (
            <Card key={t.term_en} className="px-5 py-4 ring-rose-100 dark:ring-rose-950">
              <h3 className="font-bold text-rose-700 dark:text-rose-300">
                {fr ? t.term_fr : t.term_en}
                {fr && t.term_fr !== t.term_en && (
                  <span className="ms-2 text-xs font-normal text-zinc-400">{t.term_en}</span>
                )}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {fr ? t.def_fr : t.def_en}
              </p>
            </Card>
          ))}
        </div>
      )}

      {/* Sources */}
      <section className="border-t border-rose-100 dark:border-rose-950 pt-6">
        <h3 className="text-sm font-semibold flex items-center gap-2 text-zinc-500 mb-2">
          <BookOpen className="h-4 w-4" /> {fr ? "Sources & références" : "Sources & references"}
        </h3>
        <p className="text-xs text-zinc-400 leading-relaxed">
          {fr
            ? "Définitions éducatives alignées sur la National Breast Cancer Foundation, le National Cancer Institute (NCI) et l'American Cancer Society (ACS). Elles ne remplacent pas les explications de votre équipe soignante."
            : "Educational definitions aligned with the National Breast Cancer Foundation, the National Cancer Institute (NCI), and the American Cancer Society (ACS). They are not a substitute for your care team's guidance."}
        </p>
      </section>
    </div>
  );
}
