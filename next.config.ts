import type { NextConfig } from "next";

/** Replace this with your actual React app domain (no trailing slash) */
const REACT_APP_DOMAIN = process.env.XPENZA_FRONTEND_URI;

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)", // applies to all routes
        headers: [
          {
            key: "X-Frame-Options",
            value: `ALLOW-FROM ${REACT_APP_DOMAIN}`,
          },
          {
            key: "Content-Security-Policy",
            value: `frame-ancestors 'self' ${REACT_APP_DOMAIN};`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
