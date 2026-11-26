import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Cloudflare tunnel dev (v2.savasdersimcelik.dev) — HMR + dev assets
  allowedDevOrigins: ["v2.savasdersimcelik.dev", "*.savasdersimcelik.dev"],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["v2.savasdersimcelik.dev", "*.savasdersimcelik.dev"],
    },
  },
};

export default withNextIntl(nextConfig);
