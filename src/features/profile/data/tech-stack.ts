import type { TechStack } from "../types/tech-stack";

const si = (slug: string) => `https://cdn.simpleicons.org/${slug}`;
const ix = (set: string, name: string) =>
  `https://api.iconify.design/${set}:${name}.svg`;

export const TECH_STACK: TechStack[] = [
  // AI Tools
  {
    title: "Claude",
    href: "https://claude.ai/",
    icon: si("claude"),
    category: "AI Tools",
  },
  {
    title: "Google Gemini",
    href: "https://gemini.google.com/",
    icon: si("googlegemini"),
    category: "AI Tools",
  },
  {
    title: "ChatGPT",
    href: "https://chatgpt.com/",
    icon: ix("logos", "openai-icon"),
    category: "AI Tools",
  },
  {
    title: "Cursor",
    href: "https://cursor.com/",
    icon: si("cursor"),
    category: "AI Tools",
  },
  {
    title: "n8n",
    href: "https://n8n.io/",
    icon: si("n8n"),
    category: "AI Tools",
  },
  {
    title: "CodeRabbit",
    href: "https://coderabbit.ai/",
    icon: si("coderabbit"),
    category: "AI Tools",
  },

  // Languages & Frameworks
  {
    title: "TypeScript",
    href: "https://www.typescriptlang.org/",
    icon: si("typescript"),
    category: "Languages",
  },
  {
    title: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    icon: si("javascript"),
    category: "Languages",
  },
  {
    title: "Python",
    href: "https://www.python.org/",
    icon: si("python"),
    category: "Languages",
  },
  {
    title: "PHP",
    href: "https://www.php.net/",
    icon: si("php"),
    category: "Languages",
  },
  {
    title: "Laravel",
    href: "https://laravel.com/",
    icon: si("laravel"),
    category: "Languages",
  },
  {
    title: "Next.js",
    href: "https://nextjs.org/",
    icon: si("nextdotjs"),
    category: "Languages",
  },
  {
    title: "React",
    href: "https://react.dev/",
    icon: si("react"),
    category: "Languages",
  },
  {
    title: "Vue",
    href: "https://vuejs.org/",
    icon: si("vuedotjs"),
    category: "Languages",
  },
  {
    title: "Node.js",
    href: "https://nodejs.org/",
    icon: si("nodedotjs"),
    category: "Languages",
  },
  {
    title: "NestJS",
    href: "https://nestjs.com/",
    icon: si("nestjs"),
    category: "Languages",
  },

  // State, Data & APIs
  {
    title: "Redux Toolkit",
    href: "https://redux-toolkit.js.org/",
    icon: si("redux"),
    category: "State & APIs",
  },
  {
    title: "React Router",
    href: "https://reactrouter.com/",
    icon: si("reactrouter"),
    category: "State & APIs",
  },
  {
    title: "React Hook Form",
    href: "https://react-hook-form.com/",
    icon: si("reacthookform"),
    category: "State & APIs",
  },
  {
    title: "Zod",
    href: "https://zod.dev/",
    icon: si("zod"),
    category: "State & APIs",
  },
  {
    title: "TanStack Query",
    href: "https://tanstack.com/query",
    icon: si("reactquery"),
    category: "State & APIs",
  },
  {
    title: "Socket.io",
    href: "https://socket.io/",
    icon: si("socketdotio"),
    category: "State & APIs",
  },

  // UI & Design
  {
    title: "Tailwind CSS",
    href: "https://tailwindcss.com/",
    icon: si("tailwindcss"),
    category: "UI & Design",
  },
  {
    title: "Shadcn UI",
    href: "https://ui.shadcn.com/",
    icon: si("shadcnui"),
    category: "UI & Design",
  },
  {
    title: "Radix UI",
    href: "https://www.radix-ui.com/",
    icon: si("radixui"),
    category: "UI & Design",
  },
  {
    title: "GSAP",
    href: "https://gsap.com/",
    icon: si("greensock"),
    category: "UI & Design",
  },
  {
    title: "Framer Motion",
    href: "https://motion.dev/",
    icon: si("framer"),
    category: "UI & Design",
  },
  {
    title: "Figma",
    href: "https://www.figma.com/",
    icon: ix("logos", "figma"),
    category: "UI & Design",
  },

  // Services & Ecosystem
  {
    title: "Vercel",
    href: "https://vercel.com/",
    icon: si("vercel"),
    category: "Services",
  },
  {
    title: "Netlify",
    href: "https://www.netlify.com/",
    icon: si("netlify"),
    category: "Services",
  },
  {
    title: "Firebase",
    href: "https://firebase.google.com/",
    icon: si("firebase"),
    category: "Services",
  },
  {
    title: "Supabase",
    href: "https://supabase.com/",
    icon: si("supabase"),
    category: "Services",
  },
  {
    title: "Cloudinary",
    href: "https://cloudinary.com/",
    icon: si("cloudinary"),
    category: "Services",
  },
  {
    title: "Mapbox",
    href: "https://www.mapbox.com/",
    icon: si("mapbox"),
    category: "Services",
  },
  {
    title: "React Leaflet",
    href: "https://react-leaflet.js.org/",
    icon: si("leaflet"),
    category: "Services",
  },

  // Data & Architecture
  {
    title: "PostgreSQL",
    href: "https://www.postgresql.org/",
    icon: si("postgresql"),
    category: "Data",
  },
  {
    title: "MongoDB",
    href: "https://www.mongodb.com/",
    icon: si("mongodb"),
    category: "Data",
  },
  {
    title: "MariaDB",
    href: "https://mariadb.org/",
    icon: si("mariadb"),
    category: "Data",
  },
  {
    title: "Prisma",
    href: "https://www.prisma.io/",
    icon: si("prisma"),
    category: "Data",
  },
  {
    title: "Drizzle ORM",
    href: "https://orm.drizzle.team/",
    icon: si("drizzle"),
    category: "Data",
  },
  {
    title: "PostHog",
    href: "https://posthog.com/",
    icon: si("posthog"),
    category: "Data",
  },

  // APIs & Auth
  {
    title: "Better Auth",
    href: "https://www.better-auth.com/",
    icon: si("betterauth"),
    category: "APIs & Auth",
  },
  {
    title: "WhatsApp API",
    href: "https://developers.facebook.com/docs/whatsapp/",
    icon: si("whatsapp"),
    category: "APIs & Auth",
  },
  {
    title: "Resend",
    href: "https://resend.com/",
    icon: si("resend"),
    category: "APIs & Auth",
  },

  // Infrastructure & DevOps
  {
    title: "Docker",
    href: "https://www.docker.com/",
    icon: si("docker"),
    category: "DevOps",
  },
  {
    title: "Git",
    href: "https://git-scm.com/",
    icon: si("git"),
    category: "DevOps",
  },
  {
    title: "GitHub",
    href: "https://github.com/",
    icon: si("github"),
    category: "DevOps",
  },
  {
    title: "GitHub Actions",
    href: "https://github.com/features/actions",
    icon: si("githubactions"),
    category: "DevOps",
  },
  {
    title: "NGINX",
    href: "https://nginx.org/",
    icon: si("nginx"),
    category: "DevOps",
  },

  // Package Managers
  {
    title: "Bun",
    href: "https://bun.sh/",
    icon: si("bun"),
    category: "Tooling",
  },
  {
    title: "pnpm",
    href: "https://pnpm.io/",
    icon: si("pnpm"),
    category: "Tooling",
  },
  {
    title: "yarn",
    href: "https://yarnpkg.com/",
    icon: si("yarn"),
    category: "Tooling",
  },
  {
    title: "npm",
    href: "https://www.npmjs.com/",
    icon: si("npm"),
    category: "Tooling",
  },

  // Low-Code
  {
    title: "FlutterFlow",
    href: "https://www.flutterflow.io/",
    icon: "https://docs.flutterflow.io/logos/logoMark_outlinePrimary_transparent.svg",
    category: "Low-Code",
  },
];
