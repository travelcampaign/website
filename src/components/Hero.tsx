"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const SURVEY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeIWEF6riJ2RKzNJh97PS_8yAYgfS0nkLyI7UBq6WfV2bqm6g/viewform?usp=sharing";

/** Animated city-grid hero background */
function CityBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Scrolling grid */}
      <div className="city-grid absolute inset-0 opacity-40" style={{ height: "200%" }} />

      {/* Green radial glow — top-left */}
      <div
        className="absolute -top-1/4 -left-1/4 w-[70vw] h-[70vw] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(86,143,122,0.18) 0%, transparent 65%)",
        }}
      />
      {/* Orange radial — top-right */}
      <div
        className="absolute -top-1/4 right-0 w-[50vw] h-[50vw] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(249,115,22,0.10) 0%, transparent 65%)",
        }}
      />

      {/* Floating route nodes */}
      {[
        { x: "15%", y: "30%", color: "#568F7A", size: 10, delay: "0s" },
        { x: "45%", y: "60%", color: "#568F7A", size: 6, delay: "0.8s" },
        { x: "72%", y: "25%", color: "#F97316", size: 8, delay: "1.4s" },
        { x: "85%", y: "55%", color: "#568F7A", size: 5, delay: "0.4s" },
        { x: "30%", y: "75%", color: "#F97316", size: 7, delay: "1.2s" },
      ].map((dot, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: dot.x, top: dot.y,
            width: dot.size, height: dot.size,
            backgroundColor: dot.color,
            opacity: 0.6,
            animation: `float-dot ${3 + i * 0.5}s ease-in-out ${dot.delay} infinite`,
            boxShadow: `0 0 ${dot.size * 3}px ${dot.color}`,
          }}
        />
      ))}

      {/* Faint connecting lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.08 }}>
        <line x1="15%" y1="30%" x2="45%" y2="60%" stroke="#568F7A" strokeWidth="1" strokeDasharray="4 6" />
        <line x1="45%" y1="60%" x2="72%" y2="25%" stroke="#568F7A" strokeWidth="1" strokeDasharray="4 6" />
        <line x1="72%" y1="25%" x2="85%" y2="55%" stroke="#F97316" strokeWidth="1" strokeDasharray="4 6" />
        <line x1="30%" y1="75%" x2="45%" y2="60%" stroke="#568F7A" strokeWidth="1" strokeDasharray="4 6" />
      </svg>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{ background: "linear-gradient(to bottom, transparent, #0A1515)" }}
      />
    </div>
  );
}

const stats = [
  { value: "95+", label: "Survey responses" },
  { value: "₹0", label: "Commission ever" },
  { value: "60s", label: "SOS escalation" },
  { value: "5", label: "Membership tiers" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className="grain relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "#0A1515" }}
    >
      <CityBackground />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-32 pb-28"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#568F7A] opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#568F7A]" />
          </span>
          <span className="text-[11px] font-bold text-[#568F7A] uppercase tracking-[0.25em]">
            Launching in Hyderabad — 2026
          </span>
        </motion.div>

        {/* Headline */}
        <div className="max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-bricolage)] font-extrabold text-[#F7F6F4] leading-[0.98] tracking-[-0.04em]"
            style={{ fontSize: "clamp(60px, 9vw, 130px)" }}
          >
            Share the
            <br />
            <span style={{ color: "#568F7A" }}>journey.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-2xl text-xl leading-relaxed font-[family-name:var(--font-dm-sans)]"
            style={{ color: "rgba(247,246,244,0.55)" }}
          >
            India&apos;s first safety-first ride-sharing community. Verified riders,
            real-time tracking, zero commission — built for the way Indians actually commute.
          </motion.p>
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row gap-4"
        >
          <a
            href={SURVEY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 rounded-[14px] px-8 py-4 text-base font-semibold text-white transition-all duration-300"
            style={{ background: "#568F7A", boxShadow: "0 0 0 0 rgba(86,143,122,0)" }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 40px rgba(86,143,122,0.4)")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 0 0 rgba(86,143,122,0)")}
          >
            Join the Waitlist
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
          <button
            onClick={() => scrollTo("#how-it-works")}
            className="inline-flex items-center justify-center gap-2 rounded-[14px] px-8 py-4 text-base font-medium transition-all duration-200"
            style={{ border: "1px solid rgba(247,246,244,0.12)", color: "rgba(247,246,244,0.7)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(247,246,244,0.3)"; (e.currentTarget as HTMLButtonElement).style.color = "#F7F6F4"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(247,246,244,0.12)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(247,246,244,0.7)"; }}
          >
            See How It Works
          </button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.78 }}
          className="mt-20 pt-10 flex flex-wrap gap-x-12 gap-y-6 items-center"
          style={{ borderTop: "1px solid rgba(247,246,244,0.08)" }}
        >
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col gap-0.5">
              <span
                className="font-[family-name:var(--font-bricolage)] font-extrabold leading-none"
                style={{ fontSize: "clamp(28px, 3.5vw, 40px)", color: "#568F7A" }}
              >
                {s.value}
              </span>
              <span className="text-[12px] font-medium tracking-wide" style={{ color: "rgba(247,246,244,0.35)" }}>
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
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase" style={{ color: "rgba(247,246,244,0.3)" }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="rgba(247,246,244,0.3)" strokeWidth="1.5">
            <path d="M4 6l4 4 4-4" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
