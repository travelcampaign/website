"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SURVEY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeIWEF6riJ2RKzNJh97PS_8yAYgfS0nkLyI7UBq6WfV2bqm6g/viewform?usp=sharing";

export default function SurveyCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="survey"
      className="noise-bg relative overflow-hidden bg-[#0D1A1A] clip-top-diagonal-dark"
    >
      {/* Glow */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <div
          className="h-[600px] w-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(86,143,122,0.5) 0%, transparent 70%)" }}
        />
      </div>

      <div ref={ref} className="relative z-10 py-28 lg:py-36 mx-auto max-w-3xl px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-block text-[10px] font-bold text-[#568F7A] uppercase tracking-[0.2em] mb-6"
        >
          Shape the Product
        </motion.span>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-[family-name:var(--font-bricolage)] font-extrabold text-[#F0EDE6] leading-[1.06] tracking-[-0.025em]"
          style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
        >
          Shape the Future of{" "}
          <span className="text-[#568F7A]">Travel Campaign</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-6 text-lg text-[#F0EDE6]/55 leading-relaxed font-[family-name:var(--font-dm-sans)]"
        >
          Your feedback shapes our product. Take our quick survey and help build
          the ride-sharing platform India truly deserves.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.36 }}
          className="mt-10"
        >
          <a
            href={SURVEY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-[14px] bg-[#568F7A] px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-[#4a7d6a] hover:shadow-2xl hover:shadow-[#568F7A]/30 hover:-translate-y-0.5"
          >
            Take the Survey
            <svg
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-5 text-sm text-[#F0EDE6]/30"
        >
          No sign-up required. Takes less than 2 minutes.
        </motion.p>
      </div>
    </section>
  );
}
