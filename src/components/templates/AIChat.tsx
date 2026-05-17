"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

type Props = {
  systemPrompt?: string;
  placeholder?: string;
  title?: string;
};

export function AIChat({
  systemPrompt,
  placeholder = "Ask anything...",
  title = "AI Assistant",
}: Props) {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    transport: undefined,
  });

  const isLoading = status === "submitted" || status === "streaming";

  return (
    <Card className="flex flex-col h-[600px] w-full max-w-2xl mx-auto p-0 overflow-hidden">
      <div className="border-b px-4 py-3 font-semibold">{title}</div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <p className="text-muted-foreground text-center mt-12">
            Start the conversation
          </p>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-[80%] prose prose-sm dark:prose-invert ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {m.parts.map((p, i) =>
                p.type === "text" ? (
                  <ReactMarkdown key={i}>{p.text}</ReactMarkdown>
                ) : null,
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Thinking...
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim() || isLoading) return;
          sendMessage(
            { text: input },
            { body: systemPrompt ? { system: systemPrompt } : undefined },
          );
          setInput("");
        }}
        className="border-t p-3 flex gap-2"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading || !input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </Card>
  );
}
