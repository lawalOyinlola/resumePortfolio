import {
  IBM_Plex_Mono as FontMono,
  IBM_Plex_Sans as FontSans,
  Pixelify_Sans as FontPixel,
} from "next/font/google";

export const fontSans = FontSans({
  weight: ["400", "500", "600"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-sans",
});

// Boxy pixel display font — used only for the oversized footer wordmark.
export const fontPixel = FontPixel({
  weight: ["400", "500", "600", "700"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-pixel",
});

export const fontMono = FontMono({
  weight: ["400", "500", "600"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-mono",
});
