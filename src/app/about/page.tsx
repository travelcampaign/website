import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WAITLIST_URL, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
  description:
    "Nexstopp helps Hyderabad commuters share regular routes with verified riders, live safety sharing, and zero ride commission.",
};

/* Every sentence here is a commitment the product already keeps. No team
   photos we don't have, no office we don't rent, no numbers that will
   read stale a month after launch. */

// tone: "night" pulls the section's darkness into the card. Safety gets it
// because on this site safety always lives in the night; the grid gets its
// rhythm from meaning, not from random tinting.
const STANCES = [
  {
    title: "We never touch the ride money",
    body: "Riders pay drivers directly for fuel. Nexstopp takes no ride commission and does not hold a platform wallet. Membership is our only income, and it stays optional.",
    tone: "paper" as const,
  },
  {
    title: "Safety is never the paid tier",
    body: "Live GPS for trusted contacts, safety check-ins and SOS are free for every rider. Paid plans can raise limits, but they do not unlock safety.",
    tone: "night" as const,
  },
  {
    title: "Your data is not the business",
    body: "Location is shared only during a ride, with your co-riders and the trusted contacts you choose. We do not sell personal data.",
    tone: "tinted" as const,
  },
  {
    title: "Hyderabad first",
    body: "We are opening route by route in Hyderabad so early users find real matches. A shared commute app works best when people on the same corridor join together.",
    tone: "paper" as const,
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* night header */}
        <header className="dusk-ground grain relative overflow-hidden">
          <div className="relative z-[2] mx-auto max-w-[1200px] px-6 pb-20 pt-36 sm:px-12">
            <p className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.22em] text-sage">
              About Nexstopp
            </p>
            <h1 className="mt-6 max-w-[16ch] font-[family-name:var(--font-display)] text-[clamp(40px,5.6vw,68px)] font-normal leading-[1.08] tracking-[-0.015em] text-dusk-text">
              Built for India&apos;s{" "}
              <em className="italic text-sage">everyday commute.</em>
            </h1>
            <p className="mt-7 max-w-[52ch] text-[17px] leading-[1.7] text-dusk-dim">
              The same office routes repeat every morning and evening.
              Nexstopp helps verified riders and drivers on those routes find
              each other, share the ride, and split fuel without paying a ride
              commission.
            </p>
          </div>
          <div className="bridge-to-cream" aria-hidden="true" />
        </header>

        {/* stances — the pact, restated as who we are */}
        <section className="relative z-[4] -mt-[3px] bg-cream">
          <div className="mx-auto max-w-[1200px] px-6 py-24 sm:px-12">
            <div className="grid gap-6 md:grid-cols-2">
              {STANCES.map((s) => {
                const shell =
                  s.tone === "night"
                    ? "night-ground border-[rgba(242,238,229,0.10)]"
                    : s.tone === "tinted"
                      ? "bg-cream-deep border-[#DCD4C2]"
                      : "bg-white border-[#E2DBCB]";
                const heading =
                  s.tone === "night" ? "text-dusk-text" : "text-ink";
                const copy =
                  s.tone === "night" ? "text-dusk-dim" : "text-ink-soft";
                return (
                  <div
                    key={s.title}
                    className={`rounded-[18px] border p-8 ${shell}`}
                  >
                    <h2
                      className={`font-[family-name:var(--font-display)] text-[24px] font-normal leading-snug ${heading}`}
                    >
                      {s.title}
                    </h2>
                    <p className={`mt-4 text-[15.5px] leading-[1.7] ${copy}`}>
                      {s.body}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* the honest present tense */}
            <div className="mt-14 max-w-[62ch]">
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(28px,3.4vw,38px)] font-normal leading-[1.15] text-ink">
                Where we are <span className="text-sage-deep">right now.</span>
              </h2>
              <p className="mt-5 text-[16px] leading-[1.75] text-ink-soft">
                Nexstopp is being built for Hyderabad first. The first invites
                go to waitlist members on routes where we can create useful
                matches. Join now, tell us your commute, and help us open the
                right corridors first.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={WAITLIST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press rounded-full bg-sage-deep px-8 py-4 text-[15.5px] font-semibold text-white transition-colors hover:bg-[#4A7D6A]"
                >
                  Join the waitlist
                </a>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="press rounded-full border border-[#CDC4AE] px-8 py-4 text-[15.5px] font-semibold text-ink transition-colors hover:border-sage-deep hover:text-sage-deep"
                >
                  Write to us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
