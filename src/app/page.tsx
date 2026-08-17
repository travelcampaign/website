import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import JourneyScroll from "@/components/JourneyScroll";
import Safety from "@/components/Safety";
import Membership from "@/components/Membership";
import Pact from "@/components/Pact";
import FAQ, { QA } from "@/components/FAQ";
import SurveyCTA from "@/components/SurveyCTA";
import Footer from "@/components/Footer";

// FAQPage schema mirrors the visible accordion word for word. Search
// engines cross-check rendered content against schema; divergence is how
// rich results get revoked.
const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: QA.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <JourneyScroll />
        <Safety />
        <Membership />
        <Pact />
        <FAQ />
        <SurveyCTA />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
    </>
  );
}
