/* FAQ — objection handling in a human voice, on cream. Native
   <details>/<summary> accordion: zero JS, works everywhere.
   Every answer states only what the product actually does. */

export const QA: { q: string; a: string }[] = [
  {
    q: "How do I know who I'm riding with?",
    a: "Everyone signs up with a verified phone number. The Verified badge appears only after identity review. Drivers see who wants to join, riders see who is driving, and the ride is confirmed only when both sides accept.",
  },
  {
    q: "Who watches over my ride?",
    a: "The people you choose. Add a parent, partner or friend as a trusted contact. They can follow your live ride location. If you press SOS or miss a safety check-in, they get your location and ride details quickly. You can call 112 from the same screen.",
  },
  {
    q: "Why zero commission? What's the catch?",
    a: "There is no ride commission because Nexstopp does not process ride payments. Riders pay the driver directly for fuel. Our income comes from optional membership plans, and safety is free on every plan.",
  },
  {
    q: "Is my location data shared or sold?",
    a: "Your live location is shared only during a ride, with your co-riders and the trusted contacts you chose. We do not sell personal data. You can delete your account and personal data from inside the app.",
  },
  {
    q: "When can I actually use it?",
    a: "We are starting in Hyderabad. The first invites go to people on a few busy routes, so matches are useful from day one. Join the waitlist and we will contact you when your route opens.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="relative z-[4] -mt-[3px] bg-cream">
      <div className="mx-auto max-w-[840px] px-6 py-28 sm:px-12">
        <p className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.22em] text-sage-deep">
          Questions people ask
        </p>
        <h2 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(34px,4.2vw,50px)] font-normal leading-[1.1] tracking-[-0.01em] text-ink">
          Common <span className="text-sage-deep">questions.</span>
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
