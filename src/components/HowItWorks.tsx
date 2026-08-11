/* How it works — cream section, but the same framed-panel language as the
   hero's ride card: one elevated "route ticket" holding three stops joined
   by a solid, present route line. Disc colors echo the app's markers —
   sage for the journey, ember for the guarded arrival. */

const STEPS = [
  {
    index: "01",
    title: "Post your route",
    body: "Set your daily commute — where you start, where you land, when you leave. Once, or every weekday.",
    ember: false,
  },
  {
    index: "02",
    title: "Match along the way",
    body: "Verified commuters already driving your way. Pickup points snap to their actual route, so nobody detours for anybody.",
    ember: false,
  },
  {
    index: "03",
    title: "Ride watched over",
    body: "Live GPS, a guardian who sees you moving, and a check-in the moment anything goes quiet — until you say you're home.",
    ember: true,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-cream">
      <div className="mx-auto max-w-[1200px] px-6 py-28 sm:px-12">
        <p className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.22em] text-sage-deep">
          How it works
        </p>
        <h2 className="mt-5 max-w-[16ch] font-[family-name:var(--font-display)] text-[clamp(36px,4.6vw,54px)] font-normal leading-[1.1] tracking-[-0.01em] text-ink">
          Three stops to a <em className="italic text-sage-deep">lighter commute.</em>
        </h2>

        {/* the route ticket */}
        <div className="mt-14 overflow-hidden rounded-3xl border border-[#E2DBCB] bg-white shadow-[0_24px_60px_rgba(35,44,42,0.08)]">
          <div className="relative grid md:grid-cols-3">
            {/* continuous route line behind the discs (desktop) */}
            <svg
              aria-hidden="true"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="pointer-events-none absolute left-0 right-0 top-0 hidden h-[120px] w-full md:block"
            >
              <path
                d="M-10 78 C 200 70, 340 56, 600 60 S 1000 74, 1210 52"
                fill="none"
                stroke="rgba(86,143,122,0.16)"
                strokeWidth="9"
                strokeLinecap="round"
              />
              <path
                className="dash-march"
                d="M-10 78 C 200 70, 340 56, 600 60 S 1000 74, 1210 52"
                fill="none"
                stroke="#568F7A"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="8 7"
              />
            </svg>

            {STEPS.map((s, i) => (
              <div
                key={s.index}
                className={`relative p-9 pt-12 ${
                  i > 0 ? "border-t border-[#EDE8DC] md:border-l md:border-t-0" : ""
                }`}
              >
                {/* stop disc — solid, like the app's map markers */}
                <div
                  className={`relative z-[1] flex h-12 w-12 items-center justify-center rounded-full font-[family-name:var(--font-mono)] text-[13px] font-medium text-white shadow-[0_6px_16px_rgba(35,44,42,0.18)] ${
                    s.ember ? "bg-ember" : "bg-sage-deep"
                  }`}
                >
                  {s.index}
                </div>
                <h3 className="mt-7 font-[family-name:var(--font-display)] text-[25px] font-medium leading-tight text-ink">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-[36ch] text-[15.5px] leading-[1.65] text-ink-soft">
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          {/* ticket footer — grounds the card, mirrors the hero panel's value row */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#EDE8DC] bg-[#FBF9F4] px-9 py-5">
            <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-ink-soft">
              Kondapur → Hitec City · illustrative commute
            </p>
            <p className="text-[13.5px] text-ink-soft">
              No detours. No cash awkwardness. No strangers nobody vouches for.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
