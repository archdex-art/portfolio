import type { NextConfig } from "next";
import { BASE_PATH } from "./lib/base-path";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages — no server, so API routes/ISR are unavailable.
  output: "export",
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH ? `${BASE_PATH}/` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
