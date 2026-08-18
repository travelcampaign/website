import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WAITLIST_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Safety",
  alternates: { canonical: "/safety" },
  description:
    "How Nexstopp keeps riders safe: guardians you choose watching live GPS, check-ins when something looks off, one-tap SOS, and help reaching 112. All of it free, for every rider.",
};

/* The safety page states exactly what the product does, then states what it
   does not do. The second half is what makes the first half believable. */

const LAYERS = [
  {
    title: "Verified people, matched by route",
    body: "Everyone signs up with a verified phone number, and the Verified badge appears only after identity documents are reviewed. You ride with commuters whose route genuinely overlaps yours, and nobody joins a ride until both sides say yes.",
  },
  {
    title: "Guardians you choose",
    body: "Pick the people who watch over you: a parent, a partner, a close friend. During a ride they can open your live location and follow the car on the map for the whole trip.",
  },
  {
    title: "Check-ins when something looks off",
    body: "If the car stays still too long, or drifts far from the planned route, the app asks if you are okay. No reply, and your guardians are alerted with your exact position.",
  },
  {
    title: "SOS, one tap",
    body: "One tap shares your live location with your guardians and keeps updating it while they watch. The app also helps you call 112 immediately.",
  },
  {
    title: "The 30-minute rule",
    body: "Guardians stay connected for half an hour after your ride ends, because arriving at the drop point is not the same as being home.",
  },
];

const LIMITS = [
  "We do not call the police for you. We help you call 112 and make sure the people who love you know exactly where you are, immediately.",
  "We do not watch you between rides. Location is shared during a ride only, and only with your co-riders and the guardians you chose.",
  "We do not charge for any of this. Safety features never appear on a pricing page, and never will.",
];

export default function SafetyPage() {
  return (
    <>
      <Navbar />
      <main>
        <header className="night-ground grain relative overflow-hidden">
          <div className="relative z-[2] mx-auto max-w-[1200px] px-6 pb-24 pt-36 sm:px-12">
            <p className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.22em] text-ember">
              Safety
            </p>
            <h1 className="mt-6 max-w-[15ch] font-[family-name:var(--font-display)] text-[clamp(40px,5.6vw,68px)] font-normal leading-[1.08] tracking-[-0.015em] text-dusk-text">
              Someone always knows{" "}
              <em className="italic text-sage">you&apos;re moving.</em>
            </h1>
            <p className="mt-7 max-w-[50ch] text-[17px] leading-[1.7] text-dusk-dim">
              Every protection on this page is free, for every rider, on every
              ride. This is the reason Nexstopp exists, so it is the one part
              of the product that money can never touch.
            </p>
          </div>
        </header>

        {/* the protection layers, in ride order */}
        <section className="night-ground grain relative overflow-hidden">
          <div className="relative z-[2] mx-auto max-w-[900px] px-6 pb-16 sm:px-12">
            <div className="flex flex-col gap-5">
              {LAYERS.map((l) => (
                <div
                  key={l.title}
                  className="rounded-[18px] border border-[rgba(242,238,229,0.09)] bg-[rgba(242,238,229,0.03)] p-7"
                >
                  <h2 className="text-[19px] font-semibold text-dusk-text">
                    {l.title}
                  </h2>
                  <p className="mt-2.5 text-[15px] leading-[1.7] text-dusk-dim">
                    {l.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* the honest edge: what we do not do */}
        <section className="night-ground grain relative overflow-hidden">
          <div className="relative z-[2] mx-auto max-w-[900px] px-6 pb-24 sm:px-12">
            <div className="rounded-[18px] border border-[rgba(249,115,22,0.25)] bg-[rgba(249,115,22,0.06)] p-8">
              <h2 className="font-[family-name:var(--font-display)] text-[26px] font-normal text-dusk-text">
                What we don&apos;t promise
              </h2>
              <ul className="mt-6 flex flex-col gap-4">
                {LIMITS.map((l) => (
                  <li
                    key={l}
                    className="border-l-2 border-[rgba(249,115,22,0.4)] pl-4 text-[15px] leading-[1.7] text-dusk-dim"
                  >
                    {l}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[13.5px] text-dusk-mute">
                In an emergency, always call 112.
              </p>
            </div>

            <div className="mt-14 text-center">
              <a
                href={WAITLIST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="press inline-block rounded-full bg-sage px-10 py-4 text-[16px] font-semibold text-night-0 transition-colors hover:bg-[#7FC0A6]"
              >
                Join the waitlist
              </a>
            </div>
          </div>
          <div className="bridge-to-cream" aria-hidden="true" />
        </section>
      </main>
      <Footer />
    </>
  );
}
