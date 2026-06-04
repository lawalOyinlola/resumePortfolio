import "@/styles/globals.css";

import dayjs from "dayjs";
import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import type { Person, ProfilePage, WebSite, WithContext } from "schema-dts";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Providers } from "@/components/providers";
import { META_THEME_COLORS, SITE_INFO } from "@/config/site";
import { SOCIAL_LINKS } from "@/features/profile/data/social-links";
import { USER } from "@/features/profile/data/user";
import { fontMono, fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { decodeEmail } from "@/utils/string";

function getWebSiteJsonLd(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_INFO.name,
    url: SITE_INFO.url,
    description: SITE_INFO.description,
    alternateName: [USER.username, `${USER.firstName} ${USER.lastName}`],
    author: {
      "@type": "Person",
      name: USER.displayName,
      url: USER.website,
    },
  };
}

function getPersonJsonLd(): WithContext<Person> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_INFO.url}#person`,
    name: USER.displayName,
    alternateName: USER.middleName
      ? `${USER.firstName} ${USER.middleName} ${USER.lastName}`
      : USER.displayName,
    identifier: USER.username,
    jobTitle: USER.jobTitle,
    description: USER.bio,
    url: USER.website,
    image: `${SITE_INFO.url}${USER.avatar}`,
    email: `mailto:${decodeEmail(USER.email)}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
    worksFor: USER.jobs.map((job) => ({
      "@type": "Organization",
      name: job.company,
    })),
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "AltSchool Africa" },
      {
        "@type": "CollegeOrUniversity",
        name: "Federal University of Agriculture, Abeokuta",
      },
    ],
    knowsAbout: [
      "Frontend Engineering",
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Web Accessibility",
      "Web Performance",
      "UI Engineering",
      "Full-Stack Development",
      "NestJS",
      "Node.js",
      "Prisma",
      "WebSockets",
      "Mapbox GL",
      "Docker",
      "CI/CD",
      "LLM Integration",
    ],
    sameAs: [USER.website, ...SOCIAL_LINKS.map((link) => link.href)],
  };
}

function getProfilePageJsonLd(): WithContext<ProfilePage> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: dayjs(USER.dateCreated).toISOString(),
    dateModified: dayjs(USER.dateCreated).toISOString(),
    mainEntity: { "@type": "Person", "@id": `${SITE_INFO.url}#person` },
  };
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_INFO.url),
  alternates: {
    canonical: "/",
  },
  title: {
    template: `%s – ${SITE_INFO.name}`,
    default: `${USER.displayName} – ${USER.jobTitle}`,
  },
  description: SITE_INFO.description,
  keywords: SITE_INFO.keywords,
  authors: [
    {
      name: `${USER.firstName} ${USER.lastName}`,
      url: SITE_INFO.url,
    },
  ],
  creator: `${USER.firstName} ${USER.lastName}`,
  openGraph: {
    siteName: SITE_INFO.name,
    url: "/",
    type: "profile",
    firstName: USER.firstName,
    lastName: USER.lastName,
    username: USER.username,
    gender: USER.gender,
    images: [
      {
        url: SITE_INFO.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_INFO.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@HoneyzRich", // Twitter username
    images: [SITE_INFO.ogImage],
  },
  icons: {
    icon: [
      // Light (default)
      { url: "/icons/favicon.ico", sizes: "any" },
      { url: "/icons/lawal-logo.svg", type: "image/svg+xml" },
      { url: "/icons/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icons/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      // Dark overrides
      {
        url: "/icons/dark/favicon.ico",
        sizes: "any",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icons/dark/favicon-32.png",
        type: "image/png",
        sizes: "32x32",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icons/dark/favicon-16x16.png",
        type: "image/png",
        sizes: "16x16",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: {
      url: "/icons/apple-touch-icon.png",
      type: "image/png",
      sizes: "180x180",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: META_THEME_COLORS.light,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Read the persisted theme from a cookie so the correct class is applied on
  // the server. This avoids a flash of the wrong theme WITHOUT rendering an
  // inline <script> (React 19 renders scripts on the server but skips them on
  // the client, which shifts the tree and breaks hydration). Returning visitors
  // get no flash; the ThemeProvider resolves "system" on first visit.
  const isDark = (await cookies()).get("theme")?.value === "dark";

  return (
    <html
      lang="en"
      className={cn(
        fontSans.variable,
        fontMono.variable,
        isDark ? "dark" : "light"
      )}
      style={{ colorScheme: isDark ? "dark" : "light" }}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to CDN origins for tech-stack icons so the browser
            establishes connections before the icons are requested. */}
        <link rel="preconnect" href="https://cdn.simpleicons.org" />
        <link rel="preconnect" href="https://api.iconify.design" />
        {/* JSON-LD lives in <head> on purpose: a <script> in the <body> is
            hoisted to <head> on the client by React 19 but stays in the body on
            the server, shifting the body by one node and breaking hydration. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebSiteJsonLd()).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getPersonJsonLd()).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getProfilePageJsonLd()).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />
      </head>

      {/* suppressHydrationWarning: browser extensions (wallet providers,
          Grammarly, etc.) mutate the DOM before React hydrates. */}
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
        {/* Only load on Vercel — avoids 404s when running locally */}
        {process.env.VERCEL && <Analytics />}
        {process.env.VERCEL && <SpeedInsights />}
      </body>
    </html>
  );
}
