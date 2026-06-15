import { existsSync, readFileSync } from "fs";

/**
 * Auto-detects basePath for GitHub Pages:
 * - Custom domain (CNAME file exists) → basePath = '' → assets at /_next/...
 * - Subdirectory (ifelasaf.github.io/dolwood) → basePath = '/dolwood'
 *
 * GITHUB_REPOSITORY is automatically set by GitHub Actions as "owner/reponame".
 * Locally it is unset → basePath = '' → dev server works normally.
 */
const cname = existsSync("./public/CNAME")
  ? readFileSync("./public/CNAME", "utf8").trim()
  : "";

const repo = (process.env.GITHUB_REPOSITORY ?? "").split("/")[1] ?? "";

// Use basePath only when deployed without a custom domain
const basePath = !cname && repo ? `/${repo}` : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  // Expose basePath to client components via process.env
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
