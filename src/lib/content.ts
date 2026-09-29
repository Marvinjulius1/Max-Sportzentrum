/**
 * ALL studio-specific copy and facts live here.
 *
 * Everything marked `PLATZHALTER` is a stand-in: replace the value, keep the
 * shape. Images are referenced by path into /public – swap the file, keep the
 * name (or change the path here). Nothing else in the codebase needs to change.
 *
 * Reference for real data: https://max-sportzentrum.de/
 */

export type Tint = "teal" | "blue" | "ink" | "white";
export type EquipmentKey = "kettlebell" | "dumbbell" | "plate" | "medball";

/* ------------------------------------------------------------------ */
/* Studio                                                              */
/* ------------------------------------------------------------------ */

export const studio = {
  name: "max",
  fullName: "max – Sport- und Gesundheitszentrum",
  subtitle: "Sport- und Gesundheitszentrum",
  city: "Norden",
  region: "Ostfriesland",
  street: "Am Norder Tief 43",
  zip: "26506",
  phone: "04931 3888",
  phoneHref: "tel:+4949313888",
  email: "info@max-sportzentrum.de", // PLATZHALTER – echte Adresse eintragen
  /** PLATZHALTER – echtes Gründungsjahr eintragen. Alle Story-Jahre leiten sich davon ab. */
  foundingYear: 1996,
  hours: [
    { days: "Mo – Fr", time: "07 – 21 Uhr" },
    { days: "Sa", time: "10 – 18 Uhr" },
    { days: "So", time: "10 – 16 Uhr" },
  ],
  hoursNote: "Service ab 08 Uhr besetzt",
} as const;

/* ------------------------------------------------------------------ */
/* Assets (paths into /public)                                         */
/* ------------------------------------------------------------------ */

export const assets = {
  logo: "/logo/max-logo.svg",
  logoMark: "/logo/max-mark.svg",
  /** same logo, subtitle in white – for dark backgrounds */
  logoInverse: "/logo/max-logo-inverse.svg",
  hdri: "/hdri/studio_small_08_1k.hdr",
  /** Hero object: one real cutout, transparent background. */
  hero: "/equipment/hero.png",
  /**
   * Cutouts used for the 3D pieces. `axis` = the axis the object is
   * rotationally symmetric around in the photo ("y" upright, "x" lying).
   */
  equipment: {
    kettlebell: { src: "/equipment/kettlebell.png", axis: "y", label: "Kettlebell" },
    dumbbell: { src: "/equipment/dumbbell.png", axis: "x", label: "Kurzhantel" },
    plate: { src: "/equipment/plate.png", axis: "disc", label: "Hantelscheibe" },
    medball: { src: "/equipment/medball.png", axis: "y", label: "Medizinball" },
  } satisfies Record<EquipmentKey, { src: string; axis: "x" | "y" | "disc"; label: string }>,
} as const;

/* ------------------------------------------------------------------ */
/* Navigation / section index                                          */
/* ------------------------------------------------------------------ */

export const sections = [
  { id: "start", label: "Start" },
  { id: "bereiche", label: "Bereiche" },
  { id: "methode", label: "Methode" },
  { id: "geschichte", label: "Geschichte" },
  { id: "stimmen", label: "Stimmen" },
  { id: "studio", label: "Studio" },
] as const;

export const nav = {
  cta: { label: "Probetraining", href: "#kontakt" },
};

/* ------------------------------------------------------------------ */
/* Preloader                                                           */
/* ------------------------------------------------------------------ */

export const preloader = {
  caption: "Norden, Ostfriesland",
};

/* ------------------------------------------------------------------ */
/* Hero + intro                                                        */
/* ------------------------------------------------------------------ */

