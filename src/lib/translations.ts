export type Lang = "ar" | "fr";

type Translation = {
  appName: string;
  tagline: string;
  hero: { title: string; subtitle: string; cta: string; learn: string };
  nav: { home: string; chat: string; check: string; quiz: string; learn: string; doctors: string; reminder: string };
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
  stats: { cancers: string; survival: string; cases: string };
  trust: {
    privacy: { title: string; desc: string };
    warm: { title: string; desc: string };
    forWomen: { title: string; desc: string };
  };
  reminder: {
    title: string;
    subtitle: string;
    cardTitle: string;
    cardDesc: string;
    enable: string;
    enabled: string;
    next: string;
    permission: string;
    saveDate: string;
    daySelector: string;
  };
  doctors: {
    title: string;
    subtitle: string;
    nationalHotline: string;
    findNear: string;
    callNow: string;
    centers: { name: string; city: string; phone: string; address: string }[];
  };
};

export const translations: Record<Lang, Translation> = {
  ar: {
    appName: "لالة AI",
    tagline: "صاحبتك ف رحلة الوعي بصحة الثدي",
    hero: {
      title: "وعي، فحص، وراحة البال",
      subtitle: "تطبيق ذكي كيهضر معاك بالدارجة، كيعاونك تفهمي صحتك بطريقة ساهلة وآمنة",
      cta: "ابدئي دابا",
      learn: "تعلمي أكتر",
    },
    nav: {
      home: "الرئيسية",
      chat: "هضري مع لالة",
      check: "الفحص الذاتي",
      quiz: "قيمي مخاطرك",
      learn: "تعلمي",
      doctors: "مراكز",
      reminder: "تذكير",
    },
    features: {
      chat: {
        title: "هضري مع لالة",
        desc: "لالة AI كتجاوبك بالدارجة على كل الأسئلة ديالك على صحة الثدي، بكل خصوصية وأمان",
      },
      check: {
        title: "الفحص الذاتي",
        desc: "خطوات بسيطة باش تديري الفحص الذاتي فالدار، كل شهر، بشرح واضح وسهل",
      },
      quiz: {
        title: "قيمي مخاطرك",
        desc: "7 أسئلة قصيرة، نشوفو معاك مستوى المخاطر ونعطيوك نصائح خاصة بيك",
      },
      learn: {
        title: "تعلمي وتوعّي",
        desc: "معلومات موثوقة، أفكار غالطة وحقائق، وفوقاش خاصك تشوفي الطبيبة",
      },
    },
    chat: {
      title: "هضري مع لالة",
      placeholder: "كتبي سؤالك هنا...",
      welcome: "السلام ختي 💖 أنا لالة. كنعاونك فكل اللي خاص بصحة الثدي. سولي على اللي بغيتي براحتك، أنا هنا ليك.",
      thinking: "كتفكر...",
      send: "صيفطي",
      disclaimer: "هاد المعلومات تعليمية، ماشي تشخيص طبي. شوفي الطبيبة إيلا عندك أي قلق.",
    },
    check: {
      title: "الفحص الذاتي للثدي",
      subtitle: "7 خطوات ساهلة، ديريهم كل شهر، أسبوع واحد من بعد الدورة",
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
      title: "قيمي مخاطرك",
      subtitle: "7 أسئلة قصيرة، الأجوبة ديالك خاصة وما كاتتسجلش",
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
      subtitle: "معلومات بسيطة وموثوقة على سرطان الثدي فالمغرب",
      sections: [
        {
          title: "شنو هو سرطان الثدي؟",
          body: "سرطان الثدي هو نمو ماشي طبيعي ديال الخلايا فالثدي. هو أكتر نوع ديال السرطان كاينقا عند النساء فالمغرب. لكن البشارة: إيلا اتكشف بكري، أكتر من 90% ديال النساء كيشفاو. الكشف المبكر = حياة.",
        },
        {
          title: "علاش الكشف المبكر مهم بزاف؟",
          body: "إيلا اكتشفتي السرطان بكري، العلاج بسيط ونتائجو زوينة. أما إيلا تأخرتي، يولي صعيب. الفحص الذاتي كل شهر فالدار + الزيارة الدورية للطبيبة = أحسن حماية.",
        },
        {
          title: "أفكار غالطة وحقائق",
          body: "❌ غالط: 'الفحص كيوجع' — ✓ صحيح: الفحص الذاتي ساهل وما كيوجعش. ❌ غالط: 'غير العجوزات كيمرضو' — ✓ صحيح: حتى الشابات يقدر يطرا ليهم. ❌ غالط: 'إيلا ما عندي ف العائلة، ماغاديش يطرا ليا' — ✓ صحيح: 80% ديال الحالات بلا تاريخ عائلي.",
        },
        {
          title: "الأرقام فالمغرب",
          body: "فالمغرب، سرطان الثدي كيمثل 36% من جميع السرطانات عند النساء. كل عام، أكتر من 11,000 امرأة كتسمع هاد الخبر. الخبر الزوين: نسبة الشفاء كتفوق 90% إيلا اكتشف بكري. شي دقائق ف الشهر يقدرو ينقدوك.",
        },
      ],
      resources: "موارد كتعاون",
      resourcesList: [
        "مؤسسة لالة سلمى - 0801 003 003",
        "المراكز الجهوية للأنكولوجيا",
        "اتصلي بالطبيبة ديالك إيلا حسيتي بأي تغيير",
      ],
    },
    common: {
      backHome: "رجعي للرئيسية",
      important: "مهم",
      disclaimer: "هاد التطبيق تعليمي. ماكيعوضش الطبيب.",
    },
    footer: "صنعت بحب من طرف فريق The Da Vinci Code · Vibe Coding Hackathon 2026",
    stats: {
      cancers: "ديال السرطانات اللي كتصيب النساء فالمغرب",
      survival: "ديال النساء كيشفاو إيلا اكتشفو بكري",
      cases: "حالة جديدة كل عام فالمغرب",
    },
    trust: {
      privacy: { title: "الخصوصية أولاً", desc: "معلوماتك تبقى عندك" },
      warm: { title: "بحب وفهم", desc: "واجهة دافئة وبسيطة" },
      forWomen: { title: "للمغربيات", desc: "بالدارجة والفرنسية" },
    },
    reminder: {
      title: "تذكير شهري",
      subtitle: "باش متنسايش الفحص الذاتي، خلي لالة تذكرك",
      cardTitle: "اعدادات التذكير",
      cardDesc: "حملي التذكير للكالنضار ديالك (Google/Apple) باش يجيك تنبيه كل شهر بصفة دائمة. ولا جربي إشعار المتصفح بسرعة.",
      enable: "إشعار تجريبي",
      enabled: "اتبعت الإشعار ✓",
      next: "التذكير الجاي:",
      permission: "خاصك تعطي الإذن للمتصفح",
      saveDate: "حملي للكالنضار",
      daySelector: "اختاري النهار ديال الفحص فالشهر:",
    },
    doctors: {
      title: "مراكز علاج السرطان",
      subtitle: "أهم المراكز ف المغرب، قريبة منك",
      nationalHotline: "الرقم الوطني · مؤسسة لالة سلمى",
      findNear: "قلبي على المدينة ديالك",
      callNow: "اتصلي",
      centers: [
        { name: "المعهد الوطني للأنكولوجيا", city: "الرباط", phone: "0537687173", address: "الرباط - حي الرياض" },
        { name: "مركز محمد السادس لعلاج السرطان", city: "الدار البيضاء", phone: "0522482020", address: "الدار البيضاء - عين الشق" },
        { name: "مركز الأنكولوجيا الجامعي", city: "فاس", phone: "0535619100", address: "فاس - المركز الاستشفائي الحسن الثاني" },
        { name: "مركز محمد السادس للأنكولوجيا", city: "مراكش", phone: "0524300700", address: "مراكش - حي الإزدهار" },
        { name: "مركز الحسن الثاني لعلاج السرطان", city: "طنجة", phone: "0539393939", address: "طنجة - المركز الاستشفائي" },
        { name: "مركز الأنكولوجيا", city: "وجدة", phone: "0536500666", address: "وجدة - المركز الاستشفائي" },
      ],
    },
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
      doctors: "Médecin",
      reminder: "Rappel",
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
    stats: {
      cancers: "des cancers chez les femmes marocaines",
      survival: "taux de guérison avec détection précoce",
      cases: "nouveaux cas par an au Maroc",
    },
    trust: {
      privacy: { title: "Confidentialité", desc: "Vos données restent chez vous" },
      warm: { title: "Avec bienveillance", desc: "Interface chaleureuse et simple" },
      forWomen: { title: "Pour les Marocaines", desc: "En darija et en français" },
    },
    reminder: {
      title: "Rappel mensuel",
      subtitle: "Pour ne jamais oublier votre auto-examen, laissez Lalla vous rappeler",
      cardTitle: "Configurer le rappel",
      cardDesc: "Téléchargez l'événement dans votre calendrier (Google/Apple) pour un rappel mensuel permanent. Ou activez une notification de test rapide.",
      enable: "Notification test",
      enabled: "Notification envoyée ✓",
      next: "Prochain rappel :",
      permission: "Autorisation du navigateur requise",
      saveDate: "Télécharger dans le calendrier",
      daySelector: "Choisissez le jour de l'examen dans le mois :",
    },
    doctors: {
      title: "Centres de cancérologie",
      subtitle: "Principaux centres d'oncologie au Maroc",
      nationalHotline: "Ligne nationale · Fondation Lalla Salma",
      findNear: "Choisissez votre ville",
      callNow: "Appeler",
      centers: [
        { name: "Institut National d'Oncologie", city: "Rabat", phone: "0537687173", address: "Rabat - Hay Riad" },
        { name: "Centre Mohammed VI Cancérologie", city: "Casablanca", phone: "0522482020", address: "Casablanca - Aïn Chock" },
        { name: "Centre d'Oncologie CHU", city: "Fès", phone: "0535619100", address: "Fès - CHU Hassan II" },
        { name: "Centre Mohammed VI Oncologie", city: "Marrakech", phone: "0524300700", address: "Marrakech - Hay Izdihar" },
        { name: "Centre Hassan II Cancer", city: "Tanger", phone: "0539393939", address: "Tanger - CHU" },
        { name: "Centre d'Oncologie", city: "Oujda", phone: "0536500666", address: "Oujda - CHU" },
      ],
    },
  },
};

export type T = Translation;
