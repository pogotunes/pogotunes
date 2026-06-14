# Pogo Tunes

Educational platform for toddlers and young children. Built with Next.js 16, TypeScript, Tailwind CSS v4, and Prisma 7.

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build (must pass before PR)
- `npm run lint` — ESLint
- `npx tsx prisma/seed.ts` — Seed database

## Key Conventions
- Match existing glassmorphism design (Baloo 2 font, Framer Motion spring animations, rounded corners, gradients)
- Read existing files before writing new ones
- Reuse existing hooks, stores, and utilities — no duplicates
- Components in `src/components/<domain>/`, API routes in `src/app/api/<resource>/route.ts`
- Prisma slug lookups use `findFirst` with `status: "PUBLISHED"`
- Game types route through `src/components/games/game-player.tsx`
