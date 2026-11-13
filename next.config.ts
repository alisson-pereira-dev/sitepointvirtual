import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // `npm run check:publicacao` compila em outro diretório (NEXT_DIST_DIR=.next-check) para não sobrescrever a `.next`.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default config;
