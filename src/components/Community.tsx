"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const SURVEY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeIWEF6riJ2RKzNJh97PS_8yAYgfS0nkLyI7UBq6WfV2bqm6g/viewform?usp=sharing";

const testimonials = [
  {
    quote: "I save \u20B93,000/month on my HITEC City commute. The matching is eerily good.",
    name: "Priya S.",
    location: "Hyderabad",
    initials: "PS",
    color: "#568F7A",
  },
  {
    quote:
      "The safety features give my family peace of mind. My parents actually encourage me to use it.",
    name: "Rajesh K.",
    location: "Hyderabad",
    initials: "RK",
    color: "#F97316",
  },
  {
    quote:
      "It's not just a ride, it's my morning community. I've made real friends through Travel Campaign.",
    name: "Arun M.",
    location: "Hyderabad",
    initials: "AM",
    color: "#2C3A3A",
  },
];

const communityStats = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    value: "2,100+",
    label: "Community Members",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    value: "847",
    label: "Verified Profiles",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    value: "15+",
    label: "Routes Active",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 22l1-1h3l9-9" />
        <path d="M12.414 2.586a2 2 0 0 1 2.828 0l2.172 2.172a2 2 0 0 1 0 2.828l-9.9 9.9-4.242-4.242 9.142-9.142z" />
      </svg>
    ),
    value: "\u20B94.2L+",
    label: "Saved Monthly",
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
            Join 2,000+ Indians Reimagining Their Commute
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
