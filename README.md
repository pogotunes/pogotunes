<div align="center">
  <img src="https://pogotunes.netlify.app/og-image.png" alt="Pogo Tunes" width="800" />

  # 🎵 Pogo Tunes

  **Fun learning songs, videos, and interactive activities for toddlers and young children**

  <p>
    <a href="https://pogotunes.netlify.app"><img src="https://img.shields.io/badge/Live-Demo-coral?style=for-the-badge&logo=netlify" alt="Live Demo" /></a>
    <a href="https://github.com/pogotunes/pogotunes/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-6BCBFF?style=for-the-badge" alt="License" /></a>
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-16-000?style=for-the-badge&logo=next.js" alt="Next.js 16" /></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" /></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwindcss" alt="Tailwind v4" /></a>
    <a href="https://www.prisma.io"><img src="https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma" alt="Prisma 7" /></a>
  </p>

  <p>
    <a href="https://pogotunes.blogspot.com">Blog</a> •
    <a href="https://www.youtube.com/@Pogotunes">YouTube</a> •
    <a href="https://www.facebook.com/profile.php?id=61590129552207">Facebook</a> •
    <a href="https://www.instagram.com/pogo.tunes/">Instagram</a> •
    <a href="https://in.pinterest.com/pogotunes/">Pinterest</a> •
    <a href="https://x.com/pogotunes">X (Twitter)</a>
  </p>
</div>

---

## 📖 About

Pogo Tunes is an educational platform designed for toddlers and young children (ages 3–10). It makes learning fun through interactive lessons, educational videos, quizzes, flashcards, and games — covering alphabets, numbers, colors, animals, phonics, Hindi, shapes, fruits, vegetables, and more.

Built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **Prisma 7** with a **PostgreSQL (Neon)** database.

---

## ✨ Features

