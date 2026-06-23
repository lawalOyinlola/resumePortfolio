import type { Experience } from "../types/experiences";

// Volunteering reuses the Experience shape so it renders with the exact same
// styling as the Experience section (company → role → time → highlights).
export const VOLUNTEERING: Experience[] = [
  {
    id: "wci-goderich",
    companyName: "Winners Chapel International, Goderich",
    companyLogo: "https://www.wcigoderich.org/favicon.ico",
    companyWebsite: "https://www.wcigoderich.org",
    companyWebsiteImage: "/images/projects/wci_goderich.png",
    positions: [
      {
        id: "it-specialist-2024",
        title: "IT Specialist",
        employmentPeriod: { start: "05.2024" },
        employmentType: "Volunteer",
        icon: "code",
        description: `- Built and maintain the [church website](https://www.wcigoderich.org) for Winners Chapel International, Goderich.
- Assist the technical and media unit, helping run the tech side of services.
- Provide general technical support across the church as needed.`,
        skills: [
          "Next.js",
          "Web Development",
          "Technical Support",
          "Media Operations",
          "Photography",
          "Video Recording",
          "Video Editing",
          "Teaching & Onboarding",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
];
