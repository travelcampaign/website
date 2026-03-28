"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Create Your Campaign",
    description:
      "Set your daily route, schedule, and preferences. Whether it's your office commute or a weekend trip — your campaign, your rules.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    color: "bg-trust-green",
  },
  {
    number: "02",
    title: "Find Same-Direction Travelers",
    description:
      "Our smart matching algorithm connects you with verified people heading the same way, at the same time. No awkward detours.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    color: "bg-primary",
  },
  {
    number: "03",
    title: "Travel Together Safely",
    description:
      "Real-time GPS tracking, guardian system, verified profiles, and emergency SOS — safety isn't optional, it's built in.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    color: "bg-emergency",
  },
  {
    number: "04",
    title: "Share the Cost",
    description:
      "Fair fuel-split calculator does the math. Pay your co-travelers directly — zero commission, zero platform fees. Ever.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M12 8v8" />
        <path d="M9 11h6" />
        <path d="M6 16h.01" />
        <path d="M18 16h.01" />
      </svg>
    ),
    color: "bg-trust-green",
  },
];

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex gap-6 lg:gap-8"
    >
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${step.color} text-white shadow-lg`}
        >
          {step.icon}
        </div>
        {index < steps.length - 1 && (
          <div className="mt-4 w-px flex-1 bg-gradient-to-b from-primary/25 to-transparent" />
        )}
      </div>

      {/* Content */}
      <div className="pb-14">
        <div className="rounded-[18px] bg-white/60 p-6 border border-primary/5">
          <span className="font-[family-name:var(--font-bricolage)] text-sm font-bold text-trust-green">
            STEP {step.number}
          </span>
          <h3 className="mt-2 font-[family-name:var(--font-bricolage)] text-2xl font-bold text-primary">
            {step.title}
          </h3>
          <p className="mt-3 max-w-md text-base text-muted leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-semibold text-trust-green uppercase tracking-wider"
          >
            Simple & Powerful
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 font-[family-name:var(--font-bricolage)] text-4xl md:text-5xl font-extrabold text-primary"
          >
            How Travel Campaign Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg text-muted"
          >
            Four simple steps to a safer, cheaper, and more meaningful commute.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="mt-16 lg:mt-20 max-w-3xl mx-auto">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
