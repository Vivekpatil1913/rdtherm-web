import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The API serves uploaded images from localhost in dev, which Next.js 16's
    // image optimizer rejects (private-IP SSRF guard → 400). Disabling the
    // optimizer makes next/image load the original URLs directly. For a public
    // API/CDN domain in production you can set this back to false and keep the
    // remotePatterns below.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "videos.pexels.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      // Images uploaded through the Admin panel and served by the API.
      { protocol: "https", hostname: "rdtherm-api.sumagodemo.com" },
      { protocol: "http", hostname: "localhost", port: "4000" },
    ],
  },
};

export default nextConfig;
