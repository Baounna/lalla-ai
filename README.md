# 🩺 Lalla AI — Interactive 3D Breast Self-Exam & AI Awareness Companion

An AI companion that guides women through a **breast self-examination (BSE)** using a **research-grade interactive 3D guide**, plus a warm AI chat, a private risk check, and monthly reminders.

> Early detection of breast cancer means survival rates above 90%. Lalla makes the life-saving self-exam clear, private, and easy — for every woman.
>
> Born in Morocco for a *Code for Health* hackathon · rebuilt for the world.

**Live demo:** https://lalla-ai.vercel.app

---

## ✨ Features

| Feature | What it does |
|---------|--------------|
| 🧊 **3D self-exam guide** | A real-time 3D model (Three.js / React Three Fiber) that rotates in-browser. Each step lights up the relevant region and animates the correct circular + clock-method palpation path. |
| 🤖 **AI companion (chat)** | Ask anything about breast health, privately. The model educates — it never diagnoses, and always points to a doctor for concerns. |
| 🧮 **Risk check** | 7 short questions + an AI-assisted, encouraging summary. Answers are never stored. |
| 🔔 **Monthly reminder** | One-tap calendar (Google/Apple) reminder so the self-exam becomes a habit. |
| 📚 **Learn** | Trusted information, myths vs. facts, key statistics. |
| 🏥 **Centers** | Major oncology centers with one-tap call. |
| 🌍 **Multilingual** | English (default) + French. No sign-up, no data stored. |

## 🧱 Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **React Three Fiber + Three.js + drei** — the interactive 3D self-exam guide
- **Tailwind CSS v4** + shadcn/ui
- **Claude / Google Gemini** via the Vercel AI SDK — streaming chat + risk analysis
- **Vercel** — deployment

## 🚀 Run locally

```bash
npm install
cp .env.example .env.local   # add your AI API key
npm run dev                  # http://localhost:3000
```

Environment variables (`.env.local`):

```
GOOGLE_GENERATIVE_AI_API_KEY=...   # or your Anthropic key, depending on the provider used
```

## 🗂️ Project structure

```
src/
├── app/
│   ├── page.tsx              # landing
│   ├── check/                # 3D-guided self-exam  ← centerpiece
│   ├── chat/                 # AI companion
│   ├── quiz/                 # risk check
│   ├── learn/ doctors/ reminder/ pitch/ architecture/
│   └── api/{chat,quiz}/route.ts
├── components/
│   ├── SelfCheck3D.tsx       # the interactive 3D guide
│   └── ui/                   # shadcn primitives
└── lib/
    ├── translations.ts       # English + French copy
    └── language.tsx          # language provider
```

## ⚕️ Disclaimer

Lalla AI is an **educational tool**. It does **not** diagnose and does **not** replace a doctor. If you notice any change, please see a healthcare professional.

---

Made with 💖 by The Da Vinci Code · originally for the Vibe Coding Hackathon 2026.
