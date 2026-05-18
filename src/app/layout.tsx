import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const tajawal = Tajawal({
  weight: ["400", "500", "700", "900"],
  subsets: ["arabic", "latin"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lalla-ai.vercel.app"),
  title: {
    default: "Lalla AI · صحة الثدي · The Da Vinci Code",
    template: "%s · Lalla AI",
  },
  description:
    "تطبيق ذكي للتوعية بسرطان الثدي والفحص الذاتي بالدارجة - Application IA pour la sensibilisation au cancer du sein chez les femmes marocaines",
  keywords: [
    "breast cancer",
    "Morocco",
    "darija",
    "self-examination",
    "AI",
    "health",
    "سرطان الثدي",
    "الفحص الذاتي",
    "صحة المرأة",
  ],
  authors: [{ name: "The Da Vinci Code" }],
  openGraph: {
    title: "Lalla AI · لالة AI",
    description:
      "تطبيق ذكي بالدارجة للتوعية بسرطان الثدي والفحص الذاتي للنساء المغربيات",
    siteName: "Lalla AI",
    locale: "ar_MA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lalla AI · Code for Health",
    description: "AI breast cancer awareness for Moroccan women, in Darija",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning className={`${tajawal.variable} h-full antialiased`}>
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
