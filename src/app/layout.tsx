import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lalla-ai.vercel.app"),
  title: {
    default: "Lalla AI · Interactive 3D Breast Self-Exam & Awareness",
    template: "%s · Lalla AI",
  },
  description:
    "An AI companion that guides women through breast self-examination with a research-grade interactive 3D guide, a mammogram density simulator, and a private camera self-check. Bilingual (English & French). Born in Morocco, designed for the world.",
  keywords: [
    "breast cancer",
    "breast self-examination",
    "3D self-exam guide",
    "mammogram",
    "BI-RADS",
    "BSE",
    "AI health",
    "women health",
    "early detection",
    "breast cancer awareness",
  ],
  authors: [{ name: "The Da Vinci Code" }],
  openGraph: {
    title: "Lalla AI · Interactive 3D Breast Self-Exam",
    description:
      "A warm AI companion + a research-grade interactive 3D guide for breast self-examination. Bilingual (EN/FR), private, free. Born in Morocco, for every woman.",
    siteName: "Lalla AI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lalla AI · Interactive 3D Breast Self-Exam",
    description: "AI breast-health companion with a research-grade 3D self-exam guide, mammogram simulator & private camera check.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-gradient-to-br from-rose-50 via-white to-pink-50 dark:from-zinc-950 dark:via-black dark:to-zinc-900">
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
