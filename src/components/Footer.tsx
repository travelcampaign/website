const footerLinks = [
  { label: "About", href: "#" },
  { label: "Safety", href: "#safety" },
  { label: "Membership", href: "#membership" },
  { label: "Contact", href: "mailto:travelcampaign.info@gmail.com" },
];

const socialLinks = [
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "#0A1515" }} className="border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F7F6F4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="font-[family-name:var(--font-bricolage)] text-xl font-bold text-white">
                Travel Campaign
              </span>
            </div>
            <p className="mt-4 text-sm text-white/50 leading-relaxed">
              Community-driven ride sharing built around trust, safety, and real
              human connections. Made for India. Made with care.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-8 lg:gap-12">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white/50 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all duration-200"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 pt-8">
          <p className="text-sm text-white/30">
            &copy; 2026 Travel Campaign. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
