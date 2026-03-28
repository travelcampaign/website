"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";

const SURVEY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeIWEF6riJ2RKzNJh97PS_8yAYgfS0nkLyI7UBq6WfV2bqm6g/viewform?usp=sharing";

function AnimatedRouteLine() {
  return (
    <motion.svg
      viewBox="0 0 800 200"
      className="absolute bottom-12 left-0 right-0 w-full h-auto opacity-20 pointer-events-none select-none hidden lg:block"
      initial="hidden"
      animate="visible"
    >
      {/* The route path */}
      <motion.path
        d="M0 140 C100 140, 120 60, 220 60 S340 140, 440 100 S560 20, 660 80 S750 140, 800 100"
        fill="none"
        stroke="#568F7A"
        strokeWidth="3"
        strokeDasharray="12 8"
        strokeLinecap="round"
        variants={{
          hidden: { pathLength: 0 },
          visible: {
            pathLength: 1,
            transition: { duration: 2.5, ease: "easeInOut" },
          },
        }}
      />
      {/* Animated dashed overlay */}
      <motion.path
        d="M0 140 C100 140, 120 60, 220 60 S340 140, 440 100 S560 20, 660 80 S750 140, 800 100"
        fill="none"
        stroke="#568F7A"
        strokeWidth="3"
        strokeDasharray="8 16"
        strokeLinecap="round"
        className="animate-dash"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 0.6,
            transition: { delay: 2.5, duration: 0.5 },
          },
        }}
      />
      {/* Pulsing dot */}
      <motion.circle
        r="6"
        fill="#568F7A"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: [0, 1, 1],
            transition: { delay: 2.5, duration: 0.3 },
          },
        }}
      >
        <animateMotion
          dur="6s"
          repeatCount="indefinite"
          path="M0 140 C100 140, 120 60, 220 60 S340 140, 440 100 S560 20, 660 80 S750 140, 800 100"
          begin="2.5s"
        />
        <animate
          attributeName="r"
          values="5;8;5"
          dur="1.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="1;0.5;1"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </motion.circle>
      {/* Origin marker */}
      <motion.g
        variants={{
          hidden: { opacity: 0, scale: 0 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { delay: 0.3, duration: 0.4 },
          },
        }}
      >
        <circle cx="0" cy="140" r="8" fill="#568F7A" opacity="0.2" />
        <circle cx="0" cy="140" r="4" fill="#568F7A" />
      </motion.g>
      {/* Destination marker */}
      <motion.g
        variants={{
          hidden: { opacity: 0, scale: 0 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { delay: 2.2, duration: 0.4 },
          },
        }}
      >
        <circle cx="800" cy="100" r="8" fill="#F97316" opacity="0.2" />
        <circle cx="800" cy="100" r="4" fill="#F97316" />
      </motion.g>
    </motion.svg>
  );
}

const stats = [
  { value: 0, suffix: "%", label: "Commission — Ever" },
  { value: 5, suffix: "", label: "Membership Plans" },
  { value: 100, suffix: "%", label: "Safety — Free" },
];

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden noise-bg grid-bg">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-32">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-trust-green/10 px-4 py-2 text-sm font-medium text-trust-green">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-trust-green opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-trust-green" />
            </span>
            Now building in Hyderabad
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-bricolage)] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-primary leading-[1.05] tracking-tight max-w-4xl"
        >
          Share your journey,{" "}
          <span className="relative">
            <span className="relative z-10">not just a ride.</span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-2 left-0 right-0 h-3 bg-trust-green/15 origin-left -z-0 rounded-sm"
            />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 max-w-2xl text-lg sm:text-xl text-muted leading-relaxed font-[family-name:var(--font-dm-sans)]"
        >
          India&apos;s first community-driven ride sharing platform. Built around trust, safety,
          and real human connections.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <a
            href={SURVEY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-[14px] bg-trust-green px-7 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-trust-green/90 hover:shadow-xl hover:shadow-trust-green/20 hover:-translate-y-0.5"
          >
            Take Our Survey
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
          <button
            onClick={() => scrollTo("#how-it-works")}
            className="inline-flex items-center justify-center gap-2 rounded-[14px] border-2 border-primary/15 px-7 py-4 text-base font-semibold text-primary transition-all duration-200 hover:border-primary/30 hover:bg-primary/5"
          >
            See How It Works
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3v10M4 9l4 4 4-4" />
            </svg>
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-20 flex flex-col sm:flex-row gap-8 sm:gap-16"
        >
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="font-[family-name:var(--font-bricolage)] text-4xl sm:text-5xl font-extrabold text-primary">
                <AnimatedCounter target={stat.value} suffix="" />
                <span className="text-trust-green">{stat.suffix}</span>
              </span>
              <span className="mt-1 text-sm font-medium text-muted uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Animated Route Line */}
        <AnimatedRouteLine />
      </div>
    </section>
  );
}
