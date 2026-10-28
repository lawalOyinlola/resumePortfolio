import type { Project } from "../types/projects";

/** Security labs, shown in their own section above the projects. */
export const LABS: Project[] = [
  {
    id: "cicd-security-pipeline",
    kind: "lab",
    title: "CI/CD Security Pipeline",
    period: { start: "10.2026", end: "10.2026" },
    link: "https://lawaloyinlola.com/security/labs/cicd-security-pipeline",
    logo: "/icons/lawal-logo-tile.svg",
    image: "/images/projects/cicd-security-pipeline.webp",
    skills: [
      "GitHub Actions",
      "Semgrep",
      "Trivy",
      "Gitleaks",
      "SAST",
      "Supply-chain Security",
      "DevSecOps",
    ],
    description: `**Context:** a live multi-tenant SaaS product already shipped through GitHub Actions. It needed security checks that would not disturb its build or deploy.

**Action:** added Semgrep SAST, Trivy dependency and container scanning, and Gitleaks full-history secrets scanning to GitHub Actions, set the blocking policy from a measured baseline, and triaged every finding to a fix, a dated acceptance or a reasoned false positive.

**Result:** production dependency vulnerabilities 104 → 0, secrets in git history 15 → 0, SAST findings 8 → 1 documented false positive.

**Lesson:** the most serious finding was in my own pipeline. The deploy gate read a cancelled scan as a pass, so it now accepts only an explicit success.

- Case study: https://github.com/lawalOyinlola/cybersecurity-portfolio`,
    isExpanded: true,
  },
  {
    id: "waf-runtime-defence",
    kind: "lab",
    title: "WAF Runtime Defence",
    period: { start: "10.2026", end: "10.2026" },
    link: "https://lawaloyinlola.com/security/labs/waf-runtime-defence",
    logo: "/icons/lawal-logo-tile.svg",
    image: "/images/projects/waf-runtime-defence.webp",
    skills: [
      "ModSecurity",
      "OWASP CRS",
      "NGINX",
      "Docker",
      "Virtual Patching",
      "AppSec",
    ],
    description: `**Context:** a WAF is often treated as the fix. I wanted to measure what it actually stops.

**Action:** put ModSecurity and the OWASP Core Rule Set in front of OWASP Juice Shop and measured it against a no-WAF control across eight phases, then ran 26 payloads against a production app.

**Result:** 14 of 20 attacks stopped with 0 of 9 legitimate requests blocked at tuned paranoia level 1, 15 with a virtual patch. On production, 12 of 26 payloads blocked.

**Lesson:** the tenant-isolation (BOLA) attack passed the WAF and was stopped by the app. A WAF buys response time; access control has to live in the code.`,
    isExpanded: true,
  },
  {
    id: "appsec-protocols",
    title: "appsec-protocols",
    period: { start: "08.2026" },
    link: "https://github.com/lawalOyinlola/appsec-protocols",
    logo: "/icons/lawal-logo-tile.svg",
    skills: [
      "AppSec",
      "OWASP ASVS",
      "AI Coding Agents",
      "Bash",
      "GitHub Actions",
      "Open Source",
    ],
    description: `**Context:** security checklists tell you what should be true, not how to check it, so items get ticked without being tested.

**Action:** wrote 82 security, legal and project-kickoff controls as agent skills that load before an AI coding agent writes auth, uploads, payments or deploy config. Each control has exactly one executable check, enforced in CI and mapped to OWASP ASVS 5.0.

**Result:** 82 controls, 82 verification steps, and a CI check that fails any control without one.

**Lesson:** a control you cannot run is a claim. "Unverified" is a reportable state, not a pass.`,
    isExpanded: true,
  },
  {
    id: "apple-silicon-pentest-lab",
    kind: "lab",
    title: "Apple Silicon Pentest Lab",
    period: { start: "10.2026", end: "10.2026" },
    link: "https://lawaloyinlola.com/security/labs/building-a-pentest-lab-on-apple-silicon",
    logo: "/icons/lawal-logo-tile.svg",
    image: "/images/projects/pentest-lab.webp",
    skills: [
      "Kali Linux",
      "nmap",
      "OpenVAS/GVM",
      "Metasploit",
      "Hydra",
      "John the Ripper",
      "Penetration Testing",
    ],
    description: `**Context:** most pentest lab guides assume an x86 machine. Mine had to run on an Apple Silicon Mac.

**Action:** a permissioned test of Metasploitable 2 in my own lab, from recon and vulnerability scanning to two independent paths to root (CVE-2011-2523 and CVE-2019-14287), post-exploitation, and a written, executive-readable report.

**Result:** seven findings, each paired with the defensive control that closes it.

**Lesson:** all seven traced to one root cause, an unsupported and unpatched operating system. Patching beats chasing findings one by one.

- Report (PDF): https://lawaloyinlola.com/files/apple-silicon-pentest-lab-report.pdf`,
  },
  {
    id: "detection-siem-lab",
    kind: "lab",
    title: "Detection & SIEM Lab",
    period: { start: "10.2026", end: "10.2026" },
    link: "https://lawaloyinlola.com/security/labs/detection-siem-lab",
    logo: "/icons/lawal-logo-tile.svg",
    image: "/images/projects/detection-siem-lab.webp",
    skills: ["Wazuh", "Suricata", "VirusTotal", "SIEM", "File Integrity"],
    description: `**Context:** the defensive mirror of the pentest lab. Can I see my own attacks?

**Action:** built a Wazuh SIEM with Suricata network detection and VirusTotal file-integrity monitoring with automated response, then ran the pentest attacks against it.

**Result:** the full detection chain fired, and the response deletes a flagged file within seconds.

**Lesson:** at first the response produced convincing alerts for a full day while deleting nothing. I rewrote it with dependency checks, path confinement, verification and an audit trail. Check the effect, not the alert.`,
  },
  {
    id: "phishing-bridge-lab",
    kind: "lab",
    title: "Phishing Bridge Lab",
    period: { start: "10.2026", end: "10.2026" },
    link: "https://lawaloyinlola.com/security/labs/phishing-simulation-lab",
    logo: "/icons/lawal-logo-tile.svg",
    image: "/images/projects/phishing-bridge-lab.webp",
    skills: ["GoPhish", "Mailpit", "Wazuh", "MITRE ATT&CK", "Purple Team"],
    description: `**Context:** a purple-team exercise: run one phishing click end to end and watch it from both seats.

**Action:** ran a GoPhish campaign with Mailpit inside the lab only (no real mail, no real credentials), clicked it from a second VM, and wrote a custom Wazuh decoder and rules mapped to MITRE ATT&CK T1566.

**Result:** the open, the visit and the submission each raise their own alert.

**Lesson:** no built-in decoder understood the log, and a detection resting on an undecoded log fails silently. I proved each rule against a known log line before trusting the dashboard.`,
  },
];

