/* ─────────────────────────────────────────────────────────────
   Hero — "The Evening Commute"
   Dusk ground, Fraunces headline, honest proof line, quiet value
   row. The map story lives once, in JourneyScroll below.
   ───────────────────────────────────────────────────────────── */

import { WAITLIST_URL } from "@/lib/site";

export default function Hero() {
  return (
    <section className="dusk-ground grain relative overflow-hidden">
      <div className="relative z-[2] mx-auto max-w-[1200px] px-6 pt-36 pb-10 sm:px-12">
        {/* kicker */}
        <p
          className="hero-enter font-[family-name:var(--font-mono)] text-[12px] tracking-[0.06em] text-sage"
          style={{ "--enter-delay": "50ms" } as React.CSSProperties}
        >
          Verified shared commutes · Starting in Hyderabad
        </p>

        {/* headline */}
        <h1
          className="hero-enter mt-7 max-w-[13ch] font-[family-name:var(--font-display)] text-[clamp(52px,7vw,84px)] font-normal leading-[1.04] tracking-[-0.015em] text-dusk-text"
          style={{ "--enter-delay": "150ms" } as React.CSSProperties}
        >
          The city goes <em className="italic text-sage">home together.</em>
        </h1>

        {/* sub */}
        <p
          className="hero-enter mt-7 max-w-[47ch] text-lg leading-[1.65] text-dusk-dim"
          style={{ "--enter-delay": "280ms" } as React.CSSProperties}
        >
          Nexstopp matches riders and drivers already taking the same route.
          Split fuel directly, pay zero ride commission, and share live trip
          status with people you trust.
        </p>

        {/* CTAs */}
        <div
          className="hero-enter mt-10 flex flex-wrap items-center gap-4"
          style={{ "--enter-delay": "400ms" } as React.CSSProperties}
        >
          <a
            href={WAITLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="press rounded-full bg-sage px-8 py-4 text-base font-semibold text-night-0 transition-colors hover:bg-[#7FC0A6]"
          >
            Join the waitlist
          </a>
          <a
            href="#how-it-works"
            className="press hairline rounded-full border px-7 py-4 text-base text-dusk-text transition-colors hover:border-[rgba(242,238,229,0.28)]"
          >
            How it works
          </a>
        </div>

      </div>

    </section>
  );
}
