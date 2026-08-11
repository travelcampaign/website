import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Safety from "@/components/Safety";
import Membership from "@/components/Membership";
import Pact from "@/components/Pact";
import FAQ from "@/components/FAQ";
import SurveyCTA from "@/components/SurveyCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Safety />
        <Membership />
        <Pact />
        <FAQ />
        <SurveyCTA />
      </main>
      <Footer />
    </>
  );
}
