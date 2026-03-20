# Kichu Weds Dathan 💍

A cinematic South Indian wedding invitation website built with Next.js 16, Framer Motion, and Tailwind CSS v4.

**Wedding Date:** February 14, 2027 · Madurai, Tamil Nadu  
**Hashtag:** #MeenuWedsKarthik

---

## Getting Started

`ash
npm install
npm run dev   # http://localhost:3000
npm run build
`

## Configuration

All content lives in `src/lib/constants.ts`.

### Wedding photos
Copy photos to `public/gallery/photo-1.jpg` through `photo-15.jpg`.

### Background music
Set `WEDDING.music.url` in `constants.ts` to your MP3 URL.

### RSVP → Google Sheets (Zapier)
1. Create a Zap: Webhooks Catch Hook → Google Sheets Create Row
2. Add to `.env.local`:
   `NEXT_PUBLIC_ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/XXXX/`

## Deploy to Vercel
Push to GitHub → connect to Vercel → add the env var in Vercel dashboard.

## Tech Stack
Next.js 16, React 19, TypeScript, Tailwind v4, Framer Motion 12, GSAP 3, Lenis, React Hook Form