"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const SURVEY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeIWEF6riJ2RKzNJh97PS_8yAYgfS0nkLyI7UBq6WfV2bqm6g/viewform?usp=sharing";

function CityBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: [
          "radial-gradient(ellipse 80% 70% at 5% 55%, rgba(86,143,122,0.20) 0%, transparent 60%)",
          "radial-gradient(ellipse 55% 45% at 95% 15%, rgba(86,143,122,0.09) 0%, transparent 55%)",
          "radial-gradient(ellipse 45% 40% at 75% 95%, rgba(249,115,22,0.06) 0%, transparent 50%)",
        ].join(", ")
      }} />
      <div className="city-grid absolute inset-0" style={{ height: "200%", opacity: 0.18 }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(135deg, rgba(86,143,122,0.04) 0%, transparent 50%)"
      }} />
      <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #0A1515)" }} />
    </div>
  );
}

function MatchVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(86,143,122,0.12) 0%, transparent 70%)"
      }} />

      {/* Main ride card */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.85, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-[300px] rounded-2xl p-5"
        style={{
          background: "rgba(22,38,38,0.85)",
          border: "1px solid rgba(86,143,122,0.22)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(86,143,122,0.08)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#568F7A" }} />
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#568F7A" }}>Match Found</span>
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{ background: "rgba(86,143,122,0.14)", color: "#568F7A", border: "1px solid rgba(86,143,122,0.2)" }}>
            ✓ Verified
          </span>
        </div>

        <div className="flex items-start gap-3 mb-4">
          <div className="flex flex-col items-center pt-1.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#568F7A", boxShadow: "0 0 8px rgba(86,143,122,0.6)" }} />
            <div className="w-px my-1.5" style={{ height: 28, borderLeft: "1.5px dashed rgba(86,143,122,0.35)" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#F97316", boxShadow: "0 0 8px rgba(249,115,22,0.5)" }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-white leading-tight mb-0.5">Kondapur</p>
            <p className="text-[10px] mb-3" style={{ color: "rgba(247,246,244,0.35)" }}>7:30 AM · Mon–Fri</p>
            <p className="text-[13px] font-semibold text-white leading-tight">HiTec City</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[10px] mb-1" style={{ color: "rgba(247,246,244,0.35)" }}>~18 min</p>
            <p className="text-xl font-extrabold font-[family-name:var(--font-bricolage)]" style={{ color: "#568F7A" }}>₹0</p>
            <p className="text-[9px] uppercase tracking-wide" style={{ color: "rgba(247,246,244,0.25)" }}>commission</p>
          </div>
        </div>

        <div className="h-px mb-4" style={{ background: "rgba(247,246,244,0.06)" }} />

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
            style={{ background: "rgba(86,143,122,0.18)", color: "#568F7A", border: "1px solid rgba(86,143,122,0.25)" }}>
            R
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-white leading-tight">Rahul S.</p>
            <p className="text-[10px]" style={{ color: "rgba(247,246,244,0.38)" }}>4.9 trust · 120 rides</p>
          </div>
          <div className="text-[10px] font-semibold px-2 py-1 rounded-full"
            style={{ background: "rgba(86,143,122,0.12)", color: "#568F7A" }}>
            3 seats
          </div>
        </div>
      </motion.div>

      {/* Safety badge */}
      <motion.div
        initial={{ opacity: 0, x: -16, y: 8 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-12 -left-2 rounded-xl px-3 py-2.5 flex items-center gap-2"
        style={{
          background: "rgba(12,22,22,0.9)",
          border: "1px solid rgba(249,115,22,0.25)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
        }}
      >
        <span style={{ fontSize: 15 }}>🛡️</span>
        <div>
          <p className="text-[11px] font-semibold leading-tight" style={{ color: "#F97316" }}>Safety Active</p>
          <p className="text-[10px]" style={{ color: "rgba(247,246,244,0.38)" }}>60s SOS · Live GPS</p>
        </div>
      </motion.div>

      {/* Matches badge */}
      <motion.div
        initial={{ opacity: 0, x: 16, y: -8 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-10 -right-2 rounded-xl px-3 py-2"
        style={{
          background: "rgba(12,22,22,0.9)",
          border: "1px solid rgba(86,143,122,0.25)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
        }}
      >
        <p className="text-[13px] font-bold leading-tight" style={{ color: "#568F7A" }}>3 nearby</p>
        <p className="text-[10px]" style={{ color: "rgba(247,246,244,0.38)" }}>matches found</p>
      </motion.div>
    </div>
  );
}

const stats = [
  { value: "95+",  label: "Survey responses", accent: "#568F7A" },
  { value: "₹0",   label: "Commission ever",  accent: "#568F7A" },
  { value: "60s",  label: "SOS escalation",   accent: "#F97316" },
  { value: "5",    label: "Membership tiers", accent: "#568F7A" },
];

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
      className="grain relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "#0A1515" }}
    >
      <CityBackground />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8 pt-28 pb-16"
      >
        {/* Two-column */}
        <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-center mb-16">

          {/* Left — text */}
          <div>
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
              <span className="text-[11px] font-bold text-[#568F7A] uppercase tracking-[0.28em]">
                Launching in Hyderabad — 2026
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 44 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-bricolage)] font-extrabold text-[#F7F6F4] leading-[1.0] tracking-[-0.04em] mb-5"
              style={{ fontSize: "clamp(46px, 6vw, 92px)" }}
            >
              Share the{" "}
              <em className="not-italic" style={{ color: "#568F7A" }}>journey.</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-bricolage)] font-semibold mb-6"
              style={{ fontSize: "clamp(17px, 1.8vw, 22px)", color: "rgba(247,246,244,0.32)", letterSpacing: "-0.01em" }}
            >
              India&apos;s first safety-first ride-sharing community.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.36 }}
              className="text-[15px] leading-relaxed mb-10 max-w-md"
              style={{ color: "rgba(247,246,244,0.5)" }}
            >
              Verified riders, real-time tracking, zero commission — built for
              the way Indians actually commute.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.46 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href={SURVEY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 rounded-[14px] px-7 py-4 text-[15px] font-semibold text-white transition-all duration-300"
                style={{ background: "#568F7A" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 44px rgba(86,143,122,0.42)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "#4a7d6a";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLAnchorElement).style.background = "#568F7A";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "none";
                }}
              >
                Join the Waitlist
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
              <button
                onClick={() => scrollTo("#how-it-works")}
                className="inline-flex items-center justify-center gap-2 rounded-[14px] px-7 py-4 text-[15px] font-medium transition-all duration-200"
                style={{ border: "1px solid rgba(247,246,244,0.14)", color: "rgba(247,246,244,0.72)" }}
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
          </div>

          {/* Right — match card visual (desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[400px] hidden lg:block"
          >
            <MatchVisual />
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.62 }}
          className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-0"
          style={{ borderTop: "1px solid rgba(247,246,244,0.07)" }}
        >
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col gap-1 sm:border-r sm:border-[#F7F6F4]/7 sm:pr-8 sm:last:border-0">
              <span
                className="font-[family-name:var(--font-syne)] font-extrabold leading-none"
                style={{ fontSize: "clamp(26px, 3vw, 36px)", color: s.accent }}
              >
                {s.value}
              </span>
              <span className="text-[11px] font-medium tracking-wide" style={{ color: "rgba(247,246,244,0.45)" }}>
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ opacity }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none"
      >
        <span className="text-[9px] font-bold tracking-[0.22em] uppercase" style={{ color: "rgba(247,246,244,0.2)" }}>Scroll</span>
        <motion.svg
          width="14" height="14" viewBox="0 0 16 16" fill="none"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <path d="M4 6l4 4 4-4" stroke="rgba(247,246,244,0.22)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
