"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    title: "Live GPS Tracking",
    description:
      "Every active ride is tracked in real-time. Your guardians see your exact position throughout the journey.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
    accent: "#568F7A",
  },
  {
    title: "60-Second SOS Alert",
    description:
      "No response in 60 seconds? Your full profile and GPS coordinates are automatically sent to nearest contacts.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    accent: "#F97316",
  },
  {
    title: "Route Deviation Alert",
    description:
      "Stray more than 2km off your planned route? Guardians are notified instantly and the app prompts you to confirm safety.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    accent: "#568F7A",
  },
  {
    title: "Post-Ride Check-In",
    description:
      "Safety monitoring continues 30 minutes after drop-off. Guardians know you've arrived safely — not just that you left.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    accent: "#568F7A",
  },
];

export default function Safety() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });

  return (
    <section
      id="safety"
      className="noise-bg relative overflow-hidden bg-[#0D1A1A] clip-top-diagonal-dark"
    >
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] opacity-20"
        style={{ background: "radial-gradient(circle, rgba(249,115,22,0.3) 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] opacity-15"
        style={{ background: "radial-gradient(circle, rgba(86,143,122,0.3) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Asymmetric layout */}
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">

            {/* Left — Heading */}
            <div ref={headRef} className="lg:w-[38%] flex flex-col justify-center">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={headInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="inline-block text-[10px] font-bold text-[#568F7A] uppercase tracking-[0.2em] mb-6"
              >
                Safety System
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 28 }}
                animate={headInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                className="font-[family-name:var(--font-bricolage)] font-extrabold text-[#F0EDE6] leading-[1.08] tracking-[-0.02em]"
                style={{ fontSize: "clamp(36px, 4vw, 56px)" }}
              >
                Safety isn&apos;t a feature.{" "}
                <span className="text-[#568F7A]">It&apos;s the foundation.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={headInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 text-[15px] text-[#F0EDE6]/50 leading-relaxed"
              >
                Every plan includes the full guardian system at no extra cost. No tiered safety — everyone gets full protection.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={headInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.32 }}
                className="mt-8"
              >
                <div className="inline-flex items-center gap-2.5 rounded-full border border-[#568F7A]/30 bg-[#568F7A]/10 px-4 py-2">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#568F7A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                  <span className="text-xs font-semibold text-[#568F7A]">FREE on all plans</span>
                </div>
              </motion.div>
            </div>

            {/* Right — 2×2 cards grid */}
            <div className="lg:w-[62%] grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, i) => {
                const cardRef = useRef<HTMLDivElement>(null);
                const inView = useInView(cardRef, { once: true, margin: "-60px" });

                return (
                  <motion.div
                    key={feature.title}
                    ref={cardRef}
                    initial={{ opacity: 0, y: 32 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.12,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="safety-card rounded-2xl border border-white/8 bg-white/5 p-6"
                  >
                    {/* Icon */}
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl mb-4"
                      style={{
                        backgroundColor: `${feature.accent}18`,
                        color: feature.accent,
                        border: `1px solid ${feature.accent}30`,
                      }}
                    >
                      {feature.icon}
                    </div>

                    <h3 className="font-[family-name:var(--font-bricolage)] text-base font-bold text-[#F0EDE6] mb-2 leading-snug">
                      {feature.title}
                    </h3>
                    <p className="text-[13px] text-[#F0EDE6]/45 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
