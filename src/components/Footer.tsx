"use client";

import { motion } from "framer-motion";

const SURVEY_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeIWEF6riJ2RKzNJh97PS_8yAYgfS0nkLyI7UBq6WfV2bqm6g/viewform?usp=sharing";

const footerLinks = [
  {
    heading: "Product",
    links: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "Safety", href: "#safety" },
      { label: "Membership", href: "#membership" },
      { label: "Community", href: "#community" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "mailto:travelcampaign.info@gmail.com" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Safety Policy", href: "#" },
    ],
  },
];

const socialLinks = [
  {
    label: "X (Twitter)",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative" style={{ background: "#0A1515" }}>
      {/* Top CTA band */}
      <div
        className="border-b"
        style={{ borderColor: "rgba(247,246,244,0.06)" }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] mb-3" style={{ color: "#568F7A" }}>
                Launching Hyderabad · 2026
              </p>
              <h2
                className="font-[family-name:var(--font-bricolage)] font-extrabold leading-[1.05] tracking-[-0.03em]"
                style={{ fontSize: "clamp(28px, 3.5vw, 48px)", color: "#F7F6F4" }}
              >
                Be part of it from day one.
              </h2>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(247,246,244,0.45)" }}>
                Join 95+ early members shaping India&apos;s first safety-first ride-sharing community.
              </p>
            </div>
            <motion.a
              href={SURVEY_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 rounded-[14px] px-7 py-4 text-[15px] font-semibold text-white shrink-0"
              style={{ background: "#568F7A", boxShadow: "0 0 32px rgba(86,143,122,0.28)" }}
            >
              Join the Waitlist
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </motion.a>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr_1fr_1fr] gap-10 lg:gap-8">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{ background: "rgba(86,143,122,0.15)", border: "1px solid rgba(86,143,122,0.25)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#568F7A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="font-[family-name:var(--font-bricolage)] text-lg font-bold" style={{ color: "#F7F6F4" }}>
                Travel Campaign
              </span>
            </div>
            <p className="text-[13px] leading-relaxed mb-6" style={{ color: "rgba(247,246,244,0.42)" }}>
              Community-driven ride sharing built around trust, safety, and real human connections.
              Zero commission. Made for India.
            </p>
            {/* Social */}
            <div className="flex gap-2.5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200"
                  style={{ background: "rgba(247,246,244,0.05)", color: "rgba(247,246,244,0.38)" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(86,143,122,0.14)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#568F7A";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(247,246,244,0.05)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "rgba(247,246,244,0.38)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] mb-4" style={{ color: "rgba(247,246,244,0.28)" }}>
                {col.heading}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] transition-colors duration-200"
                      style={{ color: "rgba(247,246,244,0.48)" }}
                      onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#F7F6F4"}
                      onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(247,246,244,0.48)"}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(247,246,244,0.06)" }}
        >
          <p className="text-[12px]" style={{ color: "rgba(247,246,244,0.24)" }}>
            &copy; 2026 Travel Campaign. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#568F7A" }} />
            <span className="text-[12px]" style={{ color: "rgba(247,246,244,0.24)" }}>
              Building for India · Launching Q3 2026
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
