import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a self-contained server bundle (.next/standalone) for the Docker image.
  output: "standalone",
  // Don't advertise the framework.
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    // Server Actions are invoked from the browser; only trust our own origin(s).
    serverActions: {
      allowedOrigins: process.env.BETTER_AUTH_URL
        ? [new URL(process.env.BETTER_AUTH_URL).host]
        : undefined,
    },
  },
};

export default nextConfig;
