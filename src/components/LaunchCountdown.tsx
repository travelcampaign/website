"use client";

import { useEffect, useRef, useState } from "react";
import { WAITLIST_URL, LAUNCH_LABEL, LAUNCH_CONFIRMED } from "@/lib/site";

/* The clock, and what happens when it runs out.

   Two rules shaped this. The server has no idea what time it is on the
   visitor's machine, so the first render shows dashes and the real figures
   arrive on mount: rendering a live clock during SSR guarantees a
   hydration mismatch. And the celebration has to survive being watched by
   someone who asked their browser for less motion, so the confetti is
   skipped entirely in that case and the moment still lands. */

type Left = { d: number; h: number; m: number; s: number };

function remaining(target: number): Left | null {
  const ms = target - Date.now();
  if (ms <= 0) return null;
  const s = Math.floor(ms / 1000);
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function LaunchCountdown({ launchAt }: { launchAt: string }) {
  // null before mount, and again once the moment passes
  const [left, setLeft] = useState<Left | null>(null);
  const [mounted, setMounted] = useState(false);
  const [launched, setLaunched] = useState(false);
  const [preview, setPreview] = useState(false);
  const [target, setTarget] = useState<number | null>(null);

  // Read the clock only after mount. ?t=10 runs the whole thing on a ten
  // second fuse so the moment can be watched on demand without waiting for
  // the real date, and without a fake date ever being the public default.
  useEffect(() => {
    setMounted(true);
    const q = new URLSearchParams(window.location.search).get("t");
    const secs = Number(q);
    if (q && Number.isFinite(secs) && secs > 0 && secs <= 3600) {
      setPreview(true);
      setTarget(Date.now() + secs * 1000);
    } else {
      setTarget(new Date(launchAt).getTime());
    }
  }, [launchAt]);

  useEffect(() => {
    if (target === null) return;
    const tick = () => {
      const r = remaining(target);
      setLeft(r);
      setLaunched(r === null);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  // Until the date is real, the page says so instead of counting to a guess.
  const showClock = preview || LAUNCH_CONFIRMED;

  return (
    <>
      {launched ? <Celebration /> : null}

      <div className="relative z-[2] mx-auto max-w-[1200px] px-6 pb-28 pt-36 sm:px-12">
        <p
          key={`k-${launched}`}
          className={`font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.22em] text-sage ${launched ? "launch-pop" : ""}`}
        >
          {launched ? "We are live" : showClock ? "Counting down" : "Opening soon"}
        </p>

        <h1
          key={`h-${launched}`}
          style={{ "--pop-delay": "90ms" } as React.CSSProperties}
          className={`mt-6 max-w-[18ch] font-[family-name:var(--font-display)] text-[clamp(40px,6vw,74px)] font-normal leading-[1.06] tracking-[-0.015em] text-dusk-text ${launched ? "launch-pop" : ""}`}
        >
          {launched ? (
            <>
              Hyderabad, <em className="italic text-sage">start sharing.</em>
            </>
          ) : (
            <>
              The city goes home{" "}
              <em className="italic text-sage">together, soon.</em>
            </>
          )}
        </h1>

        {launched ? (
          <p className="mt-7 max-w-[52ch] text-[17px] leading-[1.7] text-dusk-dim">
            Nexstopp is open in Hyderabad. Post your route, find the people
            already going your way, and split the fuel between you.
          </p>
        ) : (
          <p className="mt-7 max-w-[52ch] text-[17px] leading-[1.7] text-dusk-dim">
            We open on a handful of busy routes first, so that rides actually
            fill instead of being spread thin across the city. The waitlist
            goes first.
            {!showClock && (
              <> The date is not fixed yet. Join the waitlist and you will
              hear it from us before anyone else.</>
            )}
          </p>
        )}

        {/* the clock */}
        {!launched && showClock && (
          <div className="mt-14">
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {(
                [
                  ["Days", left ? String(left.d) : "--"],
                  ["Hours", left ? pad(left.h) : "--"],
                  ["Minutes", left ? pad(left.m) : "--"],
                  ["Seconds", left ? pad(left.s) : "--"],
                ] as const
              ).map(([label, value]) => (
                <div
                  key={label}
                  className="min-w-[74px] flex-1 rounded-[16px] border border-[rgba(242,238,229,0.10)] bg-[rgba(242,238,229,0.03)] px-4 py-5 text-center sm:min-w-[104px]"
                >
                  <p
                    className="font-[family-name:var(--font-mono)] text-[clamp(30px,6vw,50px)] font-medium leading-none tracking-[-0.02em] text-dusk-text"
                    // the seconds column changes every tick; fixing the glyph
                    // width stops the whole row shuffling as digits change
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {value}
                  </p>
                  <p className="mt-3 font-[family-name:var(--font-mono)] text-[10.5px] uppercase tracking-[0.2em] text-dusk-mute">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-5 font-[family-name:var(--font-mono)] text-[11.5px] uppercase tracking-[0.16em] text-dusk-mute">
              {mounted ? LAUNCH_LABEL : " "}
            </p>
          </div>
        )}

        <div className="mt-12 flex flex-wrap gap-4">
          <a
            href={WAITLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="press rounded-full bg-sage px-8 py-4 text-[15.5px] font-semibold text-night-0 transition-colors hover:bg-[#7FC0A6]"
          >
            {launched ? "Get your invite" : "Join the waitlist"}
          </a>
          <a
            href="/#how"
            className="press rounded-full border border-[rgba(242,238,229,0.18)] px-8 py-4 text-[15.5px] font-semibold text-dusk-text transition-colors hover:border-sage hover:text-sage"
          >
            See how it works
          </a>
        </div>
      </div>
    </>
  );
}

/* The celebration.

   It runs in three movements rather than one dump. Poppers throw paper
   from the corners on the stroke, rockets climb and burst overhead for the
   next few seconds, and paper keeps drifting down long after the noise has
   stopped. The sedan takes a lap through the middle of it.

   All hand written: a dependency for twelve seconds of paper is a poor
   trade on a page that is otherwise two fonts and a gradient. Motion is
   per second, never per frame, so a 120Hz phone does not run it at double
   speed. Counts drop hard on 2GB devices, the loop stops itself once the
   last piece has gone, and anyone who asked for reduced motion gets a
   still page that still says the right thing. */

type Kind = "paper" | "spark" | "glitter" | "rocket";

type Piece = {
  kind: Kind;
  x: number; y: number; px: number; py: number;
  vx: number; vy: number;
  w: number; h: number; rot: number; vr: number;
  sway: number; swayFreq: number; phase: number;
  color: string; round: boolean;
  born: number; life: number; age: number;
  gravity: number; drag: number;
  burst?: () => void;      // rockets carry their own explosion
  fired?: boolean;
};

type Ring = { x: number; y: number; born: number; age: number; color: string };

/* Each firework commits to one family so the sky reads designed rather
   than merely colourful. */
const FAMILIES = [
  ["#6FB499", "#8FD3B6", "#F2EEE5"],
  ["#F97316", "#F5B98C", "#F2EEE5"],
  ["#F2EEE5", "#C4CDC8", "#6FB499"],
  ["#568F7A", "#6FB499", "#C4CDC8"],
] as const;

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(a: readonly T[]) => a[Math.floor(Math.random() * a.length)];

function Celebration() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = window.innerWidth;
    let H = window.innerHeight;
    const size = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    window.addEventListener("resize", size);

    const mem = (navigator as { deviceMemory?: number }).deviceMemory;
    const lowEnd = mem !== undefined && mem <= 2;
    const scale = lowEnd ? 0.3 : 1;
    const glow = !lowEnd;

    const pieces: Piece[] = [];
    const rings: Ring[] = [];

    const base = (over: Partial<Piece>): Piece => ({
      kind: "paper",
      x: 0, y: 0, px: 0, py: 0, vx: 0, vy: 0,
      w: 8, h: 12, rot: rand(0, Math.PI * 2), vr: rand(-6, 6),
      sway: rand(26, 78), swayFreq: rand(0.7, 2.0), phase: rand(0, Math.PI * 2),
      color: "#F2EEE5", round: false,
      born: 0, life: 10, age: 0, gravity: 760, drag: 0.6,
      ...over,
    });

    const paper = (x: number, y: number, vx: number, vy: number, born = 0) => {
      const round = Math.random() < 0.14;
      const ribbon = !round && Math.random() < 0.36;
      pieces.push(base({
        kind: "paper", x, y, px: x, py: y, vx, vy, born, round,
        color: pick(pick(FAMILIES)),
        w: round ? rand(5, 9) : ribbon ? rand(3, 5) : rand(6, 11),
        h: round ? 0 : ribbon ? rand(16, 30) : rand(8, 14),
      }));
    };

    const explode = (cx: number, cy: number, at: number) => {
      const family = pick(FAMILIES);
      rings.push({ x: cx, y: cy, born: at, age: 0, color: family[0] });
      const n = Math.round(rand(52, 78) * scale);
      const speed = rand(210, 360);
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + rand(-0.05, 0.05);
        const sp = speed * rand(0.5, 1.2);
        pieces.push(base({
          kind: "spark", x: cx, y: cy, px: cx, py: cy,
          vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
          w: rand(1.7, 3.4), h: 0, round: true, color: pick(family),
          born: at, life: rand(1.2, 2.1), gravity: 175, drag: 1.15,
        }));
      }
      for (let i = 0; i < Math.round(16 * scale); i++) {
        pieces.push(base({
          kind: "glitter", x: cx + rand(-46, 46), y: cy + rand(-46, 46),
          px: cx, py: cy, vx: rand(-20, 20), vy: rand(-10, 30),
          w: rand(1.3, 2.7), h: 0, round: true, color: pick(family),
          born: at, life: rand(2, 3.8), gravity: 22, drag: 0.85,
        }));
      }
      // a handful of heavier embers that arc away and fall
      for (let i = 0; i < Math.round(10 * scale); i++) {
        const a = rand(0, Math.PI * 2);
        pieces.push(base({
          kind: "spark", x: cx, y: cy, px: cx, py: cy,
          vx: Math.cos(a) * rand(60, 150), vy: Math.sin(a) * rand(60, 150),
          w: rand(2.4, 4), h: 0, round: true, color: family[0],
          born: at, life: rand(2.2, 3.4), gravity: 420, drag: 0.5,
        }));
      }
    };

    // a rocket climbs, then hands over to its own explosion
    const rocket = (at: number, tx: number, ty: number) => {
      const x = tx * W;
      const apex = ty * H;
      const climb = rand(0.62, 0.86);
      pieces.push(base({
        kind: "rocket", x, y: H + 10, px: x, py: H + 10,
        vx: rand(-24, 24), vy: -((H + 10 - apex) / climb),
        w: 2.6, h: 0, round: true, color: "#F2EEE5",
        born: at, life: climb, gravity: 0, drag: 0,
        burst: () => explode(x, apex, at + climb),
      }));
    };

    // movement one: the corners, three volleys
    for (const at of [0, 1.1, 2.3, 4.2, 6.4]) {
      for (const side of [0, 1]) {
        const ox = side === 0 ? W * 0.05 : W * 0.95;
        const dir = side === 0 ? 1 : -1;
        const n = Math.round(rand(58, 78) * scale);
        for (let i = 0; i < n; i++) {
          const ang = rand(0.6, 1.44);
          const sp = rand(680, 1240);
          paper(ox, H + 8, Math.cos(ang) * sp * dir * rand(0.5, 1), -Math.sin(ang) * sp, at);
        }
      }
    }

    // movement two: rockets overhead
    for (const [t, x, y] of [
      [0.25, 0.26, 0.26], [0.9, 0.74, 0.20], [1.7, 0.5, 0.15],
      [2.6, 0.18, 0.24], [3.5, 0.84, 0.28], [4.4, 0.42, 0.19],
      [5.3, 0.66, 0.25], [6.2, 0.34, 0.17], [7.1, 0.58, 0.30],
      [8.0, 0.12, 0.26], [8.8, 0.88, 0.21],
    ] as const) rocket(t, x, y);

    // movement three: paper still coming down long after
    for (let i = 0; i < Math.round(260 * scale); i++) {
      paper(rand(0, W), rand(-420, -20), rand(-55, 55), rand(40, 130), rand(0, 9.5));
    }

    let raf = 0;
    let lastT = performance.now();
    let elapsed = 0;

    const draw = (now: number) => {
      // clamped so a backgrounded tab cannot teleport everything on return
      const dt = Math.min((now - lastT) / 1000, 0.05);
      lastT = now;
      elapsed += dt;

      ctx.clearRect(0, 0, W, H);
      let alive = 0;

      // shockwave rings first, behind everything
      for (const r of rings) {
        if (elapsed < r.born) { alive++; continue; }
        r.age += dt;
        if (r.age > 0.75) continue;
        alive++;
        const k = r.age / 0.75;
        ctx.save();
        ctx.globalAlpha = (1 - k) * 0.5;
        ctx.strokeStyle = r.color;
        ctx.lineWidth = 2.5 * (1 - k) + 0.4;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 12 + k * 190, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      for (const p of pieces) {
        if (elapsed < p.born) { alive++; continue; }
        p.age += dt;

        if (p.kind === "rocket") {
          if (p.age >= p.life) {
            if (!p.fired) { p.fired = true; p.burst?.(); }
            continue;
          }
          alive++;
          p.px = p.x; p.py = p.y;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          ctx.save();
          ctx.globalAlpha = 0.9;
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.w;
          ctx.lineCap = "round";
          if (glow) { ctx.shadowBlur = 10; ctx.shadowColor = p.color; }
          ctx.beginPath();
          ctx.moveTo(p.px, p.py);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
          ctx.restore();
          continue;
        }

        if (p.kind !== "paper" && p.age > p.life) continue;

        p.px = p.x; p.py = p.y;
        p.vy += p.gravity * dt;
        p.vx -= p.vx * p.drag * dt;
        p.vy -= p.vy * (p.drag * 0.25) * dt;
        // paper stops accelerating and drifts; embers and sparks do not
        if (p.kind === "paper" && p.vy > 235) p.vy = 235;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rot += p.vr * dt;

        if (p.y > H + 40) continue;
        alive++;

        if (p.kind === "paper") {
          p.x += Math.sin(elapsed * p.swayFreq + p.phase) * p.sway * dt;
        }

        const fade =
          p.kind === "paper"
            ? Math.min(1, Math.max(0, (H + 40 - p.y) / 150))
            : Math.max(0, 1 - p.age / p.life);
        const twinkle =
          p.kind === "glitter"
            ? 0.4 + 0.6 * Math.abs(Math.sin(elapsed * 9 + p.phase))
            : 1;

        ctx.save();
        ctx.globalAlpha = fade * twinkle;
        ctx.fillStyle = p.color;

        if (p.kind === "spark") {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.w;
          ctx.lineCap = "round";
          if (glow) { ctx.shadowBlur = 8; ctx.shadowColor = p.color; }
          ctx.beginPath();
          ctx.moveTo(p.px, p.py);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        } else if (p.round) {
          if (glow && p.kind === "glitter") { ctx.shadowBlur = 6; ctx.shadowColor = p.color; }
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.w / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          // squash through the spin so flat paper reads three dimensional
          ctx.scale(1, Math.abs(Math.cos(p.rot)) * 0.75 + 0.25);
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }
        ctx.restore();
      }

      if (alive === 0) {
        ctx.clearRect(0, 0, W, H);
        return;
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
    };
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="launch-flash pointer-events-none fixed inset-0 z-[4]"
        style={{
          background:
            "radial-gradient(46% 40% at 50% 42%, rgba(111,180,153,0.32) 0%, rgba(249,115,22,0.14) 45%, rgba(16,25,24,0) 72%)",
        }}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[5]"
      />
      {/* the car from the journey, taking a lap */}
      <div
        aria-hidden="true"
        className="launch-drive pointer-events-none fixed bottom-[12vh] left-0 z-[6]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/car-marker.png" alt="" width={54} height={54} />
      </div>
    </>
  );
}
