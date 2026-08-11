/* Shared route-geometry helpers for the map surfaces (hero RideMap,
   scroll JourneyScroll). Coordinates are [lng, lat]. */

export type LngLat = [number, number];

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function pointAt(coords: LngLat[], p: number): LngLat {
  if (p <= 0) return coords[0];
  if (p >= 1) return coords[coords.length - 1];
  const n = coords.length - 1;
  const i = Math.floor(p * n);
  const t = p * n - i;
  const a = coords[i];
  const b = coords[Math.min(i + 1, n)];
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];
}

export function sliceTo(coords: LngLat[], p: number): LngLat[] {
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

export function bearingAt(coords: LngLat[], p: number): number {
  const n = coords.length - 1;
  const i = Math.min(Math.floor(p * n), n - 1);
  const a = coords[i];
  const b = coords[i + 1];
  return (Math.atan2(b[0] - a[0], b[1] - a[1]) * 180) / Math.PI;
}

/* The night-map raster style shared by both map surfaces. */
export function nightRasterStyle() {
  return {
    version: 8 as const,
    sources: {
      carto: {
        type: "raster" as const,
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
        type: "raster" as const,
        source: "carto",
        paint: {
          "raster-opacity": 1,
          "raster-saturation": -0.6,
          "raster-brightness-min": 0,
          "raster-brightness-max": 0.62,
          "raster-hue-rotate": 175,
        },
      },
    ],
  };
}
