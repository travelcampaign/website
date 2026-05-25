import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, Syne, Outfit } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

// Funky geometric display font — used for dramatic headings + stats
const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

// Brand font — used inside the canonical Haloryd logo SVGs (wordmarks).
// The SVG <text> elements reference 'Outfit' by name; without this loader
// browsers fall back to system-ui and the wordmark renders incorrectly.
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Haloryd — Community-Driven Ride Sharing for India",
  description:
    "India's community-driven ride sharing platform built around trust, safety, and real human connections. Zero commission. Zero per-ride charges.",
  keywords: [
    "haloryd",
    "ride sharing",
    "carpooling",
    "India",
    "Hyderabad",
    "community",
    "safety",
    "commute",
  ],
  openGraph: {
    title: "Haloryd — Share Your Journey, Not Just a Ride",
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
      className={`${bricolage.variable} ${dmSans.variable} ${syne.variable} ${outfit.variable} antialiased`}
    >
      <body className="min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
