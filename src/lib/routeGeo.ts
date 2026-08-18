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

/* The corridor is the actual Gachibowli to Madhapur drive, snapped to
   roads by OSRM and downsampled to bearing changes. The tiles underneath
   are OSM-derived too, so the line sits on the streets it names instead
   of arcing over them. Denser vertices at turns also mean the car
   naturally slows into corners, since progress is index-parametrized. */
export const ROUTE_COORDS: LngLat[] = [
  [78.339045, 17.438609],
  [78.339738, 17.438628],
  [78.340810, 17.438593],
  [78.344520, 17.438481],
  [78.346580, 17.438219],
  [78.347399, 17.438235],
  [78.348251, 17.438787],
  [78.348907, 17.440275],
  [78.348986, 17.440441],
  [78.349624, 17.441662],
  [78.349754, 17.441862],
  [78.350167, 17.442506],
  [78.351185, 17.444082],
  [78.351326, 17.444191],
  [78.351818, 17.444474],
  [78.352725, 17.445014],
  [78.352821, 17.445090],
  [78.352915, 17.445016],
  [78.353680, 17.444405],
  [78.354156, 17.444032],
  [78.354652, 17.443653],
  [78.354867, 17.443518],
  [78.355406, 17.443272],
  [78.356746, 17.442704],
  [78.357881, 17.442219],
  [78.359214, 17.441611],
  [78.359338, 17.441550],
  [78.359842, 17.441259],
  [78.360931, 17.440592],
  [78.361143, 17.440540],
  [78.361397, 17.440379],
  [78.361975, 17.440018],
  [78.363595, 17.438948],
  [78.363673, 17.438861],
  [78.363729, 17.438870],
  [78.363779, 17.438867],
  [78.363828, 17.438853],
  [78.363872, 17.438830],
  [78.363909, 17.438797],
  [78.363938, 17.438758],
  [78.363961, 17.438700],
  [78.364139, 17.438586],
  [78.364384, 17.438384],
  [78.364608, 17.438199],
  [78.364790, 17.438256],
  [78.365023, 17.438375],
  [78.365285, 17.438656],
  [78.366073, 17.439509],
  [78.366915, 17.440493],
  [78.367219, 17.440863],
  [78.367384, 17.440968],
  [78.367530, 17.441026],
  [78.367748, 17.441051],
  [78.367936, 17.441043],
  [78.368041, 17.441009],
  [78.368090, 17.440993],
  [78.368789, 17.440731],
  [78.369034, 17.440643],
  [78.369159, 17.440607],
  [78.369692, 17.440453],
  [78.371009, 17.440167],
  [78.371510, 17.439974],
  [78.371627, 17.439950],
  [78.371861, 17.439805],
  [78.372175, 17.439543],
  [78.372293, 17.439432],
  [78.372907, 17.438767],
  [78.373516, 17.438128],
  [78.373590, 17.438056],
  [78.374861, 17.437372],
  [78.375205, 17.437655],
  [78.375837, 17.438353],
  [78.376827, 17.439230],
  [78.376926, 17.439447],
  [78.376908, 17.439487],
  [78.376882, 17.439565],
  [78.376879, 17.439647],
  [78.376900, 17.439727],
  [78.376922, 17.439783],
  [78.376955, 17.439826],
  [78.376989, 17.439861],
  [78.376998, 17.440001],
  [78.377145, 17.441434],
  [78.377136, 17.442195],
  [78.377090, 17.443789],
  [78.377111, 17.444497],
  [78.377121, 17.444582],
  [78.377363, 17.446110],
  [78.377383, 17.446174],
  [78.377473, 17.446399],
  [78.377733, 17.446842],
  [78.377944, 17.447195],
  [78.378233, 17.447646],
  [78.378708, 17.448207],
  [78.378838, 17.448381],
  [78.378910, 17.448500],
  [78.379035, 17.448756],
  [78.379107, 17.448958],
  [78.379330, 17.449928],
  [78.379403, 17.450178],
  [78.379450, 17.450281],
  [78.379488, 17.450420],
  [78.379531, 17.450506],
  [78.379603, 17.450603],
  [78.379644, 17.450646],
  [78.379743, 17.450735],
  [78.380448, 17.451218],
  [78.381086, 17.451656],
  [78.381191, 17.451754],
  [78.382129, 17.452773],
  [78.382594, 17.452900],
  [78.384072, 17.452749],
  [78.387491, 17.452415],
  [78.390901, 17.452085],
  [78.394414, 17.451743],
  [78.396638, 17.451409],
  [78.396470, 17.450987],
  [78.395286, 17.447106],
  [78.395509, 17.447034],
  [78.395849, 17.446990],
  [78.396922, 17.447777],
];

