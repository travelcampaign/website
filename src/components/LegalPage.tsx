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
        {/* Night header band — keeps the transparent navbar readable */}
        <header className="dusk-ground">
          <div className="mx-auto max-w-3xl px-6 pt-32 pb-14">
            <a
              href="/"
              className="mb-6 inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.18em] text-dusk-dim transition-colors hover:text-dusk-text"
            >
              <span aria-hidden="true">←</span> Back to home
            </a>
            <p className="mb-4 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.24em] text-sage">
              Legal
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-normal leading-tight text-dusk-text sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-[13px] text-dusk-mute">
              Last updated: {lastUpdated}
            </p>
          </div>
        </header>

        {/* Body */}
        <div style={{ background: "#F5F1E8" }}>
          <div
            className="mx-auto max-w-3xl px-6 py-14"
            style={{ fontFamily: "var(--font-dm-sans)", color: "#3D4F4F" }}
          >
            <div className="text-[15px] leading-relaxed space-y-4">{intro}</div>

            {sections.map((s, i) => (
              <section key={i} className="mt-10">
                <h2
                  className="text-xl font-bold mb-3"
                  style={{ color: "#232C2A", fontFamily: "var(--font-fraunces)" }}
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
