# Contributing to Pogo Tunes

Thank you for considering contributing to Pogo Tunes! We welcome contributions that make learning more fun for kids everywhere.

## Code of Conduct

By participating in this project, you agree to abide by the [Code of Conduct](CODE_OF_CONDUCT.md).

## How to Contribute

### Reporting Bugs

1. Check the [issues](https://github.com/pogotunes/pogotunes/issues) to avoid duplicates.
2. Use the **Bug Report** template when creating an issue.
3. Include clear steps to reproduce, expected behavior, and actual behavior.

### Suggesting Features

1. Open a [feature request](https://github.com/pogotunes/pogotunes/issues/new?template=feature_request.md).
2. Describe the feature, why it's useful, and how it should work.
3. Tag with `enhancement`.

### Pull Requests

1. **Fork** the repository.
2. **Create a branch**: `git checkout -b feat/my-feature` or `fix/my-bug`.
3. **Make your changes** following the code style and conventions.
4. **Run the linter**: `npm run lint`.
5. **Build**: `npm run build` — must pass with zero errors.
6. **Commit** with a clear, descriptive message (see [Conventional Commits](https://www.conventionalcommits.org/)).
7. **Push** and open a **Pull Request** using the PR template.

## Development Setup

```bash
npm install
cp .env.example .env
npx prisma migrate dev
npx tsx prisma/seed.ts
npm run dev
```

## Code Style

- **TypeScript** strict mode — no `any` types
- **Tailwind CSS** v4 utility classes — no inline styles unless dynamic
- **Framer Motion** for animations — match existing patterns
- **ESLint** — run `npm run lint` before committing
- **Imports** — group by: external, internal, relative

## Project Conventions

- Components go in `src/components/<domain>/`
- API routes in `src/app/api/<resource>/route.ts`
- Prisma queries use `findFirst` with `status: "PUBLISHED"` for slug lookups
- Games implement a `GamePlayer` switch component in `src/components/games/game-player.tsx`

## Questions?

Open a [discussion](https://github.com/pogotunes/pogotunes/discussions) or reach out on social media.
