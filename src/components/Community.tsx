"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

const SURVEY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeIWEF6riJ2RKzNJh97PS_8yAYgfS0nkLyI7UBq6WfV2bqm6g/viewform?usp=sharing";

const testimonials = [
  {
    quote: "I drive 1–2 hours alone daily with empty seats. Would love to share the ride — save fuel and have company.",
    location: "Own vehicle commuter, Hyderabad",
    color: "#568F7A",
  },
  {
    quote: "Safety concerns stop me from trying shared rides. Real-time tracking and verified profiles would change everything.",
    location: "Public transport commuter, Hyderabad",
    color: "#F97316",
  },
  {
    quote: "I often cancel weekend plans because I have no one to go with. A platform to find people heading the same way would be amazing.",
    location: "Weekend traveler, Hyderabad",
    color: "#568F7A",
  },
  {
    quote: "Fuel costs are eating into my salary. If I could split the cost with verified co-workers, I'd save thousands a month.",
    location: "Software engineer, Kondapur",
    color: "#2C3A3A",
  },
];

const stats = [
  { value: "95+", label: "Survey Responses" },
  { value: "70%+", label: "Open to Ride Sharing" },
  { value: "60%+", label: "Travel Alone Daily" },
  { value: "#1", label: "Pain Point: Traffic & Cost" },
];

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div
      className="min-w-[320px] max-w-[380px] shrink-0 rounded-2xl p-7"
      style={{
        background: "#ffffff",
        border: "1px solid rgba(44,58,58,0.08)",
        borderLeft: `3px solid ${t.color}`,
        boxShadow: "0 4px 24px rgba(44,58,58,0.07)",
      }}
    >
      <div className="font-serif text-5xl leading-none mb-3 select-none" style={{ color: `${t.color}30` }}>
        &ldquo;
      </div>
      <p className="text-[15px] text-[#2C3A3A]/75 leading-relaxed font-[family-name:var(--font-dm-sans)]">
        {t.quote}
      </p>
      <div className="mt-5 flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
          style={{ background: t.color }}
        >
          TC
        </div>
        <div>
          <p className="text-[11px] font-semibold text-[#2C3A3A]">From Our Survey</p>
          <p className="text-[11px] text-[#7A8A85]">{t.location}</p>
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
    containerRef.current.scrollLeft = dragScrollLeft.current - (x - dragStartX.current) * 1.5;
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
      <div className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* Header */}
          <div ref={ref} className="text-center max-w-3xl mx-auto mb-14">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block text-[10px] font-bold text-[#568F7A] uppercase tracking-[0.22em] mb-4"
            >
              From Our Survey
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-bricolage)] font-extrabold text-[#2C3A3A] leading-[1.1] tracking-[-0.025em]"
              style={{ fontSize: "clamp(32px, 4vw, 54px)" }}
            >
              What Commuters Are Saying
            </motion.h2>
          </div>

          {/* Carousel */}
          <div
            ref={containerRef}
            className="flex gap-5 overflow-x-auto pb-4 select-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", cursor: "grab" }}
            onMouseEnter={() => { paused.current = true; }}
            onMouseLeave={() => {
              paused.current = false;
              isDragging.current = false;
              if (containerRef.current) {
                containerRef.current.style.cursor = "grab";
                containerRef.current.style.userSelect = "";
              }
            }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center text-center rounded-2xl p-5"
                style={{ background: "#ffffff", border: "1px solid rgba(44,58,58,0.07)", boxShadow: "0 2px 12px rgba(44,58,58,0.05)" }}
              >
                <span
                  className="font-[family-name:var(--font-bricolage)] font-extrabold text-[#2C3A3A] mb-1"
                  style={{ fontSize: "clamp(24px, 3vw, 32px)" }}
                >
                  {s.value}
                </span>
                <span className="text-[11px] text-[#7A8A85]">{s.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
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
