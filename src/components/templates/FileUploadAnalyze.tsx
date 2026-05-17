"use client";

import { useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ReactMarkdown from "react-markdown";

type Props = {
  defaultPrompt?: string;
  title?: string;
};

export function FileUploadAnalyze({
  defaultPrompt = "Describe what's in this image. Highlight anything a clinician should pay attention to. Note: this is informational only, not a diagnosis.",
  title = "Upload & Analyze",
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setResult(null);

    const fd = new FormData();
    fd.append("file", file);
    fd.append("prompt", prompt);

    const res = await fetch("/api/analyze", { method: "POST", body: fd });
    const data = await res.json();
    setResult(data.result ?? data.error ?? "No result");
    setLoading(false);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="file">Image</Label>
          <Input
            id="file"
            type="file"
            accept="image/*"
            className="block w-full text-sm mt-1 file:mr-3 file:px-3 file:py-1.5 file:rounded file:border-0 file:bg-primary file:text-primary-foreground"
            onChange={(e) => {
              const f = e.target.files?.[0] ?? null;
              setFile(f);
              setPreview(f ? URL.createObjectURL(f) : null);
            }}
          />
        </div>

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="max-h-64 rounded border object-contain"
          />
        )}

        <div>
          <Label htmlFor="prompt">Analysis prompt</Label>
          <Textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
          />
        </div>

        <Button type="submit" disabled={!file || loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" /> Analyzing...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" /> Analyze
            </>
          )}
        </Button>
      </form>

      {result && (
        <div className="border-t pt-4 prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown>{result}</ReactMarkdown>
        </div>
      )}
    </Card>
  );
}
