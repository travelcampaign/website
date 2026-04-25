"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Safety", href: "#safety" },
  { label: "Membership", href: "#membership" },
  { label: "Community", href: "#community" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-[#2C3A3A]/8 shadow-[0_1px_20px_rgba(44,58,58,0.08)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#568F7A]/20 border border-[#568F7A]/35 group-hover:bg-[#568F7A]/30 transition-colors duration-200">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#568F7A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className={`font-[family-name:var(--font-bricolage)] text-lg font-bold tracking-tight transition-colors duration-300 ${
              scrolled ? "text-[#2C3A3A]" : "text-[#F7F6F4]"
            }`}>
              Travel Campaign
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  scrolled
                    ? "text-[#2C3A3A]/55 hover:text-[#2C3A3A]"
                    : "text-[#F7F6F4]/65 hover:text-[#F7F6F4]"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA pill */}
          <div className="hidden md:block">
            <a
              href="#survey"
              onClick={(e) => handleClick(e, "#community")}
              className={`inline-flex items-center gap-2 rounded-[14px] border px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                scrolled
                  ? "border-[#568F7A]/40 bg-[#568F7A]/8 text-[#568F7A] hover:bg-[#568F7A]/15 hover:border-[#568F7A]/55"
                  : "border-[#568F7A]/60 bg-[#568F7A]/15 text-[#F7F6F4] hover:bg-[#568F7A]/25 hover:border-[#568F7A]/80"
              }`}
            >
              Join the Waitlist
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 6h8M6 2l4 4-4 4" />
              </svg>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`block h-0.5 w-5 origin-center transition-colors duration-300 ${scrolled ? "bg-[#2C3A3A]/70" : "bg-[#F7F6F4]/80"}`}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className={`block h-0.5 w-5 transition-colors duration-300 ${scrolled ? "bg-[#2C3A3A]/70" : "bg-[#F7F6F4]/80"}`}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`block h-0.5 w-5 origin-center transition-colors duration-300 ${scrolled ? "bg-[#2C3A3A]/70" : "bg-[#F7F6F4]/80"}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden bg-white/98 backdrop-blur-xl border-t border-[#2C3A3A]/8 overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="text-base font-medium text-[#2C3A3A]/60 hover:text-[#2C3A3A] py-2.5 border-b border-[#2C3A3A]/6 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#community"
                onClick={(e) => handleClick(e, "#community")}
                className="mt-4 inline-flex items-center justify-center rounded-[14px] bg-[#568F7A] px-5 py-3 text-sm font-semibold text-white"
              >
                Join the Waitlist
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
