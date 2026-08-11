/* Safety — the return to night. The emotional core of the product.
   Honest wording only: guardians + assisted 112. Ember lives here.
   Density anchors everywhere — framed cards, not floating lines. */

const FEATURES = [
  {
    title: "Your own people, not a call centre",
    body: "Your people, chosen by you: a parent, a partner, a friend. They can watch your ride live, and they are the first to know if something feels off.",
    ember: false,
  },
  {
    title: "Live GPS on every ride",
    body: "Every ride shares its position with the people you chose, so they can see where you are right now, not just where you were last seen.",
    ember: false,
  },
  {
    title: "If you go quiet, we ask",
    body: "Stopped too long, or way off route? The app checks in on you first. No answer, and the people you chose see exactly where you are, instantly.",
    ember: true,
  },
  {
    title: "Emergency, one tap away",
    body: "SOS sends your guardians your exact position and keeps updating them. The app also helps you reach 112 immediately.",
    ember: true,
  },
];

export default function Safety() {
  return (
    <section id="safety" className="night-ground grain relative overflow-hidden">
      <div className="relative z-[2] mx-auto max-w-[1200px] px-6 py-28 sm:px-12">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          {/* left: sticky statement */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div>
              <p className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.22em] text-ember">
                Safety
              </p>
              <h2 className="mt-5 max-w-[14ch] font-[family-name:var(--font-display)] text-[clamp(36px,4.6vw,54px)] font-normal leading-[1.12] tracking-[-0.01em] text-dusk-text">
                Someone always knows <em className="italic text-sage">you&apos;re moving.</em>
              </h2>
              <p className="mt-6 max-w-[42ch] text-[17px] leading-[1.6] text-dusk-text">
                <strong className="font-semibold">Every protection here is free, for every rider.</strong>
              </p>
              <p className="mt-2 max-w-[42ch] text-[15.5px] leading-[1.65] text-dusk-dim">
                Not a paid extra, not a plan. Keeping you safe is the reason Nexstopp exists.
              </p>

              {/* guardian motif — framed, not floating */}
              <div className="mt-10 inline-flex items-center gap-3 rounded-2xl border border-[rgba(249,115,22,0.22)] bg-[rgba(249,115,22,0.08)] px-5 py-4">
                <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(249,115,22,0.15)]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" className="h-5 w-5">
                    <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
                  </svg>
                </span>
                <div>
                  <p className="text-[14.5px] font-semibold text-dusk-text">The 30-minute rule</p>
                  <p className="text-[13px] text-dusk-dim">
                    Guardians stay connected until after you&apos;ve arrived.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* right: feature cards */}
          <div className="flex flex-col gap-5">
            {FEATURES.map((f, i) => (
              <div key={f.title} className="rounded-[18px] border border-[rgba(242,238,229,0.09)] bg-[rgba(242,238,229,0.03)] p-7">
                <div className="flex items-start gap-4">
                  <span
                    className={`mt-1 flex h-9 w-9 flex-none items-center justify-center rounded-full ${
                      f.ember
                        ? "bg-[rgba(249,115,22,0.12)] text-ember"
                        : "bg-[rgba(111,180,153,0.12)] text-sage"
                    }`}
                  >
                    {f.ember ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4.5 w-4.5">
                        <path d="M12 9v4m0 4h.01M10.3 4.3L2.6 18a2 2 0 001.7 3h15.4a2 2 0 001.7-3L13.7 4.3a2 2 0 00-3.4 0z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4.5 w-4.5">
                        <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
                      </svg>
                    )}
                  </span>
                  <div>
                    <h3 className="text-[18px] font-semibold text-dusk-text">{f.title}</h3>
                    <p className="mt-2 text-[15px] leading-[1.65] text-dusk-dim">{f.body}</p>
                  </div>
                </div>
              </div>
            ))}

            <p className="mt-2 px-1 text-[13.5px] leading-relaxed text-dusk-dim">
              Nexstopp alerts the guardians you choose and helps you reach
              emergency services. It does not replace them. In an emergency,
              always call 112.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
