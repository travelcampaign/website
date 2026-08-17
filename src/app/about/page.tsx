import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WAITLIST_URL, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
  description:
    "Why Nexstopp exists: community-run ride sharing for India where the platform only does well when riders do. Zero commission, safety free for everyone, starting in Hyderabad.",
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
    body: "Riders split fuel costs with each other, directly. Nexstopp takes no commission and holds no wallet, so there is no percentage to quietly raise later. Membership is our only income, and it stays optional.",
    tone: "paper" as const,
  },
  {
    title: "Safety is never the paid tier",
    body: "Live GPS for the people you trust, check-ins when something looks wrong, SOS with your exact location. All of it free, for every rider, always. A safety feature you have to pay for is a ransom, not a feature.",
    tone: "night" as const,
  },
  {
    title: "Your data is not the business",
    body: "Location is shared only during a ride, only with your co-riders and the people you chose. We do not sell data. The business has to survive on membership alone, and that is deliberate: it keeps us needing your trust more than your data.",
    tone: "tinted" as const,
  },
  {
    title: "One city, done properly",
    body: "We are starting in Hyderabad, on a handful of busy routes, so that rides actually fill. A ride app with no one on your route is a brochure. Depth first, then the next city.",
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
              Built so the city can{" "}
              <em className="italic text-sage">trust its own people.</em>
            </h1>
            <p className="mt-7 max-w-[52ch] text-[17px] leading-[1.7] text-dusk-dim">
              Every evening, thousands of cars leave the same offices for the
              same neighbourhoods, one person in each. Nexstopp exists to let
              those people ride together without a middleman taking the money
              or owning the trust.
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
                Nexstopp is being built in Hyderabad, for Hyderabad first. The
                app exists, the safety system exists, and the first riders come
                from the waitlist. We would rather tell you that plainly than
                pretend to be bigger than we are. The people who join now
                shape what this becomes.
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
