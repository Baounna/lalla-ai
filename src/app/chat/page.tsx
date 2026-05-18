"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { useLang } from "@/lib/language";

export default function ChatPage() {
  const { lang, t, dir } = useLang();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status } = useChat();

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  const suggestions =
    lang === "ar"
      ? [
          "كيفاش ندير الفحص الذاتي؟",
          "أشنو هي علامات سرطان الثدي؟",
          "متى خاصني نشوف الطبيبة؟",
          "واش الألم ف الثدي عادي؟",
        ]
      : [
          "Comment faire l'auto-examen ?",
          "Quels sont les signes du cancer du sein ?",
          "Quand consulter un médecin ?",
          "Une douleur au sein est-elle normale ?",
        ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 md:py-10">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-200 px-4 py-1.5 rounded-full text-sm font-medium mb-3">
          <Sparkles className="h-4 w-4" />
          {t.appName}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-br from-rose-600 to-pink-600 bg-clip-text text-transparent">
          {t.chat.title}
        </h1>
      </div>

      <Card className="flex flex-col h-[70vh] overflow-hidden border-rose-100 dark:border-rose-950 shadow-xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur p-0">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {messages.length === 0 && (
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-white flex-shrink-0">
                  <Heart className="h-5 w-5 fill-white" />
                </div>
                <div className="bg-rose-50 dark:bg-rose-950/40 rounded-2xl rounded-ss-sm px-4 py-3 max-w-[85%]">
                  <p className="text-sm leading-relaxed">{t.chat.welcome}</p>
                </div>
              </div>
              <div className="pt-2 space-y-2">
                <p className="text-xs text-muted-foreground px-2">
                  {lang === "ar" ? "جربي تسولي:" : "Essayez :"}
                </p>
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      sendMessage({ text: s }, { body: { lang } });
                    }}
                    className="block w-full text-start px-4 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-sm"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => (
            <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                  m.role === "user"
                    ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200"
                    : "bg-gradient-to-br from-rose-500 to-pink-500 text-white"
                }`}
              >
                {m.role === "user" ? "👩" : <Heart className="h-5 w-5 fill-white" />}
              </div>
              <div
                className={`rounded-2xl px-4 py-3 max-w-[85%] ${
                  m.role === "user"
                    ? "bg-rose-500 text-white rounded-se-sm"
                    : "bg-rose-50 dark:bg-rose-950/40 rounded-ss-sm"
                }`}
              >
                <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-p:leading-relaxed">
                  {m.parts.map((p, i) =>
                    p.type === "text" ? <ReactMarkdown key={i}>{p.text}</ReactMarkdown> : null,
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-white flex-shrink-0">
                <Heart className="h-5 w-5 fill-white animate-pulse" />
              </div>
              <div className="bg-rose-50 dark:bg-rose-950/40 rounded-2xl rounded-ss-sm px-4 py-3 flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-rose-500" />
                <span className="text-sm text-muted-foreground">{t.chat.thinking}</span>
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!input.trim() || isLoading) return;
            sendMessage({ text: input }, { body: { lang } });
            setInput("");
          }}
          className="border-t border-rose-100 dark:border-rose-950 p-3 flex gap-2 bg-white/50 dark:bg-zinc-900/50"
          dir={dir}
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.chat.placeholder}
            disabled={isLoading}
            className="rounded-full border-rose-200 focus-visible:ring-rose-400"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-rose-500 hover:bg-rose-600 rounded-full px-5"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </Card>

      <p className="text-xs text-center text-muted-foreground mt-3 px-4">
        ⚠️ {t.chat.disclaimer}
      </p>
    </div>
  );
}
