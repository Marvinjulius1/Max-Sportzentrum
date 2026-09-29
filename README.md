# max – Sport- und Gesundheitszentrum · Website

Reines HTML, CSS und JavaScript – kein Framework, kein Build-Schritt.
Einfach den kompletten Ordner auf den Webspace hochladen (z. B. per FTP zu
Strato, IONOS, All-Inkl, Netlify …). `index.html` ist die Startseite.

```
index.html        alle Texte + Seitenstruktur
css/style.css     Gestaltung (Farben ganz oben als Variablen)
js/               Animationen, Scrollen, WebGL/3D
bilder/           Logo, Equipment-Cutouts, Story-Fotos, HDRI
fonts/            Archivo + Newsreader (selbst gehostet)
vendor/           GSAP, ScrollTrigger, Lenis, three.js (lokal, keine CDNs)
```

## Inhalte ändern

- **Texte, Preise, Zahlen, Öffnungszeiten, Links:** direkt in `index.html`.
  Die Zähler im Bereich „Studio in Zahlen“ haben ihren Zielwert in
  `data-num="…"`.
- **Bilder:** Datei in `bilder/` unter gleichem Namen ersetzen.
  Equipment-Cutouts müssen PNG mit transparentem Hintergrund sein.
  Pfade und Achse (`y` aufrecht, `x` liegend, `disc` Scheibe) für die
  3D-Objekte stehen im Block `site-config` oben in `index.html`.
- **Kontaktformular:** im `<form action="#">` die Adresse deines
  Formular-Dienstes eintragen (Formspree, Netlify Forms, PHP-Mailer …).
  Solange `action="#"` ist, zeigt das Formular nur eine Danke-Meldung.

Platzhalter-Bilder und Lizenzen: `bilder/CREDITS.md`.

## Lokal ansehen

Die Seite nutzt JavaScript-Module und WebGL-Texturen, deshalb braucht sie
einen (beliebigen) Webserver – Doppelklick auf `index.html` reicht nicht.

```bash
python3 -m http.server 8000     # dann http://localhost:8000
# oder
npx serve .
```

## Performance

- Hero und 3D-Objekte rendern nur, solange sie sichtbar sind.
- Die Hero-Auflösung passt sich automatisch an, wenn Frames zu lange dauern.
- Smooth-Scroll (Lenis) nur für Mausrad; auf Touch-Geräten natives Scrollen.
- `prefers-reduced-motion`: statische Seite ohne Pins, Preloader und 3D.
