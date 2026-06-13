# Pogo Tunes 🎵

Educational platform for toddlers and young children — fun learning through songs, videos, and interactive activities. Focuses on alphabets, numbers, colors, animals, phonics, Hindi learning, shapes, fruits, vegetables, and more.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Database:** PostgreSQL (Neon) + Prisma 7
- **State:** Zustand + TanStack Query
- **Auth:** JWT (credentials) + Social providers
- **Icons:** Lucide React
- **Deploy:** Netlify

## Features

- 32+ learning categories (Math, Science, English, Hindi, Phonics, etc.)
- Interactive lessons with progress tracking
- Educational videos library
- Quizzes with multiple-choice and true/false
- Flashcard study with flip animation
- Memory match and other educational games
- Gamification: XP points, levels, streaks, achievements, leaderboard
- User authentication (email + social)
- Parent dashboard with progress analytics
- Blog with educational articles
- Dark/light theme
- Responsive design (320px–4K)

## Getting Started

```bash
npm install
cp .env.example .env  # Configure DATABASE_URL and JWT_SECRET
npx prisma migrate dev
npx tsx prisma/seed.ts  # Optional: seed sample data
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx tsx prisma/seed.ts` | Seed database |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `NEXT_PUBLIC_APP_URL` | Public site URL |

## Deployment

Auto-deploys from `main` branch to Netlify. Build command runs `prisma generate`, `prisma migrate deploy`, and `next build`.

## Social

- Blog: https://pogotunes.blogspot.com
- YouTube: @Pogotunes
- Facebook: /pogotunes
- Instagram: @pogo.tunes
- Pinterest: /pogotunes
- X (Twitter): @pogotunes