- **32+ Learning Categories** — Math, Science, English, Hindi, Phonics, Art, Music, Coding, and more
- **Interactive Lessons** — Progress tracking with difficulty levels (Beginner to Expert)
- **Educational Games** — 8 unique game types: Memory Match, Color Match, Speed Count, Spelling Bee, Word Match, Sorting, Sliding Puzzle, Maze
- **Video Library** — Curated educational videos with category filtering
- **Quizzes** — Multiple-choice, true/false, and timed quizzes
- **Flashcards** — Digital flashcards with flip animation
- **AI Tutor (Pogo)** — Built-in chatbot powered by OpenRouter (free models)
- **AI Fun Widget** — Generate kid-friendly facts, jokes, stories, and riddles
- **Gamification** — XP points, levels, daily streaks, achievements, leaderboard
- **User Dashboard** — Progress analytics, completed lessons, earned achievements
- **Authentication** — Email/password + social login (Google, Facebook, GitHub)
- **Responsive Design** — Fully optimized from 320px mobile to 4K displays
- **PWA Ready** — Manifest, service worker, app icons
- **SEO Optimized** — Sitemap, OG images, Twitter cards, Google Search Console

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) + [Framer Motion](https://www.framer.com/motion) |
| **Database** | [PostgreSQL](https://neon.tech) (Neon serverless) + [Prisma 7](https://www.prisma.io) ORM |
| **Auth** | JWT (credentials) + OAuth (Google, Facebook, GitHub) |
| **State** | [Zustand](https://github.com/pmndrs/zustand) + [TanStack Query](https://tanstack.com/query) |
| **Forms** | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) |
| **Icons** | [Lucide React](https://lucide.dev) |
| **Deployment** | [Netlify](https://netlify.com) (free tier) |
| **AI** | [OpenRouter](https://openrouter.ai) (free models) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+
- **PostgreSQL** database (or [Neon](https://neon.tech) serverless)
- **npm** or **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/pogotunes/pogotunes.git
cd pogotunes

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL and JWT_SECRET

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database with sample data
npx tsx prisma/seed.ts

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Seed Data

The seed script creates:
- **32 categories** with icons and colors
- **30 lessons** across all categories
- **12 educational videos**
- **7 quizzes** with 3–5 questions each
- **6 flashcard sets** with 6–8 cards each
- **9 games** of varying types and difficulties
- **20 achievements** with XP/coin/star rewards
- **5 blog posts**

**Test account:** `test@test.com` / `password123`

---

## 📁 Project Structure

```
pogotunes/
├── prisma/                  # Database schema, migrations, seed
├── public/                  # Static assets (icons, images, fonts)
├── scripts/                 # Utility scripts (icon generator)
├── src/
│   ├── app/                 # Next.js App Router pages & API routes
│   │   ├── (learning)/      # Learning section pages
│   │   ├── (marketing)/     # Homepage, about, blog
│   │   └── api/             # REST API routes
│   ├── components/          # React components
│   │   ├── ai/              # AI tutor & fun widget
│   │   ├── auth/            # Login/signup forms
│   │   ├── games/           # Interactive game components
│   │   ├── home/            # Homepage sections
│   │   ├── layout/          # Header, footer, navigation
│   │   ├── learning/        # Learning UI components
│   │   └── ui/              # Shared UI primitives
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities, constants, API helpers
│   └── store/               # Zustand stores
└── config files             # next.config, tailwind, eslint, etc.
```

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint across the codebase |
| `npx tsx prisma/seed.ts` | Seed the database with sample data |
| `npx prisma studio` | Open Prisma Studio (database GUI) |
| `npx prisma migrate dev` | Run database migrations |

---

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `JWT_SECRET` | ✅ | Secret key for JWT token signing |
| `JWT_EXPIRES_IN` | ❌ | JWT expiration (default: `7d`) |
| `NEXT_PUBLIC_APP_URL` | ❌ | Public site URL for sitemaps/SEO |
| `OPENROUTER_API_KEY` | ❌ | API key for AI features (get at [openrouter.ai/keys](https://openrouter.ai/keys)) |
| `GOOGLE_CLIENT_ID` | ❌ | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | ❌ | Google OAuth client secret |
| `FACEBOOK_CLIENT_ID` | ❌ | Facebook OAuth client ID |
| `FACEBOOK_CLIENT_SECRET` | ❌ | Facebook OAuth client secret |
| `GITHUB_CLIENT_ID` | ❌ | GitHub OAuth client ID |
| `GITHUB_CLIENT_SECRET` | ❌ | GitHub OAuth client secret |

---

## 🤖 AI Features

Pogo Tunes includes two AI-powered features using [OpenRouter](https://openrouter.ai/keys):

1. **AI Tutor (Pogo)** — Floating chat widget on every page. Ask questions, get help with learning, or just chat with a friendly AI fox.
2. **Pogo's Playtime** — Fun widget on the homepage that generates kid-friendly facts, jokes, stories, and riddles.

Both features work **with or without** an API key — they fall back to built-in content if the API is unavailable.

To enable AI: set `OPENROUTER_API_KEY` in your `.env` file (get a free key at [openrouter.ai/keys](https://openrouter.ai/keys)).

---

## 🌐 Deployment

The project is configured for **Netlify** deployment. Pushes to the `main` branch trigger auto-deploys.

```toml
[build]
  command = "prisma generate && prisma migrate deploy && npm run build"
  publish = ".next"
```

### Key Deployment Notes

- **Database:** Use [Neon](https://neon.tech) serverless PostgreSQL for the free tier
- **Prisma:** Generate client during the Netlify build step (not in postinstall)
- **Environment Variables:** Set `DATABASE_URL`, `JWT_SECRET`, `NEXT_PUBLIC_APP_URL`, and `OPENROUTER_API_KEY` in the Netlify dashboard

---

## 🧪 Interactive Games

All 8 game types have unique gameplay mechanics:

| Game | Type | Description |
|------|------|-------------|
| Memory Match | `MEMORY` | Flip cards to find matching emoji pairs |
| Color Match | `COLOR` | Match color names to displayed colors |
| Speed Count | `SPEED` | Count emojis against a timer |
| Spelling Bee | `SPELLING` | Listen and spell words with speech synthesis |
| Word Match | `MATCHING` | Connect words to their picture matches |
| Sorting Game | `SORTING` | Classify items into category bins |
| Sliding Puzzle | `PUZZLE` | 3×3 sliding tile puzzle |
| Space Maze | `MAZE` | Navigate a rocket through procedural mazes |

---

## 🤝 Contributing

Contributions are welcome! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact & Social

- **Website:** [pogotunes.netlify.app](https://pogotunes.netlify.app)
- **Blog:** [pogotunes.blogspot.com](https://pogotunes.blogspot.com)
- **YouTube:** [@Pogotunes](https://www.youtube.com/@Pogotunes)
- **Facebook:** [Pogo Tunes](https://www.facebook.com/profile.php?id=61590129552207)
- **Instagram:** [@pogo.tunes](https://www.instagram.com/pogo.tunes/)
- **Pinterest:** [/pogotunes](https://in.pinterest.com/pogotunes/)
- **X (Twitter):** [@pogotunes](https://x.com/pogotunes)

---

<div align="center">
  <sub>Built with ❤️ for little learners everywhere</sub>
</div>