/** Products and sites I built or contributed to. */
export const PROJECTS: Project[] = [
  {
    id: "trakkam",
    title: "Trakkam — Multi-Tenant GPS Fleet-Management SaaS",
    period: { start: "03.2026" },
    link: "https://trakkam.com/",
    logo: "https://trakkam.com/favicon.ico?favicon.65c14c5d.ico",
    image: "/images/projects/trakkam.webp",
    skills: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Mapbox GL",
      "Socket.io",
      "NestJS",
      "Prisma",
      "MariaDB",
      "GPS/IoT",
      "Self-hosted",
    ],
    description: `A multi-tenant GPS fleet-management SaaS I designed and shipped end to end. Real-time vehicle tracking over WebSockets, interactive Mapbox geofencing, trip history, an alerts inbox, and a 7-tier role-based access model.
Self-hosted on a $5/month VPS (NestJS, Prisma, self-hosted Traccar, NGINX, CI/CD), running roughly 8× cheaper than the equivalent managed setup.

Security is part of the build: tenant isolation on every query, signed webhooks, and a CI pipeline (SAST, dependency, container and secrets scanning) that gates every deploy.`,
    isExpanded: true,
  },
  {
    id: "marketgist",
    title: "MarketGist — Real-Time Stock Market Dashboard",
    period: { start: "09.2025", end: "02.2026" },
    link: "https://marketgist.vercel.app/",
    logo: "https://marketgist.vercel.app/favicon.ico?favicon.1aeb95f0.ico",
    image: "/images/projects/marketgist.webp",
    skills: [
      "Next.js",
      "TypeScript",
      "Better Auth",
      "Inngest",
      "Charts",
      "AI",
      "REST",
      "Performance",
      "Accessibility",
    ],
    description:
      "A stock-market app with AI-powered market insights, real-time price updates, advanced search, personalized stock alerts, interactive charts, and automated daily news summaries.",
    isExpanded: true,
  },
  {
    id: "a-certain-woman",
    title: "A Certain Woman — Women's Movement Website",
    period: { start: "05.2026" },
    link: "https://acertainwoman.org/",
    logo: "/images/acw_logo.webp",
    image: "/images/projects/acw_impact.webp",
    skills: [
      "Next.js",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "shadcn/ui",
    ],
    description:
      "Website for a faith-rooted women's movement based in Freetown, Sierra Leone — supporting healing circles, leadership academies, and community programs. Built with Next.js 16 App Router and Tailwind CSS v4 under the tagline 'Restoring Hearts. Reclaiming Crowns.'",
    isExpanded: true,
  },
  {
    id: "lia",
    title: "LIA — LinkedIn Intelligent Assistant",
    period: { start: "11.2025", end: "03.2026" },
    link: "https://www.getlia.live/",
    image: "/images/projects/lia_extension.webp",
    skills: [
      "Chrome Extension",
      "AI",
      "TypeScript",
      "React",
      "LinkedIn API",
      "Automation",
    ],
    description:
      "I was invited onto the LIA team as a contributor. LIA is an AI LinkedIn assistant shipped as a Chrome extension side panel and a Next.js site. I revamped the extension's UI and UX: simplified the interface, removed redundant steps and clicks, improved accessibility, and added light and dark themes and an interactive floating action button.",
    isExpanded: true,
  },
  {
    id: "safulpay-app",
    title: "SafulPay (FinTech App)",
    period: { start: "08.2023" },
    link: "https://safulpay.com/download",
    logo: "/images/safulpay-icon-green.webp",
    image: "/images/projects/Screenshot-safulpay-app.webp",
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
  },
  {
    id: "safulpay-website",
    title: "SafulPay Website",
    period: { start: "05.2026" },
    link: "https://safulpay.com/",
    logo: "/images/safulpay-icon-green.webp",
    image: "/images/projects/safulpay_hero.webp",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "SEO",
      "Performance",
      "Accessibility",
    ],
    description:
      "Re-platformed the SafulPay corporate site from React and Vite to Next.js in a seven-day solo sprint, taking Lighthouse from 68 to 100 in all four categories while adding new sections. Removed layout shift by reserving space for decorative images, and escaped the JSON-LD to close an XSS path.",
  },
  {
    id: "khariar",
    title: "Khariar — AI-Powered ATS & Career Platform",
    period: { start: "10.2025", end: "03.2026" },
    link: "https://khariar.vercel.app/",
    logo: "https://khariar.vercel.app/favicon.png",
    image: "/images/projects/khariar_home.webp",
    skills: ["Next.js", "TypeScript", "Gemini API", "AI", "ATS", "Career"],
    description:
      "A highly interactive career platform integrating the Gemini API for real-time, dynamic resume evaluation with ATS optimization and personalized feedback.",
    isExpanded: true,
  },
  {
    id: "zentry-clone",
    title: "Zentry Clone — Awwwards-Inspired Creative Site",
    period: { start: "11.2024" },
    link: "https://zentryclone-awwwards.vercel.app/",
    logo: "https://zentryclone-awwwards.vercel.app/favicon/favicon.ico",
    image: "/images/projects/zentry_projects.webp",
    skills: ["React", "GSAP", "Tailwind CSS", "TypeScript", "Creative Dev"],
    description:
      "A pixel-faithful recreation of an Awwwards-winning site, built to practice advanced GSAP scroll animations, clip-path transitions, and high-end creative frontend techniques.",
  },
  {
    id: "resolve",
    title: "Resolve — Online Voting",
    period: { start: "01.2025" },
    link: "https://resolve.vote/",
    logo: "https://resolve.vote/favicon.ico",
    image: "/images/projects/resolve_hero.webp",
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
    id: "taskpilot",
    title: "Task Pilot — Vue 3 Task Manager",
    period: { start: "08.2023", end: "10.2023" },
    link: "https://taskpilot-lawal.vercel.app/",
    logo: "https://taskpilot-lawal.vercel.app/favicon.svg",
    image: "/images/projects/taskpilot_hero.webp",
    skills: ["Vue 3", "Reka UI", "TypeScript", "LZ-compression"],
    description:
      "A task manager with screenshot export and LZ-compressed shareable task URLs, so a full task board can be shared without any backend.",
  },
  {
    id: "scissorsweb",
    title: "ScissorsWeb — URL Shortener, Analytics & QR Code",
    period: { start: "1.2024" },
    link: "https://scissorsweb.netlify.app/",
    logo: "https://scissorsweb.netlify.app/favicon-32x32.png",
    image: "/images/projects/scissors_analytics.webp",
    skills: ["React", "TypeScript", "Supabase", "GSAP", "Analytics"],
    description:
      "URL shortener with QR generation, click/device/geo analytics, auth and storage.",
  },
  {
    id: "lumina-dice",
    title: "Lumina Dice",
    period: { start: "06.2024" },
    link: "https://lumina-dice.vercel.app/",
    logo: "/images/projects/lumina-icon.svg",
    image: "/images/projects/lumina_winner.webp",
    skills: ["React", "TypeScript", "Animation", "Game"],
    description:
      "An animated dice game with polished winner effects and smooth UI transitions.",
  },
  {
    id: "safulpay-agency",
    title: "SafulPay — Agency Banking Performance Portal",
    period: { start: "02.2025" },
    link: "https://agency.safulpay.com/",
    logo: "/images/safulpay-icon-green.webp",
    image: "/images/projects/Screenshot-safulpay-agency.webp",
    skills: ["React", "TypeScript", "Analytics", "Admin UI"],
    description:
      "Internal portal for agent onboarding, performance tracking, monitoring and operations.",
  },
  {
    id: "safulpay-merchant",
    title: "SafulPay — Merchant Web App",
    period: { start: "02.2025" },
    link: "https://app.safulpay.com/merchant",
    logo: "/images/safulpay-icon-green.webp",
    image: "/images/projects/Screenshot-safulpay-merchant.webp",
    skills: ["Laravel", "REST API", "Bulk Payments", "Collections"],
    description:
      "Merchant web app for bulk payments and collections with REST integrations.",
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
      "Uses Chrome Origin Trials APIs (Detector, Summarization and Translation) for real-time language detection and translation.",
  },
  {
    id: "worldwise-yero",
    title: "WorldWise (Yero)",
    period: { start: "08.2024" },
    link: "https://worldwise-yero.netlify.app/",
    image: "/images/projects/Screenshot-worldwise.webp",
    skills: ["React", "TypeScript", "Maps", "Geolocation"],
    description:
      "Track trips across cities on a world map and share your adventures with a beautiful UI.",
  },
];
