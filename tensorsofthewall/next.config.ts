import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: {
    unoptimized: true,
  }
};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.shields.io',
        port:'',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'imgs.xkcd.com',
        port: '',
        pathname: '/**',
      }
    ]
  },
}



export default nextConfig;
