import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LaunchCountdown from "@/components/LaunchCountdown";
import { LAUNCH_AT, LAUNCH_LABEL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Launch",
  alternates: { canonical: "/launch" },
  description: `Nexstopp opens in Hyderabad on ${LAUNCH_LABEL}. Shared rides with zero commission and safety features that are free for every rider.`,
};

export default function LaunchPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <section className="dusk-ground grain relative min-h-screen overflow-hidden">
          <LaunchCountdown launchAt={LAUNCH_AT} />
          <div className="bridge-to-cream" aria-hidden="true" />
        </section>
      </main>
      <Footer />
    </>
  );
}
