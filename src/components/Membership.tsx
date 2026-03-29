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
  },
  {
    name: "BASIC+",
    price: "99",
    period: "/mo",
    features: ["5km matching radius", "7 rides per week", "Saved routes", "Priority matching", "All safety features"],
    highlighted: true,
    badge: "POPULAR",
  },
  {
    name: "PRO",
    price: "199",
    period: "/mo",
    features: ["10km matching radius", "Unlimited rides", "Recurring schedules", "Route analytics", "All safety features"],
    highlighted: false,
    badge: null,
  },
  {
    name: "TRAVEL+",
    price: "299",
    period: "/mo",
    features: ["25km matching radius", "Intercity matching", "Companion mode", "Priority support", "All safety features"],
    highlighted: false,
    badge: null,
  },
  {
    name: "MAX",
    price: "499",
    period: "/mo",
    features: ["Unlimited radius", "Community Hub Leader", "All features included", "Early access to new features", "All safety features"],
    highlighted: false,
    badge: null,
  },
];

function PlanCard({
  plan,
  index,
}: {
  plan: (typeof plans)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative flex flex-col rounded-[18px] border p-6 lg:p-8 transition-all duration-300 hover:shadow-xl w-full ${
        plan.highlighted
          ? "border-trust-green bg-white shadow-lg shadow-trust-green/10 scale-[1.02] z-10"
          : "border-primary/5 bg-white hover:shadow-primary/5"
      }`}
    >
      {/* Badge */}
      {plan.badge && (
        <div className="absolute -top-3 left-6">
          <span className="inline-block rounded-full bg-trust-green px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">
            {plan.badge}
          </span>
        </div>
      )}

      {/* Plan name */}
      <h3 className="font-[family-name:var(--font-bricolage)] text-sm font-bold text-muted uppercase tracking-wider">
        {plan.name}
      </h3>

      {/* Price */}
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-sm font-medium text-muted">&#8377;</span>
        <span className="font-[family-name:var(--font-bricolage)] text-4xl lg:text-5xl font-extrabold text-primary">
          {plan.price}
        </span>
        <span className="text-sm font-medium text-muted">{plan.period}</span>
      </div>

      {/* Features */}
      <ul className="mt-8 flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-text">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#568F7A"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 shrink-0"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      {/* Button */}
      <button
        className={`mt-8 w-full rounded-[14px] py-3 text-sm font-semibold transition-all duration-200 ${
          plan.highlighted
            ? "bg-trust-green text-white hover:bg-trust-green/90 hover:shadow-lg hover:shadow-trust-green/20"
            : "bg-primary/[0.08] text-primary border border-primary/10 hover:bg-primary/10"
        }`}
      >
        Coming Soon
      </button>
    </motion.div>
  );
}

export default function Membership() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="membership" className="py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="text-center max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-semibold text-trust-green uppercase tracking-wider"
          >
            Transparent Pricing
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 font-[family-name:var(--font-bricolage)] text-4xl md:text-5xl font-extrabold text-primary"
          >
            Choose Your Plan
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg text-muted"
          >
            Start free. Upgrade when you&apos;re ready. No surprises.
          </motion.p>
        </div>

        {/* Top row: FREE, BASIC+, PRO */}
        <div className="mt-16 lg:mt-20 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {plans.slice(0, 3).map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>
        {/* Bottom row: TRAVEL+, MAX centered */}
        <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 max-w-[calc(66.666%+0.75rem)] mx-auto">
          {plans.slice(3).map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i + 3} />
          ))}
        </div>

      </div>
    </section>
  );
}
