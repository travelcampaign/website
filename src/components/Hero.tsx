"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const SURVEY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeIWEF6riJ2RKzNJh97PS_8yAYgfS0nkLyI7UBq6WfV2bqm6g/viewform?usp=sharing";

function CityBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* ── Layered atmospheric depth ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: [
          "radial-gradient(ellipse 95% 80% at 5% 60%, rgba(86,143,122,0.24) 0%, transparent 58%)",
          "radial-gradient(ellipse 70% 55% at 58% -10%, rgba(86,143,122,0.13) 0%, transparent 55%)",
          "radial-gradient(ellipse 52% 45% at 98% 24%, rgba(249,115,22,0.13) 0%, transparent 52%)",
          "radial-gradient(ellipse 60% 35% at 50% 110%, rgba(86,143,122,0.08) 0%, transparent 58%)",
        ].join(", ")
      }} />

      {/* ── Scrolling city grid ── */}
      <div className="city-grid absolute inset-0" style={{ height: "200%", opacity: 0.2 }} />

      {/* ── Subtle diagonal light beam ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(135deg, rgba(86,143,122,0.04) 0%, transparent 45%, rgba(249,115,22,0.03) 100%)"
      }} />

      {/* ── Bottom fade into next section ── */}
      <div className="absolute bottom-0 left-0 right-0 h-80 pointer-events-none"
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
          <span className="font-[family-name:var(--font-dm-sans)] text-[11px] font-bold text-[#568F7A] uppercase tracking-[0.28em]">
            Launching in Hyderabad — 2026
          </span>
        </motion.div>

        {/* ── Headline ─────────────────────────────────────── */}
        <div className="max-w-3xl mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-bricolage)] font-extrabold text-[#F7F6F4] leading-[1.0] tracking-[-0.03em]"
            style={{ fontSize: "clamp(48px, 6vw, 86px)" }}
          >
            Share the{" "}
            <em className="not-italic" style={{ color: "#568F7A" }}>
              journey.
            </em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-dm-sans)] font-medium mt-5"
            style={{ fontSize: "clamp(16px, 1.5vw, 20px)", color: "rgba(247,246,244,0.40)" }}
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
            className="font-[family-name:var(--font-dm-sans)] max-w-md text-[15px] leading-relaxed"
            style={{ color: "rgba(247,246,244,0.50)" }}
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
              className="font-[family-name:var(--font-dm-sans)] group inline-flex items-center justify-center gap-2.5 rounded-[14px] px-7 py-4 text-[15px] font-semibold text-white transition-all duration-300"
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
              className="font-[family-name:var(--font-dm-sans)] inline-flex items-center justify-center gap-2 rounded-[14px] px-7 py-4 text-[15px] font-medium transition-all duration-200"
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
          className="mt-10 pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-0"
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
              <span className="font-[family-name:var(--font-dm-sans)] text-[11px] font-medium tracking-wide" style={{ color: "rgba(247,246,244,0.45)" }}>
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll cue — fades with hero on scroll ── */}
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
