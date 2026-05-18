export type Lang = "ar" | "fr";

type Translation = {
  appName: string;
  tagline: string;
  hero: { title: string; subtitle: string; cta: string; learn: string };
  nav: { home: string; chat: string; check: string; quiz: string; learn: string };
  features: {
    chat: { title: string; desc: string };
    check: { title: string; desc: string };
    quiz: { title: string; desc: string };
    learn: { title: string; desc: string };
  };
  chat: {
    title: string;
    placeholder: string;
    welcome: string;
    thinking: string;
    send: string;
    disclaimer: string;
  };
  check: {
    title: string;
    subtitle: string;
    start: string;
    next: string;
    prev: string;
    done: string;
    step: string;
    of: string;
    steps: { title: string; desc: string; tip: string }[];
    whenToSeeDoctor: string;
    doctorList: string[];
  };
  quiz: {
    title: string;
    subtitle: string;
    start: string;
    next: string;
    submit: string;
    processing: string;
    result: string;
    questions: { q: string; options: string[] }[];
  };
  learn: {
    title: string;
    subtitle: string;
    sections: { title: string; body: string }[];
    resources: string;
    resourcesList: string[];
  };
  common: { backHome: string; important: string; disclaimer: string };
  footer: string;
};

export const translations: Record<Lang, Translation> = {
  ar: {
    appName: "لالة AI",
    tagline: "صاحبتك ف رحلة الوعي بصحة الثدي",
    hero: {
      title: "وعي، فحص، وراحة البال",
      subtitle: "تطبيق ذكي يهضر معاك بالدارجة، يعاونك تعرفي صحتك بطريقة بسيطة وآمنة",
      cta: "ابدئي دابا",
      learn: "تعلمي أكثر",
    },
    nav: {
      home: "الرئيسية",
      chat: "هضري مع لالة",
      check: "الفحص الذاتي",
      quiz: "اختبار المخاطر",
      learn: "تعلمي",
    },
    features: {
      chat: {
        title: "هضري مع لالة",
        desc: "لالة AI كتجاوبك بالدارجة على جميع أسئلتك بخصوص صحة الثدي، بكل خصوصية وثقة",
      },
      check: {
        title: "الفحص الذاتي",
        desc: "خطوات بسيطة باش تديري الفحص الذاتي ف الدار، كل شهر، بإرشادات واضحة",
      },
      quiz: {
        title: "اختبار المخاطر",
        desc: "7 أسئلة قصيرة باش نقيمو معاك مستوى المخاطر، ونعطيوك نصائح خاصة بيك",
      },
      learn: {
        title: "تعلمي وتوعّي",
        desc: "معلومات صحية موثوقة، أساطير وحقائق، ومتى خاصك تشوفي الطبيب",
      },
    },
    chat: {
      title: "هضري مع لالة",
      placeholder: "كتبي سؤالك هنا...",
      welcome: "السلام ختي، أنا لالة. كنعاونك ف كل ما يخص صحة الثدي. سولي ما بغيتي بكل أريحية.",
      thinking: "كتفكر...",
      send: "صيفطي",
      disclaimer: "هاد المعلومات تعليمية، ماشي تشخيص طبي. شوفي الطبيب إيلا عندك قلق.",
    },
    check: {
      title: "الفحص الذاتي للثدي",
      subtitle: "7 خطوات بسيطة، ديريهم كل شهر بعد الدورة بأسبوع",
      start: "ابدئي الفحص",
      next: "التالي",
      prev: "السابق",
      done: "سالينا",
      step: "خطوة",
      of: "من",
      steps: [
        {
          title: "1. شوفي ف المرآة",
          desc: "وقفي قدام المرآة، يديك على خاصرتك. شوفي شكل ثدييك: الحجم، اللون، أي تغيير ف الجلد.",
          tip: "كاينة دلائل خاصك تنتبهي ليها: تغير ف اللون، تجاعيد ف الجلد، أو شي بقعة جديدة.",
        },
        {
          title: "2. هزي يديك",
          desc: "هزي يديك فوق راسك ببطء. شوفي إيلا الثديين كيتحركو بنفس الطريقة.",
          tip: "ركزي على أي تغيير ف الشكل أو حركة غير عادية.",
        },
        {
          title: "3. تفقدي الحلمة",
          desc: "شوفي إيلا كاين شي إفرازات من الحلمة، أو إيلا تغيرت الحلمة (انكماش، تغير اللون).",
          tip: "أي إفرازات غير عادية (دم، سائل) خاصك تشوفي الطبيب.",
        },
        {
          title: "4. كذي راسك",
          desc: "كذي راسك على الفراش، حطي وسادة تحت كتفك اليمنى، وهزي يدك اليمنى فوق راسك.",
          tip: "هاد الوضعية كتسهل عليك الفحص بإصبعك.",
        },
        {
          title: "5. حسي بأصابعك",
          desc: "بأصابع يدك اليسرى الثلاثة الوسطى، حسي ثديك الأيمن بحركات دائرية صغيرة. ابدئي من الخارج ودوري للداخل.",
          tip: "اضغطي بثلاثة قوى مختلفة: خفيفة، متوسطة، وقوية.",
        },
        {
          title: "6. الجهة الأخرى",
          desc: "عاودي نفس الشي للثدي الآخر، بتغيير الجهة.",
          tip: "لا تنسي تفحصي حتى تحت الإبط، فيه عقد لمفاوية.",
        },
        {
          title: "7. وقفة الدوش",
          desc: "ف الدوش، بجلد مبلل، عاودي الفحص واقفة. الصابون كيسهل حركة الأصابع.",
          tip: "إيلا حسيتي بشي كتلة، شي تغيير، أو شي حاجة جديدة - شوفي الطبيب.",
        },
      ],
      whenToSeeDoctor: "متى خاصك تشوفي الطبيب؟",
      doctorList: [
        "كتلة جديدة ف الثدي أو تحت الإبط",
        "تغير ف حجم أو شكل الثدي",
        "إفرازات من الحلمة (خاصة بدم)",
        "تجاعيد أو تغير ف جلد الثدي",
        "ألم مستمر ف الثدي",
      ],
    },
    quiz: {
      title: "اختبار المخاطر",
      subtitle: "7 أسئلة قصيرة، الإجابات ديالك آمنة وخصوصية",
      start: "ابدئي الاختبار",
      next: "التالي",
      submit: "شوفي النتيجة",
      processing: "كنحلل النتائج...",
      result: "النتيجة ديالك",
      questions: [
        {
          q: "شحال ف عمرك؟",
          options: ["أقل من 30", "30-39", "40-49", "50-59", "60 وفوق"],
        },
        {
          q: "كاين شي حالة سرطان ثدي ف العائلة (أم، خت، بنت)؟",
          options: ["لا", "نعم، واحدة", "نعم، أكثر من واحدة", "ما عارفاش"],
        },
        {
          q: "ولاديتي شي مرة؟",
          options: ["لا", "نعم، قبل 30 عام", "نعم، بعد 30 عام"],
        },
        {
          q: "رضعتي ولادك؟",
          options: ["ماعنديش ولاد", "لا", "نعم، أقل من سنة", "نعم، أكثر من سنة"],
        },
        {
          q: "كتاخذي حبوب منع الحمل أو علاج هرموني؟",
          options: ["لا", "نعم، حالياً", "نعم، ف الماضي"],
        },
        {
          q: "كتشربي الكحول أو كتدخني؟",
          options: ["لا", "نادراً", "بانتظام"],
        },
        {
          q: "حسيتي مؤخراً بكتلة، ألم، أو شي تغيير ف الثدي؟",
          options: ["لا، والو", "نعم، شي حاجة بسيطة", "نعم، كاين قلق"],
        },
      ],
    },
    learn: {
      title: "تعلمي وتوعّي",
      subtitle: "معلومات موثوقة على سرطان الثدي ف المغرب",
      sections: [
        {
          title: "شنو هو سرطان الثدي؟",
          body: "سرطان الثدي هو نمو غير طبيعي للخلايا ف نسيج الثدي. هو أكثر أنواع السرطان شيوعاً عند النساء ف المغرب، ولكن إيلا اتكشف بكري، نسبة الشفاء كتفوق 90%.",
        },
        {
          title: "علاش الكشف المبكر مهم؟",
          body: "كل ما اتكشف السرطان بكري، كل ما كان العلاج بسيط ونسبة الشفاء عالية. الفحص الذاتي الشهري والفحوصات الدورية كيقدرو ينقدو حياتك.",
        },
        {
          title: "الأساطير والحقائق",
          body: "أسطورة: الفحص كيؤلم → الحقيقة: الفحص الذاتي مايؤلمش. أسطورة: غير كبار السن كيمرضو → الحقيقة: حتى الشابات يمكن يصابو.",
        },
        {
          title: "إحصائيات ف المغرب",
          body: "ف المغرب، سرطان الثدي كيشكل 36% من السرطانات عند النساء. أكثر من 11,000 حالة جديدة كل عام. التشخيص المبكر = حياة أطول.",
        },
      ],
      resources: "موارد مفيدة",
      resourcesList: [
        "Lalla Salma Foundation - 0801 003 003",
        "Centre Régional d'Oncologie",
        "اتصلي بالطبيب ديالك إيلا حسيتي بأي تغيير",
      ],
    },
    common: {
      backHome: "رجعي للرئيسية",
      important: "مهم",
      disclaimer: "هاد التطبيق تعليمي. ماكيعوضش الطبيب.",
    },
    footer: "صنعت بحب من طرف فريق The Da Vinci Code · Vibe Coding Hackathon 2026",
  },
  fr: {
    appName: "Lalla AI",
    tagline: "Votre compagne sur le chemin de la santé mammaire",
    hero: {
      title: "Sensibilisation, dépistage, sérénité",
      subtitle: "Une app intelligente qui vous parle en darija, pour mieux comprendre votre santé en toute simplicité et confidentialité",
      cta: "Commencer maintenant",
      learn: "En savoir plus",
    },
    nav: {
      home: "Accueil",
      chat: "Parler à Lalla",
      check: "Auto-examen",
      quiz: "Évaluation",
      learn: "Apprendre",
    },
    features: {
      chat: {
        title: "Parlez à Lalla",
        desc: "Lalla AI répond en darija à toutes vos questions sur la santé mammaire, en toute discrétion",
      },
      check: {
        title: "Auto-examen",
        desc: "Des étapes simples pour faire l'auto-examen à la maison, chaque mois, avec des instructions claires",
      },
      quiz: {
        title: "Évaluation du risque",
        desc: "7 questions courtes pour évaluer votre risque et recevoir des conseils personnalisés",
      },
      learn: {
        title: "Apprendre et sensibiliser",
        desc: "Informations fiables, mythes vs réalité, et quand consulter un médecin",
      },
    },
    chat: {
      title: "Parlez à Lalla",
      placeholder: "Écrivez votre question ici...",
      welcome: "Bonjour ma sœur, je suis Lalla. Je suis là pour vous aider sur tout ce qui concerne la santé mammaire. Posez vos questions en toute confiance.",
      thinking: "Je réfléchis...",
      send: "Envoyer",
      disclaimer: "Ces informations sont éducatives, pas un diagnostic. Consultez un médecin si vous avez des inquiétudes.",
    },
    check: {
      title: "Auto-examen des seins",
      subtitle: "7 étapes simples, à faire chaque mois, une semaine après les règles",
      start: "Commencer l'examen",
      next: "Suivant",
      prev: "Précédent",
      done: "Terminé",
      step: "Étape",
      of: "sur",
      steps: [
        {
          title: "1. Regardez dans le miroir",
          desc: "Tenez-vous droite face au miroir, mains sur les hanches. Observez la forme, la taille, la couleur de la peau.",
          tip: "Surveillez : changement de couleur, plis dans la peau, taches nouvelles.",
        },
        {
          title: "2. Levez les bras",
          desc: "Levez lentement les bras au-dessus de la tête. Vérifiez que les deux seins bougent de la même façon.",
          tip: "Attention à tout changement de forme ou mouvement inhabituel.",
        },
        {
          title: "3. Examinez le mamelon",
          desc: "Vérifiez s'il y a un écoulement, ou si le mamelon a changé (rétraction, couleur).",
          tip: "Tout écoulement inhabituel (sang, liquide) doit être vu par un médecin.",
        },
        {
          title: "4. Allongez-vous",
          desc: "Allongez-vous, mettez un coussin sous l'épaule droite, et levez le bras droit au-dessus de la tête.",
          tip: "Cette position facilite l'examen avec les doigts.",
        },
        {
          title: "5. Palpez avec les doigts",
          desc: "Avec les 3 doigts du milieu de la main gauche, palpez le sein droit en petits cercles. Commencez de l'extérieur et faites une spirale vers l'intérieur.",
          tip: "Appuyez avec 3 niveaux de pression : léger, moyen, ferme.",
        },
        {
          title: "6. Changez de côté",
          desc: "Refaites la même chose pour l'autre sein, en inversant les mains.",
          tip: "N'oubliez pas l'aisselle — elle contient des ganglions lymphatiques.",
        },
        {
          title: "7. Sous la douche",
          desc: "Sous la douche, peau mouillée, refaites l'examen debout. Le savon facilite le glissement des doigts.",
          tip: "Si vous sentez une masse, un changement, ou quelque chose de nouveau — voyez un médecin.",
        },
      ],
      whenToSeeDoctor: "Quand consulter un médecin ?",
      doctorList: [
        "Nouvelle masse dans le sein ou sous l'aisselle",
        "Changement de taille ou de forme du sein",
        "Écoulement du mamelon (surtout sanglant)",
        "Plissement ou changement de la peau",
        "Douleur persistante dans le sein",
      ],
    },
    quiz: {
      title: "Évaluation du risque",
      subtitle: "7 questions courtes, vos réponses restent privées",
      start: "Commencer le test",
      next: "Suivant",
      submit: "Voir le résultat",
      processing: "Analyse en cours...",
      result: "Votre résultat",
      questions: [
        {
          q: "Quel est votre âge ?",
          options: ["Moins de 30", "30-39", "40-49", "50-59", "60 et plus"],
        },
        {
          q: "Y a-t-il un cas de cancer du sein dans votre famille (mère, sœur, fille) ?",
          options: ["Non", "Oui, une personne", "Oui, plus d'une personne", "Je ne sais pas"],
        },
        {
          q: "Avez-vous déjà accouché ?",
          options: ["Non", "Oui, avant 30 ans", "Oui, après 30 ans"],
        },
        {
          q: "Avez-vous allaité ?",
          options: ["Je n'ai pas d'enfants", "Non", "Oui, moins d'un an", "Oui, plus d'un an"],
        },
        {
          q: "Prenez-vous la pilule ou un traitement hormonal ?",
          options: ["Non", "Oui, actuellement", "Oui, dans le passé"],
        },
        {
          q: "Consommez-vous alcool ou tabac ?",
          options: ["Non", "Rarement", "Régulièrement"],
        },
        {
          q: "Avez-vous récemment senti une masse, douleur, ou changement ?",
          options: ["Non, rien", "Oui, quelque chose de léger", "Oui, je suis inquiète"],
        },
      ],
    },
    learn: {
      title: "Apprendre et sensibiliser",
      subtitle: "Informations fiables sur le cancer du sein au Maroc",
      sections: [
        {
          title: "Qu'est-ce que le cancer du sein ?",
          body: "Le cancer du sein est une croissance anormale de cellules dans le tissu mammaire. C'est le cancer le plus fréquent chez les femmes au Maroc, mais s'il est détecté tôt, le taux de guérison dépasse 90%.",
        },
        {
          title: "Pourquoi le dépistage précoce ?",
          body: "Plus le cancer est détecté tôt, plus le traitement est simple et le taux de guérison élevé. L'auto-examen mensuel et les consultations régulières peuvent sauver votre vie.",
        },
        {
          title: "Mythes et réalité",
          body: "Mythe : l'examen est douloureux → Réalité : l'auto-examen ne fait pas mal. Mythe : seules les femmes âgées sont touchées → Réalité : les jeunes femmes aussi peuvent l'avoir.",
        },
        {
          title: "Statistiques au Maroc",
          body: "Au Maroc, le cancer du sein représente 36% des cancers chez les femmes. Plus de 11 000 nouveaux cas par an. Détection précoce = vie plus longue.",
        },
      ],
      resources: "Ressources utiles",
      resourcesList: [
        "Fondation Lalla Salma - 0801 003 003",
        "Centre Régional d'Oncologie",
        "Consultez votre médecin pour tout changement",
      ],
    },
    common: {
      backHome: "Retour à l'accueil",
      important: "Important",
      disclaimer: "Cette application est éducative. Elle ne remplace pas un médecin.",
    },
    footer: "Fait avec amour par l'équipe The Da Vinci Code · Vibe Coding Hackathon 2026",
  },
};

export type T = Translation;
