import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Development-only placeholder photography (see lib/demo/images.ts).
      { protocol: "https", hostname: "images.unsplash.com" },
      // Any Supabase project's public Storage CDN.
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
    ],
  },
};

export default nextConfig;
