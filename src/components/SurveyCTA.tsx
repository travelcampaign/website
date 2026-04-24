"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SURVEY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeIWEF6riJ2RKzNJh97PS_8yAYgfS0nkLyI7UBq6WfV2bqm6g/viewform?usp=sharing";

export default function SurveyCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="grain relative clip-top-diagonal-dark"
      style={{ background: "#0A1515" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(86,143,122,0.12) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 py-32 lg:py-40">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <div ref={ref}>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] mb-8"
              style={{ color: "#568F7A" }}
            >
              Shape the Platform
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-bricolage)] font-extrabold leading-[1.02] tracking-[-0.04em] mb-8"
              style={{ fontSize: "clamp(48px, 7vw, 96px)", color: "#F7F6F4" }}
            >
              Your voice{" "}
              <span style={{ color: "#568F7A" }}>builds</span>{" "}
              Travel Campaign.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-lg leading-relaxed mb-12 mx-auto max-w-2xl"
              style={{ color: "rgba(247,246,244,0.5)" }}
            >
              Every response directly shapes features, safety systems, and pricing.
              Three minutes. Real impact.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a
                href={SURVEY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-[14px] text-base font-bold text-white transition-all duration-300"
                style={{ background: "#568F7A", padding: "18px 40px" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 50px rgba(86,143,122,0.45)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "#4a7d6a";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLAnchorElement).style.background = "#568F7A";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "none";
                }}
              >
                Take the Survey
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-6 text-[12px]"
              style={{ color: "rgba(247,246,244,0.22)" }}
            >
              Anonymous · 3 minutes · No sign-up required
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
