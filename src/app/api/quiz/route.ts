import { generateText } from "ai";
import { geminiFlash } from "@/lib/ai";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { answers, lang }: { answers: { q: string; a: string }[]; lang: "en" | "fr" } =
    await req.json();

  const answerLabel = lang === "fr" ? "Réponse" : "Answer";
  const answersFormatted = answers
    .map((qa, i) => `${i + 1}. ${qa.q}\n   ${answerLabel}: ${qa.a}`)
    .join("\n");

  const systemEn = `You are "Lalla", a warm health companion. You have the answers to a breast-cancer risk-awareness quiz from a woman.

Your task:
1. Analyze the answers with empathy and care
2. Give a general risk estimate (low / moderate / high)
3. Provide 3-5 personalized tips
4. Clearly state when she should see a doctor
5. Do NOT diagnose, only guide

Respond in JSON ONLY, in this format:
{
  "level": "low" | "moderate" | "high",
  "title": "A short title",
  "summary": "A warm 2-3 sentence summary",
  "advice": ["tip 1", "tip 2", "tip 3"],
  "next_step": "The important next step",
  "urgent": false | true
}

Be encouraging and clear, not alarmist. If "urgent": true, recommend seeing a doctor immediately.`;

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

  const system = lang === "fr" ? systemFr : systemEn;
  const userPrompt =
    (lang === "fr" ? "Réponses :" : "Answers:") + "\n" + answersFormatted;

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
      title: lang === "fr" ? "Résultat" : "Your result",
      summary: text,
      advice: [],
      next_step: lang === "fr" ? "Consultez un médecin" : "See a doctor",
      urgent: false,
    };
  }

  return Response.json(parsed);
}
