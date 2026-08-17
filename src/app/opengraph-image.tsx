import { ImageResponse } from "next/og";

/* The share card. Until this existed, a Nexstopp link pasted into WhatsApp
   or LinkedIn rendered as bare text — for a product spread by word of mouth,
   the share card IS the first impression. Night ground, ember horizon,
   the serif headline: the hero, compressed to 1200 by 630. */

export const alt = "Nexstopp. The city goes home together.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// DM Serif Display, fetched once per build/edge-cold-start. If the fetch
// fails the card still renders in the bundled default font; a plainer card
// beats a build that cannot produce one.
async function loadSerif(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0" } }
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(woff2?|truetype)'\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OgImage() {
  const serif = await loadSerif();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          backgroundColor: "#101918",
          backgroundImage:
            "radial-gradient(90% 60% at 50% 115%, rgba(249,115,22,0.16) 0%, rgba(249,115,22,0) 60%), linear-gradient(180deg, #101918 0%, #16211F 55%, #1D2C29 100%)",
          fontFamily: serif ? "DM Serif Display" : "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 40, color: "#F2EEE5", letterSpacing: "-0.02em" }}>
            nexstopp<span style={{ color: "#6FB499" }}>.</span>
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {/* Satori collapses whitespace between elements and has no italic
              face loaded, so the line is two spans in a gapped row. */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              columnGap: 24,
              fontSize: 88,
              lineHeight: 1.06,
              letterSpacing: "-0.015em",
              maxWidth: 1000,
            }}
          >
            <span style={{ color: "#F2EEE5" }}>The city goes</span>
            <span style={{ color: "#6FB499" }}>home together.</span>
          </div>
          <span
            style={{
              fontSize: 28,
              color: "#C4CDC8",
              fontFamily:
                "ui-sans-serif, system-ui, -apple-system, sans-serif",
            }}
          >
            Zero-commission shared rides for India, watched over by people you trust
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: serif
        ? [{ name: "DM Serif Display", data: serif, style: "normal" as const }]
        : undefined,
    }
  );
}
