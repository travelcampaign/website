/* ─────────────────────────────────────────────────────────────
   Hero — "The Evening Commute"
   Dusk ground, Fraunces headline, honest proof line, quiet value
   row. The map story lives once, in JourneyScroll below.
   ───────────────────────────────────────────────────────────── */

const WAITLIST_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe0aPYcXW-4CyYuc74YEHl9zM_Ni7QDyVZBFhqm2Y69ZC0aiw/viewform";

export default function Hero() {
  return (
    <section className="dusk-ground grain relative overflow-hidden">
      <div className="relative z-[2] mx-auto max-w-[1200px] px-6 pt-36 pb-10 sm:px-12">
        {/* kicker */}
        <p
          className="hero-enter font-[family-name:var(--font-mono)] text-[12px] tracking-[0.06em] text-sage"
          style={{ "--enter-delay": "50ms" } as React.CSSProperties}
        >
          Carpooling for India · Starting in Hyderabad
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
          Share your daily commute with verified neighbours. Share the fuel
          cost, pay no commission, and someone you trust watches every
          kilometre until you say you&apos;re home.
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
            className="rounded-full bg-sage px-8 py-4 text-base font-semibold text-night-0 transition-colors hover:bg-[#7FC0A6]"
          >
            Join the waitlist
          </a>
          <a
            href="#how-it-works"
            className="hairline rounded-full border px-7 py-4 text-base text-dusk-text transition-colors hover:border-[rgba(242,238,229,0.28)]"
          >
            See how it works
          </a>
        </div>


      </div>

    </section>
  );
}
