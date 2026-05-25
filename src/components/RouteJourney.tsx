"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";

type RouteConfig = {
  pickup:  { lng: number; lat: number; name: string };
  dropoff: { lng: number; lat: number; name: string };
  coords:  [number, number][];
  center:  [number, number];
  zoom:    number;
};

const ROUTE_CONFIGS: RouteConfig[] = [
  {
    pickup:  { lng: 78.3643, lat: 17.468,  name: "Kondapur" },
    dropoff: { lng: 78.383,  lat: 17.4493, name: "HiTec City" },
    center:  [78.3737, 17.459],
    zoom:    12.8,
    coords:  [
      [78.3643, 17.468 ], [78.3658, 17.4672], [78.368,  17.466 ],
      [78.3705, 17.4645], [78.3726, 17.4625], [78.3745, 17.4604],
      [78.3762, 17.4579], [78.3778, 17.4556], [78.3795, 17.4531],
      [78.3812, 17.4512], [78.383,  17.4493],
    ],
  },
  {
    pickup:  { lng: 78.3390, lat: 17.4401, name: "Gachibowli" },
    dropoff: { lng: 78.3965, lat: 17.4483, name: "Madhapur" },
    center:  [78.3677, 17.4442],
    zoom:    12.6,
    coords:  [
      [78.3390, 17.4401], [78.3480, 17.4422], [78.3565, 17.4445],
      [78.3645, 17.4460], [78.3720, 17.4470], [78.3800, 17.4476],
      [78.3880, 17.4480], [78.3965, 17.4483],
    ],
  },
  {
    pickup:  { lng: 78.4377, lat: 17.4230, name: "Banjara Hills" },
    dropoff: { lng: 78.4580, lat: 17.4458, name: "Punjagutta" },
    center:  [78.4478, 17.4344],
    zoom:    13.2,
    coords:  [
      [78.4377, 17.4230], [78.4415, 17.4278], [78.4450, 17.4318],
      [78.4488, 17.4352], [78.4522, 17.4388], [78.4555, 17.4422],
      [78.4580, 17.4458],
    ],
  },
  {
    pickup:  { lng: 78.4083, lat: 17.4849, name: "Kukatpally" },
    dropoff: { lng: 78.3826, lat: 17.4402, name: "Miyapur" },
    center:  [78.3955, 17.4626],
    zoom:    12.5,
    coords:  [
      [78.4083, 17.4849], [78.4055, 17.4775], [78.4022, 17.4700],
      [78.3988, 17.4628], [78.3955, 17.4558], [78.3918, 17.4488],
      [78.3872, 17.4445], [78.3826, 17.4402],
    ],
  },
];

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function interpolateRoute(coords: [number, number][], p: number): [number, number] {
  if (p <= 0) return coords[0];
  if (p >= 1) return coords[coords.length - 1];
  const n = coords.length - 1;
  const i = Math.floor(p * n);
  const t = (p * n) - i;
  const a = coords[i], b = coords[Math.min(i + 1, n)];
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];
}

function sliceRoute(coords: [number, number][], p: number): [number, number][] {
  if (p <= 0) return [coords[0]];
  const n = coords.length - 1;
  const i = Math.floor(p * n);
  const t = (p * n) - i;
  const out = coords.slice(0, i + 1) as [number, number][];
  if (i < n) {
    const a = coords[i], b = coords[i + 1];
    out.push([lerp(a[0], b[0], t), lerp(a[1], b[1], t)]);
  }
  return out;
}

// ── Journey phases ───────────────────────────────────────────────
const PHASES = [
  {
    id: 0,
    at: 0,
    label: "01",
    accent: "#568F7A",
    eyebrow: "The Start",
    title: "Post\nYour Route",
    sub: "Set your route, seats, and schedule. Your ride, your rules.",
  },
  {
    id: 1,
    at: 0.26,
    label: "02",
    accent: "#568F7A",
    eyebrow: "Smart Matching",
    title: "AI Finds\nYour Match",
    sub: "Matched with verified riders near you, heading the same way, at the same time — automatically.",
  },
  {
    id: 2,
    at: 0.55,
    label: "03",
    accent: "#F97316",
    eyebrow: "Safety System",
    title: "Ride with\nFull Protection",
    sub: "Live GPS, inactivity detection, and route deviation alerts. Free on every plan.",
  },
  {
    id: 3,
    at: 0.82,
    label: "04",
    accent: "#568F7A",
    eyebrow: "Zero Commission",
    title: "₹0 Cut.\nAlways.",
    sub: "Pay each other directly. No middleman. No cut. Ever.",
  },
];

