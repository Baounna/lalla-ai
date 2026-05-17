import { AIChat } from "@/components/templates/AIChat";

export default function ChatPage() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-white dark:from-zinc-950 dark:to-black">
      <div className="max-w-3xl mx-auto pt-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Health AI Assistant</h1>
        <AIChat
          title="Symptom & Wellness Assistant"
          placeholder="Describe your symptoms or ask a health question..."
          systemPrompt="You are a friendly health-information assistant. Be concise, empathetic, and clear. Provide general guidance only. Always remind the user this is informational and not a substitute for professional medical advice. Suggest seeing a doctor for concerning symptoms."
        />
      </div>
    </div>
  );
}
