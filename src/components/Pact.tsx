/* The Pact — the mutual-profit law dealt as a deck. Each card is a full
   statement panel; as you scroll, the next slides up and pins over the
   last (pure CSS sticky stacking, native scroll, no JS). */

const CARDS = [
  {
    index: "01",
    pre: "We take",
    accent: "zero commission",
    post: "on rides.",
    sub: "The fuel split is yours. We never touch it.",
    ember: false,
  },
  {
    index: "02",
    pre: "Your data is",
    accent: "not for sale.",
    post: "",
    sub: "We never sell it to advertisers, and we never share it with anyone else.",
    ember: false,
  },
  {
    index: "03",
    pre: "Safety is",
    accent: "free for everyone.",
    post: "",
    sub: "It will never become a paid extra.",
    ember: true,
  },
  {
    index: "04",
    pre: "We profit only when",
    accent: "you profit more.",
    post: "",
    sub: "Written into how Nexstopp is built, shaped by 268 commuters who told us what shared travel in India should feel like.",
    ember: false,
  },
];

export default function Pact() {
  return (
    <section className="dusk-ground grain relative overflow-hidden">
      <div className="relative z-[2] mx-auto max-w-[1040px] px-6 pb-24 pt-24 sm:px-12">
        <p className="text-center font-[family-name:var(--font-mono)] text-[13px] uppercase tracking-[0.22em] text-sage">
          The pact
        </p>

        <div className="mt-10 flex flex-col gap-8">
          {CARDS.map((c, i) => (
            <div
              key={c.index}
              className="sticky flex min-h-[520px] flex-col justify-center overflow-hidden rounded-[28px] border border-[rgba(242,238,229,0.11)] bg-[linear-gradient(160deg,#1E2D29_0%,#141F1D_65%,#182420_100%)] px-8 py-14 shadow-[0_30px_90px_rgba(0,0,0,0.55)] sm:px-16"
              style={{ top: `${100 + i * 18}px` }}
            >
              {/* giant ghost numeral anchors the card */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-4 bottom-0 hidden select-none font-[family-name:var(--font-display)] text-[300px] leading-none text-[rgba(242,238,229,0.045)] sm:block"
              >
                {c.index}
              </span>

              <p className="font-[family-name:var(--font-mono)] text-[12px] tracking-[0.18em] text-dusk-mute">
                {c.index} / 04
              </p>
              <h3 className="mt-6 max-w-[16ch] font-[family-name:var(--font-display)] text-[clamp(38px,5vw,64px)] font-normal leading-[1.08] tracking-[-0.01em] text-dusk-text">
                {c.pre}{" "}
                <span className={c.ember ? "text-ember" : "text-sage"}>{c.accent}</span>
                {c.post ? ` ${c.post}` : ""}
              </h3>
              <p className="mt-6 max-w-[52ch] text-[16px] leading-[1.7] text-dusk-dim">
                {c.sub}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-14 text-center font-[family-name:var(--font-display)] text-[17px] italic text-sage">
          Nexstopp
        </p>
      </div>
    </section>
  );
}
