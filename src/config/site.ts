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

// Résumé downloads — Google Drive direct download links.
// Direct download format: https://drive.google.com/uc?export=download&id=<file_id>
export const RESUME_DOWNLOADS = [
  {
    label: "Frontend Engineer",
    href: "https://drive.google.com/uc?export=download&id=1f0ewtAFyDsY5c9XU_w0jsIJmuIej377K",
  },
  {
    label: "Software Engineer",
    href: "https://drive.google.com/uc?export=download&id=1qsatPy8qnwe8IlRFqqDz2qR_Ll9_tsbp",
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
