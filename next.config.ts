import type { NextConfig } from "next";

// STATIC_EXPORT=1 npm run build -> plain static files in /out (used for the
// single-file offline build, see scripts/inline.py)
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(staticExport ? { output: "export", images: { unoptimized: true } } : {}),
};

export default nextConfig;
