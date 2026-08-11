
/* ─────────────────────────────────────────────────────────────
   Hero — "The Evening Commute"
   Dusk ground, Fraunces headline, and the live-ride panel:
   a framed night-map card showing an illustrative ride with a
   guardian watching. All labels generic — no invented personas.
   ───────────────────────────────────────────────────────────── */

const WAITLIST_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe0aPYcXW-4CyYuc74YEHl9zM_Ni7QDyVZBFhqm2Y69ZC0aiw/viewform";

export default function Hero() {
  return (
    <section className="dusk-ground grain relative overflow-hidden">
      <div className="relative z-[2] mx-auto max-w-[1200px] px-6 pt-36 pb-24 sm:px-12">
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
          Share your daily commute with verified neighbours. Split the fuel,
          never a commission — while a guardian you chose watches every
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

        {/* live-ride panel */}
        <div className="hero-enter" style={{ "--enter-delay": "550ms" } as React.CSSProperties}>
          <RidePanel />
        </div>
      </div>
    </section>
  );
}

/* The framed night-map card. Illustrative by design: generic labels,
   a mother as guardian ("Amma"), no fabricated user personas. */
function RidePanel() {
  return (
    <div className="mt-16 overflow-hidden rounded-3xl border border-[rgba(242,238,229,0.10)] bg-[linear-gradient(160deg,#1B2825_0%,#141F1D_60%,#17241F_100%)] shadow-[0_30px_80px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(242,238,229,0.06)]">
      {/* head */}
      <div className="hairline-soft flex items-center justify-between border-b px-7 py-5">
        <div className="flex items-center gap-2.5 font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-dusk-dim">
          <span className="guardian-beat h-2 w-2 rounded-full bg-sage" />
          LIVE RIDE · 8:42 PM
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[rgba(249,115,22,0.25)] bg-[rgba(249,115,22,0.10)] px-4 py-2 text-[13px] font-medium text-[#F5B98C]">
          <ShieldIcon className="h-3.5 w-3.5" />
          Amma is watching this ride
        </div>
      </div>

      {/* night map */}
      <div className="relative h-[320px]">
        <svg
          viewBox="0 0 1100 320"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {/* park + lake patches */}
          <ellipse cx="905" cy="55" rx="130" ry="52" fill="rgba(111,180,153,0.05)" />
          <ellipse cx="180" cy="72" rx="110" ry="46" fill="rgba(122,166,199,0.05)" />
          {/* city blocks — a denser grid of faint masses */}
          <rect x="70" y="150" width="120" height="58" rx="7" fill="rgba(242,238,229,0.045)" />
          <rect x="215" y="128" width="88" height="46" rx="7" fill="rgba(242,238,229,0.035)" />
          <rect x="255" y="215" width="150" height="72" rx="7" fill="rgba(242,238,229,0.05)" />
          <rect x="440" y="40" width="120" height="62" rx="7" fill="rgba(242,238,229,0.04)" />
          <rect x="470" y="205" width="105" height="55" rx="7" fill="rgba(242,238,229,0.035)" />
          <rect x="610" y="120" width="140" height="66" rx="7" fill="rgba(242,238,229,0.05)" />
          <rect x="640" y="240" width="120" height="52" rx="7" fill="rgba(242,238,229,0.035)" />
          <rect x="800" y="150" width="115" height="60" rx="7" fill="rgba(242,238,229,0.045)" />
          <rect x="950" y="215" width="120" height="62" rx="7" fill="rgba(242,238,229,0.04)" />
          {/* road network — visible but quiet */}
          <path d="M-20 260 C 200 250, 340 155, 520 150 S 860 195, 1120 100" fill="none" stroke="rgba(242,238,229,0.05)" strokeWidth="12" />
          <path d="M-20 130 C 180 140, 420 66, 660 88 S 980 150, 1120 140" fill="none" stroke="rgba(242,238,229,0.10)" strokeWidth="1.5" />
          <path d="M250 340 C 272 235, 345 128, 415 -20" fill="none" stroke="rgba(242,238,229,0.10)" strokeWidth="1.5" />
          <path d="M585 340 C 592 260, 620 140, 665 -20" fill="none" stroke="rgba(242,238,229,0.08)" strokeWidth="1.5" />
          <path d="M760 340 C 772 252, 815 128, 885 -20" fill="none" stroke="rgba(242,238,229,0.10)" strokeWidth="1.5" />
          <path d="M-20 200 L 1120 178" fill="none" stroke="rgba(242,238,229,0.05)" strokeWidth="1" />
          {/* the route: glow + core, drawn in once */}
          <path
            id="heroRoute"
            className="route-draw"
            d="M70 262 C 240 250, 350 158, 520 152 S 830 190, 1035 98"
            fill="none"
            stroke="rgba(111,180,153,0.30)"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            className="route-draw"
            d="M70 262 C 240 250, 350 158, 520 152 S 830 190, 1035 98"
            fill="none"
            stroke="#6FB499"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* origin + destination markers on the line */}
          <circle cx="70" cy="262" r="6" fill="#6FB499" />
          <circle cx="70" cy="262" r="10" fill="none" stroke="rgba(111,180,153,0.35)" strokeWidth="2" />
          <circle cx="1035" cy="98" r="6" fill="#F97316" />
          <circle cx="1035" cy="98" r="10" fill="none" stroke="rgba(249,115,22,0.35)" strokeWidth="2" />
          {/* mid-route co-rider pickup */}
          <circle cx="520" cy="152" r="5" fill="none" stroke="#6FB499" strokeWidth="2.5" />
          {/* the car — travels the route (SMIL; hidden under reduced motion) */}
          <g className="car-anim">
            <g>
              <circle r="7" fill="#fff" style={{ filter: "drop-shadow(0 0 9px rgba(111,180,153,0.95))" }} />
              <circle className="ring-pulse" r="14" fill="none" stroke="#6FB499" strokeWidth="2" />
              <animateMotion dur="16s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.85;1" calcMode="linear">
                <mpath href="#heroRoute" />
              </animateMotion>
            </g>
          </g>
          {/* static fallback car for reduced motion */}
          <g className="car-static" style={{ display: "none" }}>
            <circle cx="520" cy="152" r="7" fill="#fff" />
          </g>
        </svg>

        {/* stop pills */}
        <div className="absolute bottom-[8%] left-[4%] flex items-center gap-2 rounded-full border border-[rgba(242,238,229,0.14)] bg-[rgba(16,25,24,0.85)] px-4 py-2 text-[13px] font-medium text-dusk-text backdrop-blur-sm">
          <span className="h-[7px] w-[7px] rounded-full bg-sage" />
          Madhapur <span className="font-normal text-dusk-mute">· picked up</span>
        </div>
        <div className="absolute left-[38%] top-[28%] hidden items-center gap-2 rounded-full border border-[rgba(111,180,153,0.28)] bg-[rgba(16,25,24,0.85)] px-3.5 py-1.5 text-[12px] font-medium text-dusk-text backdrop-blur-sm sm:flex">
          <span className="h-[6px] w-[6px] rounded-full border-[1.5px] border-sage" />
          Co-rider joins <span className="font-normal text-dusk-mute">· on your route</span>
        </div>
        <div className="absolute right-[4%] top-[10%] flex items-center gap-2 rounded-full border border-[rgba(242,238,229,0.14)] bg-[rgba(16,25,24,0.85)] px-4 py-2 text-[13px] font-medium text-dusk-text backdrop-blur-sm">
          <span className="h-[7px] w-[7px] rounded-full bg-ember" />
          Hitec City <span className="font-normal text-dusk-mute">· 12 min</span>
        </div>
      </div>

      {/* value row */}
      <div className="flex flex-wrap justify-center gap-3.5 px-7 pb-8 pt-6">
        <ValuePill>
          <GpsIcon className="h-4 w-4 text-sage" />
          <b className="font-semibold text-dusk-text">Live GPS</b>&nbsp;on every ride
        </ValuePill>
        <ValuePill>
          <ShieldIcon className="h-4 w-4 text-ember" />
          <b className="font-semibold text-dusk-text">Guardian SOS</b>&nbsp;free on every plan
        </ValuePill>
        <ValuePill>
          <CheckIcon className="h-4 w-4 text-sage" />
          <b className="font-semibold text-dusk-text">₹0 commission</b>&nbsp;— fuel split stays yours
        </ValuePill>
      </div>
    </div>
  );
}

function ValuePill({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 whitespace-nowrap rounded-full border border-[rgba(242,238,229,0.10)] bg-[rgba(242,238,229,0.03)] px-5 py-3 text-[14.5px] text-dusk-dim">
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
