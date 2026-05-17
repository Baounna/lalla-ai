import Link from "next/link";
import { Heart, MessageSquare, ImagePlus, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-zinc-950 dark:via-black dark:to-zinc-900">
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-12">
        <header className="space-y-4 text-center">
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="h-3 w-3" /> Vibe Coding Hackathon 2026
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight flex items-center justify-center gap-3">
            <Heart className="h-10 w-10 text-rose-500" />
            Code for Health
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Built with care by <span className="font-semibold text-foreground">The Da Vinci Code</span> 🎨
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2">
          <Link href="/chat">
            <Card className="p-6 hover:border-primary transition-colors cursor-pointer h-full">
              <MessageSquare className="h-8 w-8 text-blue-500 mb-3" />
              <h2 className="text-xl font-semibold mb-1">AI Chat</h2>
              <p className="text-sm text-muted-foreground">
                Streaming chat powered by Claude. Customize the system prompt for any health-assistant brief.
              </p>
            </Card>
          </Link>

          <Link href="/analyze">
            <Card className="p-6 hover:border-primary transition-colors cursor-pointer h-full">
              <ImagePlus className="h-8 w-8 text-emerald-500 mb-3" />
              <h2 className="text-xl font-semibold mb-1">Image Analysis</h2>
              <p className="text-sm text-muted-foreground">
                Upload an image (skin, X-ray, prescription) and let Claude analyze it. Great for diagnostic-assist demos.
              </p>
            </Card>
          </Link>
        </section>

        <footer className="text-center text-sm text-muted-foreground pt-8 border-t">
          <p className="pt-4">
            <span className="font-medium">Team: The Da Vinci Code</span> · Code for Health · Vibe Coding Hackathon 2026
          </p>
        </footer>
      </main>
    </div>
  );
}
