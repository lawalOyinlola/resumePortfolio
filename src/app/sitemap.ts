import type { MetadataRoute } from "next";

import { SITE_INFO } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  return [
    {
      url: SITE_INFO.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    // PDFs live in /public/resume/ for SEO indexability.
    {
      url: `${SITE_INFO.url}/resume/Oyinlola-Lawal-Frontend-Engineer.pdf`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${SITE_INFO.url}/resume/Oyinlola-Lawal-Software-Engineer.pdf`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
