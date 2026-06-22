import type { User } from "@/features/profile/types/user";

// Years of experience, counted from the earliest role (Tech'N Goodwill, May
// 2023) to today — so the bio stays current without manual edits.
const EXPERIENCE_START = new Date(2023, 4, 1); // May 2023 (month is 0-indexed)
const YEARS_OF_EXPERIENCE = Math.max(
  1,
  Math.floor((Date.now() - EXPERIENCE_START.getTime()) / 31_557_600_000) // 365.25d
);

export const USER: User = {
  firstName: "Oyinlola",
  lastName: "Lawal",
  middleName: "Ibrahim",
  displayName: "Lawal Oyinlola",
  username: "yero",
  gender: "male",
  pronouns: "he/him",
  bio: "Frontend Engineer building accessible, high-performance web products in React, Next.js, and TypeScript. Full-stack and infrastructure range when the product needs it.",
  flipSentences: [
    "Frontend Engineer · Full-Stack Capable",
    "React, Next.js, TypeScript",
    "Accessibility & Performance focused",
    "I build products people depend on",
    "From Figma to Prisma to NGINX",
  ],
  address: "Lagos, Nigeria | Freetown, Sierra Leone",
  phoneNumber: "KzIzNDgxNjM5OTI2Mjg=", // +2348163992628 in base64
  email: "b3lpbmxvbGFsYXdhbDE3MDVAZ21haWwuY29t", // oyinlolalawal1705@gmail.com in base64
  website: "https://lawaloyinlola.com",
  jobTitle: "Frontend Engineer",
  jobs: [
    {
      title: "Software/Frontend Developer",
      company: "SafulPay",
      website: "https://safulpay.com",
    },
    {
      title: "Software Developer & Team Lead",
      company: "Tech'N Goodwill Limited",
    },
  ],
  about: `

I'm Lawal Oyinlola, a Frontend Engineer building fast, accessible web products across FinTech, GPS/IoT, and AI — mostly in React, Next.js, and TypeScript.

Over ${YEARS_OF_EXPERIENCE}+ years I've led small teams and shipped real products. I owned the frontend for Trakkam, a multi-tenant GPS fleet SaaS, and took it full-stack on a $5/month VPS — roughly 8× cheaper than managed. On SafulPay, I re-platformed to Next.js and raised Lighthouse from 68 to a perfect 100.

Frontend-first, but I extend into backend, real-time, and self-hosted infrastructure (NestJS, Prisma, WebSockets, NGINX, Docker) when a product needs to ship end to end.

Let's build something people can depend on.

  `,
  avatar: "/images/lawal_oyinlola-profile_picture.webp",
  // To enable the interactive "lights" avatar, add 4 square WebP variants of
  // the SAME crop (so they cross-fade as a lighting change) and uncomment:
  // avatarVariants: {
  //   lightOff: "/images/avatar/light-off.webp",
  //   lightOn: "/images/avatar/light-on.webp",
  //   darkOff: "/images/avatar/dark-off.webp",
  //   darkOn: "/images/avatar/dark-on.webp",
  // },
  ogImage: "/images/og-image.png",
  namePronunciationUrl: "/audio/lawal_oyinlola_pronounciation.mp3",
  timeZone: "Africa/Lagos",
  keywords: [
    "lawal",
    "oyinlola",
    "lawaloyinlola",
    "lawal oyinlola ibrahim",
    "lawal Ibrahim oyinlola",
    "oyinlola ibrahim lawal",
    "lawal oyinlola",
    "oyinlola lawal",
    "oyinlola lawal ibrahim",
    "oyinlola ibrahim lawal",
    "oyinlola lawal ibrahim",
    "xau.js",
    "xau.ts",
    "yero",
    "best frontend developer",
    "best frontend engineer",
    "best frontend developer in sierra leone",
    "best frontend engineer in sierra leone",
    "frontend developer",
    "frontend engineer",
    "frontend developer in sierra leone",
    "frontend engineer in sierra leone",
    "frontend developer in nigeria",
    "frontend engineer in nigeria",
    "frontend developer in west africa",
    "frontend engineer in west africa",
    "frontend developer in africa",
    "frontend engineer in africa",
    "full-stack engineer",
    "full-stack developer",
    "software engineer",
    "react developer",
    "next.js developer",
    "typescript developer",
    "nestjs",
    "prisma",
    "mariadb",
    "websockets",
    "socket.io",
    "mapbox",
    "gps fleet management saas",
    "trakkam",
    "fintech frontend engineer",
    "ai integration",
    "llm integration",
    "claude api",
    "gemini api",
    "openai api",
    "docker",
    "nginx",
    "ci/cd",
    "github actions",
    "web performance",
    "web accessibility",
    "wcag",
    "lighthouse 100",
  ],
  dateCreated: "2025-09-10", // YYYY-MM-DD
};
