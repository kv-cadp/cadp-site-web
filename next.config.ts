import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/dating",
        destination: "/entreprises/alternance-dating",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
