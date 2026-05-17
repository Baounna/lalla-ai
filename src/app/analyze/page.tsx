import { FileUploadAnalyze } from "@/components/templates/FileUploadAnalyze";

export default function AnalyzePage() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-emerald-50 to-white dark:from-zinc-950 dark:to-black">
      <div className="max-w-3xl mx-auto pt-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Medical Image Analysis</h1>
        <FileUploadAnalyze
          title="Upload & Analyze (Informational)"
          defaultPrompt="You are an AI assistant helping a clinician triage. Describe what you see in this image, list any notable features, and flag anything that warrants closer review. This is informational, not a diagnosis."
        />
      </div>
    </div>
  );
}
