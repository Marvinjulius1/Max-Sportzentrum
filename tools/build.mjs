/**
 * Baut die ausführbaren Dateien aus js/src:
 *   js/app.js               – alle Skripte in einer normalen Script-Datei
 *   js/embedded-assets.js   – Kopien der 3D-Bilder + HDRI (für Doppelklick/file://)
 *   css/fonts.css           – Schriften eingebettet (für Doppelklick/file://)
 *
 * Nur nötig, wenn du JavaScript in js/src änderst oder Equipment-Bilder
 * austauschst und die Seite weiterhin per Doppelklick öffnen willst:
 *   npm i -g esbuild   (einmalig)   →   node tools/build.mjs
 */
import { build } from "esbuild";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const mime = { ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".hdr": "application/octet-stream", ".woff2": "font/woff2" };
const dataUri = (rel) =>
  `data:${mime[path.extname(rel)] ?? "application/octet-stream"};base64,${fs.readFileSync(path.join(root, rel)).toString("base64")}`;

// 1) scripts -> one classic file
await build({
  entryPoints: [path.join(root, "js/src/main.js")],
  bundle: true,
  minify: true,
  format: "iife",
  target: "es2020",
  outfile: path.join(root, "js/app.js"),
  alias: { three: path.join(root, "vendor/three.min.js") },
  legalComments: "none",
  logLevel: "error",
});

// 2) WebGL assets from the config block in index.html
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const cfg = JSON.parse(html.match(/<script type="application\/json" id="site-config">([\s\S]*?)<\/script>/)[1]);
const files = new Set([cfg.hero, cfg.hdri, ...Object.values(cfg.equipment).map((e) => e.src)]);
const embed = {};
for (const f of files) embed[f] = dataUri(f);
fs.writeFileSync(
  path.join(root, "js/embedded-assets.js"),
  "/* automatisch erzeugt von tools/build.mjs – nicht von Hand bearbeiten */\nwindow.__EMBED=" + JSON.stringify(embed) + ";\n",
);

// 3) fonts
const fonts = [
  ["Archivo", "fonts/archivo-var.woff2", "normal", "100 900", "62% 125%"],
  ["Newsreader", "fonts/newsreader-var.woff2", "normal", "200 800", null],
  ["Newsreader", "fonts/newsreader-italic-var.woff2", "italic", "200 800", null],
];
fs.writeFileSync(
  path.join(root, "css/fonts.css"),
  "/* automatisch erzeugt von tools/build.mjs – Schriften eingebettet */\n" +
    fonts
      .map(
        ([fam, file, style, weight, stretch]) =>
          `@font-face{font-family:"${fam}";src:url(${dataUri(file)}) format("woff2");font-style:${style};font-weight:${weight};${stretch ? `font-stretch:${stretch};` : ""}font-display:swap}`,
      )
      .join("\n") +
    "\n",
);
for (const f of ["js/app.js", "js/embedded-assets.js", "css/fonts.css"])
  console.log(f, (fs.statSync(path.join(root, f)).size / 1e6).toFixed(2), "MB");
