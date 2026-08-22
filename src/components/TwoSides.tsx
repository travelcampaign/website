/* The marketplace has two sides, and until this section the site only
   spoke to one. Riders and drivers want different things from the same
   ride; each gets its own panel, and the driving panel goes night because
   the driver is the one opening their car to strangers. */

const RIDING = [
  "Find drivers already taking your office route",
  "Check the driver profile before accepting",
  "Share live trip status with trusted contacts",
  "Pay only your fuel share, directly to the driver",
];

const DRIVING = [
  "Turn empty seats into fuel savings",
  "Approve every rider before they join",
  "Keep pickups close to your existing route",
  "Receive fuel contributions directly, with no commission",
];

export default function TwoSides() {
  return (
    <section className="relative z-[4] -mt-[3px] bg-cream">
      <div className="mx-auto max-w-[1200px] px-6 py-28 sm:px-12">
        <div className="max-w-[62ch]">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(34px,4.4vw,52px)] font-normal leading-[1.12] tracking-[-0.01em] text-ink">
            Most cars on your road carry{" "}
            <span className="text-sage-deep">one person.</span>
          </h2>
          <p className="mt-6 text-[16.5px] leading-[1.7] text-ink-soft">
            Riders reduce commute costs. Drivers recover part of their fuel.
            Nexstopp connects both sides without taking a cut from the ride.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* riding: the demand side, on paper */}
          <div className="rounded-[18px] border border-[#E2DBCB] bg-white p-8 sm:p-10">
            <p className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.2em] text-sage-deep">
              If you&apos;re riding
            </p>
            <ul className="mt-7 flex flex-col gap-4">
              {RIDING.map((item) => (
                <li key={item} className="flex items-start gap-3.5">
                  <span className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-sage-deep" />
                  <span className="text-[15.5px] leading-[1.6] text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* driving: the supply side, in the night */}
          <div className="night-ground rounded-[18px] border border-[rgba(242,238,229,0.10)] p-8 sm:p-10">
            <p className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.2em] text-sage">
              If you&apos;re driving
            </p>
            <ul className="mt-7 flex flex-col gap-4">
              {DRIVING.map((item) => (
                <li key={item} className="flex items-start gap-3.5">
                  <span className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-sage" />
                  <span className="text-[15.5px] leading-[1.6] text-dusk-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 max-w-[58ch] text-[15px] leading-[1.7] text-ink-soft">
          The first Hyderabad invites go corridor by corridor, so early users
          see real matches instead of an empty app.
        </p>
      </div>
    </section>
  );
}
