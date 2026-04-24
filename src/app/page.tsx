import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RouteJourney from "@/components/RouteJourney";
import HowItWorks from "@/components/HowItWorks";
import Safety from "@/components/Safety";
import Membership from "@/components/Membership";
import Community from "@/components/Community";
import SurveyCTA from "@/components/SurveyCTA";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <RouteJourney />
        <HowItWorks />
        <Safety />
        <Membership />
        <Community />
        <SurveyCTA />
      </main>
      <Footer />
    </>
  );
}
