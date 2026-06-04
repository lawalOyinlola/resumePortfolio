import type { MetadataRoute } from "next";

import { SITE_INFO } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    short_name: SITE_INFO.name,
    name: SITE_INFO.name,
    description: SITE_INFO.description,
    icons: [
      {
        src: "/icons/favicon.ico",
        type: "image/x-icon",
        sizes: "48x48",
      },
      {
        src: "/icons/favicon-32.png",
        type: "image/png",
        sizes: "32x32",
        purpose: "any",
      },
      {
        src: "/icons/android-chrome-512x512.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "any",
      },
      {
        src: "/icons/android-chrome-512x512.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "maskable",
      },
    ],
    id: "/?utm_source=pwa",
    start_url: "/?utm_source=pwa",
    display: "standalone",
    scope: "/",
    screenshots: [
      {
        src: "/images/screenshot.webp",
        type: "image/webp",
        sizes: "543x300",
        form_factor: "wide",
      },
      {
        src: "/images/screenshot-dark.webp",
        type: "image/webp",
        sizes: "543x300",
        form_factor: "wide",
      },
    ],
  };
}
