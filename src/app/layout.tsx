import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, Syne } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Travel Campaign — Community-Driven Ride Sharing for India",
  description:
    "India's community-driven ride sharing platform built around trust, safety, and real human connections. Zero commission. Zero per-ride charges.",
  keywords: [
    "ride sharing",
    "carpooling",
    "India",
    "Hyderabad",
    "community",
    "safety",
    "commute",
  ],
  openGraph: {
    title: "Travel Campaign — Share Your Journey, Not Just a Ride",
    description:
      "India's community-driven ride sharing platform built around trust, safety, and real human connections.",
    type: "website",
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
      className={`${bricolage.variable} ${dmSans.variable} ${syne.variable} antialiased`}
    >
      <body className="min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
