# Development

This guide shows how to set up and run the project on your computer.

## Prerequisites

- [Node.js](https://nodejs.org/) 22
- [pnpm](https://pnpm.io/) 10 or later
- [Git](https://git-scm.com/)

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/lawalOyinlola/resumePortfolio.git
cd resumePortfolio
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set the environment variables

Copy `.env.example` to `.env.local`, then edit the values:

```bash
cp .env.example .env.local
```

### 4. Start the development server

```bash
pnpm dev
```

Open http://localhost:1408 in your browser.

## Scripts

| Script              | What it does                                |
| ------------------- | ------------------------------------------- |
| `pnpm dev`          | Starts the development server on port 1408  |
| `pnpm build`        | Makes a production build                    |
| `pnpm start`        | Serves the production build                 |
| `pnpm preview`      | Builds, then serves the build on port 1408  |
| `pnpm lint`         | Runs ESLint on the project                  |
| `pnpm lint:fix`     | Runs ESLint and applies the automatic fixes |
| `pnpm check-types`  | Runs the TypeScript compiler without output |
| `pnpm format:check` | Checks the formatting with Prettier         |
| `pnpm format:write` | Formats the files with Prettier             |

Next.js 16 removed `next lint`, and `next build` does not run ESLint. Run `pnpm lint` and `pnpm check-types` before you open a pull request. The pre-commit hook runs ESLint and Prettier on the staged files.

## CI

GitHub Actions runs on every pull request and every push to `main`:

| Workflow       | Jobs                                                                |
| -------------- | ------------------------------------------------------------------- |
| `ci.yml`       | Type check, lint, and build. `pnpm audit` fails on high or critical |
| `security.yml` | gitleaks on the full history, and CodeQL. Also runs every Monday    |

Dependabot opens update pull requests every Monday, two weeks after a release. Security updates do not wait. All third-party actions are pinned to a commit SHA.

## Content

The site content lives in `src/features/profile/data/`:

| File                | Content                                   |
| ------------------- | ----------------------------------------- |
| `user.ts`           | Name, bio, contact details, current roles |
| `experiences.ts`    | Work history                              |
| `volunteering.ts`   | Volunteer roles                           |
| `projects.ts`       | Security labs and projects                |
| `tech-stack.ts`     | Tools, grouped by category                |
| `awards.ts`         | Awards                                    |
| `certifications.ts` | Certifications                            |
| `testimonials.ts`   | Testimonials                              |
| `social-links.ts`   | Social profiles                           |
| `greetings.ts`      | Time-of-day greetings in the header       |

The `/llms.txt`, `/llms-full.txt`, and per-section `.md` routes read the same data. You do not need to edit them when the content changes.

## Building for production

```bash
pnpm build
NODE_ENV=production pnpm start
```

## Upstream

This project started from [ncdai/chanhdai.com](https://github.com/ncdai/chanhdai.com). To compare with the upstream code:

```bash
git remote add upstream https://github.com/ncdai/chanhdai.com.git
git fetch upstream
```

The two repositories do not share Git history, so `git merge upstream/main` does not work. Port changes one file at a time. Upstream uses `src/features/portfolio/`, and this repository uses `src/features/profile/`.
