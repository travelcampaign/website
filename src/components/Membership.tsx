"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const plans = [
  {
    name: "FREE",
    price: "0",
    description: "Start your journey — no risk.",
    features: ["3 km matching radius", "3 rides per week", "Basic matching", "Full safety system"],
    cta: "Get Started Free",
    highlighted: false,
    badge: null,
  },
  {
    name: "BASIC+",
    price: "99",
    description: "Made for the daily office commuter.",
    features: ["5 km radius", "7 rides per week", "Saved routes", "Priority matching", "Full safety system"],
    cta: "Join Basic+",
    highlighted: false,
    badge: "POPULAR",
  },
  {
    name: "PRO",
    price: "199",
    description: "The sweet spot for power riders.",
    features: ["10 km radius", "Unlimited rides", "Recurring schedules", "Route analytics", "Full safety system"],
    cta: "Join Pro",
    highlighted: true,
    badge: "BEST VALUE",
  },
  {
    name: "TRAVEL+",
    price: "299",
    description: "For those who go beyond the city.",
    features: ["25 km radius", "Intercity matching", "Companion mode", "Priority support", "Full safety system"],
    cta: "Join Travel+",
    highlighted: false,
    badge: null,
  },
  {
    name: "MAX",
    price: "499",
    description: "Lead the community. No limits.",
    features: ["Unlimited radius", "Community leader tools", "All features included", "Early feature access", "Full safety system"],
    cta: "Go Max",
    highlighted: false,
    badge: null,
  },
];

function PlanCard({ plan, index }: { plan: typeof plans[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className={`plan-card relative flex flex-col rounded-2xl p-6 lg:p-7 ${
        plan.highlighted
          ? "z-10 scale-[1.025]"
          : ""
      }`}
      style={
        plan.highlighted
          ? { background: "#2C3A3A", border: "2px solid #568F7A", boxShadow: "0 0 60px rgba(86,143,122,0.2), 0 24px 48px rgba(0,0,0,0.3)" }
          : { background: "#ffffff", border: "1px solid rgba(44,58,58,0.08)", boxShadow: "0 4px 24px rgba(44,58,58,0.07)" }
      }
    >
      {/* Badge */}
      {plan.badge && (
        <div className="absolute -top-3.5 left-6">
          <span
            className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
            style={
              plan.highlighted
                ? { background: "#568F7A", color: "#fff" }
                : { background: "rgba(86,143,122,0.12)", color: "#568F7A", border: "1px solid rgba(86,143,122,0.25)" }
            }
          >
            {plan.badge}
          </span>
        </div>
      )}

      <p
        className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1"
        style={{ color: plan.highlighted ? "#568F7A" : "#7A8A85" }}
      >
        {plan.name}
      </p>
      <p className="text-[12px] mb-5" style={{ color: plan.highlighted ? "rgba(247,246,244,0.5)" : "#7A8A85" }}>
        {plan.description}
      </p>

      {/* Price */}
      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-sm font-medium" style={{ color: plan.highlighted ? "rgba(247,246,244,0.5)" : "#7A8A85" }}>₹</span>
        <span
          className="font-[family-name:var(--font-bricolage)] font-extrabold leading-none tracking-tight"
          style={{ fontSize: "clamp(38px, 4vw, 50px)", color: plan.highlighted ? "#F7F6F4" : "#2C3A3A" }}
        >
          {plan.price}
        </span>
        <span className="text-sm font-medium ml-0.5" style={{ color: plan.highlighted ? "rgba(247,246,244,0.4)" : "#7A8A85" }}>
          /mo
        </span>
      </div>

      <div className="h-px mb-5" style={{ background: plan.highlighted ? "rgba(247,246,244,0.08)" : "rgba(44,58,58,0.06)" }} />

      <ul className="flex-1 space-y-2.5 mb-7">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#568F7A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="text-[13px]" style={{ color: plan.highlighted ? "rgba(247,246,244,0.75)" : "rgba(44,58,58,0.7)" }}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      <button
        className="w-full rounded-[12px] py-3 text-sm font-semibold transition-all duration-200"
        style={
          plan.highlighted
            ? { background: "#568F7A", color: "#fff" }
            : { background: "rgba(44,58,58,0.06)", color: "#2C3A3A", border: "1px solid rgba(44,58,58,0.1)" }
        }
        onMouseEnter={e => {
          if (plan.highlighted) (e.currentTarget as HTMLButtonElement).style.background = "#4a7d6a";
          else (e.currentTarget as HTMLButtonElement).style.background = "rgba(44,58,58,0.11)";
        }}
        onMouseLeave={e => {
          if (plan.highlighted) (e.currentTarget as HTMLButtonElement).style.background = "#568F7A";
          else (e.currentTarget as HTMLButtonElement).style.background = "rgba(44,58,58,0.06)";
        }}
      >
        {plan.cta} — Coming Soon
      </button>
    </motion.div>
  );
}

export default function Membership() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="membership" className="relative bg-[#F7F6F4] clip-top-diagonal">
      <div className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div ref={ref} className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block text-[10px] font-bold text-[#568F7A] uppercase tracking-[0.22em] mb-4"
            >
              Transparent Pricing
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-bricolage)] font-extrabold text-[#2C3A3A] leading-[1.1] tracking-[-0.025em]"
              style={{ fontSize: "clamp(34px, 4.5vw, 58px)" }}
            >
              Start free.{" "}
              <span style={{ color: "#568F7A" }}>Grow when ready.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 text-lg text-[#7A8A85] leading-relaxed"
            >
              No commissions. No hidden charges. Subscriptions keep the platform running — nothing else.
            </motion.p>
          </div>

          {/* Top 3 */}
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {plans.slice(0, 3).map((p, i) => (
              <PlanCard key={p.name} plan={p} index={i} />
            ))}
          </div>

          {/* Bottom 2 — centered, matching card width of top row */}
          <div className="mt-5 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 lg:w-2/3 lg:mx-auto">
            {plans.slice(3).map((p, i) => (
              <PlanCard key={p.name} plan={p} index={i + 3} />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 text-center text-sm text-[#7A8A85]"
          >
            Safety features free on every plan · Monthly billing · Cancel anytime
          </motion.p>
        </div>
      </div>
    </section>
  );
}
