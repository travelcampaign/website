"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const SURVEY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeIWEF6riJ2RKzNJh97PS_8yAYgfS0nkLyI7UBq6WfV2bqm6g/viewform?usp=sharing";

const testimonials = [
  {
    quote: "I save \u20B93,000/month on my HITEC City commute. The matching is eerily good.",
    name: "Priya S.",
    location: "HITEC City, Hyderabad",
    initials: "PS",
    color: "#568F7A",
  },
  {
    quote:
      "The safety features give my family peace of mind. My parents actually encourage me to use it.",
    name: "Rajesh K.",
    location: "Gachibowli, Hyderabad",
    initials: "RK",
    color: "#F97316",
  },
  {
    quote:
      "It's not just a ride, it's my morning community. I've made real friends through Travel Campaign.",
    name: "Arun M.",
    location: "Kondapur, Hyderabad",
    initials: "AM",
    color: "#2C3A3A",
  },
];

const communityStats = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    value: "3+",
    label: "Vehicle Types Supported",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 4l3 12h14l3-12-5.5 3L12 2l-4.5 5L2 4z" />
        <path d="M5 16l-2 6h18l-2-6" />
      </svg>
    ),
    value: "5",
    label: "Membership Tiers",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    value: "100%",
    label: "Safety Features Free",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    value: "\u20B90",
    label: "Commission Forever",
  },
];

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[0] }) {
  return (
    <div className="min-w-[320px] max-w-[380px] shrink-0 rounded-[18px] border border-primary/5 bg-white p-8 shadow-sm">
      {/* Stars */}
      <div className="flex gap-1 text-emergency">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <p className="mt-4 text-base text-text leading-relaxed">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="mt-6 flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{ backgroundColor: testimonial.color }}
        >
          {testimonial.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-primary">{testimonial.name}</p>
          <p className="text-xs text-muted">{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
}

export default function Community() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [scrollX, setScrollX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollX((prev) => {
        const maxScroll = containerRef.current
          ? containerRef.current.scrollWidth - containerRef.current.clientWidth
          : 0;
        if (prev >= maxScroll) return 0;
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollX;
    }
  }, [scrollX]);

  return (
    <section id="community" className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="text-center max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-semibold text-trust-green uppercase tracking-wider"
          >
            Real Stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 font-[family-name:var(--font-bricolage)] text-4xl md:text-5xl font-extrabold text-primary"
          >
            What Our Early Community Says
          </motion.h2>
        </div>

        {/* Testimonials carousel */}
        <div
          ref={containerRef}
          className="mt-16 flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseEnter={() => setScrollX((prev) => prev)}
        >
          {/* Duplicate for infinite feel */}
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={i} testimonial={t} />
          ))}
        </div>

        {/* Community stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {communityStats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center rounded-[18px] border border-primary/5 bg-background p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-trust-green/10 text-trust-green">
                {stat.icon}
              </div>
              <span className="mt-4 font-[family-name:var(--font-bricolage)] text-2xl font-extrabold text-primary">
                {stat.value}
              </span>
              <span className="mt-1 text-sm text-muted">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-xl font-medium text-primary">
            Help us build the future of commuting in India
          </p>
          <a
            href={SURVEY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-[14px] bg-trust-green px-7 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-trust-green/90 hover:shadow-xl hover:shadow-trust-green/20 hover:-translate-y-0.5"
          >
            Share Your Feedback
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
