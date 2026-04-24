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
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

function Step({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col"
    >
      {/* Card */}
      <div
        className="relative flex flex-col h-full rounded-2xl p-7 overflow-hidden transition-all duration-300"
        style={{
          background: "rgba(247,246,244,0.035)",
          border: "1px solid rgba(247,246,244,0.07)",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.background = `rgba(${step.accent === "#F97316" ? "249,115,22" : "86,143,122"},0.05)`;
          (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(${step.accent === "#F97316" ? "249,115,22" : "86,143,122"},0.2)`;
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.background = "rgba(247,246,244,0.035)";
          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(247,246,244,0.07)";
        }}
      >
        {/* Step number — top right, big but clearly decorative */}
        <span
          className="absolute top-5 right-6 font-[family-name:var(--font-syne)] font-extrabold leading-none select-none pointer-events-none"
          style={{
            fontSize: "clamp(52px, 6vw, 80px)",
            color: step.accent,
            opacity: 0.12,
            letterSpacing: "-0.05em",
          }}
          aria-hidden
        >
          {step.num}
        </span>

        {/* Icon box */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 shrink-0"
          style={{
            background: `${step.accent}18`,
            color: step.accent,
            border: `1px solid ${step.accent}28`,
          }}
        >
          {step.icon}
        </div>

        {/* Small step badge */}
        <span
          className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] mb-3"
          style={{ color: step.accent, opacity: 0.7 }}
        >
          Step {step.num}
        </span>

        {/* Title */}
        <h3
          className="font-[family-name:var(--font-bricolage)] font-extrabold leading-[1.12] mb-3"
          style={{ fontSize: "clamp(22px, 2.2vw, 30px)", color: "#F7F6F4" }}
        >
          {step.title}
        </h3>

        {/* Body */}
        <p
          className="text-[14px] leading-relaxed"
          style={{ color: "rgba(247,246,244,0.58)" }}
        >
          {step.body}
        </p>
      </div>
    </motion.div>
  );
}

/* Arrow connector between steps */
function StepConnector({ accent }: { accent: string }) {
  return (
    <div className="hidden lg:flex items-center justify-center shrink-0 w-12">
      <svg width="36" height="16" viewBox="0 0 36 16" fill="none">
        <path
          d="M0 8 Q12 8 24 8"
          stroke={accent}
          strokeWidth="1.5"
          strokeDasharray="3 4"
          opacity="0.35"
        />
        <path
          d="M26 4 L34 8 L26 12"
          stroke={accent}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.35"
          fill="none"
        />
      </svg>
    </div>
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
      className="grain relative clip-top-diagonal-dark"
      style={{ background: "#0A1515" }}
    >
      <div className="relative z-10 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* Header */}
          <div ref={headRef} className="mb-16 max-w-2xl">
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
              initial={{ opacity: 0, y: 28 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-bricolage)] font-extrabold leading-[1.05] tracking-[-0.03em]"
              style={{ fontSize: "clamp(32px, 4.5vw, 60px)", color: "#F7F6F4" }}
            >
              Three steps to a{" "}
              <span style={{ color: "#568F7A" }}>smarter commute.</span>
            </motion.h2>
          </div>

          {/* Animated connector line */}
          <div className="hidden lg:block relative mb-12" style={{ height: 1 }}>
            <div className="absolute inset-0" style={{ background: "rgba(247,246,244,0.05)" }} />
            <motion.div
              className="absolute left-0 top-0 h-full"
              style={{
                width: lineWidth,
                background: "linear-gradient(to right, #568F7A, #F97316)",
                boxShadow: "0 0 10px rgba(86,143,122,0.5)",
              }}
            />
          </div>

          {/* Steps — cards with arrow connectors on desktop */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-stretch">
            {steps.map((s, i) => (
              <div key={s.num} className="contents">
                <div className="flex-1 min-w-0">
                  <Step step={s} index={i} />
                </div>
                {i < steps.length - 1 && (
                  <StepConnector accent={steps[i + 1].accent} />
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
