import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',          // qualquer caminho dentro do domínio
      },
    ],
  },
};

export default nextConfig;
