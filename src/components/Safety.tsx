"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const features = [
  {
    title: "Real-time GPS Monitoring",
    description:
      "Every active ride is tracked live. Route deviation triggers instant alerts to your guardians. You're never alone on the road.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
    accent: "#568F7A",
  },
  {
    title: "Auto Police Station Alert",
    description:
      "60 seconds of no response triggers an automatic alert to the nearest police station — complete with your full profile and live GPS location.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </svg>
    ),
    accent: "#F97316",
  },
  {
    title: "30-Min Post-Ride Window",
    description:
      "Safety doesn't stop when the ride ends. Monitoring continues for 30 minutes after drop-off, so your guardians know you've reached safely.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    accent: "#568F7A",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        animate={{
          rotateX: hovered ? -2 : 0,
          rotateY: hovered ? 2 : 0,
          scale: hovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden rounded-[18px] border border-primary/5 bg-white p-8 lg:p-10 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/5"
      >
        {/* Accent top border */}
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-[18px]"
          style={{ backgroundColor: feature.accent }}
        />

        {/* Icon */}
        <div
          className="flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${feature.accent}15`, color: feature.accent }}
        >
          {feature.icon}
        </div>

        {/* Content */}
        <h3 className="mt-6 font-[family-name:var(--font-bricolage)] text-xl font-bold text-primary">
          {feature.title}
        </h3>
        <p className="mt-3 text-base text-muted leading-relaxed">
          {feature.description}
        </p>

        {/* Decorative corner gradient */}
        <div
          className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 blur-3xl"
          style={{ backgroundColor: `${feature.accent}20` }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function Safety() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="safety" className="py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emergency/10"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-[family-name:var(--font-bricolage)] text-4xl md:text-5xl font-extrabold text-primary"
          >
            The Guardian System
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg text-muted"
          >
            Safety isn&apos;t a feature. It&apos;s our foundation.
          </motion.p>
        </div>

        {/* Feature cards */}
        <div className="mt-16 lg:mt-20 grid gap-6 md:grid-cols-3">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full bg-trust-green/10 px-6 py-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#568F7A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            <span className="text-sm font-semibold text-trust-green">
              All safety features FREE on every plan
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
