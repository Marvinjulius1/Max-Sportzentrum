import type { Metadata, Viewport } from "next";
import { Archivo, Newsreader } from "next/font/google";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";
import { hero, studio } from "@/lib/content";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${studio.fullName} · ${studio.city}`,
  description: `${hero.intro.lead} ${hero.intro.body}`,
  icons: { icon: "/logo/max-mark.svg" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${archivo.variable} ${newsreader.variable} antialiased`}>
      <body>
        <SmoothScroll />
        {children}
        <Cursor />
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
