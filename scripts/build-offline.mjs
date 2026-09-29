/**
 * Single-file offline build: one HTML that opens by double-click (file://).
 *   STATIC_EXPORT=1 npx next build   (for the compiled CSS + self-hosted fonts)
 *   node scripts/build-offline.mjs
 * Output: max-sportzentrum.html
 */
import { build } from "esbuild";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const out = path.join(root, "out");
const mime = { ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".hdr": "application/octet-stream", ".woff2": "font/woff2" };
const dataUri = (p) => `data:${mime[path.extname(p)] ?? "application/octet-stream"};base64,${fs.readFileSync(p).toString("base64")}`;

// 1) bundle the client app
const res = await build({
  entryPoints: [path.join(root, "scripts/offline/entry.tsx")],
  bundle: true,
  minify: true,
  format: "iife",
  target: "es2020",
  write: false,
  jsx: "automatic",
  define: { "process.env.NODE_ENV": '"production"' },
  alias: { "@": path.join(root, "src"), "next/image": path.join(root, "scripts/offline/next-image.tsx") },
  loader: { ".glsl": "text" },
  logLevel: "error",
});
let js = res.outputFiles[0].text;

// 2) public assets -> one embedded map; string literals point into it
const assets = {};
for (const dir of ["equipment", "logo", "story", "hdri"]) {
  for (const f of fs.readdirSync(path.join(root, "public", dir))) {
    assets[`/${dir}/${f}`] = dataUri(path.join(root, "public", dir, f));
  }
}
for (const a of Object.keys(assets)) js = js.split(`"${a}"`).join(`self.__A["${a}"]`);

// 3) CSS from the static export (Tailwind + next/font), fonts embedded
const html0 = fs.readFileSync(path.join(out, "index.html"), "utf8");
const htmlClass = html0.match(/<html[^>]*class="([^"]+)"/)[1];
let css = "";
for (const m of html0.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)) {
  const file = path.join(out, m[1]);
  css += fs.readFileSync(file, "utf8").replace(/url\(([^)"']+\.woff2)\)/g, (_, p) =>
    `url(${dataUri(p.startsWith("/") ? path.join(out, p) : path.resolve(path.dirname(file), p))})`,
  );
}

const title = html0.match(/<title>([^<]*)<\/title>/)?.[1] ?? "max";
const html = `<!doctype html>
<html lang="de" class="${htmlClass}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#ffffff">
<title>${title}</title>
<link rel="icon" href="${assets["/logo/max-mark.svg"]}">
<style>${css}</style>
<script>self.__A=${JSON.stringify(assets)};</script>
</head>
<body>
<div id="root"></div>
<script>${js.replace(/<\/script/g, "<\\/script")}</script>
</body>
</html>`;
const dest = path.join(root, "max-sportzentrum.html");
fs.writeFileSync(dest, html);
console.log(dest, (fs.statSync(dest).size / 1e6).toFixed(1), "MB");
