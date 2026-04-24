"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

const SURVEY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeIWEF6riJ2RKzNJh97PS_8yAYgfS0nkLyI7UBq6WfV2bqm6g/viewform?usp=sharing";

const testimonials = [
  {
    quote: "I drive 1–2 hours alone daily with empty seats. Would love to share the ride with someone going my way — save fuel and have company.",
    name: "From Our Survey",
    location: "Own vehicle commuter, Hyderabad",
    initials: "TC",
    color: "#568F7A",
  },
  {
    quote:
      "Safety concerns stop me from trying shared rides. Real-time tracking and verified profiles would change everything for my family's peace of mind.",
    name: "From Our Survey",
    location: "Public transport commuter, Hyderabad",
    initials: "TC",
    color: "#F97316",
  },
  {
    quote:
      "I often cancel weekend plans because I have no one to go with. A platform to find people heading to the same places would be amazing.",
    name: "From Our Survey",
    location: "Weekend traveler, Hyderabad",
    initials: "TC",
    color: "#2C3A3A",
  },
];

const communityStats = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    value: "95+",
    label: "Survey Responses",
    color: "#568F7A",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 4l3 12h14l3-12-5.5 3L12 2l-4.5 5L2 4z" />
        <path d="M5 16l-2 6h18l-2-6" />
      </svg>
    ),
    value: "70%+",
    label: "Open to Ride Sharing",
    color: "#F97316",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    value: "#1",
    label: "Pain Point: Traffic & Cost",
    color: "#568F7A",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    value: "60%+",
    label: "Travel Alone Daily",
    color: "#2C3A3A",
  },
];

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[0] }) {
  return (
    <div className="min-w-[320px] max-w-[380px] shrink-0 rounded-2xl bg-[#F0EDE6] border-l-[3px] border-l-[#568F7A] p-7 shadow-[0_4px_24px_rgba(44,58,58,0.07)]">
      {/* Large opening quote */}
      <div className="font-serif text-5xl text-[#568F7A]/30 leading-none mb-2 select-none">&ldquo;</div>

      {/* Quote */}
      <p className="text-[15px] text-[#2C3A3A]/80 leading-relaxed font-[family-name:var(--font-dm-sans)]">
        {testimonial.quote}
      </p>

      {/* Author */}
      <div className="mt-6 flex items-center gap-3">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white shrink-0"
          style={{ backgroundColor: testimonial.color }}
        >
          {testimonial.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#2C3A3A]">{testimonial.name}</p>
          <p className="text-xs text-[#7A8A85] mt-0.5">{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
}

export default function Community() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const containerRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  // Auto-scroll — directly drives scrollLeft; pauses when hovered or dragging
  useEffect(() => {
    const interval = setInterval(() => {
      if (paused.current || isDragging.current || !containerRef.current) return;
      const el = containerRef.current;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
        el.scrollLeft = 0;
      } else {
        el.scrollLeft += 1;
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

  function onMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    isDragging.current = true;
    dragStartX.current = e.pageX - containerRef.current.offsetLeft;
    dragScrollLeft.current = containerRef.current.scrollLeft;
    containerRef.current.style.cursor = "grabbing";
    containerRef.current.style.userSelect = "none";
  }

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!isDragging.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const dist = (x - dragStartX.current) * 1.5;
    containerRef.current.scrollLeft = dragScrollLeft.current - dist;
  }

  function onMouseUp() {
    isDragging.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
      containerRef.current.style.userSelect = "";
    }
  }

  return (
    <section id="community" className="relative bg-[#F7F6F4] clip-top-diagonal overflow-hidden">
      <div className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div ref={ref} className="text-center max-w-3xl mx-auto mb-14">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block text-[10px] font-bold text-[#568F7A] uppercase tracking-[0.2em] mb-4"
            >
              From Our Survey
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative font-[family-name:var(--font-bricolage)] font-extrabold text-[#2C3A3A] leading-[1.1] tracking-tight"
              style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
            >
              {/* Faint background quote mark */}
              <span className="absolute -top-6 -left-2 font-serif select-none pointer-events-none"
                style={{ fontSize: "clamp(80px, 12vw, 140px)", color: "rgba(44,58,58,0.04)", lineHeight: 1 }}
                aria-hidden="true"
              >
                &ldquo;
              </span>
              What Commuters Are Saying
            </motion.h2>
          </div>

          {/* Testimonials carousel — carousel logic untouched */}
          <div
            ref={containerRef}
            className="flex gap-5 overflow-x-auto pb-4 select-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", cursor: "grab" }}
            onMouseEnter={() => { paused.current = true; }}
            onMouseLeave={() => { paused.current = false; isDragging.current = false; if (containerRef.current) { containerRef.current.style.cursor = "grab"; containerRef.current.style.userSelect = ""; } }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <TestimonialCard key={i} testimonial={t} />
            ))}
          </div>

          {/* Community stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {communityStats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center rounded-2xl border border-[#2C3A3A]/6 bg-white p-5 shadow-[0_2px_12px_rgba(44,58,58,0.05)]"
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl mb-3"
                  style={{ backgroundColor: stat.color + "15", color: stat.color }}
                >
                  {stat.icon}
                </div>
                <span className="font-[family-name:var(--font-bricolage)] text-2xl font-extrabold text-[#2C3A3A]">
                  {stat.value}
                </span>
                <span className="mt-1 text-[12px] text-[#7A8A85]">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-14 text-center"
          >
            <p className="text-lg font-medium text-[#2C3A3A] mb-6">
              Help us build the future of commuting in India
            </p>
            <a
              href={SURVEY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[14px] bg-[#568F7A] px-7 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-[#4a7d6a] hover:shadow-xl hover:shadow-[#568F7A]/25 hover:-translate-y-0.5"
            >
              Share Your Feedback
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
