/* FAQ — objection handling in a human voice, on cream. Native
   <details>/<summary> accordion: zero JS, works everywhere.
   Every answer states only what the product actually does. */

const QA: { q: string; a: string }[] = [
  {
    q: "How do I know who I'm riding with?",
    a: "Everyone on Nexstopp signs up with an OTP-verified phone number and submits identity verification that is reviewed before a 'Verified' badge appears. Matching only pairs you with commuters whose posted route genuinely overlaps yours — hosts see who's asking to join, and riders see who's driving, before anyone confirms.",
  },
  {
    q: "What does the guardian system actually do?",
    a: "You pick your guardians — a parent, partner or friend. While you ride, they can watch your live GPS. If you press SOS, or the app notices you've gone quiet and you don't respond to a check-in, your guardians are alerted with your live location and ride details, and the app helps you call 112 immediately. We don't claim to contact the police for you — we make sure the people who care about you know, fast.",
  },
  {
    q: "Why is there zero commission — what's the catch?",
    a: "There isn't one. Fuel money moves directly between riders; Nexstopp never touches it, so there's nothing to take a cut of. The plan is for optional membership to be our only revenue — and safety features are never part of any paid tier.",
  },
  {
    q: "Is my location data shared or sold?",
    a: "Your live location is shared only during a ride, only with the co-riders on it and the guardians you chose. We don't sell data — to advertisers or anyone else — and you can delete your account and personal data from inside the app.",
  },
  {
    q: "When can I actually use it?",
    a: "We're launching in Hyderabad first, starting with a small group from the waitlist so early rides are dense on a few corridors instead of thin everywhere. Join the waitlist and you'll hear from us before anyone else.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="bg-cream">
      <div className="mx-auto max-w-[840px] px-6 py-28 sm:px-12">
        <p className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.22em] text-sage-deep">
          Fair questions
        </p>
        <h2 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(34px,4.2vw,50px)] font-normal leading-[1.1] tracking-[-0.01em] text-ink">
          Asked by <em className="italic text-sage-deep">almost everyone.</em>
        </h2>

        <div className="mt-12 flex flex-col gap-3">
          {QA.map((item) => (
            <details
              key={item.q}
              className="group rounded-[18px] border border-[#E2DBCB] bg-white open:shadow-[0_16px_40px_rgba(35,44,42,0.08)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-7 py-5 [&::-webkit-details-marker]:hidden">
                <span className="text-[16.5px] font-semibold leading-snug text-ink">
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-[#E2DBCB] text-sage-deep transition-transform duration-200 group-open:rotate-45"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="px-7 pb-6 text-[15px] leading-[1.7] text-ink-soft">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
