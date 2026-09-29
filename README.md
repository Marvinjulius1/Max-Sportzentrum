# max – Sport- und Gesundheitszentrum · Concept Site

Editorial one-pager. Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 ·
GSAP + ScrollTrigger · Lenis · three.js (plain).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
```

## Inhalte austauschen

Alle studio-spezifischen Fakten stehen in **`src/lib/content.ts`**
(Platzhalter sind mit `PLATZHALTER` markiert – Gründungsjahr, Preise, Flächen,
Kurszahlen, Trainer, E-Mail, Pressezitat). Bilder liegen in **`/public`**:

| Datei | Zweck |
|---|---|
| `public/logo/max-logo.svg`, `max-mark.svg`, `max-logo-inverse.svg` | Logo (vektorisiert), Bildmarke, Variante für dunklen Grund |
| `public/equipment/hero.png` | Hero-Objekt – echtes Cutout, transparenter Hintergrund, aufrecht |
| `public/equipment/{kettlebell,dumbbell,plate,medball}.png` | Cutouts für die 3D-Objekte |
| `public/story/placeholder-story-0X-*.jpg` | Story-Fotos (werden graustufig gezeigt) |
| `public/hdri/studio_small_08_1k.hdr` | Poly Haven HDRI (CC0) |

Neue Cutouts einfach unter gleichem Namen ablegen. Achsen-Hinweis in
`assets.equipment` (content.ts): `y` = aufrecht rotationssymmetrisch
(Kettlebell, Ball), `x` = liegend (Kurzhantel, Achse horizontal im Foto),
`disc` = Scheibe (Foto zeigt die Stirnseite). Aus der Silhouette wird ein
Drehkörper (Lathe) gebaut, das Foto wird 360° darauf projiziert und daraus
eine Roughness/Metalness-Map abgeleitet.

Herkunft und Lizenzen der Platzhalter: `public/CREDITS.md`.

## Aufbau

- `src/components/hero/` – Hero: eine WebGL-Pass-Komposition (Papier/Nacht),
  Navier–Stokes-Fluid (`gl/FluidSim.ts`, 10 % Auflösung, BFECC, 4 Jacobi,
  Dissipation 0.96) als harte Maske mit Teal-Rim, Flut beim Scrollen.
- `src/components/gl/Stage.ts` – ein gemeinsamer WebGL-Kontext für alle
  Produkt-Views (Scissor pro DOM-Element), HDRI via PMREM, ACES 1.15.
- `src/components/sections/` – Bereiche, Methode, Geschichte, Stimmen, Studio, Footer
  (jeweils eigener ScrollTrigger-Pin, meldet Fortschritt an die Nav).
- Farben ausschließlich aus dem Logo + Weiß/Schwarz-Mischungen: `src/app/globals.css`.
- `prefers-reduced-motion`: kein Preloader, kein Smooth-Scroll, keine Pins;
  statische Bilder statt 3D.

## Offline-Datei (Doppelklick, ohne Server)

```bash
npm run build:offline   # -> max-sportzentrum.html (alles eingebettet, ~8 MB)
```
