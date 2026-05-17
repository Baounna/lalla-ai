import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { geminiFlash } from "@/lib/ai";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages, system }: { messages: UIMessage[]; system?: string } =
    await req.json();

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: geminiFlash,
    system:
      system ??
      "You are a helpful health-information assistant. Be concise, empathetic, and clear. Always remind users this is informational, not medical advice.",
    messages: modelMessages,
  });

  return result.toUIMessageStreamResponse();
}
