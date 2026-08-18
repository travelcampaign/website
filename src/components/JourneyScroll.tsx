"use client";

import { useEffect, useRef, useState } from "react";
import {
  nightRasterStyle,
  ROUTE_COORDS,
  MAIN_TRACK,
  FEEDER_TRACKS,
  NETWORK_ROUTES,
  trackPointAt,
  trackSliceTo,
  trackBearingAt,
} from "@/lib/routeGeo";

/* How it works, told as a drive. The section pins a real night map of the
   Gachibowli → Madhapur commute; scrolling drives the sedan across it while
   the story advances through four stops. Scroll speed stays native. The old
   site's journey, retold in the Evening Commute voice. */

// The corridor now lives in routeGeo as ROUTE_COORDS: the real drive,
// snapped to roads, so the highlighted line IS the road underneath it.
const ROUTE = {
  pickup: { name: "Gachibowli", at: ROUTE_COORDS[0] },
  dropoff: { name: "Madhapur", at: ROUTE_COORDS[ROUTE_COORDS.length - 1] },
  coords: ROUTE_COORDS,
};

const PHASES = [
  {
    at: 0,
    eyebrow: "The start",
    title: "Post your",
    accent: "route.",
    sub: "Where you start from, where you're going, and when you leave. Post it once, or for every weekday.",
    ember: false,
  },
  {
    at: 0.26,
    eyebrow: "The match",
    title: "Matched along",
    accent: "the way.",
    sub: "Verified commuters already driving your way. Pickup points sit on the route the driver was taking anyway, so nobody drives extra.",
    ember: false,
  },
  {
    at: 0.55,
    eyebrow: "The watch",
    title: "Watched the",
    accent: "whole way.",
    sub: "The people you trust can watch your ride live, and the app checks on you the moment anything goes quiet.",
    ember: true,
  },
  {
    at: 0.82,
    eyebrow: "Zero commission",
    title: "₹0 cut.",
    accent: "Always.",
    sub: "Riders pay each other for fuel directly, and none of it ever comes to Nexstopp.",
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

      // 2GB-class Android phones report deviceMemory <= 2 (Chrome, which is
      // exactly the phone this product serves). A WebGL map plus tiles there
      // costs more jank than the story is worth; the SVG night fallback
      // tells it without the GPU.
      const mem = (navigator as { deviceMemory?: number }).deviceMemory;
      if (mem !== undefined && mem <= 2) return;

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

          // the feeders: thinner, dashed, quieter than the corridor. They
          // grow during the match phase, so "matched along the way" is
          // something the map does rather than something the copy claims.
          FEEDER_TRACKS.forEach((_, i) => {
            map.addSource(`feeder${i}`, {
              type: "geojson",
              data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: [] } },
            });
            map.addLayer({
              id: `feeder${i}`, type: "line", source: `feeder${i}`,
              layout: { "line-cap": "round", "line-join": "round" },
              paint: { "line-color": "#6FB499", "line-width": 2.5, "line-opacity": 0.7, "line-dasharray": [0.2, 2.2] },
            });
          });

          // one rider per feeder: a small person, not a dot. Minimal
          // figure on a night disc, one ringed sage and one cream so they
          // read as two different people.
          const personSvg = (tint: string) =>
            `<svg viewBox="0 0 24 24" width="13" height="13" fill="${tint}" aria-hidden="true">` +
            `<circle cx="12" cy="7.2" r="3.4"/>` +
            `<path d="M5.5 20.5c0-3.7 2.9-6.3 6.5-6.3s6.5 2.6 6.5 6.3z"/></svg>`;
          const riderEls = FEEDER_TRACKS.map((_, i) => {
            const el = document.createElement("span");
            el.style.cssText =
              "display:flex;align-items:center;justify-content:center;" +
              "width:24px;height:24px;border-radius:9999px;" +
              "background:rgba(16,25,24,0.92);" +
              `box-shadow:0 0 0 2px ${i === 0 ? "rgba(111,180,153,0.55)" : "rgba(242,238,229,0.45)"}, 0 3px 10px rgba(0,0,0,0.5);` +
              "opacity:0;transition:opacity 0.4s ease;";
            el.innerHTML = personSvg(i === 0 ? "#6FB499" : "#F2EEE5");
            return el;
          });
          const riders = riderEls.map((el, i) =>
            new ml.Marker({ element: el })
              .setLngLat(FEEDER_TRACKS[i].track.coords[0])
              .addTo(map)
          );

          // meeting points: a quiet pulse where each rider will be picked
          // up, alive only while someone is actually waiting there
          const meetEls = FEEDER_TRACKS.map(() => {
            const el = document.createElement("span");
            el.className = "meet-pulse";
            el.style.opacity = "0";
            return el;
          });
          const meets = meetEls.map((el, i) => {
            const holder = document.createElement("div");
            holder.appendChild(el);
            return new ml.Marker({ element: holder })
              .setLngLat(FEEDER_TRACKS[i].track.coords[FEEDER_TRACKS[i].track.coords.length - 1])
              .addTo(map);
          });

          // the conversation: two strangers coordinating one ride. Short,
          // human, Hyderabad-plain. Each bubble follows its speaker.
          type Beat = {
            from: number; to: number;
            speaker: "a" | "b" | "car" | "meet0" | "meet1";
            text: string; dy: number;
          };
          const BEATS: Beat[] = [
            { from: 0.11, to: 0.17, speaker: "a", text: "Madhapur side?", dy: -30 },
            { from: 0.175, to: 0.235, speaker: "b", text: "Haan. Leaving at 8:30.", dy: -30 },
            { from: 0.24, to: 0.30, speaker: "a", text: "Same route. See you at the pickup.", dy: -30 },
            { from: 0.40, to: 0.475, speaker: "meet0", text: "Ready?", dy: -26 },
            { from: 0.58, to: 0.66, speaker: "car", text: "Thanks for sharing the ride.", dy: -34 },
          ];
          // MapLibre positions the marker element itself via an inline
          // transform, and a CSS animation on transform OVERRIDES inline
          // styles, so the float must live on an inner child or every
          // bubble snaps to the pane origin. Learned the hard way.
          const beatEls = BEATS.map((b) => {
            const el = document.createElement("span");
            el.className = "map-bubble";
            el.textContent = b.text;
            el.style.opacity = "0";
            return el;
          });
          const beatMarkers = beatEls.map((el, i) => {
            const holder = document.createElement("div");
            holder.appendChild(el);
            return new ml.Marker({ element: holder, anchor: "bottom", offset: [0, BEATS[i].dy] })
              .setLngLat(MAIN_TRACK.coords[0])
              .addTo(map);
          });

          // the network: other shared journeys already happening, revealed
          // in the last beat so this ride reads as one of many
          NETWORK_ROUTES.forEach((coords, i) => {
            map.addSource(`net${i}`, {
              type: "geojson",
              data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: coords } },
            });
            map.addLayer({
              id: `net${i}`, type: "line", source: `net${i}`,
              layout: { "line-cap": "round", "line-join": "round" },
              paint: { "line-color": "#6FB499", "line-width": 2, "line-opacity": 0 },
            });
          });
          let netShown = false;

          const carEl = document.createElement("img");
          carEl.src = "/car-marker.png";
          carEl.alt = "";
          carEl.style.cssText =
            "width:34px;height:auto;display:block;user-select:none;pointer-events:none;" +
            "filter:drop-shadow(0 3px 10px rgba(0,0,0,0.65));" +
            "opacity:0;transition:opacity 0.6s ease;";
          const car = new ml.Marker({ element: carEl, anchor: "center", rotationAlignment: "viewport" })
            .setLngLat(ROUTE.coords[0])
            .addTo(map);

          const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          let carP = 0;
          // displayed bearing chases the road's bearing along the shortest
          // arc, so vertex wobble in the snapped geometry never twitches
          // the sprite
          let shownBearing = trackBearingAt(MAIN_TRACK, 0);
          let lastWalkT = -1;
          const lastFeederOpacity = FEEDER_TRACKS.map(() => -1);
          const tick = () => {
            // the car may not move until the people have met their route:
            // journeys exist first, the shared drive is the consequence
            const target = Math.min(1, Math.max(0, (progressRef.current - 0.34) / 0.58));
            carP = reduced ? target : carP + (target - carP) * 0.055;
            if (Math.abs(target - carP) < 0.0004) carP = target;
            (map.getSource("route") as import("maplibre-gl").GeoJSONSource)?.setData({
              type: "Feature", properties: {},
              geometry: { type: "LineString", coordinates: trackSliceTo(MAIN_TRACK, carP) },
            });
            car.setLngLat(trackPointAt(MAIN_TRACK, carP));
            // no taxi waiting at the kerb: the car exists only once the
            // riders are on their way to the route
            carEl.style.opacity = progressRef.current > 0.3 ? "1" : "0";
            // face the direction of travel, both ways. Without the flip a
            // backward scroll made the car reverse down the corridor.
            const forward = target >= carP - 0.0005;
            const wanted =
              trackBearingAt(MAIN_TRACK, carP) + (forward ? 0 : 180);
            let delta = ((wanted - shownBearing + 540) % 360) - 180;
            shownBearing += reduced ? delta : delta * 0.18;
            car.setRotation(shownBearing); // sprite nose points up (taillights at bottom)

            // the convergence: riders walk their feeders during the match
            // phase, wait at the corridor, and vanish into the car as it
            // passes their pickup point
            const p = progressRef.current;
            const walkT = Math.min(1, Math.max(0, (p - 0.1) / 0.16));
            FEEDER_TRACKS.forEach((f, i) => {
              if (walkT !== lastWalkT) {
                (map.getSource(`feeder${i}`) as import("maplibre-gl").GeoJSONSource)?.setData({
                  type: "Feature", properties: {},
                  geometry: { type: "LineString", coordinates: trackSliceTo(f.track, walkT) },
                });
                if (walkT < 1) riders[i].setLngLat(trackPointAt(f.track, walkT));
              }
              const boarded = carP >= f.joinF;
              riderEls[i].style.opacity = p > 0.06 && !boarded ? "1" : "0";
              // the meeting point breathes only while its rider stands there
              meetEls[i].style.opacity = walkT > 0.85 && !boarded ? "1" : "0";
              // once its rider is in the car the path has no story left to
              // tell; left on screen it reads as an unexplained scribble.
              // Guarded write: setPaintProperty every frame is a style churn.
              const op = boarded ? Math.max(0, 0.7 - (carP - f.joinF) * 4) : 0.7;
              if (Math.abs(op - lastFeederOpacity[i]) > 0.02) {
                map.setPaintProperty(`feeder${i}`, "line-opacity", op);
                lastFeederOpacity[i] = op;
              }
            });
            lastWalkT = walkT;

            // conversation beats follow their speakers
            BEATS.forEach((b, i) => {
              const on = p >= b.from && p <= b.to;
              beatEls[i].style.opacity = on ? "1" : "0";
              if (!on) return;
              const pos =
                b.speaker === "a" ? riders[0].getLngLat()
                : b.speaker === "b" ? riders[1].getLngLat()
                : b.speaker === "car" ? car.getLngLat()
                : meets[b.speaker === "meet0" ? 0 : 1].getLngLat();
              beatMarkers[i].setLngLat(pos);
            });

            // the wider city: other shared rides fade in for the last beat
            if (p > 0.8 && !netShown) {
              netShown = true;
              NETWORK_ROUTES.forEach((_, i) =>
                map.setPaintProperty(`net${i}`, "line-opacity", 0.35)
              );
            } else if (p <= 0.78 && netShown) {
              netShown = false;
              NETWORK_ROUTES.forEach((_, i) =>
                map.setPaintProperty(`net${i}`, "line-opacity", 0)
              );
            }
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
    <section id="how-it-works">
      {/* Real heading for the h1→h2→h3 chain; the phase titles below are
          h3s, and without this the document skipped a level. */}
      <h2 className="sr-only">How it works</h2>
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

          {/* corridor pills — they arrive in ride order: origin first, the
              road between, then the destination. Small theatre, no library. */}
          <div className="absolute left-6 top-24 z-10 flex items-center gap-2 sm:left-12">
            <span
              className="scene-in flex items-center gap-2 rounded-full border border-[rgba(242,238,229,0.16)] bg-[rgba(16,25,24,0.85)] px-3.5 py-1.5 text-[12.5px] font-medium text-dusk-text backdrop-blur-sm"
              style={{ "--scene-delay": "250ms" } as React.CSSProperties}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-sage" />
              {ROUTE.pickup.name}
            </span>
            {/* the road between them, measured: km from the snapped
                geometry itself, so it can never drift from the drawn route */}
            <span
              className="scene-in font-[family-name:var(--font-mono)] text-[10.5px] tracking-[0.14em] text-dusk-mute"
              style={{ "--scene-delay": "550ms" } as React.CSSProperties}
            >
              · {(MAIN_TRACK.total / 1000).toFixed(1)} km ·
            </span>
            <span
              className="scene-in flex items-center gap-2 rounded-full border border-[rgba(249,115,22,0.3)] bg-[rgba(16,25,24,0.85)] px-3.5 py-1.5 text-[12.5px] font-medium text-[#F5B98C] backdrop-blur-sm"
              style={{ "--scene-delay": "850ms" } as React.CSSProperties}
            >
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
