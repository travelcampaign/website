import Link from "next/link";

/* 404 in the site's own voice. A dead end phrased as a missed stop:
   the reader is told plainly nothing is here, and handed the way home. */

export default function NotFound() {
  return (
    <main className="dusk-ground grain relative flex min-h-screen items-center overflow-hidden">
      <div className="relative z-[2] mx-auto w-full max-w-[1200px] px-6 py-24 sm:px-12">
        <p className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.22em] text-sage">
          404 · Wrong stop
        </p>
        <h1 className="mt-6 max-w-[16ch] font-[family-name:var(--font-display)] text-[clamp(40px,6vw,72px)] font-normal leading-[1.06] tracking-[-0.015em] text-dusk-text">
          This street doesn&apos;t <em className="italic text-sage">go anywhere.</em>
        </h1>
        <p className="mt-6 max-w-[44ch] text-[16.5px] leading-[1.7] text-dusk-dim">
          The page you were looking for has moved, or never existed. The ride
          home is this way.
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="press inline-block rounded-full bg-sage px-8 py-4 text-base font-semibold text-night-0 transition-colors hover:bg-[#7FC0A6]"
          >
            Back to Nexstopp
          </Link>
        </div>
      </div>
    </main>
  );
}
