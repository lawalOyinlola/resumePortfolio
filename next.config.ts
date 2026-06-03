import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.microlink.io",
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
