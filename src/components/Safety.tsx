"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    title: "Live GPS Tracking",
    body: "Every active ride is broadcast in real-time. Your emergency contacts see your exact position — not a last-known location.",
    accent: "#568F7A",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
  {
    title: "60-Second SOS",
    body: "No response for 60 seconds? Your full ride details and live location are sent directly to your emergency contacts — no manual action needed.",
    accent: "#F97316",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    title: "Route Deviation Alert",
    body: "If the ride goes more than 2km off your planned route, your emergency contacts are notified immediately — and you get a prompt to confirm you're safe.",
    accent: "#568F7A",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: "30-Min Post-Ride Window",
    body: "Safety doesn't end at drop-off. Monitoring continues for 30 minutes after arrival. Your family knows you made it.",
    accent: "#568F7A",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

function FeatureCard({ f, i }: { f: typeof features[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl p-6 transition-all duration-300 cursor-default"
      style={{
        background: "rgba(247,246,244,0.04)",
        border: "1px solid rgba(247,246,244,0.08)",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.background = `rgba(${f.accent === "#F97316" ? "249,115,22" : "86,143,122"},0.06)`;
        (e.currentTarget as HTMLDivElement).style.borderColor = `${f.accent}30`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.background = "rgba(247,246,244,0.04)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(247,246,244,0.08)";
      }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
        style={{ background: `${f.accent}18`, color: f.accent, border: `1px solid ${f.accent}28` }}
      >
        {f.icon}
      </div>
      <h3 className="font-[family-name:var(--font-bricolage)] text-[17px] font-bold mb-2.5 leading-snug" style={{ color: "#F7F6F4" }}>
        {f.title}
      </h3>
      <p className="text-[13px] leading-relaxed" style={{ color: "rgba(247,246,244,0.62)" }}>
        {f.body}
      </p>
    </motion.div>
  );
}

export default function Safety() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const shield = useTransform(scrollYProgress, [0.2, 0.6], [0.05, 1]);

  return (
    <section
      id="safety"
      ref={sectionRef}
      className="grain relative clip-top-diagonal"
      style={{ background: "#0D1A14" }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-0 right-0 w-[60vw] h-[60vw] rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, rgba(249,115,22,0.3) 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[50vw] h-[50vw] rounded-full opacity-12"
        style={{ background: "radial-gradient(circle, rgba(86,143,122,0.3) 0%, transparent 70%)" }} />

      <div className="relative z-10 py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* Asymmetric layout */}
          <div className="flex flex-col lg:flex-row gap-20 lg:gap-24">

            {/* Left: manifesto */}
            <div ref={headRef} className="lg:w-[40%] flex flex-col justify-center lg:sticky lg:top-28 lg:self-start">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={headInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] mb-6"
                style={{ color: "#568F7A" }}
              >
                Safety System
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={headInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="font-[family-name:var(--font-bricolage)] font-extrabold leading-[1.05] tracking-[-0.03em] mb-6"
                style={{ fontSize: "clamp(34px, 4.5vw, 60px)", color: "#F7F6F4" }}
              >
                Safety isn&apos;t a feature.{" "}
                <em className="not-italic" style={{ color: "#568F7A" }}>It&apos;s the foundation.</em>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={headInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[15px] leading-relaxed mb-8"
                style={{ color: "rgba(247,246,244,0.65)" }}
              >
                Every plan includes the complete safety system at no extra cost.
                No tiers, no upsells — everyone rides fully protected.
              </motion.p>

              {/* Animated shield */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={headInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex items-center gap-3 p-4 rounded-2xl w-fit"
                style={{ background: "rgba(86,143,122,0.1)", border: "1px solid rgba(86,143,122,0.2)" }}
              >
                <motion.svg
                  width="36" height="36" viewBox="0 0 24 24" fill="none"
                  stroke="#568F7A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                  style={{ opacity: shield }}
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </motion.svg>
                <div>
                  <div className="text-[12px] font-bold" style={{ color: "#568F7A" }}>FREE on all plans</div>
                  <div className="text-[11px]" style={{ color: "rgba(247,246,244,0.35)" }}>No exceptions</div>
                </div>
              </motion.div>
            </div>

            {/* Right: 2×2 cards */}
            <div className="lg:w-[60%] grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <FeatureCard key={f.title} f={f} i={i} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
