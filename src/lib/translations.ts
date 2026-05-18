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
    share: {
      title: "شاركي لالة مع اللي كتحبي",
      desc: "إيلا عجبك التطبيق، شاركيه مع ختك، أمك، صاحبتك. المعلومة كتنقد حياة 💖",
      whatsapp: "شاركي على واتساب",
      copy: "نسخي الرابط",
      copied: "تنسخ ✓",
      nativeMessage: "شاركي لالة AI",
      nativeText: "ختي، هاد التطبيق كيعاون النساء يفهمو صحة الثدي بالدارجة. جربيه:",
    },
    architecture: {
      title: "هندسة المشروع",
      subtitle: "كيفاش بنينا لالة AI - 3 مخططات",
      backToPitch: "← رجعي للعرض",
      arch: {
        kicker: "01 · المعمارية العامة",
        title: "3 طبقات بسيطة",
        desc: "البنية كاتفصل بين الواجهة، الخادم، والذكاء الاصطناعي. كل طبقة عندها دور محدد.",
        layers: [
          { name: "المستخدمة", tech: "متصفح (موبايل أو لابتوب)", role: "كتشوف الواجهة بالدارجة" },
          { name: "الواجهة الأمامية", tech: "Next.js 16 + React + Tailwind", role: "صفحات تفاعلية، RTL، ثنائية اللغة" },
          { name: "الخادم", tech: "API Routes (/api/chat, /api/quiz)", role: "كيضيف system prompt وكيتصل بـ Gemini" },
          { name: "الذكاء الاصطناعي", tech: "Google Gemini 2.5 Flash", role: "كيولد الأجوبة بالدارجة" },
        ],
      },
      usecase: {
        kicker: "02 · حالات الاستعمال",
        title: "أش تقدر تدير المستخدمة",
        desc: "حددنا 7 حالات استعمال رئيسية للنساء المغربيات.",
        actor: "امرأة مغربية",
        cases: [
          "تهضر مع لالة (AI)",
          "تدير الفحص الذاتي",
          "تقيم مخاطرها",
          "تقرا معلومات صحية",
          "تفعل تذكير شهري",
          "تلقا مركز قريب منها",
          "تشارك على واتساب",
        ],
      },
      sequence: {
        kicker: "03 · مخطط التسلسل",
        title: "كيفاش كاتدير محادثة واحدة",
        desc: "هاد المخطط كيوضح أش كيوقع منين كتسول المستخدمة سؤال للالة.",
        actors: ["مستخدمة", "متصفح", "الخادم", "Gemini"],
        steps: [
          { from: 0, to: 1, label: "كتكتب سؤال" },
          { from: 1, to: 2, label: "POST /api/chat" },
          { from: 2, to: 3, label: "+ system prompt (كوني لالة)" },
          { from: 3, to: 2, label: "← stream النص" },
          { from: 2, to: 1, label: "← قطع stream" },
          { from: 1, to: 0, label: "كتشوف الجواب" },
        ],
      },
    },
    pitch: {
      title: "لالة AI",
      subtitle: "كود من أجل الصحة، بُني من أجل التأثير",
      download: "حملي الـ PDF",
      badges: {
        hackathon: "Vibe Coding Hackathon 2026",
        team: "فريق The Da Vinci Code",
        theme: "Code for Health · Build for Impact",
      },
      problem: {
        kicker: "المشكلة",
        title: "ف المغرب، النساء كيموتو لأن المعلومة ما كاتوصلش",
        stats: [
          { value: "11K+", label: "حالة جديدة كل عام" },
          { value: "36%", label: "من سرطانات النساء" },
          { value: "70%", label: "كيتم تشخيصهم متأخر" },
        ],
        body: "سرطان الثدي كاينقا بزاف ف المغرب. لكن المشكلة ماشي العلاج، المشكلة هي أن المعلومة ما كاتوصلش للنساء بطريقة سهلة. أغلب التطبيقات بالفرنسية ولا الإنجليزية، والمعلومات صعيبة. النتيجة: 7 من كل 10 نساء كيكتشفو السرطان متأخر، فاش يولي العلاج صعيب.",
      },
      solution: {
        kicker: "الحل ديالنا",
        title: "لالة AI - صاحبتك الرقمية بالدارجة",
        body: "لالة ماشي تطبيق طبي بارد، هي صاحبة دافئة كتهضر معاك بالدارجة، كأنها أختك الكبيرة. كتعاونك تفهمي صحتك، تديري الفحص الذاتي، وتعرفي إيمتا خاصك تشوفي الطبيبة - كلشي ف مكان واحد، بدون خجل، بدون تعقيد.",
        pillars: [
          { icon: "🇲🇦", title: "بالدارجة أولاً", desc: "اللغة اللي كتهضرها كل يوم" },
          { icon: "🌸", title: "بحس ثقافي", desc: "احترام للحياء والخصوصية" },
          { icon: "🤖", title: "ذكاء اصطناعي", desc: "Gemini AI كيجاوبك بسرعة" },
          { icon: "🔒", title: "خصوصية كاملة", desc: "معلوماتك ما كاتنخزنش" },
        ],
      },
      conception: {
        kicker: "النهج ديالنا",
        title: "قبل ما نكدّو، فكرنا",
        body: "ماكدّيناش بحال غيرنا. قبل ما نبداو، حددنا 4 مبادئ ديال التصميم. كل شي ف لالة جا منهم.",
        principles: [
          { num: "01", title: "المستخدمة قبل التكنولوجيا", desc: "بنينا للنساء المغربيات الحقيقيات، ماشي مستخدمين افتراضيين." },
          { num: "02", title: "الدارجة من الأول", desc: "ماترجمناش من الفرنسية. كتبنا بالدارجة من البداية." },
          { num: "03", title: "الخصوصية أولاً", desc: "حذفنا قواعد البيانات. الأجوبة ما كاتنحفظش. صفر بيانات شخصية." },
          { num: "04", title: "نعاون ماشي نشخص", desc: "AI ممنوع عليه يشخص. كل جواب كيحيل على الطبيبة." },
        ],
        journey: [
          { step: "01", label: "كتكتشف لالة" },
          { step: "02", label: "كتعلم وكتفهم" },
          { step: "03", label: "كتدير الفحص" },
          { step: "04", label: "كتولي عادة شهرية" },
        ],
      },
      features: {
        kicker: "الميزات الرئيسية",
        title: "كلشي اللي تحتاجي ف تطبيق واحد",
        list: [
          { num: "01", title: "هضري مع لالة (AI)", desc: "محادثة بالدارجة مع AI، بإدخال صوتي، تجاوبك على كل أسئلتك" },
          { num: "02", title: "الفحص الذاتي", desc: "7 خطوات بسيطة مع شرح وصور، باش تديري الفحص فالدار" },
          { num: "03", title: "اختبار المخاطر", desc: "7 أسئلة + AI كيقيم مخاطرك ويعطيك نصائح خاصة بيك" },
          { num: "04", title: "تعلمي وتوعّي", desc: "معلومات موثوقة، أفكار غالطة وحقائق، إحصائيات مغربية" },
          { num: "05", title: "تذكير شهري", desc: "إضافة للكالنضار (Google/Apple) باش متنسايش الفحص" },
          { num: "06", title: "مراكز قريبة", desc: "أهم مراكز الأنكولوجيا فالمغرب، اتصال مباشر بكليك" },
        ],
      },
      innovation: {
        kicker: "الابتكار ديالنا",
        title: "ما عملاتوش الفرق التانية",
        points: [
          { icon: "🎤", title: "الصوت بالدارجة", desc: "أول تطبيق صحي كيفهم الدارجة بالصوت - مهم للنساء اللي ماكيقراوش" },
          { icon: "💬", title: "مشاركة واتساب", desc: "كل مستخدمة تقدر تبعث لالة لختها، أمها، صاحبتها بكليك واحد" },
          { icon: "📅", title: "تكامل مع التقويم", desc: "تذكير دائم، ماشي إشعار مؤقت" },
          { icon: "🌐", title: "بدون تسجيل", desc: "ولا حتى رقم تليفون مطلوب - الخصوصية أولاً" },
        ],
      },
      impact: {
        kicker: "التأثير",
        title: "تطبيق يقدر ينقد حياة",
        body: "لالة موصولة لأي امرأة عندها سمارتفون فالمغرب. مجاني، بدون تسجيل، بالدارجة. هدفنا أن كل امرأة، حتى فالقرى، يكون عندها وصول لمعلومات صحية موثوقة بلغتها.",
        metrics: [
          { value: "100%", label: "مجاني للاستعمال" },
          { value: "0", label: "بيانات شخصية مطلوبة" },
          { value: "2", label: "لغة (دارجة + فرنسية)" },
          { value: "∞", label: "إمكانية الانتشار" },
        ],
      },
      tech: {
        kicker: "التكنولوجيا",
        title: "بُني بأدوات حديثة",
        list: [
          "Next.js 16 + TypeScript + Tailwind CSS v4",
          "Google Gemini 2.5 Flash (AI - Free Tier)",
          "Web Speech API (الإدخال الصوتي)",
          "Calendar ICS (التكامل مع التقويم)",
          "Vercel (نشر مع HTTPS مجاناً)",
          "open source، الكود متاح للجميع",
        ],
      },
      closing: {
        kicker: "الخلاصة",
        title: "لالة AI = أمل بالدارجة",
        body: "أحياناً، الفرق بين الحياة والموت هو كلمة بسيطة، بلغة مفهومة، ف الوقت المناسب. لالة AI كاتقدم هاد الكلمة. لكل أم، لكل أخت، لكل صديقة.",
        cta: "جربي لالة دابا",
      },
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
    share: {
      title: "Partagez Lalla avec celles que vous aimez",
      desc: "Si l'app vous a aidée, partagez-la avec votre sœur, mère, amie. L'information sauve des vies 💖",
      whatsapp: "Partager sur WhatsApp",
      copy: "Copier le lien",
      copied: "Copié ✓",
      nativeMessage: "Partagez Lalla AI",
      nativeText: "Cette app aide les femmes à mieux comprendre leur santé mammaire, en darija. Essayez-la :",
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
          { name: "Utilisatrice", tech: "Navigateur (mobile ou laptop)", role: "Voit l'interface en darija" },
          { name: "Frontend", tech: "Next.js 16 + React + Tailwind", role: "Pages interactives, RTL, bilingue" },
          { name: "Backend", tech: "API Routes (/api/chat, /api/quiz)", role: "Ajoute le system prompt et appelle Gemini" },
          { name: "Intelligence Artificielle", tech: "Google Gemini 2.5 Flash", role: "Génère les réponses en darija" },
        ],
      },
      usecase: {
        kicker: "02 · Cas d'utilisation",
        title: "Ce que peut faire l'utilisatrice",
        desc: "Nous avons identifié 7 cas d'utilisation principaux pour les femmes marocaines.",
        actor: "Femme marocaine",
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
        title: "Au Maroc, des femmes meurent parce que l'information ne les atteint pas",
        stats: [
          { value: "11K+", label: "nouveaux cas par an" },
          { value: "36%", label: "des cancers chez les femmes" },
          { value: "70%", label: "diagnostiqués trop tard" },
        ],
        body: "Le cancer du sein est très répandu au Maroc. Mais le problème n'est pas le traitement — c'est que l'information n'atteint pas les femmes dans leur langue. La plupart des applications sont en français ou anglais, avec un langage médical complexe. Résultat : 7 femmes sur 10 sont diagnostiquées trop tard, quand le traitement devient difficile.",
      },
      solution: {
        kicker: "Notre Solution",
        title: "Lalla AI — Votre compagne digitale en darija",
        body: "Lalla n'est pas une app médicale froide. C'est une compagne chaleureuse qui vous parle en darija, comme votre grande sœur. Elle vous aide à comprendre votre santé, à faire l'auto-examen, et à savoir quand consulter — le tout en un seul endroit, sans gêne, sans complexité.",
        pillars: [
          { icon: "🇲🇦", title: "Darija d'abord", desc: "La langue du quotidien" },
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
          { num: "02", title: "Le darija dès le départ", desc: "Pas une traduction du français. Écrit en darija depuis la première ligne." },
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
          { num: "01", title: "Chat avec Lalla (IA)", desc: "Conversation en darija avec IA, entrée vocale, répond à toutes vos questions" },
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
          { icon: "🎤", title: "Voix en darija", desc: "Première app santé qui comprend le darija à la voix — crucial pour les femmes analphabètes" },
          { icon: "💬", title: "Partage WhatsApp", desc: "Chaque utilisatrice peut envoyer Lalla à sa sœur, mère, amie en un clic" },
          { icon: "📅", title: "Intégration calendrier", desc: "Rappel permanent, pas une notification éphémère" },
          { icon: "🌐", title: "Sans inscription", desc: "Aucun téléphone requis — confidentialité totale" },
        ],
      },
      impact: {
        kicker: "L'Impact",
        title: "Une app qui peut sauver des vies",
        body: "Lalla est accessible à toute femme avec un smartphone au Maroc. Gratuit, sans inscription, en darija. Notre objectif : que chaque femme, même dans les villages reculés, ait accès à des informations de santé fiables dans sa langue.",
        metrics: [
          { value: "100%", label: "Gratuit à l'usage" },
          { value: "0", label: "Données personnelles requises" },
          { value: "2", label: "Langues (darija + français)" },
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
          "Open source, code disponible publiquement",
        ],
      },
      closing: {
        kicker: "Conclusion",
        title: "Lalla AI = L'espoir en darija",
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
