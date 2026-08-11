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
          className="hero-enter font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.22em] text-sage"
          style={{ "--enter-delay": "50ms" } as React.CSSProperties}
        >
          Carpooling for India · Hyderabad first
        </p>

        {/* headline */}
        <h1
          className="hero-enter mt-7 max-w-[11ch] font-[family-name:var(--font-display)] text-[clamp(52px,7vw,84px)] font-normal leading-[1.04] tracking-[-0.015em] text-dusk-text"
          style={{ "--enter-delay": "150ms" } as React.CSSProperties}
        >
          The city goes <em className="italic text-sage">home together.</em>
        </h1>

        {/* sub */}
        <p
          className="hero-enter mt-7 max-w-[47ch] text-lg leading-[1.65] text-dusk-dim"
          style={{ "--enter-delay": "280ms" } as React.CSSProperties}
        >
          Share your daily commute with verified neighbours. Split the fuel and
          pay no commission, while someone you trust watches every kilometre
          until you say you&apos;re home.
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

        {/* honest proof — the real survey, not an invented member count */}
        <p
          className="hero-enter mt-6 font-[family-name:var(--font-mono)] text-[11.5px] uppercase tracking-[0.18em] text-dusk-dim"
          style={{ "--enter-delay": "480ms" } as React.CSSProperties}
        >
          Built with answers from 268 Indian commuters
        </p>

      </div>

      {/* value props — quiet, borderless, under the scenery */}
      <div className="relative z-[2] mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-12 gap-y-4 px-6 pb-14 pt-8 sm:px-12">
        <ValueItem>
          <GpsIcon className="h-[17px] w-[17px] text-sage" />
          <b className="font-semibold text-dusk-text">Live GPS</b>&nbsp;on every ride
        </ValueItem>
        <ValueItem>
          <ShieldIcon className="h-[17px] w-[17px] text-ember" />
          <b className="font-semibold text-dusk-text">Guardian SOS</b>&nbsp;free on every plan
        </ValueItem>
        <ValueItem>
          <CheckIcon className="h-[17px] w-[17px] text-sage" />
          <b className="font-semibold text-dusk-text">₹0 commission</b>&nbsp;· fuel split stays yours
        </ValueItem>
      </div>
    </section>
  );
}

function ValueItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 whitespace-nowrap text-[15px] text-dusk-dim">
      {children}
    </div>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
    </svg>
  );
}

function GpsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}
