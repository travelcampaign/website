"use client";

import { useEffect, useRef, useState } from "react";
import {
  type LngLat,
  pointAt,
  sliceTo,
  bearingAt,
  nightRasterStyle,
} from "@/lib/routeGeo";

/* How it works, told as a drive. The section pins a real night map of the
   Gachibowli → Madhapur commute; scrolling drives the sedan across it while
   the story advances through four stops. Scroll speed stays native. The old
   site's journey, retold in the Evening Commute voice. */

const ROUTE = {
  pickup: { name: "Gachibowli", at: [78.339, 17.4401] as LngLat },
  dropoff: { name: "Madhapur", at: [78.3965, 17.4483] as LngLat },
  coords: [
    [78.339, 17.4401], [78.348, 17.4422], [78.3565, 17.4445],
    [78.3645, 17.446], [78.372, 17.447], [78.38, 17.4476],
    [78.388, 17.448], [78.3965, 17.4483],
  ] as LngLat[],
};

const PHASES = [
  {
    at: 0,
    eyebrow: "The start",
    title: "Post your",
    accent: "route.",
    sub: "Where you start, where you land, when you leave. Once, or every weekday.",
    ember: false,
  },
  {
    at: 0.26,
    eyebrow: "The match",
    title: "Matched along",
    accent: "the way.",
    sub: "Verified commuters already driving your way. Pickups snap to their route, so nobody detours.",
    ember: false,
  },
  {
    at: 0.55,
    eyebrow: "The watch",
    title: "Watched the",
    accent: "whole way.",
    sub: "Live GPS for the people you chose, and a check-in the moment anything goes quiet.",
    ember: true,
  },
  {
    at: 0.82,
    eyebrow: "Zero commission",
    title: "₹0 cut.",
    accent: "Always.",
    sub: "Fuel money moves between riders. No middleman, no percentage, ever.",
    ember: false,
  },
];

