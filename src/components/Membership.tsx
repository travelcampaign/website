"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const plans = [
  {
    name: "FREE",
    price: "0",
    period: "/mo",
    features: ["3km matching radius", "3 rides per week", "Basic matching", "All safety features"],
    highlighted: false,
    badge: null,
    description: "Try the community risk-free.",
  },
  {
    name: "BASIC+",
    price: "99",
    period: "/mo",
    features: ["5km matching radius", "7 rides per week", "Saved routes", "Priority matching", "All safety features"],
    highlighted: false,
    badge: "POPULAR",
    description: "Perfect for daily office commuters.",
  },
  {
    name: "PRO",
    price: "199",
    period: "/mo",
    features: ["10km matching radius", "Unlimited rides", "Recurring schedules", "Route analytics", "All safety features"],
    highlighted: true,
    badge: "BEST VALUE",
    description: "The sweet spot for power users.",
  },
  {
    name: "TRAVEL+",
    price: "299",
    period: "/mo",
    features: ["25km matching radius", "Intercity matching", "Companion mode", "Priority support", "All safety features"],
    highlighted: false,
    badge: null,
    description: "For those who travel beyond the city.",
  },
  {
    name: "MAX",
    price: "499",
    period: "/mo",
    features: ["Unlimited radius", "Community Hub Leader", "All features included", "Early access to new features", "All safety features"],
    highlighted: false,
    badge: null,
    description: "Lead the community. No limits.",
  },
];

function PlanCard({ plan, index }: { plan: (typeof plans)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.09,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={`plan-card relative flex flex-col rounded-2xl p-6 lg:p-7 w-full ${
        plan.highlighted
          ? "bg-[#2C3A3A] border-2 border-[#568F7A] shadow-[0_20px_60px_rgba(86,143,122,0.2)] z-10 scale-[1.03]"
          : "bg-white border border-[#2C3A3A]/8 shadow-[0_4px_24px_rgba(44,58,58,0.07)]"
      }`}
    >
      {/* Badge */}
      {plan.badge && (
        <div className="absolute -top-3.5 left-6">
          <span
            className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
              plan.highlighted
                ? "bg-[#568F7A] text-white"
                : "bg-[#568F7A]/15 text-[#568F7A] border border-[#568F7A]/30"
            }`}
          >
            {plan.badge}
          </span>
        </div>
      )}

      {/* Plan name */}
      <h3
        className={`font-[family-name:var(--font-bricolage)] text-xs font-bold uppercase tracking-[0.18em] mb-1 ${
          plan.highlighted ? "text-[#568F7A]" : "text-[#7A8A85]"
        }`}
      >
        {plan.name}
      </h3>

      <p className={`text-[12px] mb-5 ${plan.highlighted ? "text-[#F0EDE6]/55" : "text-[#7A8A85]"}`}>
        {plan.description}
      </p>

      {/* Price */}
      <div className="flex items-baseline gap-1 mb-6">
        <span className={`text-sm font-medium ${plan.highlighted ? "text-[#F0EDE6]/60" : "text-[#7A8A85]"}`}>₹</span>
        <span
          className={`font-[family-name:var(--font-bricolage)] font-extrabold leading-none tracking-tight ${
            plan.highlighted ? "text-[#F0EDE6]" : "text-[#2C3A3A]"
          }`}
          style={{ fontSize: "clamp(40px, 5vw, 52px)" }}
        >
          {plan.price}
        </span>
        <span className={`text-sm font-medium ml-0.5 ${plan.highlighted ? "text-[#F0EDE6]/50" : "text-[#7A8A85]"}`}>
          {plan.period}
        </span>
      </div>

      {/* Divider */}
      <div className={`h-px mb-5 ${plan.highlighted ? "bg-white/10" : "bg-[#2C3A3A]/6"}`} />

      {/* Features */}
      <ul className="flex-1 space-y-2.5 mb-7">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={plan.highlighted ? "#568F7A" : "#568F7A"}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 shrink-0"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className={`text-[13px] ${plan.highlighted ? "text-[#F0EDE6]/80" : "text-[#2C3A3A]/75"}`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* Button */}
      <button
        className={`w-full rounded-[12px] py-3 text-sm font-semibold transition-all duration-200 ${
          plan.highlighted
            ? "bg-[#568F7A] text-white hover:bg-[#4a7d6a] hover:shadow-lg hover:shadow-[#568F7A]/25"
            : "bg-[#2C3A3A]/[0.07] text-[#2C3A3A] border border-[#2C3A3A]/10 hover:bg-[#2C3A3A]/12"
        }`}
      >
        Coming Soon
      </button>
    </motion.div>
  );
}

export default function Membership() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="membership"
      className="relative bg-[#F7F6F4] clip-top-diagonal py-0"
    >
      <div className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div ref={ref} className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block text-[10px] font-bold text-[#568F7A] uppercase tracking-[0.2em] mb-4"
            >
              Transparent Pricing
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-[family-name:var(--font-bricolage)] font-extrabold text-[#2C3A3A] leading-[1.1] tracking-tight"
              style={{ fontSize: "clamp(36px, 4.5vw, 56px)" }}
            >
              Choose Your Plan
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-5 text-lg text-[#7A8A85] leading-relaxed"
            >
              Start free. Upgrade when you&apos;re ready. No surprises, no commissions — ever.
            </motion.p>
          </div>

          {/* Top row: FREE, BASIC+, PRO */}
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {plans.slice(0, 3).map((plan, i) => (
              <PlanCard key={plan.name} plan={plan} index={i} />
            ))}
          </div>

          {/* Bottom row: TRAVEL+, MAX */}
          <div className="mt-5 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 lg:max-w-[calc(66.666%+0.625rem)] mx-auto">
            {plans.slice(3).map((plan, i) => (
              <PlanCard key={plan.name} plan={plan} index={i + 3} />
            ))}
          </div>

          {/* Fine print */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 text-center text-sm text-[#7A8A85]"
          >
            All safety features free on every plan. Subscriptions billed monthly. Cancel anytime.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
