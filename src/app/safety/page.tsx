import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WAITLIST_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Safety",
  alternates: { canonical: "/safety" },
  description:
    "Nexstopp safety includes verified riders, live location sharing with trusted contacts, safety check-ins, SOS, and quick access to 112.",
};

/* The safety page states exactly what the product does, then states what it
   does not do. The second half is what makes the first half believable. */

const LAYERS = [
  {
    title: "Verified people on relevant routes",
    body: "Everyone signs up with a verified phone number. The Verified badge appears only after identity review. You match with commuters whose route overlaps yours.",
  },
  {
    title: "Live sharing with trusted contacts",
    body: "Add a parent, partner or friend. During a ride they can open your live location and follow the trip on the map.",
  },
  {
    title: "Check-ins for unusual ride activity",
    body: "If the ride stays still too long or moves far from the planned route, the app asks if you are okay. If you do not reply, your trusted contacts get your position.",
  },
  {
    title: "SOS, one tap",
    body: "Tap SOS to share your live location with your trusted contacts. The same screen helps you call 112.",
  },
  {
    title: "30 minutes after the ride",
    body: "Trusted contacts stay connected for half an hour after the ride ends, so the safety window does not stop at the drop point.",
  },
];

const LIMITS = [
  "We do not call the police for you. We help you call 112 and share your location with the people you selected.",
  "We do not watch you between rides. Location sharing runs during an active ride only.",
  "We do not charge for safety. These features are free on every plan.",
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
              Safety features designed for{" "}
              <em className="italic text-sage">shared rides.</em>
            </h1>
            <p className="mt-7 max-w-[50ch] text-[17px] leading-[1.7] text-dusk-dim">
              Share live location with trusted contacts, get check-ins when a
              ride looks unusual, and use SOS when something feels wrong. Every
              safety feature here is free.
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
                What Nexstopp does not do
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
