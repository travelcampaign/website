/* Footer — the darkest hour of the page. Real links only:
   dead "#" placeholders (About/Blog/Press, empty socials) were removed
   per honest-or-hidden — they return when the destinations exist. */

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Safety", href: "/#safety" },
      { label: "Membership", href: "/#membership" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "travelcampaign.info@gmail.com", href: "mailto:travelcampaign.info@gmail.com" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0C1312]">
      <div className="mx-auto max-w-[1200px] px-6 pb-10 pt-20 sm:px-12">
        <div className="grid gap-12 md:grid-cols-[1.4fr_2fr]">
          <div>
            <p className="font-[family-name:var(--font-display)] text-[26px] font-semibold tracking-[-0.02em] text-dusk-text">
              nexstopp<span className="italic text-sage">.</span>
            </p>
            <p className="mt-4 max-w-[34ch] text-[14.5px] leading-[1.7] text-dusk-mute">
              Community-run carpooling for India. Safety first, zero
              commission, always.
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

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(242,238,229,0.08)] pt-8">
          <p className="text-[13px] text-dusk-mute">
            © 2026 Nexstopp. Built in Hyderabad.
          </p>
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-dusk-mute">
            The city goes home together
          </p>
        </div>
        {/* map licenses require this credit; kept as quiet as legally sensible */}
        <p className="mt-4 text-[10.5px] leading-relaxed text-[rgba(126,143,137,0.55)]">
          Maps:{" "}
          <a href="https://www.openstreetmap.org/copyright" className="hover:text-dusk-mute" target="_blank" rel="noopener noreferrer">© OpenStreetMap</a>
          {" "}·{" "}
          <a href="https://carto.com/attributions" className="hover:text-dusk-mute" target="_blank" rel="noopener noreferrer">© CARTO</a>
        </p>
      </div>
    </footer>
  );
}
