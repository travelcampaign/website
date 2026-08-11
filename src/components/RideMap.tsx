"use client";

import { useEffect, useRef } from "react";

/* Real map, real corridor — the anti-abstraction ride panel.
   CARTO dark tiles of the actual Kondapur → Hitec City commute, the
   canonical top-down sedan photo (same asset the app and the live
   tracking page use), and the app's marker language. The decorative SVG
   underneath stays visible until tiles load (and if WebGL is missing).

   Route coords follow real roads — proven on the previous site's hero. */

const ROUTE = {
  pickup: { lng: 78.3643, lat: 17.468, name: "Kondapur" },
  dropoff: { lng: 78.383, lat: 17.4493, name: "Hitec City" },
  center: [78.3737, 17.459] as [number, number],
  zoom: 12.8,
  coords: [
    [78.3643, 17.468], [78.3658, 17.4672], [78.368, 17.466],
    [78.3705, 17.4645], [78.3726, 17.4625], [78.3745, 17.4604],
    [78.3762, 17.4579], [78.3778, 17.4556], [78.3795, 17.4531],
    [78.3812, 17.4512], [78.383, 17.4493],
  ] as [number, number][],
  // co-rider hops in where their street meets the route
  coRiderAt: 5,
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function pointAt(coords: [number, number][], p: number): [number, number] {
  if (p <= 0) return coords[0];
  if (p >= 1) return coords[coords.length - 1];
  const n = coords.length - 1;
  const i = Math.floor(p * n);
  const t = p * n - i;
  const a = coords[i];
  const b = coords[Math.min(i + 1, n)];
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];
}

function sliceTo(coords: [number, number][], p: number): [number, number][] {
  if (p <= 0) return [coords[0]];
  const n = coords.length - 1;
  const i = Math.floor(p * n);
  const t = p * n - i;
  const out = coords.slice(0, i + 1);
  if (i < n) {
    const a = coords[i];
    const b = coords[i + 1];
    out.push([lerp(a[0], b[0], t), lerp(a[1], b[1], t)]);
  }
  return out;
}

function bearingAt(coords: [number, number][], p: number): number {
  const n = coords.length - 1;
  const i = Math.min(Math.floor(p * n), n - 1);
  const a = coords[i];
  const b = coords[i + 1];
  return (Math.atan2(b[0] - a[0], b[1] - a[1]) * 180) / Math.PI;
}

function stopPill(opts: { dot: string; label: string; sub: string; ring?: boolean }) {
  const el = document.createElement("div");
  el.style.cssText =
    "display:flex;align-items:center;gap:8px;padding:7px 14px;border-radius:999px;" +
    "background:rgba(16,25,24,0.88);border:1px solid rgba(242,238,229,0.16);" +
    "backdrop-filter:blur(6px);font-family:var(--font-dm-sans),sans-serif;" +
    "font-size:13px;font-weight:500;color:#F2EEE5;white-space:nowrap;" +
    "box-shadow:0 8px 24px rgba(0,0,0,0.35);pointer-events:none;";
  const dot = document.createElement("span");
  dot.style.cssText = opts.ring
    ? `width:8px;height:8px;border-radius:50%;border:2px solid ${opts.dot};flex:none;`
    : `width:8px;height:8px;border-radius:50%;background:${opts.dot};flex:none;` +
      `box-shadow:0 0 10px ${opts.dot}66;`;
  el.appendChild(dot);
  const text = document.createElement("span");
  text.innerHTML = `${opts.label} <span style="font-weight:400;color:#7E8F89">· ${opts.sub}</span>`;
  el.appendChild(text);
  return el;
}