export default function JourneyScroll() {
  const trackRef = useRef<HTMLDivElement>(null);
  const mapContRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  const [started, setStarted] = useState(false);
  const progressRef = useRef(0);

  /* scroll → progress + phase */
  useEffect(() => {
    const onScroll = () => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const total = track.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      progressRef.current = p;
      if (p > 0.02 && !started) setStarted(true);
      let idx = 0;
      for (let i = 0; i < PHASES.length; i++) if (p >= PHASES[i].at) idx = i;
      setPhase((prev) => (prev === idx ? prev : idx));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [started]);

  /* map + car */
  useEffect(() => {
    if (!mapContRef.current) return;
    let cancelled = false;
    let raf = 0;
    let cleanup: (() => void) | null = null;

    (async () => {
      const ml = await import("maplibre-gl");
      if (cancelled || !mapContRef.current) return;

      let map: import("maplibre-gl").Map;
      try {
        map = new ml.Map({
          container: mapContRef.current,
          style: nightRasterStyle() as never,
          center: [78.3677, 17.4442],
          zoom: 12.6,
          interactive: false,
          attributionControl: false,
        });
        map.addControl(new ml.AttributionControl({ compact: true }), "bottom-right");
      } catch {
        return; // no WebGL: the night gradient stays
      }

      map.on("load", () => {
        if (cancelled) {
          map.remove();
          return;
        }
        try {
          const frame = () => {
            const lngs = ROUTE.coords.map((c) => c[0]);
            const lats = ROUTE.coords.map((c) => c[1]);
            const cam = map.cameraForBounds(
              [
                [Math.min(...lngs), Math.min(...lats)],
                [Math.max(...lngs), Math.max(...lats)],
              ],
              { padding: { top: 170, bottom: 300, left: 90, right: 90 } }
            );
            if (cam) map.jumpTo(cam);
          };
          frame();
          window.addEventListener("resize", frame);

          mapContRef.current!.style.opacity = "1";

          // collapse the attribution to its ⓘ once the control exists;
          // the full credit lives in the footer
          requestAnimationFrame(() => {
            mapContRef.current
              ?.querySelector(".maplibregl-ctrl-attrib")
              ?.classList.remove("maplibregl-compact-show");
          });

          map.addSource("ghost", {
            type: "geojson",
            data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: ROUTE.coords } },
          });
          map.addLayer({
            id: "ghost-line",
            type: "line",
            source: "ghost",
            layout: { "line-cap": "round", "line-join": "round" },
            paint: { "line-color": "#568F7A", "line-width": 2, "line-opacity": 0.3, "line-dasharray": [4, 8] },
          });
          map.addSource("route", {
            type: "geojson",
            data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: [ROUTE.coords[0]] } },
          });
          map.addLayer({
            id: "route-line",
            type: "line",
            source: "route",
            layout: { "line-cap": "round", "line-join": "round" },
            paint: { "line-color": "#6FB499", "line-width": 4, "line-opacity": 0.95 },
          });

          const disc = (color: string) => {
            const el = document.createElement("div");
            el.style.cssText =
              `width:15px;height:15px;border-radius:50%;background:${color};` +
              "border:3px solid #F2EEE5;box-shadow:0 0 22px " + color + "99;";
            return el;
          };
          new ml.Marker({ element: disc("#568F7A") }).setLngLat(ROUTE.pickup.at).addTo(map);
          new ml.Marker({ element: disc("#F97316") }).setLngLat(ROUTE.dropoff.at).addTo(map);

          const carEl = document.createElement("img");
          carEl.src = "/car-marker.png";
          carEl.alt = "";
          carEl.style.cssText =
            "width:34px;height:auto;display:block;user-select:none;pointer-events:none;" +
            "filter:drop-shadow(0 3px 10px rgba(0,0,0,0.65));";
          const car = new ml.Marker({ element: carEl, anchor: "center", rotationAlignment: "viewport" })
            .setLngLat(ROUTE.coords[0])
            .addTo(map);

          const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          let carP = 0;
          const tick = () => {
            const target = Math.min(1, Math.max(0, (progressRef.current - 0.04) / 0.88));
            carP = reduced ? target : carP + (target - carP) * 0.08;
            if (Math.abs(target - carP) < 0.0004) carP = target;
            const line = sliceTo(ROUTE.coords, carP);
            (map.getSource("route") as import("maplibre-gl").GeoJSONSource)?.setData({
              type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: line },
            });
            car.setLngLat(pointAt(ROUTE.coords, carP));
            car.setRotation(bearingAt(ROUTE.coords, carP)); // sprite nose points up (taillights at bottom)
            raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);

          cleanup = () => {
            window.removeEventListener("resize", frame);
          };
        } catch (err) {
          console.error("JourneyScroll map failed:", err);
          mapContRef.current!.style.opacity = "0";
        }
      });

      cleanup = () => map.remove();
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      cleanup?.();
    };
  }, []);

  const ph = PHASES[phase];

  return (
    <section id="how-it-works" aria-label="How it works">
      <div ref={trackRef} className="relative h-[420vh]">
        <div className="sticky top-0 h-screen overflow-hidden bg-[linear-gradient(180deg,#101918_0%,#141D1C_100%)]">
          {/* real map */}
          <div
            ref={mapContRef}
            style={{ position: "absolute", inset: 0 }}
            className="opacity-0 transition-opacity duration-700"
            aria-hidden="true"
          />
          {/* soft vignette so text stays legible over the map */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(16,25,24,0.85) 0%, rgba(16,25,24,0) 26%), linear-gradient(0deg, rgba(16,25,24,0.92) 0%, rgba(16,25,24,0) 44%)",
            }}
          />

          {/* corridor pills */}
          <div className="absolute left-6 top-24 z-10 flex items-center gap-2 sm:left-12">
            <span className="flex items-center gap-2 rounded-full border border-[rgba(242,238,229,0.16)] bg-[rgba(16,25,24,0.85)] px-3.5 py-1.5 text-[12.5px] font-medium text-dusk-text backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-sage" />
              {ROUTE.pickup.name}
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.3em] text-dusk-mute">
              ·····
            </span>
            <span className="flex items-center gap-2 rounded-full border border-[rgba(249,115,22,0.3)] bg-[rgba(16,25,24,0.85)] px-3.5 py-1.5 text-[12.5px] font-medium text-[#F5B98C] backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-ember" />
              {ROUTE.dropoff.name}
            </span>
          </div>

          {/* progress dots */}
          <div className="absolute right-6 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-3 sm:right-10">
            {PHASES.map((p, i) => (
              <span
                key={p.eyebrow}
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  i === phase ? "scale-150 bg-sage" : "bg-[rgba(242,238,229,0.25)]"
                }`}
              />
            ))}
          </div>

          {/* phase copy */}
          <div className="absolute inset-x-0 bottom-0 z-10">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-6 pb-16 sm:px-12 md:flex-row md:items-end md:justify-between">
              <div key={phase} className="fade-up">
                <p
                  className={`font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.22em] ${
                    ph.ember ? "text-ember" : "text-sage"
                  }`}
                >
                  {ph.eyebrow}
                </p>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(40px,5.6vw,68px)] font-normal leading-[1.05] tracking-[-0.015em] text-dusk-text">
                  {ph.title}{" "}
                  <em className={`italic ${ph.ember ? "text-ember" : "text-sage"}`}>{ph.accent}</em>
                </h3>
              </div>
              <div className="flex items-end gap-8">
                <p key={`s-${phase}`} className="fade-up max-w-[34ch] text-right text-[15.5px] leading-[1.65] text-dusk-dim md:pb-2">
                  {ph.sub}
                </p>
                <span
                  aria-hidden="true"
                  className="hidden font-[family-name:var(--font-mono)] text-[88px] font-medium leading-none text-[rgba(242,238,229,0.07)] md:block"
                >
                  0{phase + 1}
                </span>
              </div>
            </div>
          </div>

          {/* scroll hint, first phase only */}
          <div
            className={`absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-center transition-opacity duration-500 ${
              started ? "opacity-0" : "opacity-100"
            }`}
          >
            <p className="font-[family-name:var(--font-mono)] text-[10.5px] uppercase tracking-[0.28em] text-dusk-mute">
              Scroll to ride along
            </p>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto mt-1 h-4 w-4 text-dusk-mute">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
