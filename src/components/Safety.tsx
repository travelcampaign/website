/* Safety — the return to night. The emotional core of the product.
   Honest wording only: guardians + assisted 112. Ember lives here.
   Density anchors everywhere — framed cards, not floating lines. */

/* Told in ride order, so the section reads as a journey: choose your
   people, they watch, we check, worst case one tap. The line between the
   stops escalates from sage to ember the way a real evening can. */
const STOPS = [
  {
    title: "Your own people, not a call centre",
    body: "You choose who watches over you: a parent, a partner, a close friend. They can see your ride live, and they are the first to know if something feels off.",
    ember: false,
  },
  {
    title: "Live GPS on every ride",
    body: "During a ride, the people you chose can see the car's live position on the map, not just the last place it was seen.",
    ember: false,
  },
  {
    title: "If you go quiet, we ask",
    body: "If the car stays still for too long, or goes far off the planned route, the app asks if you are okay. If you don't reply, your guardians are alerted and can see exactly where you are.",
    ember: true,
  },
  {
    title: "Emergency, one tap away",
    body: "One tap on SOS shares your exact location with your guardians and keeps updating it. The app also helps you call 112 straight away.",
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
                Safety is the reason Nexstopp exists, so it never moves behind a plan.
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

          {/* right: the protections as stops on one route, inside a single
              framed panel so the dark section keeps its density anchor */}
          <div className="flex flex-col gap-5">
            <div className="rounded-[18px] border border-[rgba(242,238,229,0.09)] bg-[rgba(242,238,229,0.03)] p-8 sm:p-10">
              <div className="relative">
                <ol className="flex flex-col gap-10">
                  {STOPS.map((f, i) => (
                    <li key={f.title} className="relative grid grid-cols-[28px_1fr] gap-5">
                      {/* connector to the next stop; the last stop is where
                          the route ends, so it draws none */}
                      {i < STOPS.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="absolute -bottom-10 left-[13px] top-[30px] w-[2px] rounded-full"
                          style={{
                            background: `linear-gradient(180deg, ${
                              f.ember ? "#F97316" : "#6FB499"
                            } 0%, ${
                              STOPS[i + 1].ember ? "#F97316" : "#6FB499"
                            } 100%)`,
                          }}
                        />
                      )}
                      <span className="relative z-[1] mt-1 flex h-7 w-7 items-center justify-center">
                        <span
                          className={`block h-[14px] w-[14px] rounded-full ring-4 ${
                            f.ember
                              ? "guardian-ember bg-ember ring-[rgba(249,115,22,0.15)]"
                              : "bg-sage ring-[rgba(111,180,153,0.15)]"
                          }`}
                        />
                      </span>
                      <div>
                        <h3 className="text-[18px] font-semibold text-dusk-text">{f.title}</h3>
                        <p className="mt-2 text-[15px] leading-[1.65] text-dusk-dim">{f.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <p className="mt-2 px-1 text-[13.5px] leading-relaxed text-dusk-dim">
              Nexstopp alerts the guardians you choose and helps you reach
              emergency services. It does not replace them. In an emergency,
              always call 112.
            </p>
          </div>
        </div>
      </div>
      <div className="bridge-to-cream" aria-hidden="true" />
    </section>
  );
}
