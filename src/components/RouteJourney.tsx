"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";

// ── Real Hyderabad route: Kondapur → HiTec City ─────────────────
const PICKUP  = { lng: 78.3643, lat: 17.468,  name: "Kondapur" };
const DROPOFF = { lng: 78.383,  lat: 17.4493, name: "HiTec City" };

const ROUTE_COORDS: [number, number][] = [
  [78.3643, 17.468 ],
  [78.3658, 17.4672],
  [78.3680, 17.466 ],
  [78.3705, 17.4645],
  [78.3726, 17.4625],
  [78.3745, 17.4604],
  [78.3762, 17.4579],
  [78.3778, 17.4556],
  [78.3795, 17.4531],
  [78.3812, 17.4512],
  [78.383,  17.4493],
];

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function interpolateRoute(p: number): [number, number] {
  if (p <= 0) return ROUTE_COORDS[0];
  if (p >= 1) return ROUTE_COORDS[ROUTE_COORDS.length - 1];
  const n = ROUTE_COORDS.length - 1;
  const i = Math.floor(p * n);
  const t = (p * n) - i;
  const a = ROUTE_COORDS[i], b = ROUTE_COORDS[Math.min(i + 1, n)];
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];
}

function sliceRoute(p: number): [number, number][] {
  if (p <= 0) return [ROUTE_COORDS[0]];
  const n = ROUTE_COORDS.length - 1;
  const i = Math.floor(p * n);
  const t = (p * n) - i;
  const out = ROUTE_COORDS.slice(0, i + 1) as [number, number][];
  if (i < n) {
    const a = ROUTE_COORDS[i], b = ROUTE_COORDS[i + 1];
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
    sub: "Define your commute, seats, and schedule. Your journey, your terms.",
  },
  {
    id: 1,
    at: 0.26,
    label: "02",
    accent: "#568F7A",
    eyebrow: "Smart Matching",
    title: "AI Finds\nYour Crew",
    sub: "Proximity · Trust score · Schedule — all weighted in real-time.",
  },
  {
    id: 2,
    at: 0.55,
    label: "03",
    accent: "#F97316",
    eyebrow: "Guardian Safety",
    title: "Ride with\nFull Protection",
    sub: "Live GPS · 60-second SOS · Route deviation alerts. Free on every plan.",
  },
  {
    id: 3,
    at: 0.82,
    label: "04",
    accent: "#568F7A",
    eyebrow: "Zero Commission",
    title: "₹0 Cut.\nAlways.",
    sub: "Pay each other directly. No middleman, no commission — ever.",
  },
];

