# Lawal Oyinlola — Résumé / Portfolio

A minimalist résumé and portfolio site for **Lawal Oyinlola**, Frontend Engineer (full-stack capable). Built and maintained by Lawal Oyinlola, on top of the open-source [chanhdai.com](https://chanhdai.com) template.

Live: **[resume.lawaloyinlola.com](https://resume.lawaloyinlola.com)** · Main portfolio: **[lawaloyinlola.com](https://lawaloyinlola.com)**

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/public/images/screenshot-dark.webp">
  <source media="(prefers-color-scheme: light)" srcset="/public/images/screenshot.webp">
  <img src="/public/images/screenshot-dark.webp" alt="Screenshot of resume.lawaloyinlola.com">
</picture>

## Overview

### Tech Stack

- Next.js 16 (App Router, Turbopack)
- React 19 + TypeScript
- Tailwind CSS v4
- shadcn/ui + Radix UI + Motion

### Features

- Clean, responsive, light & dark design
- Frontend-first positioning with full-stack range
- One-click **résumé download** (Frontend & Software Engineer CVs, with Google Drive mirrors)
- vCard export
- Rich SEO: [JSON-LD](https://json-ld.org) `ProfilePage` + `Person` schema (with `sameAs`, `worksFor`, `alumniOf`, `knowsAbout`), sitemap, robots
- AI-discoverable: explicit AI-crawler allowances and [`/llms.txt`](https://llmstxt.org) + `/llms-full.txt`
- Spam-protected email and phone
- Installable PWA

## Development

Please refer to the [Development Guide](./DEVELOPMENT.md) for setup and scripts.

## License

Licensed under the [MIT license](./LICENSE). © Lawal Oyinlola.

If you reuse this code, please remove all personal information (name, contact details, résumé PDFs, projects, and analytics) before publishing your own site.

## Acknowledgments

- Built on the open-source [chanhdai.com](https://chanhdai.com) portfolio template by [Nguyen Chanh Dai (@ncdai)](https://github.com/ncdai). Thank you for the original design and engineering.
- The open-source community for the tools and libraries that power this site: [React](https://react.dev), [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), [Radix UI](https://www.radix-ui.com), [Motion](https://motion.dev), [shadcn/ui](https://ui.shadcn.com), [Lucide](https://lucide.dev), and others listed in `package.json`.