export default function RideMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!containerRef.current || cleanupRef.current) return;
    let cancelled = false;
    let raf = 0;

    (async () => {
      const ml = await import("maplibre-gl");
      if (cancelled || !containerRef.current) return;

      let map: import("maplibre-gl").Map;
      try {
        map = new ml.Map({
          container: containerRef.current,
          style: {
            version: 8,
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
            layers: [
              {
                id: "base",
                type: "raster",
                source: "carto",
                paint: {
                  "raster-opacity": 1,
                  "raster-saturation": -0.6,
                  "raster-brightness-min": 0,
                  "raster-brightness-max": 0.56,
                  "raster-hue-rotate": 175,
                },
              },
            ],
          },
          center: ROUTE.center,
          zoom: ROUTE.zoom,
          pitch: 38,
          bearing: -10,
          interactive: false,
          attributionControl: false,
        });
        map.addControl(new ml.AttributionControl({ compact: true }), "bottom-right");
      } catch {
        return; // no WebGL — the SVG fallback underneath stays visible
      }

      map.on("load", () => {
        if (cancelled) {
          map.remove();
          return;
        }

        // fade the real map in over the SVG fallback
        containerRef.current!.style.opacity = "1";

        // ghost of the full route
        map.addSource("ghost", {
          type: "geojson",
          data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: ROUTE.coords } },
        });
        map.addLayer({
          id: "ghost-line",
          type: "line",
          source: "ghost",
          layout: { "line-cap": "round", "line-join": "round" },
          paint: { "line-color": "#568F7A", "line-width": 2, "line-opacity": 0.25, "line-dasharray": [4, 8] },
        });

        // travelled route: glow + core
        map.addSource("glow", {
          type: "geojson",
          data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: [ROUTE.coords[0]] } },
        });
        map.addLayer({
          id: "glow-line",
          type: "line",
          source: "glow",
          layout: { "line-cap": "round", "line-join": "round" },
          paint: { "line-color": "#6FB499", "line-width": 16, "line-opacity": 0.14, "line-blur": 10 },
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

        // markers — the app's language: solid discs, pill labels
        const originDisc = document.createElement("div");
        originDisc.style.cssText =
          "width:16px;height:16px;border-radius:50%;background:#568F7A;border:3px solid #F2EEE5;" +
          "box-shadow:0 0 0 6px rgba(86,143,122,0.22),0 0 24px rgba(86,143,122,0.6);";
        new ml.Marker({ element: originDisc }).setLngLat([ROUTE.pickup.lng, ROUTE.pickup.lat]).addTo(map);
        new ml.Marker({ element: stopPill({ dot: "#6FB499", label: ROUTE.pickup.name, sub: "picked up" }), anchor: "left", offset: [14, -18] })
          .setLngLat([ROUTE.pickup.lng, ROUTE.pickup.lat])
          .addTo(map);

        const destDisc = document.createElement("div");
        destDisc.style.cssText =
          "width:16px;height:16px;border-radius:50%;background:#F97316;border:3px solid #F2EEE5;" +
          "box-shadow:0 0 0 6px rgba(249,115,22,0.22),0 0 24px rgba(249,115,22,0.5);";
        new ml.Marker({ element: destDisc }).setLngLat([ROUTE.dropoff.lng, ROUTE.dropoff.lat]).addTo(map);
        new ml.Marker({ element: stopPill({ dot: "#F97316", label: ROUTE.dropoff.name, sub: "12 min" }), anchor: "left", offset: [14, -18] })
          .setLngLat([ROUTE.dropoff.lng, ROUTE.dropoff.lat])
          .addTo(map);

        const co = ROUTE.coords[ROUTE.coRiderAt];
        new ml.Marker({ element: stopPill({ dot: "#6FB499", label: "Co-rider joins", sub: "on the route", ring: true }), anchor: "right", offset: [-12, -6] })
          .setLngLat(co)
          .addTo(map);

        // the car — canonical top-down sedan photo
        const carEl = document.createElement("img");
        carEl.src = "/car-marker.png";
        carEl.alt = "";
        carEl.style.cssText =
          "width:30px;height:auto;display:block;user-select:none;pointer-events:none;" +
          "filter:drop-shadow(0 3px 10px rgba(0,0,0,0.65));";
        const car = new ml.Marker({ element: carEl, anchor: "center", rotationAlignment: "viewport" })
          .setLngLat(ROUTE.coords[0])
          .addTo(map);

        const setProgress = (p: number) => {
          const line = sliceTo(ROUTE.coords, p);
          (map.getSource("route") as import("maplibre-gl").GeoJSONSource).setData({
            type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: line },
          });
          (map.getSource("glow") as import("maplibre-gl").GeoJSONSource).setData({
            type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: line },
          });
          car.setLngLat(pointAt(ROUTE.coords, p));
          car.setRotation(bearingAt(ROUTE.coords, p) + 10); // +10 offsets map bearing
        };

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) {
          setProgress(0.45);
          return;
        }

        // autonomous journey: ease along the route, pause at arrival, restart
        const JOURNEY_MS = 14000;
        const HOLD_MS = 2600;
        let start = performance.now();
        const tick = (now: number) => {
          const elapsed = (now - start) % (JOURNEY_MS + HOLD_MS);
          const raw = Math.min(elapsed / JOURNEY_MS, 1);
          // gentle ease-in-out
          const p = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;
          setProgress(p);
          raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      });

      cleanupRef.current = () => {
        cancelAnimationFrame(raf);
        map.remove();
      };
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      // Inline position/size: maplibre's stylesheet sets `.maplibregl-map
      // { position: relative }` and, loading after Tailwind, beats the
      // `absolute` utility — collapsing the container to height 0.
      style={{ position: "absolute", inset: 0 }}
      className="opacity-0 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
}
