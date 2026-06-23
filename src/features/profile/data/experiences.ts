import type { Experience } from "../types/experiences";

export const EXPERIENCES: Experience[] = [
  {
    id: "safulpay",
    companyName: "SafulPay",
    companyLogo: "/images/safulpay-icon-green.webp",
    companyWebsite: "https://safulpay.com",
    positions: [
      {
        id: "software-frontend-dev-2024",
        title: "Software/Frontend Developer",
        employmentPeriod: {
          start: "02.2024",
        },
        employmentType: "Full-time",
        icon: "code",
        description: `*Incubated as an internal product at Tech'N Goodwill, then spun off as an independent fintech company in 2025.*

- Re-platformed the SafulPay corporate website to Next.js, raising Lighthouse scores from 68 to a perfect 100 across Performance, Accessibility, Best Practices, and SEO, while also shipping more sections and content, through code-splitting, lazy loading, image optimization, and accessibility hardening.
- Converted complex Figma designs into pixel-perfect, WCAG-accessible components for customer portals and agency monitoring dashboards.
- Engineered the SafulPay v2 frontend architecture with Golang backend engineers on API consumption and complex state management, after co-developing the v1 stack that paired a FlutterFlow frontend with a PHP backend.
- Built the SafulPay Agent & Merchant Onboarding web app used by field marketers, with analytics dashboards, activity monitoring, and a performance leaderboard for tracking marketer productivity.`,
        skills: [
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind CSS",
          "FlutterFlow",
          "Figma",
          "Performance Optimization",
          "Accessibility",
          "SEO",
          "State Management",
          "REST APIs",
          "FinTech",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "tech-n-goodwill",
    companyName: "Tech'N Goodwill Limited",
    companyLogo: "/images/techngoodwill-logo.webp",
    positions: [
      {
        id: "team-lead-2024",
        title: "Software Developer & Team Lead",
        employmentPeriod: {
          start: "02.2024",
        },
        employmentType: "Full-time",
        icon: "business",
        description: `- Directed cross-functional teams (UI/UX, marketing, backend) across 6+ web apps, including incubating SafulPay as an internal product before its spin-off as a standalone fintech company.
- Standardized Git and GitHub workflows with structured pull requests, cutting code-review turnaround by 30% and accelerating delivery.
- Authored product tutorials and component documentation for reliable cross-functional collaboration and fast onboarding.
- Continued owning Trakkam's frontend and infrastructure while scaling team leadership responsibilities.`,
        skills: [
          "Team Leadership",
          "Cross-functional Collaboration",
          "Git Workflows",
          "FinTech",
        ],
        isExpanded: true,
      },
      {
        id: "software-dev-2023",
        title: "Software/Frontend Developer",
        employmentPeriod: {
          start: "05.2023",
          end: "02.2024",
        },
        employmentType: "Full-time",
        icon: "code",
        description: `- Owned the frontend for Trakkam, a multi-tenant GPS fleet-management SaaS built in Next.js 16, TypeScript, Tailwind, and shadcn/ui, with interactive Mapbox geofencing, real-time WebSocket vehicle tracking, and a 7-tier role-based access model.
- Extended into the full stack to ship Trakkam end to end (NestJS API, Prisma, self-hosted Traccar, NGINX, PM2, GitHub Actions CI/CD on a $5/month VPS), keeping operational cost roughly 8× lower than the equivalent managed setup.`,
        skills: [
          "Next.js",
          "TypeScript",
          "React",
          "Tailwind CSS",
          "shadcn/ui",
          "Mapbox GL",
          "Socket.io",
          "NestJS",
          "Prisma",
          "MariaDB",
          "Docker",
          "NGINX",
          "CI/CD",
          "GitHub Actions",
          "Role-Based Access Control",
          "GPS/IoT",
        ],
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "hng-internship",
    companyName: "HNG Internship",
    companyLogo: "https://hng.tech/favicon.ico",
    companyWebsite: "https://hng.tech/",
    positions: [
      {
        id: "frontend-intern-2025",
        title: "Frontend Engineer Intern",
        employmentPeriod: {
          start: "01.2025",
          end: "04.2025",
        },
        employmentType: "Internship",
        icon: "code",
        description: `- Operated in a fast-paced, collaborative environment with backend/frontend engineers, PMs, designers, QA, and leads; shipped features to tight timelines.
- Co-built "Resolve" using Next.js + TypeScript: a voting platform for secure, free, and fair elections for individuals and organizations; implemented UI with Tailwind CSS and shadcn/ui components.
- Built a text-processing UI in React + TypeScript using Chrome Origin Trials (Detector API, Summarization API, Translation API) to auto-detect language and translate text on the fly.
- Practiced strong engineering hygiene: accessible, responsive UI; performance optimization; structured PRs and clean commit history; collaborative reviews with the cross-functional team.`,
        skills: [
          "Next.js",
          "TypeScript",
          "React",
          "Tailwind CSS",
          "shadcn/ui",
          "Chrome Origin Trials",
          "API Integration",
          "Voting Platform",
          "Text Processing",
          "Accessibility",
          "Performance Optimization",
          "Git Workflows",
          "Code Review",
          "Agile",
          "Cross-functional Collaboration",
        ],
        isExpanded: true,
      },
    ],
  },
  {
    id: "nimble-capital",
    companyName: "Nimble Capital Limited",
    positions: [
      {
        id: "it-specialist-2021",
        title: "IT Specialist",
        employmentPeriod: {
          start: "02.2021",
          end: "12.2022",
        },
        employmentType: "Full-time",
        icon: "business",
        description: `- Oversaw day-to-day technical operations, ensuring uptime and rapid bug resolution.
- Automated customer data collation and contact workflows for efficient records management.
- Executed targeted email/SMS outreach campaigns and collected feedback for iteration.`,
        skills: [
          "Technical Operations",
          "System Uptime",
          "Bug Resolution",
          "Process Automation",
          "Data Management",
          "Email Marketing",
          "SMS Campaigns",
          "Customer Feedback",
          "Workflow Optimization",
        ],
      },
    ],
  },
];
