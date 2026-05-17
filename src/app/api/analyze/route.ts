import { gemini } from "@/lib/ai";

export const maxDuration = 60;

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const prompt =
    (formData.get("prompt") as string | null) ??
    "Describe what's in this image and summarize key findings.";

  if (!file) {
    return Response.json({ error: "No file provided" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString("base64");

  const model = gemini().getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent([
    { inlineData: { data: base64, mimeType: file.type } },
    { text: prompt },
  ]);

  const text = result.response.text();
  return Response.json({ result: text });
}
