"use client";

import { useEffect, useState } from "react";

/* Two small gifts for the curious.

   One: the sage full stop in the footer's giant wordmark is secretly a
   button. Press it and the sedan from the journey map drives the length
   of the name, headlights first, and parks back in the dot. Nothing
   announces it; the people who poke at things find it.

   Two: a note in the console, because the kind of person who opens
   DevTools on a carpooling site is the kind of person we want to hear
   from.

   Three: type "ghar" anywhere on the page. Home, in the language most of
   this city thinks in, which is the whole idea of the place. It brings
   you down here and sends the car across. */

export default function FooterEgg() {
  const [trips, setTrips] = useState(0);

  // "ghar" summons the drive from anywhere on the page
  useEffect(() => {
    let buf = "";
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && /^(INPUT|TEXTAREA)$/.test(t.tagName)) return;
      if (e.key.length !== 1) return;
      buf = (buf + e.key.toLowerCase()).slice(-4);
      if (buf !== "ghar") return;
      buf = "";
      const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById("nexstopp-wordmark")?.scrollIntoView({
        behavior: calm ? "auto" : "smooth",
        block: "center",
      });
      // let the scroll land before the car sets off
      window.setTimeout(() => setTrips((n) => n + 1), calm ? 0 : 600);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(
      "%cnexstopp%c.\n%cYou looked under the hood. Verified shared commutes, zero ride commission.\nTry typing: ghar\nSay hello: hello@nexstopp.com",
      "font-size:24px;font-weight:bold;color:#F2EEE5;background:#101918;padding:8px 2px 8px 12px;",
      "font-size:24px;font-weight:bold;color:#6FB499;background:#101918;padding:8px 12px 8px 0;",
      "color:#7E8F89;font-size:12px;line-height:1.6;"
    );
  }, []);

  return (
    <p
      id="nexstopp-wordmark"
      aria-hidden="true"
      className="pointer-events-none relative mt-20 select-none overflow-hidden whitespace-nowrap font-[family-name:var(--font-display)] text-[clamp(44px,17vw,190px)] leading-[0.85] tracking-[-0.03em] text-[rgba(242,238,229,0.045)]"
    >
      nexstopp
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setTrips((t) => t + 1)}
        className="pointer-events-auto cursor-pointer text-[rgba(111,180,153,0.10)] transition-colors hover:text-[rgba(111,180,153,0.22)] focus-visible:text-[rgba(111,180,153,0.22)]"
      >
        .
      </button>
      {trips > 0 && (
        <span
          key={trips}
          aria-hidden="true"
          className="egg-drive pointer-events-none absolute bottom-[0.18em] left-0"
        >
          {/* the sprite's nose points up; rotate to drive rightward */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/car-marker.png"
            alt=""
            width={34}
            height={34}
            className="rotate-90"
          />
        </span>
      )}
    </p>
  );
}
