"use client";

import { useEffect, useRef } from "react";

/* The Pact — a signed manifesto. Left column pins the title and the
   signature; the right is a typographic ledger of the four promises.
   A scroll spotlight brightens the promise you're reading and dims the
   rest. Rows are fully visible by default; JS only adjusts emphasis. */

const PROMISES = [
  {
    index: "01",
    pre: "We take",
    accent: "zero commission",
    post: "on rides.",
    sub: "Riders split fuel costs between themselves, and we never touch that money.",
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
    sub: "We earn from membership, never from your rides.",
    ember: false,
  },
];

export default function Pact() {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rows = listRef.current?.querySelectorAll("[data-pact-row]");
    if (!rows || rows.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          e.target.classList.toggle("pact-lit", e.isIntersecting);
        }
      },
      // a narrow horizontal band around the viewport's middle
      { rootMargin: "-38% 0px -38% 0px" }
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section className="dusk-ground grain relative overflow-hidden">
      <div className="relative z-[2] mx-auto max-w-[1200px] px-6 py-28 sm:px-12">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
          {/* left: pinned title + signature */}
          <div className="lg:sticky lg:top-36 lg:self-start">
            <p className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.22em] text-sage">
              The pact
            </p>
            <h2 className="mt-5 max-w-[12ch] font-[family-name:var(--font-display)] text-[clamp(34px,4.2vw,50px)] font-normal leading-[1.12] text-dusk-text">
              Four promises we are built on.
            </h2>
            <p className="mt-6 max-w-[36ch] text-[15.5px] leading-[1.7] text-dusk-dim">
              Shaped by 268 commuters who told us what shared travel in India
              should feel like, and written down so you can hold us to it.
            </p>
            <p className="mt-8 font-[family-name:var(--font-display)] text-[22px] italic text-sage">
              Nexstopp
            </p>
            <p className="mt-1 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.08em] text-dusk-mute">
              Hyderabad, 2026
            </p>
          </div>

          {/* right: the ledger */}
          <div ref={listRef} className="flex flex-col">
            {PROMISES.map((p) => (
              <div
                key={p.index}
                data-pact-row
                className="pact-row border-b border-[rgba(242,238,229,0.09)] py-10 first:border-t"
              >
                <div className="flex items-baseline gap-6">
                  <span className="font-[family-name:var(--font-mono)] text-[15px] font-medium text-dusk-dim">
                    {p.index}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-[clamp(28px,3.2vw,44px)] font-normal leading-[1.12] text-dusk-text">
                      {p.pre}{" "}
                      <span className={p.ember ? "text-ember" : "text-sage"}>
                        {p.accent}
                      </span>
                      {p.post ? ` ${p.post}` : ""}
                    </h3>
                    <p className="mt-3 max-w-[46ch] text-[15px] leading-[1.65] text-dusk-dim">
                      {p.sub}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bridge-to-cream" aria-hidden="true" />
    </section>
  );
}
