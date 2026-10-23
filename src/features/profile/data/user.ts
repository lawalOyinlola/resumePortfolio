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
  bio: "Software engineer building secure, reliable web apps: frontend craft, full-stack delivery, application security and DevSecOps.",
  flipSentences: [
    "Software Engineer · Application Security",
    "Secure products, systems, people & process",
    "React, Next.js, TypeScript",
    "Accessibility & Performance focused",
    "I build products people depend on",
    "From Figma to Prisma to NGINX",
    "I break what I build",
  ],
  address: "Lagos, Nigeria | Freetown, Sierra Leone",
  phoneNumber: "KzIzNDgxNjM5OTI2Mjg=", // +2348163992628 in base64
  email: "b3lpbmxvbGFsYXdhbDE3MDVAZ21haWwuY29t", // oyinlolalawal1705@gmail.com in base64
  website: "https://lawaloyinlola.com",
  jobTitle: "Software Engineer · Application Security",
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

I'm Lawal Oyinlola, a software engineer who builds web products and then tests them the way an attacker would. For ${YEARS_OF_EXPERIENCE}+ years I've led small teams shipping FinTech, GPS/IoT, and AI products in React, Next.js, and TypeScript, taking them full-stack (NestJS, Prisma, NGINX, Docker) when they need to ship end to end.

I architected Trakkam, a multi-tenant GPS fleet SaaS that runs for about 8× less than managed hosting, and took its production dependency vulnerabilities from 104 to 0. On SafulPay, I raised Lighthouse from 68 to 100. I publish my own pentest and detection labs at [lawaloyinlola.com](https://lawaloyinlola.com/security). Let's build something people can depend on.

  `,
  avatar: "/images/lawal_oyinlola-avatar.webp",
  // Light-mode line art of the same headshot, aligned to the same crop.
  avatarSketch: "/images/lawal_oyinlola-avatar-line.webp",
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
    "application security",
    "appsec",
    "devsecops",
    "application security engineer",
    "software engineer application security",
    "penetration testing lab",
    "owasp",
    "modsecurity",
    "wazuh",
    "siem",
    "supply-chain security",
    "ci/cd security",
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
