"use client";

import { motion } from "framer-motion";

const SURVEY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeIWEF6riJ2RKzNJh97PS_8yAYgfS0nkLyI7UBq6WfV2bqm6g/viewform?usp=sharing";

const ROUTE_PATH = "M 40 130 C 90 130, 100 65, 170 75 S 250 125, 310 95 S 360 45, 400 58";

function RouteCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.9, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative rounded-2xl bg-white border border-[#2C3A3A]/8 p-6 shadow-[0_8px_40px_rgba(44,58,58,0.12)]"
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#568F7A] opacity-75 animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#568F7A]" />
          </span>
          <span className="text-xs font-semibold text-[#568F7A] uppercase tracking-widest">Live Route</span>
        </div>
        <span className="rounded-full bg-[#568F7A]/12 px-2.5 py-1 text-[11px] font-semibold text-[#568F7A]">ACTIVE</span>
      </div>

      {/* Route endpoints */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] font-medium text-[#7A8A85] uppercase tracking-wider">From</span>
          <span className="text-sm font-semibold text-[#2C3A3A]">Kondapur</span>
        </div>
        <div className="flex-1 mx-3 h-px border-t border-dashed border-[#2C3A3A]/12" />
        <div className="flex flex-col gap-0.5 items-end">
          <span className="text-[11px] font-medium text-[#7A8A85] uppercase tracking-wider">To</span>
          <span className="text-sm font-semibold text-[#2C3A3A]">Hitec City</span>
        </div>
      </div>

      {/* Animated SVG route */}
      <div
        className="relative rounded-xl overflow-hidden"
        style={{ height: 160, background: "#F0EDE6", border: "1px solid rgba(44,58,58,0.06)" }}
      >
        <svg
          viewBox="0 0 440 175"
          className="absolute inset-0 w-full h-full"
          fill="none"
        >
          {/* Track (static, faint) */}
          <path
            d={ROUTE_PATH}
            stroke="rgba(86,143,122,0.2)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Marching dashes */}
          <motion.path
            d={ROUTE_PATH}
            stroke="#568F7A"
            strokeWidth="2.5"
            strokeDasharray="8 6"
            strokeLinecap="round"
            initial={{ strokeDashoffset: 200 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2.4, ease: "easeInOut" }}
            style={{ filter: "drop-shadow(0 0 3px rgba(86,143,122,0.4))" }}
          />

          {/* Animated overlay dash (marching) */}
          <path
            d={ROUTE_PATH}
            stroke="#568F7A"
            strokeWidth="2"
            strokeDasharray="5 8"
            strokeLinecap="round"
            opacity={0.45}
            className="animate-dash-march"
          />

          {/* Origin dot */}
          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <circle cx="40" cy="130" r="10" fill="rgba(86,143,122,0.15)" />
            <circle cx="40" cy="130" r="5" fill="#568F7A" />
            <circle cx="40" cy="130" r="5" fill="#568F7A" opacity="0.35" className="pulse-ring" />
          </motion.g>

          {/* Destination dot */}
          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.4, duration: 0.5 }}
          >
            <circle cx="400" cy="58" r="10" fill="rgba(249,115,22,0.15)" />
            <circle cx="400" cy="58" r="5" fill="#F97316" />
          </motion.g>

          {/* Traveling car marker */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            <animateMotion
              dur="5s"
              repeatCount="indefinite"
              begin="2.5s"
              path={ROUTE_PATH}
              rotate="auto"
            >
              <g>
                <circle r="9" fill="white" />
                <circle r="7" fill="#568F7A" />
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="8"
                  fill="white"
                  fontFamily="sans-serif"
                >
                  ▲
                </text>
              </g>
            </animateMotion>
          </motion.g>

          {/* Labels */}
          <text x="40" y="155" textAnchor="middle" fontSize="9" fill="rgba(44,58,58,0.35)" fontFamily="system-ui,sans-serif">Kondapur</text>
          <text x="400" y="78" textAnchor="middle" fontSize="9" fill="rgba(44,58,58,0.35)" fontFamily="system-ui,sans-serif">Hitec City</text>
        </svg>
      </div>

      {/* Bottom chips */}
      <div className="mt-4 flex items-center gap-2 flex-wrap">
        <span className="rounded-full bg-[#2C3A3A]/5 border border-[#2C3A3A]/8 px-3 py-1 text-[11px] font-medium text-[#7A8A85]">
          3 riders matched
        </span>
        <span className="rounded-full bg-[#2C3A3A]/5 border border-[#2C3A3A]/8 px-3 py-1 text-[11px] font-medium text-[#7A8A85]">
          12 min away
        </span>
        <span className="rounded-full bg-[#568F7A]/12 border border-[#568F7A]/20 px-3 py-1 text-[11px] font-medium text-[#568F7A]">
          ₹0 commission
        </span>
      </div>
    </motion.div>
  );
}

const stats = [
  { value: "95+", label: "Survey responses" },
  { value: "60s", label: "SOS alert time" },
  { value: "₹0", label: "Commission" },
];

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#F7F6F4]">
      {/* Subtle tinted glow — top-left */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, rgba(86,143,122,0.12) 0%, transparent 70%)" }}
      />
      {/* Top-right accent */}
      <div
        className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="flex flex-col lg:flex-row lg:items-center gap-16 lg:gap-12">

          {/* ── Left column ─────────────────────────── */}
          <div className="flex-1 lg:max-w-[55%]">
            {/* Eyebrow pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-7"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#568F7A]/25 bg-[#568F7A]/8 px-4 py-1.5 text-xs font-semibold text-[#568F7A] uppercase tracking-widest">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#568F7A] opacity-75 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#568F7A]" />
                </span>
                Now in Hyderabad
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-[family-name:var(--font-bricolage)] font-extrabold text-[#2C3A3A] leading-[1.04] tracking-[-0.03em]"
              style={{ fontSize: "clamp(52px, 7vw, 96px)" }}
            >
              Commute smarter.{" "}
              <span className="text-[#568F7A]">Arrive safer.</span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-[#2C3A3A]/60 font-[family-name:var(--font-dm-sans)]"
            >
              India&apos;s first safety-first ride-sharing community. Real-time tracking,
              verified riders, zero commission.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.52, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <a
                href={SURVEY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-[14px] bg-[#568F7A] px-7 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-[#4a7d6a] hover:shadow-xl hover:shadow-[#568F7A]/25 hover:-translate-y-0.5"
              >
                Join the Community
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
              <button
                onClick={() => scrollTo("#how-it-works")}
                className="inline-flex items-center justify-center gap-2 rounded-[14px] border border-[#2C3A3A]/15 bg-white px-7 py-4 text-base font-semibold text-[#2C3A3A] transition-all duration-200 hover:border-[#2C3A3A]/30 hover:shadow-md"
              >
                See How It Works
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3v10M4 9l4 4 4-4" />
                </svg>
              </button>
            </motion.div>

            {/* Social proof row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.68, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-12 flex flex-wrap gap-x-8 gap-y-3 items-center"
            >
              {stats.map((s, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <span className="font-[family-name:var(--font-bricolage)] text-2xl font-bold text-[#568F7A]">
                    {s.value}
                  </span>
                  <span className="text-sm text-[#2C3A3A]/40 font-medium">{s.label}</span>
                  {i < stats.length - 1 && (
                    <span className="ml-4 h-4 w-px bg-[#2C3A3A]/12" />
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right column — Route card ──────────── */}
          <div className="w-full lg:w-[45%] lg:max-w-[460px]">
            <RouteCard />
          </div>
        </div>
      </div>
    </section>
  );
}
