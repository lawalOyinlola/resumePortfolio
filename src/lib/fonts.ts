import { Caveat as FontHandwritten, Geist as FontSans } from "next/font/google";
import localFont from "next/font/local";

// Same type system as chanhdai.com: Geist for text, Paper Mono for mono, and
// Caveat for handwritten notes.
export const fontSans = FontSans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-sans",
});

// Paper Mono, SIL Open Font License 1.1 (see ../assets/fonts/PaperMono-OFL.txt).
export const fontMono = localFont({
  src: "../assets/fonts/PaperMono[wght].woff2",
  display: "swap",
  variable: "--font-mono",
});

// Handwritten margin notes (e.g. "follow me" beside the social links).
export const fontHandwritten = FontHandwritten({
  weight: ["400", "500"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-handwritten",
});
