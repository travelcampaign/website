/* FAQ — objection handling in a human voice, on cream. Native
   <details>/<summary> accordion: zero JS, works everywhere.
   Every answer states only what the product actually does. */

export const QA: { q: string; a: string }[] = [
  {
    q: "How do I know who I'm riding with?",
    a: "Everyone on Nexstopp signs up with a verified phone number, and the Verified badge appears only after we review their identity documents. You are only matched with commuters whose route genuinely overlaps yours. Drivers see who is asking to join, riders see who is driving, and nobody is confirmed until both say yes.",
  },
  {
    q: "Who watches over my ride?",
    a: "Your own people do. Amma, your partner, your best friend, whoever you choose. While you ride, they can open your live location like they're sitting beside you. If you press SOS, or you go quiet and miss a check-in, they instantly get your exact location and ride details, and the app helps you call 112. We never claim to call the police for you. What we do is make sure the people who love you find out immediately.",
  },
  {
    q: "Why zero commission? What's the catch?",
    a: "There isn't one. Riders pay the driver directly for their share of the fuel, and Nexstopp never touches that money, so there is nothing to take a cut of. Our only income will be the optional membership plan, and safety is never something you pay for.",
  },
  {
    q: "Is my location data shared or sold?",
    a: "Your live location is shared only during a ride, and only with the co-riders on it and the guardians you chose. We do not sell data, to advertisers or anyone else. You can delete your account and personal data from inside the app.",
  },
  {
    q: "When can I actually use it?",
    a: "We are starting in Hyderabad. The first invites go to a small group from the waitlist, so that rides fill up properly on a few busy routes instead of being spread thin across the city. Join the waitlist and you will hear from us first.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="relative z-[4] -mt-[3px] bg-cream">
      <div className="mx-auto max-w-[840px] px-6 py-28 sm:px-12">
        <p className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.22em] text-sage-deep">
          Fair questions
        </p>
        <h2 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(34px,4.2vw,50px)] font-normal leading-[1.1] tracking-[-0.01em] text-ink">
          Asked by <span className="text-sage-deep">almost everyone.</span>
        </h2>

        <div className="mt-12 flex flex-col gap-3">
          {QA.map((item) => (
            <details
              key={item.q}
              className="group rounded-[18px] border border-[#E2DBCB] bg-white transition-[border-color,box-shadow] duration-300 hover:border-[#CDC4AE] open:border-sage-deep/40 open:shadow-[0_18px_44px_rgba(35,44,42,0.10)] open:hover:border-sage-deep/40"
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
