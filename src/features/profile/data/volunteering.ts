import type { Experience } from "../types/experiences";

// Volunteering reuses the Experience shape so it renders with the exact same
// styling as the Experience section (company → role → time → highlights).
export const VOLUNTEERING: Experience[] = [
  {
    id: "wci-goderich",
    companyName: "Winners Chapel International, Goderich",
    companyLogo: "https://www.wcigoderich.org/favicon.ico",
    companyWebsite: "https://www.wcigoderich.org",
    companyWebsiteImage: "/images/projects/wci_goderich.webp",
    positions: [
      {
        id: "it-specialist-2024",
        title: "IT Specialist",
        employmentPeriod: { start: "05.2024" },
        employmentType: "Volunteer",
        icon: "code",
        description: `- Designed, built and maintain the [church website](https://www.wcigoderich.org) in Next.js 16, TypeScript and Tailwind CSS 4 with Supabase, GSAP and Motion: a sermon and media library, event schedules and ministry pages.
- Support the technical and media team during services as one of its members (photography, video recording and editing, live streaming), and onboard new volunteers on the tools.`,
        skills: [
          "Next.js",
          "TypeScript",
          "Supabase",
          "Web Development",
          "Technical Support",
          "Media Operations",
          "Photography",
          "Video Recording",
          "Video Editing",
          "Live Streaming",
          "Teaching & Onboarding",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
];