/* Riders' walking paths, also road-snapped, each ending exactly on a
   vertex of the corridor so the join is a point the car truly passes. */
export const FEEDERS: { path: LngLat[]; joinF: number }[] = [
  {
    path: [
    [78.366541, 17.434550],
    [78.366325, 17.434711],
    [78.366509, 17.434971],
    [78.366618, 17.435126],
    [78.367079, 17.435776],
    [78.366764, 17.436078],
    [78.366605, 17.436206],
    [78.366336, 17.436440],
    [78.365955, 17.436741],
    [78.365907, 17.436779],
    [78.365606, 17.437044],
    [78.365187, 17.437376],
    [78.364987, 17.437535],
    [78.364444, 17.437967],
    [78.364109, 17.438226],
    [78.363889, 17.438381],
    [78.363795, 17.438444],
    [78.363736, 17.438438],
    [78.363678, 17.438446],
    [78.363622, 17.438469],
    [78.363576, 17.438504],
    [78.363540, 17.438550],
    [78.363519, 17.438604],
    [78.363513, 17.438669],
    [78.363528, 17.438732],
    [78.363562, 17.438789],
    [78.363611, 17.438833],
    [78.363673, 17.438861],
    [78.363729, 17.438870],
    [78.363779, 17.438867],
    [78.363828, 17.438853],
    ],
    joinF: 36 / 120,
  },
  {
    path: [
    [78.379479, 17.446122],
    [78.380812, 17.445789],
    [78.380699, 17.445343],
    [78.380216, 17.445478],
    [78.380138, 17.445157],
    [78.380123, 17.445130],
    [78.380087, 17.445106],
    [78.380026, 17.445106],
    [78.379330, 17.445288],
    [78.378886, 17.445422],
    [78.378835, 17.445438],
    [78.378502, 17.445445],
    [78.378375, 17.445468],
    [78.378262, 17.445493],
    [78.378235, 17.445515],
    [78.378216, 17.445555],
    [78.378212, 17.445610],
    [78.378207, 17.445716],
    [78.378214, 17.445770],
    [78.378220, 17.445806],
    [78.378227, 17.445845],
    [78.378147, 17.445860],
    [78.377877, 17.445887],
    [78.377580, 17.445906],
    [78.377516, 17.445917],
    [78.377421, 17.445934],
    [78.377406, 17.445821],
    [78.377390, 17.445623],
    [78.377358, 17.445471],
    [78.377341, 17.445354],
    [78.377319, 17.445204],
    [78.377248, 17.444786],
    [78.377224, 17.444656],
    [78.377206, 17.444529],
    [78.377195, 17.444411],
    [78.377189, 17.444293],
    [78.377190, 17.444148],
    [78.377201, 17.443640],
    [78.377204, 17.443508],
    [78.377207, 17.443426],
    [78.377207, 17.443417],
    [78.377208, 17.443361],
    [78.377219, 17.442889],
    [78.377238, 17.441996],
    [78.377240, 17.441922],
    [78.377242, 17.441682],
    [78.377253, 17.441418],
    [78.377363, 17.441275],
    [78.377368, 17.441158],
    [78.377380, 17.440901],
    [78.377419, 17.439999],
    [78.376998, 17.440001],
    [78.377007, 17.440935],
    [78.377010, 17.441217],
    [78.377011, 17.441322],
    [78.377145, 17.441434],
    ],
    joinF: 82 / 120,
  },
];

/* ── Distance-true playback ──────────────────────────────────
   pointAt above steps by vertex index, which was fine for 8 hand-placed
   points and wrong for a road-snapped line: OSRM clusters vertices at
   corners, so index-stepping makes the car sprint down straights and
   crawl through bends. A Track carries cumulative distances so progress
   maps to metres, and speed on screen stays constant. */

export type Track = { coords: LngLat[]; cum: number[]; total: number };

