import type { Project } from "../types/projects";

export const PROJECTS: Project[] = [
  {
    id: "safulpay-app",
    title: "SafulPay (FinTech App)",
    period: { start: "08.2023" },
    link: "https://safulpay.com/download",
    image: "/images/projects/Screenshot-safulpay-app.png",
    skills: [
      "FinTech",
      "FlutterFlow",
      "Flutter",
      "Go",
      "PHP",
      "Mobile",
      "Payments",
      "Multi-wallet",
    ],
    description: `Mobile money app for individuals, agents and merchants with instant money transfers, bill payments and multi-wallet support.
- iOS: https://apps.apple.com/ng/app/safulpay/id6480344064
- Android: https://play.google.com/store/apps/details?id=com.techengood.safulpay`,
    isExpanded: true,
  },
  {
    id: "marketgist",
    title: "MarketGist (Real-Time Stock Market Dashboard)",
    period: { start: "09.2025" },
    link: "https://marketgist.vercel.app/",
    image: "/images/projects/Screenshot-marketgist.png",
    skills: [
      "Stock Market",
      "Analytics",
      "Charts",
      "AI",
      "API",
      "REST",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Performance",
      "Accessibility",
    ],

    description: `A comprehensive stock market app featuring AI-powered market insights, real-time price updates, advanced search functionality, and personalized stock alerts with interactive charts for data visualization and automated daily news summaries.
`,
    isExpanded: true,
  },
  {
    id: "resolve",
    title: "Resolve — Online Voting",
    period: { start: "01.2025" },
    link: "https://resolve.vote/",
    image: "/images/projects/Screenshot-resolve.png",
    skills: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Performance",
      "Accessibility",
    ],
    description:
      "Secure online voting for organizations. Built with accessible, responsive UI and performance best practices.",
  },
  {
    id: "scissorsweb",
    title: "ScissorsWeb — URL Shortener, Analytics & QR Code",
    period: { start: "1.2024" },
    link: "https://scissorsweb.netlify.app/",
    image: "/images/projects/Screenshot-scissors.png",
    skills: ["React", "TypeScript", "Supabase", "GSAP", "Analytics"],
    description:
      "URL shortener with QR generation, analytics, auth and storage.",
  },

  {
    id: "safulpay-agency",
    title: "SafulPay — Agency Banking Performance Portal",
    period: { start: "02.2025" },
    link: "https://agency.safulpay.com/",
    image: "/images/projects/Screenshot-safulpay-agency.png",
    skills: ["React", "TypeScript", "Analytics", "Admin UI"],
    description:
      "Internal portal for agent onboarding, performance tracking, monitoring and operations.",
  },
  {
    id: "safulpay-merchant",
    title: "SafulPay — Merchant Web App",
    period: { start: "02.2025" },
    link: "https://app.safulpay.com/merchant",
    image: "/images/projects/Screenshot-safulpay-merchant.png",
    skills: ["Laravel", "REST API", "Bulk Payments", "Collections"],
    description:
      "Merchant web app for bulk payments and collections with REST integrations.",
  },
  {
    id: "safulpay-website",
    title: "SafulPay Website",
    period: { start: "11.2024" },
    link: "https://safulpay.com/",
    image: "/images/projects/Screenshot-safulpay-website.png",
    skills: ["React", "TypeScript", "Tailwind CSS", "SEO", "Performance"],
    description:
      "SafulPay company website with pixel-perfect UI optimized for speed, accessibility and clear product storytelling.",
  },

  {
    id: "chatwith-isime",
    title: "Chat With Isime — Text Processing AI",
    period: { start: "02.2025" },
    link: "https://chatwithisime.netlify.app/",
    skills: [
      "React",
      "TypeScript",
      "Chrome Origin Trials",
      "Translation API",
      "Summarization API",
    ],
    description:
      "Leverages Chrome Origin Trials APIs (Detector, Summarization and Translation) for real-time language detection and translation.",
  },
  {
    id: "worldwise-yero",
    title: "WorldWise (Yero)",
    period: { start: "08.2024" },
    link: "https://worldwise-yero.netlify.app/",
    image: "/images/projects/Screenshot-worldwise.png",
    skills: ["React", "TypeScript", "Maps", "Geolocation"],
    description:
      "Track trips across cities on a world map and share your adventures with a beautiful UI.",
  },
];
