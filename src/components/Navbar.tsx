"use client";

import { useEffect, useState } from "react";

/* Nav — transparent over the dusk hero, frosted night glass on scroll.
   Wordmark set in Fraunces with a sage full stop: nexstopp. */

import { WAITLIST_URL } from "@/lib/site";

const LINKS = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Safety", href: "/#safety" },
  { label: "Membership", href: "/#membership" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: the nav quietly tracks which section is in the reading
  // band, so the bar is a map of the page rather than a list of links.
  useEffect(() => {
    const ids = ["how-it-works", "safety", "membership"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // An open sheet owns the screen: the page behind must not scroll, and
  // Escape must close it, or the menu feels glued on rather than built in.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-[rgba(242,238,229,0.08)] bg-[rgba(16,25,24,0.82)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5 sm:px-12">
        <a
          href="/"
          className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.02em] text-dusk-text"
        >
          nexstopp<span className="italic text-sage">.</span>
        </a>

        {/* desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => {
            const isActive = active !== null && l.href.endsWith(`#${active}`);
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative text-[14.5px] transition-colors ${
                  isActive ? "text-dusk-text" : "text-dusk-dim hover:text-dusk-text"
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-sage transition-transform duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                  aria-hidden="true"
                />
              </a>
            );
          })}
          <a
            href={WAITLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="press rounded-full bg-sage px-5 py-2.5 text-sm font-semibold text-night-0 transition-colors hover:bg-[#7FC0A6]"
          >
            Join the waitlist
          </a>
        </nav>

        {/* mobile toggle */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-dusk-text md:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {/* mobile sheet — animated open so it reads as part of the bar */}
      {open && (
        <nav className="menu-sheet border-t border-[rgba(242,238,229,0.08)] bg-[rgba(16,25,24,0.96)] px-6 py-6 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-5">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-1 text-[16px] text-dusk-dim transition-colors hover:text-dusk-text"
              >
                {l.label}
              </a>
            ))}
            <a
              href={WAITLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 rounded-full bg-sage px-5 py-3 text-center text-sm font-semibold text-night-0"
            >
              Join the waitlist
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
