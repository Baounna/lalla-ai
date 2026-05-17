@AGENTS.md

# Vibe Coding Hackathon 2026 — Starter

## Project context
Solo competitor, AI student. Theme: **"Code for Health. Build for Impact"** (1st edition Vibe Coding Hackathon, 2026-05-18). Specific problem revealed at start. Optimize for **demo speed, not production**.

## Stack
- Next.js 16 (App Router) + TypeScript + Tailwind v4
- shadcn/ui (components in `src/components/ui/`)
- **Google Gemini** (FREE) via `@ai-sdk/google` + `@google/generative-ai`
- Vercel AI SDK (`ai`) — for streaming chat UI
- Supabase (`@supabase/supabase-js`, `@supabase/ssr`) — DB + auth (optional)
- Recharts — charts
- lucide-react — icons

**Default model:** `gemini-2.5-flash` (free, supports text + vision)

## Commands
- `npm run dev` — local dev (http://localhost:3000)
- `npm run build` — production build
- `npm run lint` — eslint

## Conventions
- App Router with `src/app/`
- API routes in `src/app/api/*/route.ts`
- Server Components by default; add `"use client"` only when needed
- AI calls happen in API routes (never expose keys to client)
- Reusable templates live in `src/components/templates/` — copy & adapt
- Supabase helpers in `src/lib/supabase/`

## Hackathon-mode rules
- **Working > pretty > clever.** Always.
- Hardcode demo data freely. Real DB only if it matters for the pitch.
- Skip auth unless the brief requires it. Use `localStorage` for session.
- No tests. No type-strictness debates. No refactors.
- Skip error handling on internal calls. Only handle errors the demo flow will surface.
- Comment ZERO. Names explain the code.
- For health: never say "diagnose" — use "assist", "informational", "screening".

## Templates available
- `src/components/templates/AIChat.tsx` — streaming chat UI (Claude-powered)
- `src/components/templates/FileUploadAnalyze.tsx` — upload + AI analysis
- `src/app/api/chat/route.ts` — streaming chat endpoint
- `src/app/api/analyze/route.ts` — image/text analysis endpoint
- `python-fallback/streamlit_app.py` — Streamlit backup for ML-heavy briefs

## When user asks for new features
1. Re-read the topic brief. Don't drift.
2. Smallest demoable scope first.
3. Reuse templates above — copy, rename, adapt.
4. Show working UI before polishing logic.

## Deploy
- Push to GitHub → Vercel auto-deploys (set up before competition).
- Add env vars in Vercel dashboard: `GOOGLE_GENERATIVE_AI_API_KEY` (required), plus Supabase keys if used.

## Next.js 16 caveats
This repo uses Next.js 16, which has breaking changes from older versions. Check `node_modules/next/dist/docs/` if API behavior surprises you.