export const hero = {
  /** Screen-reader h1 (the visible wordmark is drawn in WebGL). */
  srTitle: "max – Sport- und Gesundheitszentrum in Norden",
  wordmark: { ma: "ma", x: "x" },
  cornerTopLeft: ["Sport- und", "Gesundheitszentrum"],
  cornerTopRight: ["Am Norder Tief 43", "Norden"],
  cornerBottomLeft: "Scrollen",
  cornerBottomRight: "Seit",
  hint: "Bewege die Maus",
  heroAlt: "Kettlebell aus Gusseisen",
  intro: {
    kicker: "Das Studio",
    lead: "Das Studio, das du kennst.",
    body: "Klare Räume, ehrliches Eisen, Trainer, die deinen Namen sagen. Seit über zwei Jahrzehnten trainiert Norden bei uns – leise, gründlich, mit Plan.",
  },
};

/* ------------------------------------------------------------------ */
/* Areas (pinned showcase)                                             */
/* ------------------------------------------------------------------ */

export const areas = {
  kicker: "Vier Bereiche",
  title: "Ein Haus, vier Arten zu trainieren.",
  priceLabel: "Preis ab",
  items: [
    {
      id: "kraft",
      title: "Kraft & Cardio",
      line: "Freihantel, Maschinen, Ausdauer.",
      text: "Der große Freihantelbereich ist unser Herzstück. Daneben: geführte Geräte für den Einstieg und eine Cardiozone mit Blick nach draußen.",
      equipment: "kettlebell",
      tint: "teal",
      specs: [
        { label: "Fläche", value: "900 m²" }, // PLATZHALTER
        { label: "Stationen", value: "85" }, // PLATZHALTER
        { label: "Betreuung", value: "Täglich" },
        { label: "Zugang", value: "7 Tage" },
      ],
      price: { from: "29,90", unit: "€ / Monat" }, // PLATZHALTER
    },
    {
      id: "kurse",
      title: "Kurse",
      line: "Gemeinsam geht mehr.",
      text: "Von energiegeladenen Workouts bis zum ruhigen Stretching. Jedes Level, jede Woche, mit Trainern, die mitzählen.",
      equipment: "medball",
      tint: "blue",
      specs: [
        { label: "Kurse pro Woche", value: "40" }, // PLATZHALTER
        { label: "Räume", value: "2" }, // PLATZHALTER
        { label: "Level", value: "Alle" },
        { label: "Dauer", value: "30 – 60 min" },
      ],
      price: { from: "inklusive", unit: "in jeder Mitgliedschaft" }, // PLATZHALTER
    },
    {
      id: "gesundheit",
      title: "Gesundheit & Prävention",
      line: "Rücken, Gewicht, Energie.",
      text: "Zertifizierte Präventionskurse nach § 20 SGB V. Deine Krankenkasse erstattet bis zu 100 % der Kursgebühr.",
      equipment: "plate",
      tint: "ink",
      specs: [
        { label: "Programme", value: "3" },
        { label: "Zertifizierung", value: "§ 20 SGB V" },
        { label: "Zuschuss", value: "bis 100 %" },
        { label: "Dauer", value: "8 – 12 Wo." },
      ],
      price: { from: "0,00", unit: "€ nach Erstattung" }, // PLATZHALTER
    },
    {
      id: "personal",
      title: "Personal Training",
      line: "Eine Stunde nur für dich.",
      text: "Analyse, Plan, Begleitung. Für ein Ziel, eine Verletzung, einen Wettkampf – oder den ersten Klimmzug.",
      equipment: "dumbbell",
      tint: "white",
      specs: [
        { label: "Einheit", value: "60 min" },
        { label: "Analyse", value: "Inklusive" },
        { label: "Trainer", value: "Zertifiziert" },
        { label: "Termine", value: "Flexibel" },
      ],
      price: { from: "59,00", unit: "€ / Einheit" }, // PLATZHALTER
    },
  ] satisfies {
    id: string;
    title: string;
    line: string;
    text: string;
    equipment: EquipmentKey;
    tint: Tint;
    specs: { label: string; value: string }[];
    price: { from: string; unit: string };
  }[],
};

/* ------------------------------------------------------------------ */
/* Method (pinned 360° object)                                         */
/* ------------------------------------------------------------------ */

