import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans, DM_Mono, Outfit } from "next/font/google";
import "./globals.css";

// Display serif — the Evening Commute voice. DM Serif Display pairs with
// DM Sans/DM Mono by design; high contrast without Fraunces' wonky
// letterforms (the descending f read as a broken glyph).
const serifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif-display",
  style: ["normal", "italic"],
  weight: "400",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

// Metadata voice: kickers, route labels, timestamps.
const dmMono = DM_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-mono",
  weight: ["400", "500"],
});

// Brand font — used inside the Nexstopp wordmark SVG. The SVG <text> element
// references 'Outfit' by name; without this loader browsers fall back to
// system-ui and the wordmark renders incorrectly.
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nexstopp — Community-Driven Ride Sharing for India",
  description:
    "India's community-driven ride sharing platform built around trust, safety, and real human connections. Zero commission. Zero per-ride charges.",
  keywords: [
    "nexstopp",
    "ride sharing",
    "carpooling",
    "India",
    "Hyderabad",
    "community",
    "safety",
    "commute",
  ],
  openGraph: {
    title: "Nexstopp — Share Your Journey, Not Just a Ride",
    description:
      "India's community-driven ride sharing platform built around trust, safety, and real human connections.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serifDisplay.variable} ${dmSans.variable} ${dmMono.variable} ${outfit.variable} antialiased`}
    >
      <body className="min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
