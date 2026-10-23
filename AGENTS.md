# AI agent guidelines

This file gives AI agents the rules for work in this repository.

## Project

This repository is the résumé site of Lawal Oyinlola. The live site is https://resume.lawaloyinlola.com. The main portfolio is a different repository (`lawalOyinlola/lawalPortfolio`).

The site started from the open-source template [ncdai/chanhdai.com](https://github.com/ncdai/chanhdai.com). The two repositories do not share Git history.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19 and TypeScript
- Tailwind CSS v4
- shadcn/ui, Radix UI, Motion, cmdk
- pnpm

## Structure

```
src/
├── app/                  # Routes: home, llms.txt and .md routes, OG images, vCard, sitemap, robots, manifest
├── components/           # Shared components. ui/ holds shadcn/ui primitives.
├── config/site.ts        # Site URL, résumé downloads, GitHub repository, UTM parameters
├── features/profile/
│   ├── components/       # One folder for each home page section
│   ├── data/             # All personal content
│   └── types/
├── hooks/
├── lib/
├── registry/             # flip-sentences only
├── styles/
└── utils/
```

## Rules

1. Edit content only in `src/features/profile/data/`. Do not write personal content directly into components.
2. Do not rename `src/features/profile/` to `src/features/portfolio/`. Upstream uses `portfolio`. This repository uses `profile`.
3. Read the docs in `node_modules/next/dist/docs/` before you make a claim about a Next.js API.
4. Do not add `next-themes`. `src/components/theme-provider.tsx` replaces it. The reason is in the comment at the top of that file.
5. Do not add a blog, MDX content, or a component registry unless the owner asks for it. The owner removed them on purpose.
6. Keep the code style: semicolons, double quotes, and `simple-import-sort` import order.
7. Do not use names, marks, or likenesses from the upstream author. Read `TRADEMARK.md`.
8. Do not remove the upstream copyright line from `LICENSE`. The MIT license requires it.

## Commands

```bash
pnpm dev           # Start the dev server on port 1408
pnpm lint          # Run ESLint
pnpm check-types   # Run the TypeScript check
pnpm build         # Make a production build
```

`next build` does not run ESLint in Next.js 16. Run `pnpm lint` and `pnpm check-types` before you commit.

## Port changes from upstream

1. Find the change in https://github.com/ncdai/chanhdai.com.
2. Map `src/features/portfolio/` to `src/features/profile/`.
3. Copy the change, then apply the local code style.
4. Remove all upstream personal data and branding from the copied code.
5. Run `pnpm lint`, `pnpm check-types`, and `pnpm build`.
