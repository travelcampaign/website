/* The Pact — dusk strip. The mutual-profit law, written down where
   everyone can hold us to it. Only real facts appear here. */

const LINES = [
  "We take zero commission on rides — the fuel split is yours.",
  "Your data is not for sale. Not to advertisers, not to anyone.",
  "Safety is free on every plan. It will never become a tier.",
  "We profit only when you profit more.",
];

export default function Pact() {
  return (
    <section className="dusk-ground grain relative overflow-hidden">
      <div className="relative z-[2] mx-auto max-w-[900px] px-6 py-24 sm:px-12">
        <div>
          <p className="text-center font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.22em] text-sage">
            The pact
          </p>

          <div className="mt-10 flex flex-col">
            {LINES.map((line, i) => (
              <div key={line} className="border-b border-[rgba(242,238,229,0.09)] py-6 text-center font-[family-name:var(--font-display)] text-[clamp(20px,2.6vw,28px)] font-normal leading-snug text-dusk-text first:border-t">
                {line}
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-[15px] leading-relaxed text-dusk-dim">
            Written into how Nexstopp is built — shaped by{" "}
            <span className="font-semibold text-dusk-text">268 commuters</span> who told us
            what shared travel in India should feel like.
          </p>
          <p className="mt-3 text-center font-[family-name:var(--font-display)] text-[17px] italic text-sage">
            — Nexstopp
          </p>
        </div>
      </div>
    </section>
  );
}
