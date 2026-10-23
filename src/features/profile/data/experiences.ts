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
        description: `*Digital payments platform in Sierra Leone with 10,000+ users and 1,300+ agents on iOS and Android. Incubated at Tech'N Goodwill, then spun off as an independent fintech in 2025.*

- Raised the corporate website's Lighthouse scores from 68 to 100 in all four categories in a seven-day solo sprint, by re-platforming it to Next.js with code splitting, lazy loading, image optimization and accessibility fixes, while adding new sections in the same pass.
- Led and built the agency banking dashboard that field marketers use to onboard and verify agents and merchants, with KYC document capture, role-scoped views, activity monitoring and a performance leaderboard, supporting a network that has grown past 1,300 agents.
- Engineered the v2 frontend architecture in React and TypeScript with the Go backend team, covering API contracts, authenticated sessions and complex client state, after co-building the v1 app in FlutterFlow on a PHP backend.
- Rejected malformed input before it reached the payments API by validating every onboarding and dashboard form with Zod and React Hook Form at the client trust boundary.`,
        skills: [
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Zod",
          "React Hook Form",
          "FlutterFlow",
          "Figma",
          "Performance Optimization",
          "Accessibility",
          "Input Validation",
          "KYC",
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
        id: "team-lead-2023",
        title: "Software Developer & Team Lead",
        employmentPeriod: {
          start: "05.2023",
        },
        employmentType: "Full-time",
        icon: "business",
        description: `*Software and digital products company of 25 people. Incubated SafulPay before its 2025 spin-off, and builds Trakkam.*

- Lead the 6-person engineering and IT team across UI/UX, marketing and backend on 6+ web applications, turning business goals into technical plans and technical risk into decisions leaders can make. Trained and mentored 15+ engineers and interns.
- Cut code-review turnaround by 30% by standardizing Git and GitHub workflows with structured pull requests and review gates.
- Architected and shipped Trakkam, a multi-tenant GPS fleet SaaS, end to end (Next.js 16, NestJS, Prisma on MariaDB, Socket.io, Mapbox), with a 7-tier role-based access model that enforces tenant isolation over live location data, self-hosted for about 8× less than a managed setup.
- Took Trakkam's production dependency vulnerabilities from 104 to 0 and secrets in git history from 15 to 0 by adding Semgrep, Trivy and Gitleaks to CI with a policy set from a measured baseline, then caught the deploy gate reading a cancelled scan as a pass and made it accept only an explicit success.
- Fixed 11 security issues in one hardening pass after reviewing the codebase by hand, including an XSS sink in map popups, timing-unsafe CSRF checks and an account-takeover path in Google account linking. The same review found three development bypasses live in production that no scanner reported.
- Restored Trakkam after an 8-hour outage in which a watchdog had restarted the API 96 times with no effect, by tracing it to MySQL reverse-DNS host authentication, then made every deploy reversible with a CI migration gate, pre-deploy backups and a one-command rollback.`,
        skills: [
          "Team Leadership",
          "Mentoring",
          "Next.js",
          "NestJS",
          "Prisma",
          "MariaDB",
          "Socket.io",
          "Mapbox GL",
          "Multi-tenancy",
          "Role-Based Access Control",
          "GitHub Actions",
          "Semgrep",
          "Trivy",
          "Gitleaks",
          "Secure Code Review",
          "NGINX",
          "Docker",
          "Incident Response",
          "GPS/IoT",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
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
        description: `- Kept the business's systems running day to day, resolving faults quickly and supporting staff across endpoints and internal tools.
- Turned customer and operational data collected over WhatsApp into structured Excel and PDF reports for management, and automated the collation and contact workflows behind them.
- Ran email and SMS campaigns and collected structured customer feedback for product iteration.`,
        skills: [
          "Technical Operations",
          "System Uptime",
          "Bug Resolution",
          "Process Automation",
          "Data Management",
          "Reporting",
          "Email Marketing",
          "SMS Campaigns",
          "Customer Feedback",
          "Workflow Optimization",
        ],
      },
    ],
  },
];