// ── Map component ────────────────────────────────────────────────
function JourneyMap({ carProgress }: { carProgress: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef       = useRef<any>(null);
  const markerRef    = useRef<any>(null);
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
        center: [78.3737, 17.459],
        zoom: 12.8,
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
          data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: ROUTE_COORDS } },
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
          data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: [ROUTE_COORDS[0]] } },
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
          data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: [ROUTE_COORDS[0]] } },
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
        new ml.Marker({ element: pEl }).setLngLat([PICKUP.lng, PICKUP.lat]).addTo(map);

        // Destination dot
        const dEl = document.createElement("div");
        dEl.style.cssText = `
          width:16px;height:16px;border-radius:50%;
          background:#F97316;border:3px solid #F7F6F4;
          box-shadow:0 0 0 6px rgba(249,115,22,0.22),0 0 24px rgba(249,115,22,0.5);
          opacity:0.25;transition:opacity 0.6s;
        `;
        (map as any).__destEl = dEl;
        new ml.Marker({ element: dEl }).setLngLat([DROPOFF.lng, DROPOFF.lat]).addTo(map);

        // Car — load from static SVG file
        const carEl = document.createElement("div");
        carEl.style.cssText = `
          position:relative;width:44px;height:78px;
          filter:drop-shadow(0 4px 12px rgba(0,0,0,0.55)) drop-shadow(0 0 16px rgba(86,143,122,0.55));
        `;
        // Fetch the SVG file from public directory
        fetch("/car-marker.svg").then(r => r.text()).then(svg => {
          carEl.innerHTML = svg;
        }).catch(() => {
          // Fallback dot if SVG fails to load
          carEl.style.cssText += `width:20px;height:20px;border-radius:50%;background:#568F7A;`;
        });
        // Keep the inline SVG as immediate fallback while fetch loads
        carEl.innerHTML = `<svg width="44" height="78" viewBox="0 0 44 78" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bodyGrad" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#F0EDE7"/>
      <stop offset="100%" stop-color="#D8D5CF"/>
    </radialGradient>
    <radialGradient id="roofGrad" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#CFCDC7"/>
      <stop offset="100%" stop-color="#BCBAB4"/>
    </radialGradient>
    <linearGradient id="glassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="rgba(160,220,210,0.90)"/>
      <stop offset="100%" stop-color="rgba(120,190,180,0.55)"/>
    </linearGradient>
    <linearGradient id="rearGlassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="rgba(120,190,180,0.60)"/>
      <stop offset="100%" stop-color="rgba(90,160,150,0.40)"/>
    </linearGradient>
  </defs>

  <!-- Ground shadow -->
  <ellipse cx="22" cy="75" rx="14" ry="3" fill="rgba(0,0,0,0.30)"/>

  <!-- ── Body shell ─────────────────────────────── -->
  <!-- Hood (front) -->
  <path d="M13 6 C13 4 16 2 22 2 C28 2 31 4 31 6 L32 18 L12 18 Z" fill="#E2DFD9"/>
  <!-- Main body -->
  <path d="M10 18 L10 56 C10 64 14 70 22 70 C30 70 34 64 34 56 L34 18 Z" fill="url(#bodyGrad)"/>
  <!-- Trunk -->
  <path d="M12 56 C12 62 16 68 22 68 C28 68 32 62 32 56 L34 56 C34 64 30 72 22 72 C14 72 10 64 10 56 Z" fill="#D0CEC8"/>

  <!-- ── Cabin / Roof ───────────────────────────── -->
  <path d="M13 26 C13 21 17 18 22 18 C27 18 31 21 31 26 L31 52 C31 57 27 60 22 60 C17 60 13 57 13 52 Z" fill="url(#roofGrad)"/>

  <!-- ── Windows ───────────────────────────────── -->
  <!-- Front windshield -->
  <path d="M14 22 C14 17 17 13 22 13 C27 13 30 17 30 22 L29 27 C25 25 19 25 15 27 Z" fill="url(#glassGrad)" stroke="rgba(255,255,255,0.30)" stroke-width="0.5"/>
  <!-- Rear window -->
  <path d="M15 52 L15 56 C15 60 18 63 22 63 C26 63 29 60 29 56 L29 52 C25 54 19 54 15 52 Z" fill="url(#rearGlassGrad)" stroke="rgba(255,255,255,0.18)" stroke-width="0.5"/>
  <!-- Left side windows -->
  <path d="M12 30 L11 30 L11 48 L12 49 L13 48 L13 30 Z" fill="rgba(140,200,190,0.45)"/>
  <!-- Right side windows -->
  <path d="M32 30 L33 30 L33 48 L32 49 L31 48 L31 30 Z" fill="rgba(140,200,190,0.45)"/>

  <!-- Door seam line -->
  <line x1="13" y1="40" x2="31" y2="40" stroke="rgba(0,0,0,0.12)" stroke-width="0.7"/>
  <!-- Left door seam -->
  <line x1="12.5" y1="27" x2="12.5" y2="54" stroke="rgba(0,0,0,0.10)" stroke-width="0.5"/>
  <!-- Right door seam -->
  <line x1="31.5" y1="27" x2="31.5" y2="54" stroke="rgba(0,0,0,0.10)" stroke-width="0.5"/>

  <!-- ── Brand accent stripe ────────────────────── -->
  <rect x="20.5" y="4" width="3" height="66" rx="1.5" fill="rgba(86,143,122,0.22)"/>

  <!-- ── Headlights ─────────────────────────────── -->
  <path d="M12 5 L18 5 L19 9 L12 9 Z" fill="#FFF9D6" rx="1" opacity="0.95"/>
  <path d="M12.5 5.5 L17.5 5.5 L18.2 8 L12.5 8 Z" fill="#FFFDE0" opacity="0.8"/>
  <path d="M26 5 L32 5 L32 9 L25 9 Z" fill="#FFF9D6" rx="1" opacity="0.95"/>
  <path d="M25.8 5.5 L31.5 5.5 L31.5 8 L26.5 8 Z" fill="#FFFDE0" opacity="0.8"/>

  <!-- ── Tail lights ────────────────────────────── -->
  <path d="M12 66 L19 66 L19 70 L12 68 Z" fill="#F97316" opacity="0.88"/>
  <path d="M25 66 L32 66 L32 68 L25 70 Z" fill="#F97316" opacity="0.88"/>
  <!-- Inner tail light (brake) -->
  <path d="M13 66.5 L18 66.5 L18 69 L13 67.5 Z" fill="#FF4500" opacity="0.5"/>
  <path d="M26 66.5 L31 66.5 L31 67.5 L26 69 Z" fill="#FF4500" opacity="0.5"/>

  <!-- ── Left mirrors ───────────────────────────── -->
  <path d="M8 28 C7 28 6.5 29 6.5 30 C6.5 31 7 32 8 32 L10 32 L10 28 Z" fill="#C8C6C0"/>
  <!-- Right mirror -->
  <path d="M36 28 C37 28 37.5 29 37.5 30 C37.5 31 37 32 36 32 L34 32 L34 28 Z" fill="#C8C6C0"/>

  <!-- ── Wheels ──────────────────────────────────── -->
  <!-- Left front -->
  <ellipse cx="9" cy="25" rx="4.5" ry="5.5" fill="#3A3835"/>
  <ellipse cx="9" cy="25" rx="3"   ry="4"   fill="#555350"/>
  <ellipse cx="9" cy="25" rx="1.2" ry="1.6" fill="#777572"/>
  <ellipse cx="8.2" cy="23.5" rx="0.5" ry="0.7" fill="#999794" opacity="0.6"/>
  <!-- Left rear -->
  <ellipse cx="9" cy="50" rx="4.5" ry="5.5" fill="#3A3835"/>
  <ellipse cx="9" cy="50" rx="3"   ry="4"   fill="#555350"/>
  <ellipse cx="9" cy="50" rx="1.2" ry="1.6" fill="#777572"/>
  <!-- Right front -->
  <ellipse cx="35" cy="25" rx="4.5" ry="5.5" fill="#3A3835"/>
  <ellipse cx="35" cy="25" rx="3"   ry="4"   fill="#555350"/>
  <ellipse cx="35" cy="25" rx="1.2" ry="1.6" fill="#777572"/>
  <ellipse cx="35.8" cy="23.5" rx="0.5" ry="0.7" fill="#999794" opacity="0.6"/>
  <!-- Right rear -->
  <ellipse cx="35" cy="50" rx="4.5" ry="5.5" fill="#3A3835"/>
  <ellipse cx="35" cy="50" rx="3"   ry="4"   fill="#555350"/>
  <ellipse cx="35" cy="50" rx="1.2" ry="1.6" fill="#777572"/>

  <!-- ── Roof highlight sheen ───────────────────── -->
  <path d="M16 28 C16 24 18.5 22 22 22 C25.5 22 28 24 28 28 L28 48 C28 52 25.5 54 22 54 C18.5 54 16 52 16 48 Z" fill="rgba(255,255,255,0.06)"/>
  <!-- Specular highlight -->
  <path d="M17 29 C18 26 20 25 22 25 L20 28 Z" fill="rgba(255,255,255,0.18)"/>
</svg>`;
        markerRef.current = new ml.Marker({ element: carEl, anchor: "center" })
          .setLngLat([PICKUP.lng, PICKUP.lat])
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

  // Animate route + car on progress change
  useEffect(() => {
    if (!ready || !mapRef.current) return;
    const map = mapRef.current;

    const sliced = sliceRoute(carProgress);
    const geo = { type: "Feature" as const, properties: {} as Record<string, unknown>, geometry: { type: "LineString" as const, coordinates: sliced } };
    (map.getSource("route") as any)?.setData(geo);
    (map.getSource("glow") as any)?.setData(geo);

    const [lng, lat] = interpolateRoute(carProgress);
    markerRef.current?.setLngLat([lng, lat]);

    // Reveal destination as car approaches
    const destEl = (map as any).__destEl as HTMLDivElement | undefined;
    if (destEl) destEl.style.opacity = String(Math.min(1, carProgress * 3));

    // Camera follows car
    const camP = Math.min(1, carProgress + 0.1);
    const [cLng, cLat] = interpolateRoute(camP);
    map.easeTo({ center: [cLng, cLat], duration: 350, easing: (t: number) => t });
  }, [carProgress, ready]);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" />;
}

// ── Main section ─────────────────────────────────────────────────
export default function RouteJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

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
        <JourneyMap carProgress={carProgress} />

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
              Kondapur
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
              HiTec City
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
                  className="font-[family-name:var(--font-syne)] font-extrabold"
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
