import type { MetadataRoute } from "next";

import { SITE_INFO } from "@/config/site";

// Bump when the résumé content is meaningfully updated. Kept stable (not
// `new Date()`) so the sitemap doesn't report a fresh lastModified on every
// rebuild/deploy, which search engines treat as noise. File mtimes aren't
// reliable here because CI checkouts reset them.
const LAST_UPDATED = new Date("2026-06-03T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_INFO.url,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 1,
    },
    // PDFs live in /public/resume/ for SEO indexability.
    {
      url: `${SITE_INFO.url}/resume/Oyinlola-Lawal-Frontend-Engineer.pdf`,
      lastModified: LAST_UPDATED,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${SITE_INFO.url}/resume/Oyinlola-Lawal-Software-Engineer.pdf`,
      lastModified: LAST_UPDATED,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
