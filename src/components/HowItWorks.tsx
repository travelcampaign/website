"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Post Your Route",
    description:
      "Set your daily commute or trip route. Define your schedule, seat count, and preferences — your campaign, your terms.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Match Instantly",
    description:
      "Our algorithm finds verified commuters heading your way at the same time. Smart proximity scoring, zero awkward detours.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Ride & Stay Safe",
    description:
      "Live GPS tracking, route deviation alerts, SOS with 60-second escalation, and a 30-minute post-ride safety window — all free.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });

  return (
    <section
      id="how-it-works"
      className="relative bg-[#F7F6F4] clip-top-diagonal"
    >
      <div className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div ref={headRef} className="text-center max-w-2xl mx-auto mb-20 lg:mb-24">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block text-xs font-bold text-[#568F7A] uppercase tracking-[0.18em] mb-4"
            >
              Simple & Powerful
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-[family-name:var(--font-bricolage)] font-extrabold text-[#2C3A3A] leading-[1.1] tracking-tight"
              style={{ fontSize: "clamp(36px, 4.5vw, 60px)" }}
            >
              How Travel Campaign Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-5 text-lg text-[#7A8A85] leading-relaxed"
            >
              Three steps to a safer, cheaper, more meaningful commute.
            </motion.p>
          </div>

          {/* Steps grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6">
            {/* Connecting dashed line (desktop) */}
            <div className="hidden md:block absolute top-[52px] left-[calc(16.666%+32px)] right-[calc(16.666%+32px)] h-px border-t-2 border-dashed border-[#2C3A3A]/12 pointer-events-none" />

            {steps.map((step, i) => {
              const ref = useRef<HTMLDivElement>(null);
              const isInView = useInView(ref, { once: true, margin: "-60px" });

              return (
                <motion.div
                  key={step.number}
                  ref={ref}
                  initial={{ opacity: 0, y: 36 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.65,
                    delay: i * 0.14,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Faint giant number background */}
                  <span
                    className="absolute -top-2 left-1/2 -translate-x-1/2 font-[family-name:var(--font-bricolage)] font-extrabold text-[#2C3A3A] select-none pointer-events-none leading-none"
                    style={{ fontSize: "clamp(80px, 10vw, 120px)", opacity: 0.06 }}
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>

                  {/* Icon circle */}
                  <div className="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-white border border-[#2C3A3A]/8 text-[#568F7A] shadow-[0_4px_20px_rgba(44,58,58,0.08)] mb-6">
                    {step.icon}
                  </div>

                  {/* Step label */}
                  <span className="text-[10px] font-bold text-[#568F7A] uppercase tracking-[0.2em] mb-2">
                    Step {step.number}
                  </span>

                  <h3 className="font-[family-name:var(--font-bricolage)] text-xl font-bold text-[#2C3A3A] leading-tight mb-3">
                    {step.title}
                  </h3>

                  <p className="text-[15px] text-[#7A8A85] leading-relaxed max-w-[260px]">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
