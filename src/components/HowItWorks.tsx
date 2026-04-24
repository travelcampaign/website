"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Post Your Route",
    body: "Set your daily commute. Define schedule, seats, preferences — your campaign, your terms. Runs once or daily.",
    accent: "#568F7A",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Get Matched",
    body: "AI matches you with verified commuters going your way at the same time. Proximity, trust score, schedule — all weighted.",
    accent: "#568F7A",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Ride Safely",
    body: "Live GPS, route deviation alerts, 60-second SOS escalation, and a 30-min post-ride safety window. All free on every plan.",
    accent: "#F97316",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

function Step({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col"
    >
      {/* Giant background number */}
      <span
        className="absolute -top-4 -left-2 font-[family-name:var(--font-bricolage)] font-extrabold select-none leading-none pointer-events-none"
        style={{ fontSize: "clamp(100px, 14vw, 180px)", color: "rgba(247,246,244,0.04)" }}
        aria-hidden
      >
        {step.num}
      </span>

      {/* Step number pill */}
      <div className="flex items-center gap-3 mb-8 relative z-10">
        <span
          className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-xs font-bold"
          style={{ background: `${step.accent}20`, color: step.accent, border: `1px solid ${step.accent}30` }}
        >
          {step.num}
        </span>
        <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${step.accent}30, transparent)` }} />
      </div>

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative z-10"
        style={{ background: `${step.accent}12`, color: step.accent, border: `1px solid ${step.accent}20` }}
      >
        {step.icon}
      </div>

      {/* Content */}
      <h3
        className="font-[family-name:var(--font-bricolage)] font-extrabold mb-4 leading-[1.1] relative z-10"
        style={{ fontSize: "clamp(24px, 2.5vw, 34px)", color: "#F7F6F4" }}
      >
        {step.title}
      </h3>
      <p className="text-[15px] leading-relaxed relative z-10" style={{ color: "rgba(247,246,244,0.45)" }}>
        {step.body}
      </p>
    </motion.div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="grain relative overflow-hidden clip-top-diagonal-dark"
      style={{ background: "#0A1515" }}
    >
      <div className="relative z-10 py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* Header */}
          <div ref={headRef} className="mb-24 max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] mb-5"
              style={{ color: "#568F7A" }}
            >
              How It Works
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-bricolage)] font-extrabold leading-[1.05] tracking-[-0.03em]"
              style={{ fontSize: "clamp(36px, 5vw, 72px)", color: "#F7F6F4" }}
            >
              Three steps to a{" "}
              <span style={{ color: "#568F7A" }}>smarter commute.</span>
            </motion.h2>
          </div>

          {/* Animated connector line */}
          <div className="hidden lg:block relative mb-16" style={{ height: 1 }}>
            <div className="absolute inset-0" style={{ background: "rgba(247,246,244,0.06)" }} />
            <motion.div
              className="absolute left-0 top-0 h-full"
              style={{ width: lineWidth, background: "#568F7A", boxShadow: "0 0 12px rgba(86,143,122,0.6)" }}
            />
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8">
            {steps.map((s, i) => (
              <Step key={s.num} step={s} index={i} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
