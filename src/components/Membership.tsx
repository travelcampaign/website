/* Membership — cream. Launch reality only: FREE + ₹99.
   The headline IS the safety promise: it's never paywalled. */

import { WAITLIST_URL } from "@/lib/site";

export default function Membership() {
  return (
    <section id="membership" className="relative z-[4] -mt-[3px] bg-cream">
      <div className="mx-auto max-w-[1200px] px-6 py-28 sm:px-12">
        <div className="max-w-[60ch]">
          <p className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.22em] text-sage-deep">
            Membership
          </p>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(36px,4.6vw,54px)] font-normal leading-[1.1] tracking-[-0.01em] text-ink">
            Safety is <span className="text-sage-deep">free. Always.</span>
          </h2>
          <p className="mt-6 text-[16.5px] leading-[1.7] text-ink-soft">
            Every rider gets live location sharing, trusted contacts and SOS.
            Paid membership only raises ride and match limits. Nexstopp never
            takes a commission from rides.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:max-w-[880px]">
          {/* FREE */}
          <div className="plan-card rounded-[18px] border border-[#E2DBCB] bg-white p-8">
            <p className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.2em] text-ink-soft">
              Community
            </p>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-[family-name:var(--font-display)] text-[52px] font-normal leading-none text-ink">₹0</span>
              <span className="text-[15px] text-ink-soft">/ month</span>
            </div>
            <ul className="mt-7 flex flex-col gap-3.5">
              {[
                "3 rides a month",
                "Host 1 route at a time",
                "3 matches per search",
                "Every safety feature: live GPS, guardians, SOS",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-[15px] leading-snug text-ink">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-sage-deep" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[13.5px] leading-relaxed text-ink-soft">
              Start sharing rides without paying for a plan.
            </p>
          </div>

          {/* ₹99 */}
          <div className="plan-card relative rounded-[18px] border-2 border-sage-deep bg-white p-8">
            <span className="absolute -top-3 left-8 rounded-full bg-sage-deep px-3.5 py-1 font-[family-name:var(--font-mono)] text-[10.5px] uppercase tracking-[0.16em] text-white">
              For daily commuters
            </span>
            <p className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.2em] text-ink-soft">
              Plus
            </p>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-[family-name:var(--font-display)] text-[52px] font-normal leading-none text-ink">₹99</span>
              <span className="text-[15px] text-ink-soft">/ month</span>
            </div>
            <ul className="mt-7 flex flex-col gap-3.5">
              {[
                "8 rides a month instead of 3",
                "8 matches per search instead of 3",
                "Host 2 routes at once, and save 3",
                "Filter by vehicle, gender preference and rating",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-[15px] leading-snug text-ink">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-sage-deep" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={WAITLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="press mt-8 block rounded-full bg-sage-deep px-6 py-3.5 text-center text-[15px] font-semibold text-white transition-colors hover:bg-[#4A7D6A]"
            >
              Join the waitlist
            </a>
            <p className="mt-5 text-[13px] leading-relaxed text-ink-soft">
              Choose Plus when you commute often and want more matches. Safety
              stays the same on both plans.
            </p>
          </div>
        </div>

        {/* the commission statement, at the scale it deserves. The numeral
            is the argument; everything else supports it. */}
        <div className="mt-16 grid items-center gap-8 rounded-[18px] border border-[#E2DBCB] bg-cream-deep px-8 py-10 sm:grid-cols-[auto_1fr] sm:gap-12 sm:px-12 lg:max-w-[880px]">
          <p className="font-[family-name:var(--font-display)] text-[clamp(72px,10vw,120px)] leading-[0.9] tracking-[-0.02em] text-ink">
            ₹0
          </p>
          <div>
            <p className="font-[family-name:var(--font-display)] text-[24px] leading-snug text-ink">
              commission <span className="text-sage-deep">on rides.</span>
            </p>
            <p className="mt-3 max-w-[46ch] text-[15px] leading-[1.7] text-ink-soft">
              Riders pay the driver directly for fuel. Nexstopp does not hold
              that money or take a percentage. Membership is our only income.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}
