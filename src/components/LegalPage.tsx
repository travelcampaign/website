import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export type LegalSection = { heading: string; body: ReactNode };

/**
 * Shared layout for the plain-language legal pages (Privacy, Terms).
 *
 * The site's Navbar is transparent with a light ("cream") wordmark until the
 * user scrolls — a state designed for the dark homepage hero. To keep it
 * legible at scroll-top on these otherwise-cream pages, the header is a
 * charcoal band that the navbar sits over.
 */
export default function LegalPage({
  title,
  lastUpdated,
  intro,
  sections,
}: {
  title: string;
  lastUpdated: string;
  intro: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <>
      <Navbar />
      <main>
        {/* Charcoal header band — keeps the transparent navbar readable */}
        <header style={{ background: "#2C3A3A" }}>
          <div className="mx-auto max-w-3xl px-6 pt-32 pb-14">
            <p
              className="text-[11px] font-bold uppercase tracking-[0.24em] mb-4"
              style={{ color: "#568F7A" }}
            >
              Legal
            </p>
            <h1
              className="text-3xl sm:text-4xl font-extrabold leading-tight"
              style={{ color: "#F7F6F4", fontFamily: "var(--font-bricolage)" }}
            >
              {title}
            </h1>
            <p className="text-[13px] mt-4" style={{ color: "rgba(247,246,244,0.5)" }}>
              Last updated: {lastUpdated}
            </p>
          </div>
        </header>

        {/* Body */}
        <div style={{ background: "#F7F6F4" }}>
          <div
            className="mx-auto max-w-3xl px-6 py-14"
            style={{ fontFamily: "var(--font-dm-sans)", color: "#3D4F4F" }}
          >
            <div className="text-[15px] leading-relaxed space-y-4">{intro}</div>

            {sections.map((s, i) => (
              <section key={i} className="mt-10">
                <h2
                  className="text-xl font-bold mb-3"
                  style={{ color: "#2C3A3A", fontFamily: "var(--font-bricolage)" }}
                >
                  {s.heading}
                </h2>
                <div className="text-[15px] leading-relaxed space-y-3">{s.body}</div>
              </section>
            ))}

            <div
              className="mt-14 pt-8 text-[13px] leading-relaxed"
              style={{ borderTop: "1px solid rgba(44,58,58,0.1)", color: "#7A8A85" }}
            >
              <p>
                Questions about this page? Email us at{" "}
                <a
                  href="mailto:travelcampaign.info@gmail.com"
                  className="font-semibold underline"
                  style={{ color: "#568F7A" }}
                >
                  travelcampaign.info@gmail.com
                </a>
                .
              </p>
              <p className="mt-3">
                <a href="/" className="font-semibold" style={{ color: "#568F7A" }}>
                  ← Back to home
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
