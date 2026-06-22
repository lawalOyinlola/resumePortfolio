import type { TechStack } from "../types/tech-stack";

const si = (slug: string) => `https://cdn.simpleicons.org/${slug}`;
const ix = (set: string, name: string) =>
  `https://api.iconify.design/${set}:${name}.svg`;

// Grouped into a small, scannable set of categories (chanhdai-style, max 6).
// The `category` of each item drives the numbered rows in the Stack section,
// and the order below is the order the categories appear in.
export const TECH_STACK: TechStack[] = [
  // ── Language ──────────────────────────────────────────────────────────
  {
    title: "TypeScript",
    href: "https://www.typescriptlang.org/",
    icon: si("typescript"),
    category: "Language",
  },
  {
    title: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    icon: si("javascript"),
    category: "Language",
  },
  {
    title: "Python",
    href: "https://www.python.org/",
    icon: si("python"),
    category: "Language",
  },
  {
    title: "PHP",
    href: "https://www.php.net/",
    icon: si("php"),
    category: "Language",
  },

  // ── Frontend ──────────────────────────────────────────────────────────
  {
    title: "React",
    href: "https://react.dev/",
    icon: si("react"),
    category: "Frontend",
  },
  {
    title: "Next.js",
    href: "https://nextjs.org/",
    icon: si("nextdotjs"),
    category: "Frontend",
  },
  {
    title: "Vue",
    href: "https://vuejs.org/",
    icon: si("vuedotjs"),
    category: "Frontend",
  },
  {
    title: "Tailwind CSS",
    href: "https://tailwindcss.com/",
    icon: si("tailwindcss"),
    category: "Frontend",
  },
  {
    title: "shadcn/ui",
    href: "https://ui.shadcn.com/",
    icon: si("shadcnui"),
    category: "Frontend",
  },
  {
    title: "Radix UI",
    href: "https://www.radix-ui.com/",
    icon: si("radixui"),
    category: "Frontend",
  },
  {
    title: "Motion",
    href: "https://motion.dev/",
    icon: si("framer"),
    category: "Frontend",
  },
  {
    title: "GSAP",
    href: "https://gsap.com/",
    icon: si("greensock"),
    category: "Frontend",
  },
  {
    title: "Redux Toolkit",
    href: "https://redux-toolkit.js.org/",
    icon: si("redux"),
    category: "Frontend",
  },
  {
    title: "React Router",
    href: "https://reactrouter.com/",
    icon: si("reactrouter"),
    category: "Frontend",
  },
  {
    title: "React Hook Form",
    href: "https://react-hook-form.com/",
    icon: si("reacthookform"),
    category: "Frontend",
  },
  {
    title: "TanStack Query",
    href: "https://tanstack.com/query",
    icon: si("reactquery"),
    category: "Frontend",
  },
  {
    title: "Zod",
    href: "https://zod.dev/",
    icon: si("zod"),
    category: "Frontend",
  },
  {
    title: "Figma",
    href: "https://www.figma.com/",
    icon: ix("logos", "figma"),
    category: "Frontend",
  },

  // ── Backend & Database ────────────────────────────────────────────────
  {
    title: "Node.js",
    href: "https://nodejs.org/",
    icon: si("nodedotjs"),
    category: "Backend & Database",
  },
  {
    title: "NestJS",
    href: "https://nestjs.com/",
    icon: si("nestjs"),
    category: "Backend & Database",
  },
  {
    title: "Laravel",
    href: "https://laravel.com/",
    icon: si("laravel"),
    category: "Backend & Database",
  },
  {
    title: "Socket.io",
    href: "https://socket.io/",
    icon: si("socketdotio"),
    category: "Backend & Database",
  },
  {
    title: "PostgreSQL",
    href: "https://www.postgresql.org/",
    icon: si("postgresql"),
    category: "Backend & Database",
  },
  {
    title: "MongoDB",
    href: "https://www.mongodb.com/",
    icon: si("mongodb"),
    category: "Backend & Database",
  },
  {
    title: "MariaDB",
    href: "https://mariadb.org/",
    icon: si("mariadb"),
    category: "Backend & Database",
  },
  {
    title: "Prisma",
    href: "https://www.prisma.io/",
    icon: si("prisma"),
    category: "Backend & Database",
  },
  {
    title: "Drizzle ORM",
    href: "https://orm.drizzle.team/",
    icon: si("drizzle"),
    category: "Backend & Database",
  },
  {
    title: "Better Auth",
    href: "https://www.better-auth.com/",
    icon: si("betterauth"),
    category: "Backend & Database",
  },

  // ── Workflow & AI (incl. package managers & devtools) ─────────────────
  {
    title: "Claude",
    href: "https://claude.ai/",
    icon: si("claude"),
    category: "Workflow & AI",
  },
  {
    title: "Gemini",
    href: "https://gemini.google.com/",
    icon: si("googlegemini"),
    category: "Workflow & AI",
  },
  {
    title: "ChatGPT",
    href: "https://chatgpt.com/",
    icon: ix("logos", "openai-icon"),
    category: "Workflow & AI",
  },
  {
    title: "Cursor",
    href: "https://cursor.com/",
    icon: si("cursor"),
    category: "Workflow & AI",
  },
  {
    title: "n8n",
    href: "https://n8n.io/",
    icon: si("n8n"),
    category: "Workflow & AI",
  },
  {
    title: "CodeRabbit",
    href: "https://coderabbit.ai/",
    icon: si("coderabbit"),
    category: "Workflow & AI",
  },
  {
    title: "Git",
    href: "https://git-scm.com/",
    icon: si("git"),
    category: "Workflow & AI",
  },
  {
    title: "GitHub",
    href: "https://github.com/",
    icon: si("github"),
    category: "Workflow & AI",
  },
  {
    title: "GitHub Actions",
    href: "https://github.com/features/actions",
    icon: si("githubactions"),
    category: "Workflow & AI",
  },
  {
    title: "Docker",
    href: "https://www.docker.com/",
    icon: si("docker"),
    category: "Workflow & AI",
  },
  {
    title: "NGINX",
    href: "https://nginx.org/",
    icon: si("nginx"),
    category: "Workflow & AI",
  },
  {
    title: "Bun",
    href: "https://bun.sh/",
    icon: si("bun"),
    category: "Workflow & AI",
  },
  {
    title: "pnpm",
    href: "https://pnpm.io/",
    icon: si("pnpm"),
    category: "Workflow & AI",
  },
  {
    title: "yarn",
    href: "https://yarnpkg.com/",
    icon: si("yarn"),
    category: "Workflow & AI",
  },
  {
    title: "npm",
    href: "https://www.npmjs.com/",
    icon: si("npm"),
    category: "Workflow & AI",
  },

  // ── Services & Cloud (incl. analytics) ────────────────────────────────
  {
    title: "Vercel",
    href: "https://vercel.com/",
    icon: si("vercel"),
    category: "Services & Cloud",
  },
  {
    title: "Netlify",
    href: "https://www.netlify.com/",
    icon: si("netlify"),
    category: "Services & Cloud",
  },
  {
    title: "Firebase",
    href: "https://firebase.google.com/",
    icon: si("firebase"),
    category: "Services & Cloud",
  },
  {
    title: "Supabase",
    href: "https://supabase.com/",
    icon: si("supabase"),
    category: "Services & Cloud",
  },
  {
    title: "Cloudinary",
    href: "https://cloudinary.com/",
    icon: si("cloudinary"),
    category: "Services & Cloud",
  },
  {
    title: "Mapbox",
    href: "https://www.mapbox.com/",
    icon: si("mapbox"),
    category: "Services & Cloud",
  },
  {
    title: "React Leaflet",
    href: "https://react-leaflet.js.org/",
    icon: si("leaflet"),
    category: "Services & Cloud",
  },
  {
    title: "Resend",
    href: "https://resend.com/",
    icon: si("resend"),
    category: "Services & Cloud",
  },
  {
    title: "WhatsApp API",
    href: "https://developers.facebook.com/docs/whatsapp/",
    icon: si("whatsapp"),
    category: "Services & Cloud",
  },
  {
    title: "FlutterFlow",
    href: "https://www.flutterflow.io/",
    icon: "https://docs.flutterflow.io/logos/logoMark_outlinePrimary_transparent.svg",
    category: "Services & Cloud",
  },
  {
    title: "PostHog",
    href: "https://posthog.com/",
    icon: si("posthog"),
    category: "Services & Cloud",
  },
  {
    title: "Vercel Analytics",
    href: "https://vercel.com/analytics",
    icon: si("vercel"),
    category: "Services & Cloud",
  },
];