export const method = {
  kicker: "Die Methode",
  title: "Eine Umdrehung, vier Prinzipien.",
  equipment: "dumbbell" as EquipmentKey,
  panels: [
    {
      id: "kraft",
      tab: "Kraft",
      term: "Progressive Überlastung",
      text: "Etwas mehr als letzte Woche. Nicht viel, aber jedes Mal. So wächst Muskel – in jedem Alter.",
      dose: "2 – 3× / Woche",
      bar: 0.78,
      barLabel: "Intensität",
    },
    {
      id: "ausdauer",
      tab: "Ausdauer",
      term: "Zone-2-Training",
      text: "Ruhig genug, um zu sprechen. Lang genug, um das Herz zu formen. Die Basis unter jeder Form.",
      dose: "3× 40 min / Woche",
      bar: 0.55,
      barLabel: "Intensität",
    },
    {
      id: "mobilitaet",
      tab: "Mobilität",
      term: "Aktive Beweglichkeit",
      text: "Bewegungsumfang, den du kontrollierst. Für einen Rücken, der hält, und Gelenke, die mitmachen.",
      dose: "täglich 10 min",
      bar: 0.35,
      barLabel: "Intensität",
    },
    {
      id: "regeneration",
      tab: "Regeneration",
      term: "Superkompensation",
      text: "Stärker wirst du in der Pause. Schlaf, Ruhetage und Sauna sind Teil des Plans, nicht die Ausnahme.",
      dose: "1 – 2 Ruhetage / Woche",
      bar: 0.18,
      barLabel: "Intensität",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Story (pinned chapters)                                             */
/* ------------------------------------------------------------------ */

export const story = {
  kicker: "Geschichte",
  title: "Wie aus einer Halle ein Haus wurde.",
  /** `offset` = years after `studio.foundingYear`. "heute" = current year. */
  chapters: [
    {
      offset: 0,
      title: "Eine Halle, ein Versprechen.",
      text: "Ein leerer Raum am Norder Tief, ein paar Hanteln, die Idee, dass Training ehrlich sein darf.",
      image: "/story/placeholder-story-01-halle.jpg",
      alt: "Leere Trainingshalle mit Holzboden",
    },
    {
      offset: 6,
      title: "Das erste echte Eisen.",
      text: "Der Freihantelbereich entsteht. Bis heute der Ort, an dem die meisten Geschichten beginnen.",
      image: "/story/placeholder-story-02-eisen.jpg",
      alt: "Kurzhanteln in einer Reihe",
    },
    {
      offset: 12,
      title: "Kurse, die Freunde machen.",
      text: "Zwei Kursräume, ein voller Plan. Aus Mitgliedern werden Gruppen, aus Gruppen Verabredungen.",
      image: "/story/placeholder-story-03-kurse.jpg",
      alt: "Heller Kursraum mit Geräten",
    },
    {
      offset: 19,
      title: "Gesundheit als Handwerk.",
      text: "Präventionskurse nach § 20, Rückenkonzept, Firmenfitness. Training wird Teil der Versorgung.",
      image: "/story/placeholder-story-04-gesundheit.jpg",
      alt: "Cardiogeräte vor großen Fenstern",
    },
    {
      offset: "heute",
      title: "Das Studio, das du kennst.",
      text: "Modern, persönlich, motivierend. Und immer noch der Ort, an dem man deinen Namen kennt.",
      image: "/story/placeholder-story-05-heute.jpg",
      alt: "Trainingsfläche mit Kraftgeräten",
    },
  ] as { offset: number | "heute"; title: string; text: string; image: string; alt: string }[],
};

/* ------------------------------------------------------------------ */
/* Voices                                                              */
/* ------------------------------------------------------------------ */

export const voices = {
  kicker: "Stimmen",
  quotes: [
    {
      text: "Der große Freihantelbereich ist wie ein Spielplatz für Erwachsene.",
      name: "Hannah, 25",
      role: "Mitglied seit sieben Jahren",
    },
    {
      text: "Elf Kilo Muskeln mit vierundsiebzig. Ich fühle mich lebendiger denn je.",
      name: "Egon, 74",
      role: "Mitglied",
    },
    {
      text: "Ein Studio, das Gesundheit ernster nimmt als Spiegelselfies.",
      name: "Lokalpresse", // PLATZHALTER
      role: "Pressestimme",
    },
  ],
  marqueeA: ["Kraft", "Ausdauer", "Rücken", "Kurse", "Beweglichkeit", "Gesundheit", "Norden"],
  marqueeB: ["§ 20 Prävention", "Firmenfitness", "Personal Training", "Probetraining", "Abnehmen", "Performance"],
};

/* ------------------------------------------------------------------ */
/* Studio: facts + offers                                              */
/* ------------------------------------------------------------------ */

export const studioSection = {
  kicker: "Das Studio in Zahlen",
  title: "Alles da. Nichts zu viel.",
  facts: [
    { label: "Geräte", value: 120, suffix: "+", note: "Kraft, Cardio, Funktional" }, // PLATZHALTER
    { label: "Kurse", value: 40, suffix: "", note: "pro Woche" }, // PLATZHALTER
    { label: "Trainer", value: 18, suffix: "", note: "mit Lizenz" }, // PLATZHALTER
    { label: "Öffnungszeiten", value: 84, suffix: " h", note: "pro Woche geöffnet", showHours: true },
  ],
  offers: [
    {
      id: "mitgliedschaft",
      title: "Mitgliedschaften",
      text: "Voller Zugang zu Fläche, Kursen und Betreuung. Monatlich kündbar oder mit Laufzeit.",
      price: "ab 29,90 €", // PLATZHALTER
      unit: "pro Monat",
      cta: "Tarife ansehen",
      equipment: "kettlebell",
    },
    {
      id: "kurse",
      title: "Kurse",
      text: "Präventionskurse nach § 20 SGB V – bis zu 100 % von deiner Krankenkasse erstattet.",
      price: "bis 100 %",
      unit: "Kassenzuschuss",
      cta: "Kursplan laden",
      equipment: "medball",
    },
    {
      id: "probetraining",
      title: "Probetraining",
      text: "Eine Stunde mit Trainer, ein ehrlicher Check, kein Vertrag. Danach entscheidest du.",
      price: "0 €",
      unit: "kostenfrei & unverbindlich",
      cta: "Termin anfragen",
      equipment: "plate",
    },
  ] satisfies {
    id: string;
    title: string;
    text: string;
    price: string;
    unit: string;
    cta: string;
    equipment: EquipmentKey;
  }[],
};

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export const footer = {
  formKicker: "Probetraining anfragen",
  formTitle: "Komm vorbei. Wir zeigen dir alles.",
  fields: {
    name: "Dein Name",
    contact: "E-Mail oder Telefon",
  },
  submit: "Anfragen",
  success: "Danke. Wir melden uns innerhalb eines Werktags.",
  privacy: "Wir nutzen deine Angaben nur für die Terminabsprache.",
  links: [
    { label: "Kursplan", href: "https://max-sportzentrum.de/kursprogramm" },
    { label: "Abnehmkonzept", href: "https://max-sportzentrum.de/abnehmkonzept" },
    { label: "Rückenkonzept", href: "https://max-sportzentrum.de/rueckenkonzept" },
    { label: "Firmenfitness", href: "https://firmenfitness.max-sportzentrum.de" },
    { label: "Karriere", href: "https://bewerbung.max-sportzentrum.de" },
  ],
  legal: [
    { label: "Impressum", href: "https://max-sportzentrum.de/impressum" },
    { label: "Datenschutz", href: "https://max-sportzentrum.de/datenschutz" },
  ],
  colophon: {
    type: "Gesetzt in Archivo und Newsreader.",
    build: "Gebaut mit Next.js, three.js und GSAP.",
    credits: "Platzhalter-Fotos: Wikimedia Commons, Flickr, rawpixel (CC). HDRI: Poly Haven (CC0).",
  },
  closing: "Made for the gym, not the couch.",
};

/* ------------------------------------------------------------------ */
/* Small UI labels                                                     */
/* ------------------------------------------------------------------ */

export const ui = {
  address: "Adresse",
  hours: "Öffnungszeiten",
  more: "Mehr",
  moreAria: "Weiterführend",
  dose: "Empfehlung",
  rotation: "Rotation",
  today: "Heute",
  figure: "Fig.",
};
