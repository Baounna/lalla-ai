import { generateText } from "ai";
import { geminiFlash } from "@/lib/ai";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { answers, lang }: { answers: { q: string; a: string }[]; lang: "ar" | "fr" } =
    await req.json();

  const answersFormatted = answers
    .map((qa, i) => `${i + 1}. ${qa.q}\n   جواب: ${qa.a}`)
    .join("\n");

  const systemAr = `أنت "لالة"، مساعدة طبية حنونة كتهضر بالدارجة المغربية. عندك إجابات اختبار تقييم مخاطر سرطان الثدي ديال امرأة مغربية.

مهمتك:
1. حللي الإجابات بحذر وتعاطف
2. أعطي تقدير عام للمخاطر (منخفض / متوسط / مرتفع)
3. قدمي 3-5 نصائح شخصية بالدارجة
4. وضحي بوضوح متى خاصها تشوف الطبيبة
5. ماتشخصيش، فقط ارشاد

الجواب يكون JSON فقط، بهاد الشكل:
{
  "level": "low" | "moderate" | "high",
  "title": "عنوان قصير بالدارجة",
  "summary": "ملخص دافئ 2-3 جمل",
  "advice": ["نصيحة 1", "نصيحة 2", "نصيحة 3"],
  "next_step": "الخطوة التالية المهمة",
  "urgent": false | true
}

ركزي على التشجيع والوضوح، ماشي الخوف. إيلا كانت "urgent": true، نصحي بزيارة الطبيب فوراً.`;

  const systemFr = `Tu es "Lalla", une assistante médicale chaleureuse parlant en français. Tu as les réponses d'un test d'évaluation des risques de cancer du sein d'une femme marocaine.

Ta mission :
1. Analyse les réponses avec empathie et soin
2. Donne une estimation générale du risque (faible / modéré / élevé)
3. Fournis 3-5 conseils personnalisés
4. Précise clairement quand consulter
5. Ne diagnostique pas, oriente seulement

Réponds en JSON UNIQUEMENT, format :
{
  "level": "low" | "moderate" | "high",
  "title": "Titre court",
  "summary": "Résumé chaleureux en 2-3 phrases",
  "advice": ["conseil 1", "conseil 2", "conseil 3"],
  "next_step": "Prochaine étape importante",
  "urgent": false | true
}

Sois encourageante et claire, pas alarmiste. Si "urgent": true, recommande de consulter immédiatement.`;

  const system = lang === "ar" ? systemAr : systemFr;
  const userPrompt = (lang === "ar" ? "الإجابات:" : "Réponses :") + "\n" + answersFormatted;

  const { text } = await generateText({
    model: geminiFlash,
    system,
    prompt: userPrompt,
  });

  let parsed;
  try {
    const cleaned = text.replace(/```json|```/g, "").trim();
    parsed = JSON.parse(cleaned);
  } catch {
    parsed = {
      level: "moderate",
      title: lang === "ar" ? "نتيجة الاختبار" : "Résultat",
      summary: text,
      advice: [],
      next_step: lang === "ar" ? "شوفي الطبيبة" : "Consultez un médecin",
      urgent: false,
    };
  }

  return Response.json(parsed);
}
