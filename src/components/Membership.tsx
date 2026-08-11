/* Membership — cream. Launch reality only: FREE + ₹99.
   The headline IS the safety promise: it's never paywalled. */

const WAITLIST_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe0aPYcXW-4CyYuc74YEHl9zM_Ni7QDyVZBFhqm2Y69ZC0aiw/viewform";

export default function Membership() {
  return (
    <section id="membership" className="bg-cream">
      <div className="mx-auto max-w-[1200px] px-6 py-28 sm:px-12">
        <div className="max-w-[60ch]">
          <p className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.22em] text-sage-deep">
            Membership
          </p>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(36px,4.6vw,54px)] font-normal leading-[1.1] tracking-[-0.01em] text-ink">
            Safety is <em className="italic text-sage-deep">never paywalled.</em>
          </h2>
          <p className="mt-6 text-[16.5px] leading-[1.7] text-ink-soft">
            Every protection — live GPS, guardians, SOS — is free on every
            plan, forever. Membership only changes how much matching you get.
            And we never take a cut of the ride.
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
              <span className="text-[15px] text-ink-soft">forever</span>
            </div>
            <ul className="mt-7 flex flex-col gap-3.5">
              {[
                "Post and join everyday commutes",
                "On-route matching with verified riders",
                "Live GPS, guardians and SOS — all of it",
                "Fair fuel-split calculator",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-[15px] leading-snug text-ink">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-sage-deep" />
                  {f}
                </li>
              ))}
            </ul>
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
                "Everything in Community",
                "Higher daily matching limits",
                "Wider search radius for matches",
                "Priority support",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-[15px] leading-snug text-ink">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-sage-deep" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[13px] leading-relaxed text-ink-soft">
              The maths: one shared 20&nbsp;km commute typically saves more than
              the fee. If it doesn&apos;t pay for itself, stay free — nothing
              that keeps you safe ever costs a rupee.
            </p>
          </div>
        </div>

        {/* zero commission strip */}
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-[18px] border border-[#E2DBCB] bg-cream-deep px-8 py-6 lg:max-w-[880px]">
          <p className="font-[family-name:var(--font-display)] text-[22px] text-ink">
            ₹0 commission, <em className="italic text-sage-deep">ever.</em>
          </p>
          <p className="max-w-[52ch] text-[14.5px] leading-relaxed text-ink-soft">
            Fuel money moves between riders, directly. Nexstopp never touches
            it and never takes a percentage — membership is our only revenue.
          </p>
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