function planarDist(a: LngLat, b: LngLat): number {
  // local equirectangular metres; plenty at city scale
  const kx = 111320 * Math.cos((a[1] * Math.PI) / 180);
  const ky = 110574;
  const dx = (b[0] - a[0]) * kx;
  const dy = (b[1] - a[1]) * ky;
  return Math.hypot(dx, dy);
}

export function makeTrack(coords: LngLat[]): Track {
  const cum = [0];
  for (let i = 1; i < coords.length; i++) {
    cum.push(cum[i - 1] + planarDist(coords[i - 1], coords[i]));
  }
  return { coords, cum, total: cum[cum.length - 1] };
}

function locate(track: Track, p: number): { i: number; t: number } {
  const d = Math.min(1, Math.max(0, p)) * track.total;
  let lo = 0, hi = track.cum.length - 1;
  while (lo < hi - 1) {
    const mid = (lo + hi) >> 1;
    if (track.cum[mid] <= d) lo = mid; else hi = mid;
  }
  const seg = track.cum[hi] - track.cum[lo];
  return { i: lo, t: seg > 0 ? (d - track.cum[lo]) / seg : 0 };
}

export function trackPointAt(track: Track, p: number): LngLat {
  const { i, t } = locate(track, p);
  const a = track.coords[i], b = track.coords[Math.min(i + 1, track.coords.length - 1)];
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

export function trackSliceTo(track: Track, p: number): LngLat[] {
  if (p <= 0) return [track.coords[0]];
  if (p >= 1) return track.coords;
  const { i } = locate(track, p);
  return [...track.coords.slice(0, i + 1), trackPointAt(track, p)];
}

/* Bearing over a lookahead window rather than one tiny segment, so the
   sprite aims where the road is going, not at every vertex wobble. */
export function trackBearingAt(track: Track, p: number, lookaheadM = 40): number {
  const a = trackPointAt(track, p);
  const b = trackPointAt(track, Math.min(1, p + lookaheadM / track.total));
  return (Math.atan2(b[0] - a[0], b[1] - a[1]) * 180) / Math.PI;
}

export const MAIN_TRACK: Track = makeTrack(ROUTE_COORDS);

/* joinF re-derived in metres: the fraction of the drive at which the car
   actually reaches each rider, matching the distance-true playback. */
export const FEEDER_TRACKS = FEEDERS.map((f, idx) => {
  const joinIndex = idx === 0 ? 36 : 82;
  return {
    track: makeTrack(f.path),
    joinF: MAIN_TRACK.cum[joinIndex] / MAIN_TRACK.total,
  };
});

/* Other shared journeys across the city, also road-snapped. They
   appear in the final beat: the ride you watched is one of many. */
export const NETWORK_ROUTES: LngLat[][] = [
  [
    [78.34884, 17.42788],
    [78.34987, 17.42714],
    [78.34916, 17.42632],
    [78.34841, 17.42507],
    [78.3481, 17.42392],
    [78.34793, 17.42327],
    [78.35258, 17.42276],
    [78.35609, 17.4202],
    [78.35729, 17.42332],
    [78.36069, 17.43443],
    [78.36332, 17.4381],
    [78.36507, 17.4383],
    [78.36765, 17.44098],
    [78.37457, 17.43708],
    [78.37725, 17.43931],
    [78.37573, 17.43792],
  ],
  [
    [78.33908, 17.45609],
    [78.33731, 17.46015],
    [78.34098, 17.46321],
    [78.34341, 17.46542],
    [78.35136, 17.46197],
    [78.36401, 17.45567],
    [78.37227, 17.4577],
    [78.37716, 17.45637],
    [78.38147, 17.45204],
    [78.38477, 17.45268],
  ],
  [
    [78.39898, 17.43297],
    [78.39994, 17.43366],
    [78.39928, 17.43876],
    [78.39843, 17.4384],
    [78.39491, 17.44015],
    [78.39006, 17.44123],
    [78.38862, 17.43753],
    [78.38878, 17.43242],
    [78.38847, 17.4313],
    [78.38764, 17.43122],
    [78.38306, 17.42886],
    [78.38208, 17.42932],
    [78.37951, 17.43153],
    [78.37833, 17.43138],
    [78.37524, 17.42976],
    [78.37474, 17.42878],
    [78.37043, 17.43242],
    [78.36844, 17.43218],
    [78.36591, 17.42997],
  ],
];
