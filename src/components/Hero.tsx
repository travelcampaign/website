import RideMap from "./RideMap";

/* ─────────────────────────────────────────────────────────────
   Hero — "The Evening Commute"
   Dusk ground, Fraunces headline, and the live-ride panel:
   a REAL dark map of the Kondapur → Hitec City corridor with the
   canonical sedan driving it (RideMap). The SVG night map beneath
   is the no-WebGL/while-loading fallback. All labels generic —
   no invented personas.
   ───────────────────────────────────────────────────────────── */

const WAITLIST_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe0aPYcXW-4CyYuc74YEHl9zM_Ni7QDyVZBFhqm2Y69ZC0aiw/viewform";

export default function Hero() {
  return (
    <section className="dusk-ground grain relative overflow-hidden">
      <div className="relative z-[2] mx-auto max-w-[1200px] px-6 pt-36 pb-4 sm:px-12">
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

        {/* honest proof — the real survey, not an invented member count */}
        <p
          className="hero-enter mt-6 font-[family-name:var(--font-mono)] text-[11.5px] uppercase tracking-[0.18em] text-dusk-dim"
          style={{ "--enter-delay": "480ms" } as React.CSSProperties}
        >
          Built with answers from 268 Indian commuters
        </p>

      </div>

      {/* the corridor — full-bleed cinematic map, no app chrome.
          Fades up out of the dusk like a road at night. */}
      <div
        className="hero-enter relative z-[2] h-[46vh] max-h-[500px] min-h-[360px] w-full"
        style={
          {
            "--enter-delay": "550ms",
            maskImage: "linear-gradient(to bottom, transparent 0, black 84px)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0, black 84px)",
          } as React.CSSProperties
        }
      >
        <FallbackNightMap />
        <RideMap />
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
          <b className="font-semibold text-dusk-text">₹0 commission</b>&nbsp;— fuel split stays yours
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

/* Chrome-free night scenery — the SVG corridor shown while tiles load
   (and wherever WebGL is unavailable). No app-simulation UI. */
function FallbackNightMap() {
  return (
    <svg
      viewBox="0 0 1100 320"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <ellipse cx="905" cy="55" rx="130" ry="52" fill="rgba(111,180,153,0.05)" />
      <ellipse cx="180" cy="72" rx="110" ry="46" fill="rgba(122,166,199,0.05)" />
      <rect x="70" y="150" width="120" height="58" rx="7" fill="rgba(242,238,229,0.045)" />
      <rect x="255" y="215" width="150" height="72" rx="7" fill="rgba(242,238,229,0.05)" />
      <rect x="440" y="40" width="120" height="62" rx="7" fill="rgba(242,238,229,0.04)" />
      <rect x="610" y="120" width="140" height="66" rx="7" fill="rgba(242,238,229,0.05)" />
      <rect x="800" y="150" width="115" height="60" rx="7" fill="rgba(242,238,229,0.045)" />
      <path d="M-20 260 C 200 250, 340 155, 520 150 S 860 195, 1120 100" fill="none" stroke="rgba(242,238,229,0.05)" strokeWidth="12" />
      <path d="M-20 130 C 180 140, 420 66, 660 88 S 980 150, 1120 140" fill="none" stroke="rgba(242,238,229,0.10)" strokeWidth="1.5" />
      <path d="M250 340 C 272 235, 345 128, 415 -20" fill="none" stroke="rgba(242,238,229,0.10)" strokeWidth="1.5" />
      <path d="M760 340 C 772 252, 815 128, 885 -20" fill="none" stroke="rgba(242,238,229,0.10)" strokeWidth="1.5" />
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
      <circle cx="70" cy="262" r="6" fill="#6FB499" />
      <circle cx="1035" cy="98" r="6" fill="#F97316" />
      <g className="car-anim">
        <g>
          <circle r="7" fill="#fff" style={{ filter: "drop-shadow(0 0 9px rgba(111,180,153,0.95))" }} />
          <circle className="ring-pulse" r="14" fill="none" stroke="#6FB499" strokeWidth="2" />
          <animateMotion dur="16s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.85;1" calcMode="linear">
            <mpath href="#heroRoute" />
          </animateMotion>
        </g>
      </g>
      <g className="car-static" style={{ display: "none" }}>
        <circle cx="520" cy="152" r="7" fill="#fff" />
      </g>
    </svg>
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
