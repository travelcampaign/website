/* Footer — the darkest hour of the page. Real links only:
   dead "#" placeholders (About/Blog/Press, empty socials) were removed
   per honest-or-hidden — they return when the destinations exist. */

import FooterEgg from "./FooterEgg";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Safety", href: "/safety" },
      { label: "Membership", href: "/#membership" },
      { label: "About", href: "/about" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Refunds & Cancellation", href: "/refunds" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "hello@nexstopp.com", href: "mailto:hello@nexstopp.com" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(242,238,229,0.08)] bg-[#0C1312]">
      <div className="mx-auto max-w-[1200px] px-6 pb-10 pt-20 sm:px-12">
        <div className="grid gap-12 md:grid-cols-[1.4fr_2fr]">
          <div>
            <p className="font-[family-name:var(--font-display)] text-[26px] font-semibold tracking-[-0.02em] text-dusk-text">
              nexstopp<span className="italic text-sage">.</span>
            </p>
            <p className="mt-4 max-w-[34ch] text-[14.5px] leading-[1.7] text-dusk-mute">
              Community-run ride sharing for India, with safety built in and
              zero commission.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-dusk-mute">
                  {col.heading}
                </p>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="break-all text-[14px] text-dusk-dim transition-colors hover:text-dusk-text"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* the brand, at architectural scale, with a secret inside.
            See FooterEgg for what the full stop does. */}
        <FooterEgg />

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(242,238,229,0.08)] pt-8">
          <p className="text-[13px] text-dusk-mute">
            © 2026 Nexstopp. Built in Hyderabad.
          </p>
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-dusk-mute">
            The city goes home together
          </p>
        </div>
        {/* map licenses require this credit; kept as quiet as legally sensible */}
        {/* The OSM/CARTO credit is a licence requirement, so it has to be
            readable. At rgba(126,143,137,0.55) it measured 2.49:1; the
            solid token measures 5.53:1 and still reads as a whisper. */}
        <p className="mt-4 text-[11px] leading-relaxed text-dusk-mute">
          Maps:{" "}
          <a href="https://www.openstreetmap.org/copyright" className="hover:text-dusk-mute" target="_blank" rel="noopener noreferrer">© OpenStreetMap</a>
          {" "}·{" "}
          <a href="https://carto.com/attributions" className="hover:text-dusk-mute" target="_blank" rel="noopener noreferrer">© CARTO</a>
        </p>
      </div>
    </footer>
  );
}
