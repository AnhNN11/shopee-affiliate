import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'down-tx-vn.img.susercontent.com', pathname: '/**' },
    ],
  },
};

export default nextConfig;
