import { USER } from "@/features/profile/data/user";

export const SITE_INFO = {
  name: USER.displayName,
  // This résumé site is served at resume.lawaloyinlola.com.
  // The main portfolio lives at lawaloyinlola.com (see USER.website).
  url: process.env.APP_URL || "https://resume.lawaloyinlola.com",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
};

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

// Résumé downloads — local PDFs (same-origin, so the download is reliable and
// keeps a clean filename), with the Google Drive copy as a fallback if the
// local file can't be fetched.
export const RESUME_DOWNLOADS = [
  {
    label: "Frontend Engineer",
    filename: "Oyinlola-Lawal-Frontend-Engineer.pdf",
    href: "/resume/Oyinlola-Lawal-Frontend-Engineer.pdf",
    fallbackHref:
      "https://drive.google.com/file/d/1ec5e1Z2HZFdKRLzudOXL9CltcCnKAl9l/view?usp=sharing",
  },
  {
    label: "Software Engineer",
    filename: "Oyinlola-Lawal-Software-Engineer.pdf",
    href: "/resume/Oyinlola-Lawal-Software-Engineer.pdf",
    fallbackHref:
      "https://drive.google.com/file/d/1sr6rTlNtIkjbuSgDN7Zte59Uv6Uof-ws/view?usp=sharing",
  },
];

export const SOURCE_CODE_GITHUB_REPO = "lawalOyinlola/resumePortfolio";
export const SOURCE_CODE_GITHUB_URL =
  "https://github.com/lawalOyinlola/resumePortfolio";

export const UTM_PARAMS = {
  utm_source: "resume.lawaloyinlola.com",
  utm_medium: "portfolio_website",
  utm_campaign: "referral",
};
