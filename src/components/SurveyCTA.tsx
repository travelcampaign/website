/* Waitlist close — the night deepens to its darkest and hands over
   to the footer. One line, one action. */

const WAITLIST_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe0aPYcXW-4CyYuc74YEHl9zM_Ni7QDyVZBFhqm2Y69ZC0aiw/viewform";

export default function SurveyCTA() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#101918_0%,#0C1312_100%)]">
      <div className="relative z-[2] mx-auto max-w-[900px] px-6 py-32 text-center sm:px-12">
        <div>
          <h2 className="mx-auto max-w-[18ch] font-[family-name:var(--font-display)] text-[clamp(38px,5.4vw,62px)] font-normal leading-[1.08] tracking-[-0.01em] text-dusk-text">
            Be there when the city starts{" "}
            <em className="italic text-sage">sharing.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-[44ch] text-[16.5px] leading-[1.7] text-dusk-dim">
            Launching in Hyderabad. Early members shape the routes, the rules,
            and the road ahead.
          </p>
          <div className="mt-10">
            <a
              href={WAITLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-sage px-10 py-4.5 text-[17px] font-semibold text-night-0 transition-colors hover:bg-[#7FC0A6]"
            >
              Join the waitlist
            </a>
          </div>
          <p className="mt-6 font-[family-name:var(--font-mono)] text-[11.5px] uppercase tracking-[0.2em] text-dusk-mute">
            Hyderabad · 2026
          </p>
        </div>
      </div>
    </section>
  );
}
