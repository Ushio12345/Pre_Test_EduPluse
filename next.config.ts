import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ["/_next"],
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "3000",
                pathname: "/**",
            },

        ],
    },
    // compiler: {
    //   removeConsole: true,
    // },
    experimental: {
        serverActions: {
            bodySizeLimit: '20mb',
        },
    },
};

export default nextConfig;
