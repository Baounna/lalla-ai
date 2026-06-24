export type Lang = "en" | "fr";

type Translation = {
  appName: string;
  tagline: string;
  hero: { title: string; subtitle: string; cta: string; learn: string };
  nav: { home: string; chat: string; check: string; visual: string; screening: string; quiz: string; learn: string; doctors: string; reminder: string };
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
    tip: string;
    guide3d: string;
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
  share: {
    title: string;
    desc: string;
    whatsapp: string;
    copy: string;
    copied: string;
    nativeMessage: string;
    nativeText: string;
  };
  architecture: {
    title: string;
    subtitle: string;
    backToPitch: string;
    arch: {
      kicker: string;
      title: string;
      desc: string;
      layers: { name: string; tech: string; role: string }[];
    };
    usecase: {
      kicker: string;
      title: string;
      desc: string;
      actor: string;
      cases: string[];
    };
    sequence: {
      kicker: string;
      title: string;
      desc: string;
      actors: string[];
      steps: { from: number; to: number; label: string }[];
    };
  };
  pitch: {
    title: string;
    subtitle: string;
    download: string;
    badges: {
      hackathon: string;
      team: string;
      theme: string;
    };
    problem: {
      kicker: string;
      title: string;
      stats: { value: string; label: string }[];
      body: string;
    };
    solution: {
      kicker: string;
      title: string;
      body: string;
      pillars: { icon: string; title: string; desc: string }[];
    };
    conception: {
      kicker: string;
      title: string;
      body: string;
      principles: { num: string; title: string; desc: string }[];
      journey: { step: string; label: string }[];
    };
    features: {
      kicker: string;
      title: string;
      list: { num: string; title: string; desc: string }[];
    };
    innovation: {
      kicker: string;
      title: string;
      points: { icon: string; title: string; desc: string }[];
    };
    impact: {
      kicker: string;
      title: string;
      body: string;
      metrics: { value: string; label: string }[];
    };
    tech: {
      kicker: string;
      title: string;
      list: string[];
    };
    closing: {
      kicker: string;
      title: string;
      body: string;
      cta: string;
    };
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
  en: {
    appName: "Lalla AI",
    tagline: "Your companion on the breast-health journey",
    hero: {
      title: "Awareness, screening & peace of mind",
      subtitle: "An AI companion that guides you through breast self-examination with a research-grade 3D guide — private, warm, and built for every woman. Born in Morocco, designed for the world.",
      cta: "Start now",
      learn: "Learn more",
    },
    nav: {
      home: "Home",
      chat: "Talk to Lalla",
      check: "Self-exam",
      visual: "Visual check",
      screening: "Screening",
      quiz: "Risk check",
      learn: "Learn",
      doctors: "Centers",
      reminder: "Reminder",
    },
    features: {
      chat: {
        title: "Talk to Lalla",
        desc: "Lalla AI answers all your breast-health questions, privately and without judgment",
      },
      check: {
        title: "Guided 3D self-exam",
        desc: "Follow an interactive 3D model through the 7 steps of breast self-examination, at home, every month",
      },
      quiz: {
        title: "Risk check",
        desc: "7 short questions — get a sense of your risk level and personalized guidance",
      },
      learn: {
        title: "Learn & raise awareness",
        desc: "Trusted information, myths vs. facts, and when to see a doctor",
      },
    },
    chat: {
      title: "Talk to Lalla",
      placeholder: "Type your question here...",
      welcome: "Hi 💖 I'm Lalla. I'm here to help with anything about breast health. Ask me whatever you'd like, in your own words — I'm here for you.",
      thinking: "Thinking...",
      send: "Send",
      disclaimer: "This information is educational, not a medical diagnosis. Please see a doctor if you have any concern.",
    },
    check: {
      title: "Breast self-examination",
      subtitle: "7 simple steps with an interactive 3D guide — do them monthly, a week after your period",
      start: "Start the exam",
      next: "Next",
      prev: "Back",
      done: "Done",
      step: "Step",
      of: "of",
      tip: "Tip: ",
      guide3d: "3D guide",
      steps: [
        {
          title: "1. Look in the mirror",
          desc: "Stand straight facing the mirror, hands on your hips. Observe the shape, size, and skin color of each breast.",
          tip: "Watch for changes: color shifts, dimpling of the skin, or any new spot.",
        },
        {
          title: "2. Raise your arms",
          desc: "Slowly raise both arms above your head. Check that both breasts move the same way.",
          tip: "Look for any change in shape or unusual movement.",
        },
        {
          title: "3. Check the nipple",
          desc: "Look for any discharge from the nipple, or whether it has changed (inversion, color).",
          tip: "Any unusual discharge (blood, fluid) should be seen by a doctor.",
        },
        {
          title: "4. Lie down",
          desc: "Lie down, place a pillow under your right shoulder, and raise your right arm above your head.",
          tip: "This position makes it easier to examine with your fingers.",
        },
        {
          title: "5. Feel with your fingers",
          desc: "Using the three middle fingers of your left hand, feel your right breast in small circles. Start from the outside and spiral inward.",
          tip: "Press with three levels of pressure: light, medium, and firm.",
        },
        {
          title: "6. Switch sides",
          desc: "Repeat the same process on the other breast, switching hands.",
          tip: "Don't forget the underarm — it contains lymph nodes.",
        },
        {
          title: "7. In the shower",
          desc: "In the shower, on wet skin, repeat the exam standing up. Soap helps your fingers glide.",
          tip: "If you feel a lump, a change, or anything new — see a doctor.",
        },
      ],
      whenToSeeDoctor: "When should you see a doctor?",
      doctorList: [
        "A new lump in the breast or underarm",
        "A change in breast size or shape",
        "Discharge from the nipple (especially bloody)",
        "Dimpling or change in the breast skin",
        "Persistent pain in the breast",
      ],
    },
    quiz: {
      title: "Risk check",
      subtitle: "7 short questions — your answers are private and never stored",
      start: "Start the quiz",
      next: "Next",
      submit: "See result",
      processing: "Analyzing your answers...",
      result: "Your result",
      questions: [
        {
          q: "What is your age?",
          options: ["Under 30", "30-39", "40-49", "50-59", "60 and over"],
        },
        {
          q: "Is there a case of breast cancer in your family (mother, sister, daughter)?",
          options: ["No", "Yes, one person", "Yes, more than one", "I don't know"],
        },
        {
          q: "Have you ever given birth?",
          options: ["No", "Yes, before 30", "Yes, after 30"],
        },
        {
          q: "Have you breastfed?",
          options: ["I have no children", "No", "Yes, less than a year", "Yes, more than a year"],
        },
        {
          q: "Do you take birth control pills or hormone therapy?",
          options: ["No", "Yes, currently", "Yes, in the past"],
        },
        {
          q: "Do you drink alcohol or smoke?",
          options: ["No", "Rarely", "Regularly"],
        },
        {
          q: "Have you recently felt a lump, pain, or any change in your breast?",
          options: ["No, nothing", "Yes, something minor", "Yes, I'm worried"],
        },
      ],
    },
    learn: {
      title: "Learn & raise awareness",
      subtitle: "Simple, trusted information about breast cancer",
      sections: [
        {
          title: "What is breast cancer?",
          body: "Breast cancer is an abnormal growth of cells in breast tissue. It's the most common cancer among women worldwide. The good news: when caught early, more than 90% of women survive. Early detection saves lives.",
        },
        {
          title: "Why does early detection matter so much?",
          body: "The earlier cancer is found, the simpler the treatment and the better the outcome. A monthly self-exam at home plus regular check-ups with a doctor are your best protection.",
        },
        {
          title: "Myths vs. facts",
          body: "❌ Myth: 'The exam hurts.' ✓ Fact: self-examination is simple and painless. ❌ Myth: 'Only older women get it.' ✓ Fact: young women can be affected too. ❌ Myth: 'No family history means I'm safe.' ✓ Fact: about 80% of cases have no family history.",
        },
        {
          title: "The numbers",
          body: "Breast cancer is the most common cancer in women, with over 2.3 million new cases worldwide each year. In Morocco — where Lalla began — it represents 36% of all cancers in women, with 11,000+ new cases a year. Survival exceeds 90% with early detection. A few minutes a month can save your life.",
        },
      ],
      resources: "Helpful resources",
      resourcesList: [
        "WHO — Breast cancer information & guidelines",
        "Your national cancer society or screening program",
        "Contact your doctor for any change you notice",
      ],
    },
    common: {
      backHome: "Back home",
      important: "Important",
      disclaimer: "This app is educational. It does not replace a doctor.",
    },
    footer: "Made with love by The Da Vinci Code · Vibe Coding Hackathon 2026",
    stats: {
      cancers: "women develop breast cancer in their lifetime",
      survival: "survival rate with early detection",
      cases: "new cases worldwide every year",
    },
    trust: {
      privacy: { title: "Privacy first", desc: "Your data stays with you" },
      warm: { title: "Warm & human", desc: "A gentle, simple interface" },
      forWomen: { title: "For every woman", desc: "Available in English & French" },
    },
    share: {
      title: "Share with your girls 💖",
      desc: "If this app helped you, share it with your sister, mother, or friend. Information saves lives 💖",
      whatsapp: "Share on WhatsApp",
      copy: "Copy link",
      copied: "Copied ✓",
      nativeMessage: "Share Lalla AI",
      nativeText: "This app helps women understand breast health and self-examination. Try it:",
    },
    architecture: {
      title: "Project architecture",
      subtitle: "How we built Lalla AI — 3 diagrams",
      backToPitch: "← Back to pitch",
      arch: {
        kicker: "01 · Overall architecture",
        title: "3 simple layers",
        desc: "The architecture separates presentation, server, and AI. Each layer has one clear responsibility.",
        layers: [
          { name: "User", tech: "Browser (mobile or laptop)", role: "Sees the multilingual interface" },
          { name: "Frontend", tech: "Next.js 16 + React + Tailwind + Three.js", role: "Interactive pages, 3D guide, multilingual" },
          { name: "Backend", tech: "API Routes (/api/chat, /api/quiz)", role: "Adds the system prompt and calls the AI" },
          { name: "Artificial Intelligence", tech: "Google Gemini 2.5 Flash", role: "Generates the responses" },
        ],
      },
      usecase: {
        kicker: "02 · Use cases",
        title: "What the user can do",
        desc: "We identified 7 main use cases for women everywhere.",
        actor: "Woman",
        cases: [
          "Talk to Lalla (AI)",
          "Do the 3D self-exam",
          "Check her risk",
          "Read health information",
          "Enable a monthly reminder",
          "Find a nearby center",
          "Share on WhatsApp",
        ],
      },
      sequence: {
        kicker: "03 · Sequence diagram",
        title: "How one conversation flows",
        desc: "This diagram shows what happens when the user sends a message to Lalla.",
        actors: ["User", "Browser", "Server", "Gemini"],
        steps: [
          { from: 0, to: 1, label: "types a message" },
          { from: 1, to: 2, label: "POST /api/chat" },
          { from: 2, to: 3, label: "+ system prompt (be Lalla)" },
          { from: 3, to: 2, label: "← stream text" },
          { from: 2, to: 1, label: "← stream chunks" },
          { from: 1, to: 0, label: "sees the answer" },
        ],
      },
    },
    pitch: {
      title: "Lalla AI",
      subtitle: "Code for health, built for impact",
      download: "Download PDF",
      badges: {
        hackathon: "Vibe Coding Hackathon 2026",
        team: "The Da Vinci Code",
        theme: "Code for Health · Build for Impact",
      },
      problem: {
        kicker: "The Problem",
        title: "Women die because life-saving information doesn't reach them in time",
        stats: [
          { value: "2.3M", label: "new cases worldwide / year" },
          { value: "36%", label: "of cancers in women (Morocco)" },
          { value: "70%", label: "diagnosed too late" },
        ],
        body: "Breast cancer is the most common cancer in women worldwide. But the core problem often isn't treatment — it's that clear, trusted guidance doesn't reach women in a form they trust. Most tools are clinical and intimidating. The result: too many women are diagnosed late, when treatment is hardest. Lalla started in Morocco — and the same idea serves women everywhere.",
      },
      solution: {
        kicker: "Our Solution",
        title: "Lalla AI — a warm digital companion + a 3D self-exam guide",
        body: "Lalla isn't a cold medical app. She's a warm companion — like an older sister — who helps you understand your health, guides you through self-examination with an interactive 3D model, and tells you when to see a doctor. All in one place, without shame, without complexity.",
        pillars: [
          { icon: "🌍", title: "For every woman", desc: "Available in English & French" },
          { icon: "🧊", title: "Interactive 3D guide", desc: "Research-grade self-exam visualization" },
          { icon: "🤖", title: "Artificial intelligence", desc: "Gemini AI answers instantly" },
          { icon: "🔒", title: "Total privacy", desc: "Your data is never stored" },
        ],
      },
      conception: {
        kicker: "Our Approach",
        title: "Before we coded, we thought",
        body: "This wasn't improvised. Before the first line of code, we defined 4 design principles. Everything in Lalla follows from them.",
        principles: [
          { num: "01", title: "The user before the technology", desc: "Built for real women, not imaginary users." },
          { num: "02", title: "Their language, first", desc: "Not a translation. Written natively in each language." },
          { num: "03", title: "Privacy by design", desc: "No database. No stored answers. Zero personal data." },
          { num: "04", title: "Educate, don't diagnose", desc: "The AI is explicitly forbidden from diagnosing. Every answer points to a doctor." },
        ],
        journey: [
          { step: "01", label: "She discovers Lalla" },
          { step: "02", label: "She learns and understands" },
          { step: "03", label: "She does the 3D self-exam" },
          { step: "04", label: "It becomes a monthly habit" },
        ],
      },
      features: {
        kicker: "Key features",
        title: "Everything you need in one app",
        list: [
          { num: "01", title: "Chat with Lalla (AI)", desc: "Conversation with AI, voice input, answers all your questions" },
          { num: "02", title: "Guided 3D self-exam", desc: "7 simple steps with an interactive 3D model, to examine at home" },
          { num: "03", title: "Risk check", desc: "7 questions + AI that assesses your risk and gives personalized advice" },
          { num: "04", title: "Learn & raise awareness", desc: "Trusted information, myths vs. facts, real statistics" },
          { num: "05", title: "Monthly reminder", desc: "Calendar integration (Google/Apple) so you never forget" },
          { num: "06", title: "Nearby centers", desc: "Major oncology centers, one-tap direct call" },
        ],
      },
      innovation: {
        kicker: "Our Innovation",
        title: "What sets us apart",
        points: [
          { icon: "🧊", title: "Research-grade 3D guide", desc: "An interactive, step-synced 3D self-exam visualization — not static images" },
          { icon: "🎤", title: "Voice input", desc: "Ask questions hands-free with your voice — better access for everyone" },
          { icon: "💬", title: "WhatsApp sharing", desc: "Every user can send Lalla to her sister, mother, or friend in one tap" },
          { icon: "🌐", title: "No sign-up", desc: "No phone number required — privacy first" },
        ],
      },
      impact: {
        kicker: "The Impact",
        title: "An app that can save lives",
        body: "Lalla is accessible to any woman with a smartphone. Free, no sign-up, in her own language. Our goal: that every woman, even in remote areas, has access to trusted health information she can understand.",
        metrics: [
          { value: "100%", label: "Free to use" },
          { value: "0", label: "Personal data required" },
          { value: "2", label: "Languages (English + French)" },
          { value: "∞", label: "Potential to spread" },
        ],
      },
      tech: {
        kicker: "Technology",
        title: "Built with modern tools",
        list: [
          "Next.js 16 + TypeScript + Tailwind CSS v4",
          "Three.js + React Three Fiber (interactive 3D guide)",
          "Google Gemini 2.5 Flash (AI - Free Tier)",
          "Web Speech API (voice input)",
          "Calendar ICS (calendar integration)",
          "Vercel (free deployment with HTTPS)",
        ],
      },
      closing: {
        kicker: "Conclusion",
        title: "Lalla AI = hope, in your language",
        body: "Sometimes the difference between life and death is a simple word, in a language you understand, at the right time. Lalla AI offers that word. For every mother, every sister, every friend.",
        cta: "Try Lalla now",
      },
    },
    reminder: {
      title: "Monthly reminder",
      subtitle: "So you never forget your self-exam, let Lalla remind you",
      cardTitle: "Reminder settings",
      cardDesc: "Download the reminder to your calendar (Google/Apple) to get a permanent monthly alert. Or try a quick browser notification.",
      enable: "Test notification",
      enabled: "Notification sent ✓",
      next: "Next reminder:",
      permission: "Browser permission required",
      saveDate: "Add to calendar",
      daySelector: "Choose your exam day of the month:",
    },
    doctors: {
      title: "Cancer treatment centers",
      subtitle: "Major centers in Morocco, near you",
      nationalHotline: "National line · Lalla Salma Foundation",
      findNear: "Choose your city",
      callNow: "Call",
      centers: [
        { name: "National Institute of Oncology", city: "Rabat", phone: "0537687173", address: "Rabat - Hay Riad" },
        { name: "Mohammed VI Cancer Center", city: "Casablanca", phone: "0522482020", address: "Casablanca - Aïn Chock" },
        { name: "University Oncology Center", city: "Fès", phone: "0535619100", address: "Fès - CHU Hassan II" },
        { name: "Mohammed VI Oncology Center", city: "Marrakech", phone: "0524300700", address: "Marrakech - Hay Izdihar" },
        { name: "Hassan II Cancer Center", city: "Tanger", phone: "0539393939", address: "Tanger - CHU" },
        { name: "Oncology Center", city: "Oujda", phone: "0536500666", address: "Oujda - CHU" },
      ],
    },
  },
  fr: {
    appName: "Lalla AI",
    tagline: "Votre compagne sur le chemin de la santé mammaire",
    hero: {
      title: "Sensibilisation, dépistage, sérénité",
      subtitle: "Une app intelligente qui vous accompagne pour mieux comprendre votre santé en toute simplicité et confidentialité",
      cta: "Commencer maintenant",
      learn: "En savoir plus",
    },
    nav: {
      home: "Accueil",
      chat: "Parler à Lalla",
      check: "Auto-examen",
      visual: "Examen visuel",
      screening: "Dépistage",
      quiz: "Évaluation",
      learn: "Apprendre",
      doctors: "Médecin",
      reminder: "Rappel",
    },
    features: {
      chat: {
        title: "Parlez à Lalla",
        desc: "Lalla AI répond à toutes vos questions sur la santé mammaire, en toute discrétion",
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
      tip: "Astuce : ",
      guide3d: "Guide 3D",
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
      subtitle: "Informations simples et fiables sur le cancer du sein",
      sections: [
        {
          title: "Qu'est-ce que le cancer du sein ?",
          body: "Le cancer du sein est une croissance anormale de cellules dans le tissu mammaire. C'est le cancer le plus fréquent chez les femmes dans le monde. La bonne nouvelle : détecté tôt, plus de 90% des femmes en guérissent.",
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
          title: "Les chiffres",
          body: "Le cancer du sein touche plus de 2,3 millions de femmes dans le monde chaque année. Au Maroc — où Lalla est née — il représente 36% des cancers féminins, avec plus de 11 000 nouveaux cas par an. Avec un dépistage précoce, la survie dépasse 90%.",
        },
      ],
      resources: "Ressources utiles",
      resourcesList: [
        "OMS — informations et recommandations sur le cancer du sein",
        "Votre société nationale du cancer ou programme de dépistage",
        "Consultez votre médecin pour tout changement constaté",
      ],
    },
    common: {
      backHome: "Retour à l'accueil",
      important: "Important",
      disclaimer: "Cette application est éducative. Elle ne remplace pas un médecin.",
    },
    footer: "Fait avec amour par l'équipe The Da Vinci Code · Vibe Coding Hackathon 2026",
    stats: {
      cancers: "femmes développeront un cancer du sein au cours de leur vie",
      survival: "taux de guérison avec détection précoce",
      cases: "nouveaux cas dans le monde chaque année",
    },
    trust: {
      privacy: { title: "Confidentialité", desc: "Vos données restent chez vous" },
      warm: { title: "Avec bienveillance", desc: "Interface chaleureuse et simple" },
      forWomen: { title: "Pour toutes les femmes", desc: "En anglais et en français" },
    },
    share: {
      title: "Partagez avec vos copines 💖",
      desc: "Si l'app vous a aidée, partagez-la avec votre sœur, mère, amie. L'information sauve des vies 💖",
      whatsapp: "Partager sur WhatsApp",
      copy: "Copier le lien",
      copied: "Copié ✓",
      nativeMessage: "Partagez Lalla AI",
      nativeText: "Cette app aide les femmes à mieux comprendre leur santé mammaire. Essayez-la :",
    },
    architecture: {
      title: "Architecture du projet",
      subtitle: "Comment nous avons conçu Lalla AI — 3 diagrammes",
      backToPitch: "← Retour à la présentation",
      arch: {
        kicker: "01 · Architecture globale",
        title: "3 couches simples",
        desc: "L'architecture sépare la présentation, le serveur et l'IA. Chaque couche a une responsabilité claire.",
        layers: [
          { name: "Utilisatrice", tech: "Navigateur (mobile ou laptop)", role: "Voit l'interface multilingue" },
          { name: "Frontend", tech: "Next.js 16 + React + Tailwind", role: "Pages interactives, guide 3D, bilingue" },
          { name: "Backend", tech: "API Routes (/api/chat, /api/quiz)", role: "Ajoute le system prompt et appelle Gemini" },
          { name: "Intelligence Artificielle", tech: "Google Gemini 2.5 Flash", role: "Génère les réponses" },
        ],
      },
      usecase: {
        kicker: "02 · Cas d'utilisation",
        title: "Ce que peut faire l'utilisatrice",
        desc: "Nous avons identifié 7 cas d'utilisation principaux pour les femmes partout.",
        actor: "Femme",
        cases: [
          "Parler à Lalla (IA)",
          "Faire l'auto-examen",
          "Évaluer son risque",
          "Lire les informations santé",
          "Activer un rappel mensuel",
          "Trouver un centre proche",
          "Partager sur WhatsApp",
        ],
      },
      sequence: {
        kicker: "03 · Diagramme de séquence",
        title: "Comment se déroule une conversation",
        desc: "Ce diagramme montre ce qui se passe quand l'utilisatrice envoie un message à Lalla.",
        actors: ["Utilisatrice", "Navigateur", "Serveur", "Gemini"],
        steps: [
          { from: 0, to: 1, label: "écrit un message" },
          { from: 1, to: 2, label: "POST /api/chat" },
          { from: 2, to: 3, label: "+ system prompt (sois Lalla)" },
          { from: 3, to: 2, label: "← stream texte" },
          { from: 2, to: 1, label: "← chunks stream" },
          { from: 1, to: 0, label: "voit la réponse" },
        ],
      },
    },
    pitch: {
      title: "Lalla AI",
      subtitle: "Code pour la santé, conçu pour l'impact",
      download: "Télécharger en PDF",
      badges: {
        hackathon: "Vibe Coding Hackathon 2026",
        team: "Équipe The Da Vinci Code",
        theme: "Code for Health · Build for Impact",
      },
      problem: {
        kicker: "Le Problème",
        title: "Des femmes meurent car l'information vitale ne les atteint pas à temps",
        stats: [
          { value: "2.3M", label: "nouveaux cas dans le monde / an" },
          { value: "36%", label: "des cancers féminins (Maroc)" },
          { value: "70%", label: "diagnostiqués trop tard" },
        ],
        body: "Le cancer du sein est le cancer le plus fréquent chez les femmes dans le monde. Le vrai problème n'est souvent pas le traitement — c'est que des conseils clairs et fiables n'atteignent pas les femmes sous une forme accessible. La plupart des outils sont cliniques et intimidants. Résultat : trop de femmes sont diagnostiquées tard, quand le traitement est le plus difficile. Lalla est née au Maroc — et la même idée sert les femmes partout.",
      },
      solution: {
        kicker: "Notre Solution",
        title: "Lalla AI — Votre compagne digitale + un guide 3D d'auto-examen",
        body: "Lalla n'est pas une app médicale froide. C'est une compagne chaleureuse, comme votre grande sœur. Elle vous aide à comprendre votre santé, à faire l'auto-examen avec un modèle 3D interactif, et à savoir quand consulter — le tout en un seul endroit, sans gêne, sans complexité.",
        pillars: [
          { icon: "🌍", title: "Pour toutes les femmes", desc: "En anglais et en français" },
          { icon: "🌸", title: "Sensibilité culturelle", desc: "Respect de la pudeur" },
          { icon: "🤖", title: "Intelligence artificielle", desc: "Gemini AI répond instantanément" },
          { icon: "🔒", title: "Confidentialité totale", desc: "Vos données ne sont pas stockées" },
        ],
      },
      conception: {
        kicker: "Notre Approche",
        title: "Avant de coder, on a réfléchi",
        body: "Ce n'est pas un projet improvisé. Avant la première ligne de code, on a défini 4 principes de conception. Tout dans Lalla en découle.",
        principles: [
          { num: "01", title: "L'utilisatrice avant la technologie", desc: "Conçu pour des vraies femmes marocaines, pas des utilisateurs imaginaires." },
          { num: "02", title: "Leur langue, d'abord", desc: "Pas une traduction approximative. Écrit nativement dans chaque langue." },
          { num: "03", title: "Confidentialité par conception", desc: "Pas de base de données. Aucune réponse stockée. Zéro donnée personnelle." },
          { num: "04", title: "Éduquer, pas diagnostiquer", desc: "L'IA est explicitement interdite de diagnostiquer. Toujours orienter vers un médecin." },
        ],
        journey: [
          { step: "01", label: "Elle découvre Lalla" },
          { step: "02", label: "Elle apprend et comprend" },
          { step: "03", label: "Elle fait l'auto-examen" },
          { step: "04", label: "Ça devient une habitude mensuelle" },
        ],
      },
      features: {
        kicker: "Fonctionnalités",
        title: "Tout ce dont vous avez besoin dans une seule app",
        list: [
          { num: "01", title: "Chat avec Lalla (IA)", desc: "Conversation avec IA, entrée vocale, répond à toutes vos questions" },
          { num: "02", title: "Auto-examen guidé", desc: "7 étapes simples avec explications visuelles, pour faire l'examen chez vous" },
          { num: "03", title: "Évaluation du risque", desc: "7 questions + IA qui évalue votre risque et donne des conseils personnalisés" },
          { num: "04", title: "Sensibilisation", desc: "Informations fiables, mythes et vérités, statistiques marocaines" },
          { num: "05", title: "Rappel mensuel", desc: "Intégration calendrier (Google/Apple) pour ne jamais oublier" },
          { num: "06", title: "Centres à proximité", desc: "Principaux centres d'oncologie au Maroc, appel direct en un clic" },
        ],
      },
      innovation: {
        kicker: "Notre Innovation",
        title: "Ce qui nous distingue",
        points: [
          { icon: "🧊", title: "Guide 3D de référence", desc: "Une visualisation 3D interactive de l'auto-examen, synchronisée aux étapes — pas des images statiques" },
          { icon: "🎤", title: "Saisie vocale", desc: "Posez vos questions à la voix, sans les mains — un meilleur accès pour toutes" },
          { icon: "💬", title: "Partage WhatsApp", desc: "Chaque utilisatrice peut envoyer Lalla à sa sœur, mère, amie en un clic" },
          { icon: "🌐", title: "Sans inscription", desc: "Aucun téléphone requis — confidentialité totale" },
        ],
      },
      impact: {
        kicker: "L'Impact",
        title: "Une app qui peut sauver des vies",
        body: "Lalla est accessible à toute femme avec un smartphone. Gratuit, sans inscription, dans sa langue. Notre objectif : que chaque femme, même dans les régions reculées, ait accès à des informations de santé fiables qu'elle comprend.",
        metrics: [
          { value: "100%", label: "Gratuit à l'usage" },
          { value: "0", label: "Données personnelles requises" },
          { value: "2", label: "Langues (anglais + français)" },
          { value: "∞", label: "Potentiel viral" },
        ],
      },
      tech: {
        kicker: "Technologie",
        title: "Construit avec des outils modernes",
        list: [
          "Next.js 16 + TypeScript + Tailwind CSS v4",
          "Google Gemini 2.5 Flash (IA - Free Tier)",
          "Web Speech API (entrée vocale)",
          "Calendar ICS (intégration calendrier)",
          "Vercel (déploiement gratuit avec HTTPS)",
          "Three.js + React Three Fiber (guide 3D interactif)",
        ],
      },
      closing: {
        kicker: "Conclusion",
        title: "Lalla AI = L'espoir, dans votre langue",
        body: "Parfois, la différence entre la vie et la mort, c'est un mot simple, dans une langue comprise, au bon moment. Lalla AI offre ce mot. Pour chaque mère, chaque sœur, chaque amie.",
        cta: "Essayez Lalla maintenant",
      },
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
