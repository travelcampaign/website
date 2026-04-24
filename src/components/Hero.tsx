"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const SURVEY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeIWEF6riJ2RKzNJh97PS_8yAYgfS0nkLyI7UBq6WfV2bqm6g/viewform?usp=sharing";

function CityBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="city-grid absolute inset-0 opacity-35" style={{ height: "200%" }} />

      {/* Radial glows */}
      <div className="absolute -top-1/4 -left-1/4 w-[75vw] h-[75vw] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(86,143,122,0.16) 0%, transparent 65%)" }} />
      <div className="absolute -top-1/4 right-0 w-[55vw] h-[55vw] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(249,115,22,0.09) 0%, transparent 65%)" }} />
      <div className="absolute bottom-0 left-1/3 w-[50vw] h-[40vw] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(86,143,122,0.07) 0%, transparent 65%)" }} />

      {/* Floating route nodes */}
      {[
        { x: "12%",  y: "28%", color: "#568F7A", size: 8,  delay: "0s"   },
        { x: "42%",  y: "58%", color: "#568F7A", size: 5,  delay: "0.8s" },
        { x: "70%",  y: "22%", color: "#F97316", size: 7,  delay: "1.4s" },
        { x: "83%",  y: "52%", color: "#568F7A", size: 4,  delay: "0.4s" },
        { x: "28%",  y: "72%", color: "#F97316", size: 6,  delay: "1.2s" },
        { x: "58%",  y: "38%", color: "#568F7A", size: 3,  delay: "2.0s" },
      ].map((dot, i) => (
        <div key={i} className="absolute rounded-full" style={{
          left: dot.x, top: dot.y,
          width: dot.size, height: dot.size,
          backgroundColor: dot.color,
          opacity: 0.5,
          animation: `float-dot ${3 + i * 0.5}s ease-in-out ${dot.delay} infinite`,
          boxShadow: `0 0 ${dot.size * 3}px ${dot.color}`,
        }} />
      ))}

      {/* Connecting SVG lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.06 }}>
        <line x1="12%" y1="28%" x2="42%" y2="58%" stroke="#568F7A" strokeWidth="1" strokeDasharray="4 6" />
        <line x1="42%" y1="58%" x2="70%" y2="22%" stroke="#568F7A" strokeWidth="1" strokeDasharray="4 6" />
        <line x1="70%" y1="22%" x2="83%" y2="52%" stroke="#F97316" strokeWidth="1" strokeDasharray="4 6" />
        <line x1="28%" y1="72%" x2="42%" y2="58%" stroke="#568F7A" strokeWidth="1" strokeDasharray="4 6" />
      </svg>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-56"
        style={{ background: "linear-gradient(to bottom, transparent, #0A1515)" }} />
    </div>
  );
}

const stats = [
  { value: "95+",   label: "Survey responses",   accent: "#568F7A" },
  { value: "₹0",    label: "Commission ever",     accent: "#568F7A" },
  { value: "60s",   label: "SOS escalation",      accent: "#F97316" },
  { value: "5",     label: "Membership tiers",    accent: "#568F7A" },
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

      {/* ── Main content ───────────────────────────────────── */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8 pt-32 pb-24"
      >
        {/* Eyebrow pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#568F7A] opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#568F7A]" />
          </span>
          <span className="text-[11px] font-bold text-[#568F7A] uppercase tracking-[0.28em]">
            Launching in Hyderabad — 2026
          </span>
        </motion.div>

        {/* ── Headline ─────────────────────────────────────── */}
        <div className="max-w-5xl mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-bricolage)] font-extrabold text-[#F7F6F4] leading-[1.0] tracking-[-0.04em]"
            style={{ fontSize: "clamp(52px, 7.5vw, 110px)" }}
          >
            Share the{" "}
            <em
              className="not-italic"
              style={{ color: "#568F7A" }}
            >
              journey.
            </em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-bricolage)] font-semibold mt-4"
            style={{ fontSize: "clamp(18px, 2vw, 26px)", color: "rgba(247,246,244,0.32)", letterSpacing: "-0.01em" }}
          >
            India&apos;s first safety-first ride-sharing community.
          </motion.p>
        </div>

        {/* ── Two-column lower band ─────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-10 lg:items-end lg:justify-between">

          {/* Sub copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="max-w-lg text-[15px] leading-relaxed"
            style={{ color: "rgba(247,246,244,0.52)" }}
          >
            Verified riders, real-time tracking, zero commission — built for
            the way Indians actually commute.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.56 }}
            className="flex flex-col sm:flex-row gap-3 shrink-0"
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

        {/* ── Stats strip ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.72 }}
          className="mt-16 pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-0"
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

      {/* ── Scroll cue — fixed to bottom, never overlaps content ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
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
