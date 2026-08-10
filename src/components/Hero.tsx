"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const SURVEY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeIWEF6riJ2RKzNJh97PS_8yAYgfS0nkLyI7UBq6WfV2bqm6g/viewform?usp=sharing";

// ── Atmospheric background ────────────────────────────────────
function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute"
        style={{
          top: "-30%", left: "-10%",
          width: "70%", height: "90%",
          background: "radial-gradient(ellipse, rgba(86,143,122,0.18) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute"
        style={{
          top: "20%", right: "-20%",
          width: "65%", height: "80%",
          background: "radial-gradient(ellipse, rgba(44,58,58,0.35) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: "-10%", left: "30%",
          width: "50%", height: "50%",
          background: "radial-gradient(ellipse, rgba(249,115,22,0.06) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />
      {/* Subtle diagonal beam */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(125deg, rgba(86,143,122,0.03) 0%, transparent 40%, rgba(44,58,58,0.04) 100%)",
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64"
        style={{ background: "linear-gradient(to bottom, transparent, #0A1515)" }}
      />
    </div>
  );
}

// ── Phone map: city block data ────────────────────────────────
const BLOCKS = [
  { x: 8,  y: 20,  w: 52, h: 30, o: 0.06 },
  { x: 70, y: 8,   w: 44, h: 48, o: 0.05 },
  { x: 126,y: 18,  w: 58, h: 38, o: 0.07 },
  { x: 196,y: 28,  w: 38, h: 28, o: 0.05 },
  { x: 18, y: 66,  w: 38, h: 58, o: 0.06 },
  { x: 70, y: 70,  w: 68, h: 44, o: 0.05 },
  { x: 156,y: 72,  w: 48, h: 52, o: 0.06 },
  { x: 14, y: 145, w: 58, h: 38, o: 0.05 },
  { x: 86, y: 128, w: 54, h: 58, o: 0.07 },
  { x: 154,y: 132, w: 64, h: 44, o: 0.06 },
  { x: 8,  y: 205, w: 48, h: 32, o: 0.05 },
  { x: 70, y: 200, w: 38, h: 44, o: 0.06 },
  { x: 126,y: 195, w: 58, h: 48, o: 0.05 },
  { x: 200,y: 185, w: 34, h: 52, o: 0.06 },
];

// ── Phone mockup ──────────────────────────────────────────────
function PhoneMockup() {
  return (
    <div className="relative" style={{ width: "380px", height: "580px" }}>

      {/* Badge: ₹0 Commission — right */}
      <motion.div
        initial={{ opacity: 0, x: 24, scale: 0.85 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="absolute z-20"
        style={{ right: "0px", top: "80px" }}
      >
        <div
          className="rounded-xl px-3.5 py-2.5"
          style={{
            background: "rgba(8,18,18,0.95)",
            border: "1px solid rgba(86,143,122,0.28)",
            boxShadow: "0 8px 28px rgba(0,0,0,0.5)",
            backdropFilter: "blur(12px)",
          }}
        >
          <p
            className="font-[family-name:var(--font-bricolage)] font-extrabold leading-none"
            style={{ fontSize: "20px", color: "#568F7A" }}
          >
            ₹0
          </p>
          <p
            className="font-[family-name:var(--font-dm-sans)] text-[9px] mt-1 uppercase tracking-widest"
            style={{ color: "rgba(247,246,244,0.38)" }}
          >
            Commission
          </p>
        </div>
      </motion.div>

      {/* Badge: Safety Active — bottom-left */}
      <motion.div
        initial={{ opacity: 0, x: -24, scale: 0.85 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 1.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="absolute z-20"
        style={{ left: "0px", bottom: "90px" }}
      >
        <div
          className="rounded-xl px-3.5 py-2.5"
          style={{
            background: "rgba(8,18,18,0.95)",
            border: "1px solid rgba(249,115,22,0.25)",
            boxShadow: "0 8px 28px rgba(0,0,0,0.5)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <p
              className="font-[family-name:var(--font-dm-sans)] text-[10px] font-bold"
              style={{ color: "#F97316" }}
            >
              Safety Active
            </p>
          </div>
          <p
            className="font-[family-name:var(--font-dm-sans)] text-[9px]"
            style={{ color: "rgba(247,246,244,0.35)" }}
          >
            60s SOS · Live GPS
          </p>
        </div>
      </motion.div>

      {/* ── Phone frame ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 -translate-x-1/2 top-0"
        style={{ width: "240px" }}
      >
        <div
          className="relative rounded-[44px] overflow-hidden"
          style={{
            height: "520px",
            background: "#0A1515",
            border: "7px solid #1C2E2E",
            boxShadow:
              "0 0 0 1px rgba(86,143,122,0.10), 0 48px 80px rgba(0,0,0,0.75), inset 0 0 0 1px rgba(86,143,122,0.06)",
          }}
        >
          {/* Dynamic island / notch */}
          <div
            className="absolute top-3 left-1/2 -translate-x-1/2 z-30 rounded-full"
            style={{ width: "72px", height: "18px", background: "#1C2E2E" }}
          />

          {/* Status bar */}
          <div
            className="flex justify-between items-center px-5 pt-7 pb-2"
            style={{ position: "relative", zIndex: 5 }}
          >
            <span
              className="font-[family-name:var(--font-dm-sans)] text-[10px]"
              style={{ color: "rgba(247,246,244,0.38)" }}
            >
              9:41
            </span>
            <span style={{ color: "rgba(247,246,244,0.25)", fontSize: "8px" }}>
              ▲▲▲
            </span>
          </div>

          {/* Map area */}
          <div
            className="relative"
            style={{ height: "282px", background: "#0D1C1C", overflow: "hidden" }}
          >
            {/* Grid */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(86,143,122,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(86,143,122,0.035) 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            />
            {/* City blocks */}
            {BLOCKS.map((b, i) => (
              <div
                key={i}
                className="absolute rounded-sm"
                style={{
                  left: b.x, top: b.y,
                  width: b.w, height: b.h,
                  background: `rgba(86,143,122,${b.o})`,
                }}
              />
            ))}
            {/* Road highlights */}
            <div
              className="absolute"
              style={{
                left: 0, right: 0, top: "62px", height: "8px",
                background: "rgba(44,58,58,0.5)",
              }}
            />
            <div
              className="absolute"
              style={{
                left: 0, right: 0, top: "130px", height: "6px",
                background: "rgba(44,58,58,0.4)",
              }}
            />
            <div
              className="absolute"
              style={{
                left: "96px", top: 0, bottom: 0, width: "7px",
                background: "rgba(44,58,58,0.4)",
              }}
            />
            <div
              className="absolute"
              style={{
                left: "162px", top: 0, bottom: 0, width: "5px",
                background: "rgba(44,58,58,0.35)",
              }}
            />

            {/* Route + markers SVG */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 226 282"
              preserveAspectRatio="none"
            >
              {/* Marching-ant route */}
              <motion.path
                d="M 46 248 C 72 195, 136 172, 172 78"
                stroke="#568F7A"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray="7 5"
                animate={{ strokeDashoffset: [0, -24] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                opacity="0.85"
              />
              {/* Pickup glow ring */}
              <motion.circle
                cx="46" cy="248" r="13"
                fill="rgba(86,143,122,0)"
                stroke="#568F7A"
                strokeWidth="1"
                animate={{ r: [13, 18, 13], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2.2, repeat: Infinity }}
              />
              {/* Pickup dot */}
              <circle cx="46" cy="248" r="6" fill="#568F7A" />
              <circle cx="46" cy="248" r="3" fill="#F7F6F4" />
              {/* Destination glow ring */}
              <motion.circle
                cx="172" cy="78" r="13"
                fill="rgba(249,115,22,0)"
                stroke="#F97316"
                strokeWidth="1"
                animate={{ r: [13, 18, 13], opacity: [0.35, 0, 0.35] }}
                transition={{ duration: 2.6, repeat: Infinity, delay: 0.8 }}
              />
              {/* Destination dot */}
              <circle cx="172" cy="78" r="6" fill="#F97316" />
              <circle cx="172" cy="78" r="3" fill="#F7F6F4" />
              {/* Car pulsing ring */}
              <motion.circle
                cx="116" cy="165" r="16"
                fill="rgba(86,143,122,0.12)"
                animate={{ r: [16, 22, 16] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              {/* Car dot */}
              <circle cx="116" cy="165" r="8" fill="#568F7A" />
              <circle cx="116" cy="165" r="4" fill="#F7F6F4" />
            </svg>

            {/* Place labels */}
            <div
              className="absolute"
              style={{ left: "6px", bottom: "18px" }}
            >
              <div
                className="rounded-lg px-2 py-1"
                style={{
                  background: "rgba(8,16,16,0.88)",
                  border: "1px solid rgba(86,143,122,0.22)",
                }}
              >
                <p
                  className="font-[family-name:var(--font-dm-sans)] text-[8px] font-bold"
                  style={{ color: "#568F7A" }}
                >
                  Kondapur
                </p>
              </div>
            </div>
            <div
              className="absolute"
              style={{ left: "50%", top: "50px" }}
            >
              <div
                className="rounded-lg px-2 py-1"
                style={{
                  background: "rgba(8,16,16,0.88)",
                  border: "1px solid rgba(249,115,22,0.22)",
                  whiteSpace: "nowrap",
                }}
              >
                <p
                  className="font-[family-name:var(--font-dm-sans)] text-[8px] font-bold"
                  style={{ color: "#F97316" }}
                >
                  HiTec City
                </p>
              </div>
            </div>
          </div>

          {/* ── Match card (bottom sheet) ── */}
          <div
            className="absolute bottom-0 left-0 right-0 px-4 pt-4 pb-4"
            style={{
              background:
                "linear-gradient(to bottom, rgba(9,19,19,0.96), rgba(9,19,19,1))",
              borderTop: "1px solid rgba(86,143,122,0.12)",
            }}
          >
            {/* Handle bar */}
            <div
              className="mx-auto mb-3 rounded-full"
              style={{ width: "32px", height: "3px", background: "rgba(247,246,244,0.12)" }}
            />

            {/* Match label */}
            <div className="flex items-center gap-1.5 mb-3">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#568F7A] opacity-70 animate-ping" />
                <span className="relative inline-flex rounded-full bg-[#568F7A] w-1.5 h-1.5" />
              </span>
              <span
                className="font-[family-name:var(--font-dm-sans)] text-[9px] font-bold uppercase tracking-[1.5px]"
                style={{ color: "#568F7A" }}
              >
                Match Found
              </span>
            </div>

            {/* Route row */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex flex-col items-center gap-0.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#568F7A" }}
                />
                <div
                  className="w-px h-5"
                  style={{ background: "linear-gradient(to bottom, #568F7A80, #F9731660)" }}
                />
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#F97316" }}
                />
              </div>
              <div className="flex-1">
                <p
                  className="font-[family-name:var(--font-dm-sans)] text-[11px] font-semibold"
                  style={{ color: "#F7F6F4" }}
                >
                  Kondapur
                </p>
                <p
                  className="font-[family-name:var(--font-dm-sans)] text-[11px] font-semibold mt-2"
                  style={{ color: "#F7F6F4" }}
                >
                  HiTec City
                </p>
              </div>
              <p
                className="font-[family-name:var(--font-dm-sans)] text-[10px] shrink-0"
                style={{ color: "rgba(247,246,244,0.4)" }}
              >
                22 min
              </p>
            </div>

            {/* Rider row */}
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className="rounded-full flex items-center justify-center shrink-0"
                style={{
                  width: "30px", height: "30px",
                  background: "rgba(86,143,122,0.18)",
                  color: "#568F7A",
                  border: "1px solid rgba(86,143,122,0.22)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="flex-1">
                <p
                  className="font-[family-name:var(--font-dm-sans)] text-[11px] font-semibold"
                  style={{ color: "#F7F6F4" }}
                >
                  Your co-rider
                </p>
                <p
                  className="font-[family-name:var(--font-dm-sans)] text-[9px]"
                  style={{ color: "rgba(247,246,244,0.4)" }}
                >
                  Verified profile
                </p>
              </div>
              <div className="text-right">
                <p
                  className="font-[family-name:var(--font-bricolage)] font-extrabold leading-none"
                  style={{ fontSize: "16px", color: "#568F7A" }}
                >
                  ₹0
                </p>
              </div>
            </div>

            {/* CTA */}
            <div
              className="w-full py-2.5 rounded-xl text-center font-[family-name:var(--font-dm-sans)] text-[11px] font-bold text-white"
              style={{ background: "#568F7A" }}
            >
              Request to Join
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── Stats ─────────────────────────────────────────────────────
const stats = [
  { value: "260+", label: "Survey responses",      accent: "#568F7A" },
  { value: "₹0",   label: "Zero platform fee",     accent: "#568F7A" },
  { value: "60s",  label: "Guardian alert window", accent: "#F97316" },
  { value: "2",    label: "Plans at launch",       accent: "#568F7A" },
];

// ── Hero ──────────────────────────────────────────────────────
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      ref={ref}
      className="grain relative min-h-screen overflow-hidden"
      style={{ background: "#0A1515" }}
    >
      <Background />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8 min-h-screen flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-0 pt-28 pb-20"
      >
        {/* ── Left: text content ── */}
        <div className="flex-1 flex flex-col items-start lg:pr-8">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#568F7A] opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#568F7A]" />
            </span>
            <span className="font-[family-name:var(--font-dm-sans)] text-[11px] font-bold text-[#568F7A] uppercase tracking-[0.28em]">
              Launching in Hyderabad — 2026
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-bricolage)] font-extrabold text-[#F7F6F4] leading-[1.0] tracking-[-0.03em]"
            style={{ fontSize: "clamp(48px, 5.5vw, 88px)" }}
          >
            Share the{" "}
            <em className="not-italic" style={{ color: "#568F7A" }}>
              journey.
            </em>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-dm-sans)] font-medium mt-5 max-w-md"
            style={{
              fontSize: "clamp(15px, 1.3vw, 18px)",
              color: "rgba(247,246,244,0.48)",
              lineHeight: 1.7,
            }}
          >
            Verified riders, zero commission, real-time safety — built for
            the way Indians actually commute.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.46 }}
            className="flex flex-col sm:flex-row gap-3 mt-8"
          >
            <a
              href={SURVEY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-dm-sans)] group inline-flex items-center justify-center gap-2.5 rounded-[14px] px-7 py-4 text-[15px] font-semibold text-white transition-all duration-300"
              style={{ background: "#568F7A" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#4a7d6a";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#568F7A";
              }}
            >
              Join the Waitlist
              <svg
                width="15" height="15" viewBox="0 0 16 16" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
            <button
              onClick={() => scrollTo("#how-it-works")}
              className="font-[family-name:var(--font-dm-sans)] inline-flex items-center justify-center gap-2 rounded-[14px] px-7 py-4 text-[15px] font-medium transition-all duration-200"
              style={{
                border: "1px solid rgba(247,246,244,0.14)",
                color: "rgba(247,246,244,0.72)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(247,246,244,0.32)";
                (e.currentTarget as HTMLButtonElement).style.color = "#F7F6F4";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(247,246,244,0.14)";
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(247,246,244,0.72)";
              }}
            >
              See How It Works
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.62 }}
            className="mt-12 pt-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-6 w-full"
            style={{ borderTop: "1px solid rgba(247,246,244,0.07)" }}
          >
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span
                  className="font-[family-name:var(--font-bricolage)] font-extrabold leading-none"
                  style={{ fontSize: "clamp(24px, 2.5vw, 34px)", color: s.accent }}
                >
                  {s.value}
                </span>
                <span
                  className="font-[family-name:var(--font-dm-sans)] text-[11px] font-medium tracking-wide"
                  style={{ color: "rgba(247,246,244,0.42)" }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: phone mockup ── */}
        <div className="flex-shrink-0 flex justify-center lg:justify-end lg:pl-8">
          <PhoneMockup />
        </div>
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ opacity }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none"
      >
        <span
          className="text-[9px] font-bold tracking-[0.22em] uppercase"
          style={{ color: "rgba(247,246,244,0.18)" }}
        >
          Scroll
        </span>
        <motion.svg
          width="14" height="14" viewBox="0 0 16 16" fill="none"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="rgba(247,246,244,0.20)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
    </section>
  );
}
