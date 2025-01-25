import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.shields.io',
        port:'',
        pathname: '/**',
      }
    ]
  }
}



export default nextConfig;
