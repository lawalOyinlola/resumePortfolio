import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Read by the footer's build date (src/lib/build-info.ts).
  env: {
    BUILD_TIMESTAMP: new Date().toISOString(),
  },
  reactStrictMode: true,
  // Don't advertise the framework in an X-Powered-By header.
  poweredByHeader: false,
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.microlink.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
        port: "",
      },
      {
        protocol: "https",
        hostname: "api.iconify.design",
        port: "",
      },
      {
        protocol: "https",
        hostname: "docs.flutterflow.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "icons.duckduckgo.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "hng.tech",
        port: "",
      },
      {
        protocol: "https",
        hostname: "www.wcigoderich.org",
        port: "",
      },
      {
        protocol: "https",
        hostname: "trakkam.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "*.vercel.app",
        port: "",
      },
      {
        protocol: "https",
        hostname: "*.netlify.app",
        port: "",
      },
      {
        protocol: "https",
        hostname: "resolve.vote",
        port: "",
      },
    ],
    qualities: [75, 100],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevents MIME type sniffing, reducing the risk of malicious file uploads
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Protects against clickjacking by preventing the site from being framed
          { key: "X-Frame-Options", value: "DENY" },
          // Balances referrer information sharing with privacy
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
