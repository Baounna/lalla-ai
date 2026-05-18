import { google } from "@ai-sdk/google";
import { GoogleGenerativeAI } from "@google/generative-ai";

let _gemini: GoogleGenerativeAI | null = null;

export function gemini() {
  if (!_gemini) {
    _gemini = new GoogleGenerativeAI(
      process.env.GOOGLE_GENERATIVE_AI_API_KEY ?? "",
    );
  }
  return _gemini;
}

export const geminiFlash = google("gemini-2.5-flash-lite");
export const geminiPro = google("gemini-2.5-pro");
export const geminiFlashFull = google("gemini-2.5-flash");