// ── Map component ────────────────────────────────────────────────
function JourneyMap({ carProgress, route }: { carProgress: number; route: RouteConfig }) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const mapRef        = useRef<any>(null);
  const markerRef     = useRef<any>(null);
  const targetPos     = useRef<[number, number] | null>(null);
  const currentPos    = useRef<[number, number] | null>(null);
  const rafRef        = useRef<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let cancelled = false;

    (async () => {
      const ml = await import("maplibre-gl");
      if (cancelled || !containerRef.current) return;

      const map = new ml.Map({
        container: containerRef.current!,
        style: {
          version: 8,
          glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
          sources: {
            carto: {
              type: "raster",
              tiles: [
                "https://a.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}@2x.png",
                "https://b.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}@2x.png",
              ],
              tileSize: 256,
              attribution: "© OpenStreetMap © CARTO",
            },
          },
          layers: [{
            id: "base",
            type: "raster",
            source: "carto",
            paint: {
              "raster-opacity": 1,
              "raster-saturation": -0.65,
              "raster-brightness-min": 0,
              "raster-brightness-max": 0.48,
              "raster-hue-rotate": 175,
            },
          }],
        },
        center: route.center,
        zoom: route.zoom,
        pitch: 38,
        bearing: -10,
        interactive: false,
        attributionControl: false,
      });

      map.on("load", () => {
        if (cancelled) { map.remove(); return; }

        // Ghost full route
        map.addSource("ghost", {
          type: "geojson",
          data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: route.coords } },
        });
        map.addLayer({
          id: "ghost-line",
          type: "line",
          source: "ghost",
          layout: { "line-cap": "round", "line-join": "round" },
          paint: {
            "line-color": "#568F7A",
            "line-width": 2,
            "line-opacity": 0.2,
            "line-dasharray": [4, 8],
          },
        });

        // Active route glow
        map.addSource("glow", {
          type: "geojson",
          data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: [route.coords[0]] } },
        });
        map.addLayer({
          id: "glow-line",
          type: "line",
          source: "glow",
          layout: { "line-cap": "round", "line-join": "round" },
          paint: {
            "line-color": "#568F7A",
            "line-width": 16,
            "line-opacity": 0.12,
            "line-blur": 10,
          },
        });

        // Active route core
        map.addSource("route", {
          type: "geojson",
          data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: [route.coords[0]] } },
        });
        map.addLayer({
          id: "route-line",
          type: "line",
          source: "route",
          layout: { "line-cap": "round", "line-join": "round" },
          paint: {
            "line-color": "#568F7A",
            "line-width": 4,
            "line-opacity": 0.95,
            "line-dasharray": [8, 4],
          },
        });

        // Pickup dot
        const pEl = document.createElement("div");
        pEl.style.cssText = `
          width:16px;height:16px;border-radius:50%;
          background:#568F7A;border:3px solid #F7F6F4;
          box-shadow:0 0 0 6px rgba(86,143,122,0.22),0 0 24px rgba(86,143,122,0.6);
        `;
        new ml.Marker({ element: pEl }).setLngLat([route.pickup.lng, route.pickup.lat]).addTo(map);

        // Destination dot
        const dEl = document.createElement("div");
        dEl.style.cssText = `
          width:16px;height:16px;border-radius:50%;
          background:#F97316;border:3px solid #F7F6F4;
          box-shadow:0 0 0 6px rgba(249,115,22,0.22),0 0 24px rgba(249,115,22,0.5);
          opacity:0.25;transition:opacity 0.6s;
        `;
        (map as any).__destEl = dEl;
        new ml.Marker({ element: dEl }).setLngLat([route.dropoff.lng, route.dropoff.lat]).addTo(map);

        // Car — canonical reference photo (white sedan, top-down, bg removed).
        // Same image used by mobile (assets/markers/car-top.png) and backend
        // live-tracking page (/api/car-marker.png). One asset, three surfaces.
        const carEl = document.createElement("img");
        carEl.src = "/car-marker.png";
        carEl.alt = "";
        carEl.style.cssText = `
          width:34px;
          height:auto;
          display:block;
          filter:drop-shadow(0 3px 10px rgba(0,0,0,0.65));
          user-select:none;
          pointer-events:none;
        `;
        // rotationAlignment 'viewport' keeps the top-down car flat against
        // the screen even when the map tilts; setRotation() (used in the
        // tick loop below) then turns the car to face the direction of motion.
        markerRef.current = new ml.Marker({
          element: carEl,
          anchor: "center",
          rotationAlignment: "viewport",
        })
          .setLngLat([route.pickup.lng, route.pickup.lat])
          .addTo(map);

        mapRef.current = map;
        setReady(true);
      });
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    };
  }, []);

  // Start lerp RAF loop once map is ready
  useEffect(() => {
    if (!ready || !mapRef.current) return;
    const map = mapRef.current;
    const LERP = 0.07; // lower = more drag/lag

    const tick = () => {
      if (!targetPos.current) { rafRef.current = requestAnimationFrame(tick); return; }

      // Initialise current position on first frame
      if (!currentPos.current) currentPos.current = [...targetPos.current] as [number, number];

      const [tLng, tLat] = targetPos.current;
      const [cLng, cLat] = currentPos.current;

      const newLng = cLng + (tLng - cLng) * LERP;
      const newLat = cLat + (tLat - cLat) * LERP;
      currentPos.current = [newLng, newLat];

      // Move car marker
      markerRef.current?.setLngLat([newLng, newLat]);

      // Rotate the car so its front points toward where it's going.
      // The image is a top-down photo facing north (0°). Bearing math:
      //   atan2(dLng, dLat) gives 0=N, 90=E, 180=S, -90=W (radians),
      //   then degrees, then maplibre's setRotation rotates clockwise.
      // Only update when there's real horizontal motion (>~1m), otherwise
      // the car jitters when nearly stopped at the start/end of a leg.
      const dLng = tLng - cLng;
      const dLat = tLat - cLat;
      if (Math.abs(dLng) > 1e-7 || Math.abs(dLat) > 1e-7) {
        const bearing = (Math.atan2(dLng, dLat) * 180) / Math.PI;
        markerRef.current?.setRotation(bearing);
      }

      // Camera follows smoothly, slightly ahead of car
      const camP = Math.min(1, (targetPos.current as any).__progress + 0.08);
      const [camLng, camLat] = interpolateRoute(route.coords, camP);
      map.easeTo({ center: [camLng, camLat], duration: 180, easing: (t: number) => t * (2 - t) });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [ready, route]);

  // Update target position + route line on progress change
  useEffect(() => {
    if (!ready || !mapRef.current) return;
    const map = mapRef.current;

    const [lng, lat] = interpolateRoute(route.coords, carProgress);
    const t = targetPos.current ?? [lng, lat];
    (t as any).__progress = carProgress;
    targetPos.current = [lng, lat];
    (targetPos.current as any).__progress = carProgress;

    // Update drawn route line immediately (snappy line, lagging car = nice contrast)
    const sliced = sliceRoute(route.coords, carProgress);
    const geo = { type: "Feature" as const, properties: {} as Record<string, unknown>, geometry: { type: "LineString" as const, coordinates: sliced } };
    (map.getSource("route") as any)?.setData(geo);
    (map.getSource("glow") as any)?.setData(geo);

    // Reveal destination as car approaches
    const destEl = (map as any).__destEl as HTMLDivElement | undefined;
    if (destEl) destEl.style.opacity = String(Math.min(1, carProgress * 3));
  }, [carProgress, ready, route]);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" />;
}

// ── Main section ─────────────────────────────────────────────────
export default function RouteJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Use first route for SSR (avoids hydration mismatch), randomise after mount
  const [route, setRoute] = useState<RouteConfig>(ROUTE_CONFIGS[0]);
  useEffect(() => {
    setRoute(ROUTE_CONFIGS[Math.floor(Math.random() * ROUTE_CONFIGS.length)]);
  }, []);

  const [rawProgress, setRawProgress] = useState(0);

  useEffect(() => scrollYProgress.on("change", setRawProgress), [scrollYProgress]);

  // Car animates between 15% and 90% of total scroll
  const carProgress = Math.max(0, Math.min(1, (rawProgress - 0.15) / 0.75));

  // Current phase
  const phase = [...PHASES].reverse().find((p) => rawProgress >= p.at)!;

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "220vh" }}
    >
      {/* ── Sticky full-viewport panel ──────────────────────── */}
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: "100svh", background: "#050D0D" }}
      >
        {/* MapLibre fills entire screen */}
        <JourneyMap key={route.pickup.name} carProgress={carProgress} route={route} />

        {/* ── Layered dark vignette so text is always legible ── */}
        {/* Top bar fade (navbar sits here) */}
        <div
          className="pointer-events-none absolute top-0 left-0 right-0"
          style={{ height: 140, background: "linear-gradient(to bottom, rgba(5,13,13,0.92) 0%, transparent 100%)" }}
        />
        {/* Bottom panel — where content lives */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0"
          style={{ height: "62%", background: "linear-gradient(to top, rgba(5,13,13,0.97) 0%, rgba(5,13,13,0.80) 45%, transparent 100%)" }}
        />
        {/* Subtle left vignette */}
        <div
          className="pointer-events-none absolute top-0 left-0 bottom-0"
          style={{ width: "40%", background: "linear-gradient(to right, rgba(5,13,13,0.40) 0%, transparent 100%)" }}
        />

        {/* ── Scroll progress bar ─────────────────────────── */}
        <div className="absolute top-0 left-0 right-0 z-20" style={{ height: 2, background: "rgba(247,246,244,0.05)" }}>
          <div
            style={{
              height: "100%",
              width: `${rawProgress * 100}%`,
              background: `linear-gradient(to right, #568F7A, #F97316)`,
              boxShadow: "0 0 10px rgba(86,143,122,0.9)",
              transition: "width 0.08s linear",
            }}
          />
        </div>

        {/* ── Phase dots — right edge ─────────────────────── */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
          {PHASES.map((p) => (
            <div
              key={p.id}
              className="rounded-full transition-all duration-500"
              style={{
                width:  p.id === phase.id ? 10 : 5,
                height: p.id === phase.id ? 10 : 5,
                background: p.id === phase.id ? p.accent : "rgba(247,246,244,0.2)",
                boxShadow: p.id === phase.id ? `0 0 12px ${p.accent}` : "none",
              }}
            />
          ))}
        </div>

        {/* ── Main content — full-width bottom overlay ─────── */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-8 sm:px-14 lg:px-20 pb-14 lg:pb-20">

          {/* Route breadcrumb */}
          <div className="flex items-center gap-3 mb-8">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: "rgba(86,143,122,0.15)", border: "1px solid rgba(86,143,122,0.35)", color: "#568F7A" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#568F7A" }} />
              {route.pickup.name}
            </span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-400"
                  style={{
                    width: 3,
                    height: 3,
                    background: carProgress * 5 > i ? "#568F7A" : "rgba(86,143,122,0.2)",
                    transform: carProgress * 5 > i ? "scale(1.2)" : "scale(1)",
                  }}
                />
              ))}
            </div>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-600"
              style={{
                background: `rgba(249,115,22,${Math.min(0.15, carProgress * 0.2)})`,
                border: `1px solid rgba(249,115,22,${Math.min(0.35, carProgress * 0.45)})`,
                color: `rgba(249,115,22,${Math.min(1, carProgress * 1.4)})`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#F97316", opacity: Math.min(1, carProgress * 1.4) }}
              />
              {route.dropoff.name}
            </span>
          </div>

          {/* Phase heading — takes full width */}
          <AnimatePresence mode="wait">
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
            >
              {/* Left: big title */}
              <div>
                <span
                  className="block text-[11px] font-bold uppercase tracking-[0.28em] mb-4"
                  style={{ color: phase.accent }}
                >
                  {phase.eyebrow}
                </span>
                <h2
                  className="font-[family-name:var(--font-bricolage)] font-extrabold leading-[1.0] tracking-[-0.035em] whitespace-pre-line"
                  style={{
                    fontSize: "clamp(34px, 5vw, 72px)",
                    color: "#F7F6F4",
                    textShadow: "0 2px 40px rgba(5,13,13,0.8)",
                  }}
                >
                  {phase.title}
                </h2>
              </div>

              {/* Right: sub copy + step number */}
              <div className="lg:max-w-xs lg:text-right lg:pb-2">
                <p
                  className="text-base leading-relaxed mb-4"
                  style={{ color: "rgba(247,246,244,0.58)" }}
                >
                  {phase.sub}
                </p>
                <span
                  className="font-[family-name:var(--font-bricolage)] font-extrabold"
                  style={{ fontSize: "clamp(42px, 6vw, 72px)", color: "rgba(247,246,244,0.05)", lineHeight: 1 }}
                >
                  {phase.label}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Scroll cue — fades out after start ──────────── */}
        <motion.div
          className="absolute bottom-8 right-1/2 translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
          style={{ opacity: rawProgress < 0.07 ? 1 : 0, transition: "opacity 0.5s" }}
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "rgba(247,246,244,0.3)" }}>
            Scroll to journey
          </span>
          <motion.svg
            width="14" height="14" viewBox="0 0 14 14" fill="none"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <path d="M3 5l4 4 4-4" stroke="rgba(247,246,244,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </motion.div>

        {/* Attribution — bottom-right, tiny */}
        <div
          className="absolute bottom-3 right-4 z-20 text-[9px]"
          style={{ color: "rgba(247,246,244,0.12)" }}
        >
          © OpenStreetMap © CARTO
        </div>
      </div>
    </section>
  );
}
