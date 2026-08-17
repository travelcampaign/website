import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, DM_Sans, DM_Mono, Outfit } from "next/font/google";
import { SITE_URL, SITE_NAME, CONTACT_EMAIL } from "@/lib/site";
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

export const viewport: Viewport = {
  themeColor: "#101918",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  // Without metadataBase every OG url and canonical resolves relative to
  // localhost in production builds. This is the single highest-leverage
  // line of SEO on the site.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nexstopp | Carpooling for India, with safety built in",
    template: "%s | Nexstopp",
  },
  description:
    "Share your daily commute with verified neighbours in Hyderabad. Split fuel costs directly, pay zero commission, and someone you trust watches over every ride.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_IN",
    title: "Nexstopp | The city goes home together",
    description:
      "Carpooling for India with safety built in. Riders split fuel costs directly and Nexstopp takes no commission.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexstopp | The city goes home together",
    description:
      "Carpooling for India with safety built in. Zero commission, and someone you trust watches over the ride.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.svg",
  },
};

// Everything here is verifiable today: the org exists, the site exists, the
// email answers. Product/rating schema waits until there is a product with
// ratings — schema is a claim, not decoration.
const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      email: CONTACT_EMAIL,
      description:
        "Community-run carpooling for India with safety built in and zero commission.",
      foundingLocation: { "@type": "Place", name: "Hyderabad, India" },
      logo: `${SITE_URL}/apple-touch-icon.svg`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-IN",
    },
  ],
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
      <head>
        <link rel="preconnect" href="https://a.basemaps.cartocdn.com" />
        <link rel="preconnect" href="https://b.basemaps.cartocdn.com" />
      </head>
      <body className="min-h-screen" suppressHydrationWarning>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
      </body>
    </html>
  );
}
