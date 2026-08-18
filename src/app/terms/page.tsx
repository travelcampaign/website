import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  alternates: { canonical: "/terms" },
  description:
    "The terms for using Nexstopp, a community ride-sharing platform. Members share costs directly with each other, and Nexstopp takes no commission.",
};

const list = "list-disc pl-5 space-y-2";

const sections: LegalSection[] = [
  {
    heading: "1. Accepting these terms",
    body: (
      <p>
        By creating an account or using Nexstopp, you accept these Terms. If
        you do not agree with any part of them, contact us at
        hello@nexstopp.com before signing up so we can address your concern.
      </p>
    ),
  },
  {
    heading: "2. What Nexstopp is (and isn't)",
    body: (
      <>
        <p>
          Nexstopp is a technology platform that helps community members who are
          already travelling the same way find each other and share the ride. We
          are an intermediary that connects people.
        </p>
        <ul className={list}>
          <li>We are not a taxi service, transport operator, or aggregator.</li>
          <li>We do not own vehicles or employ drivers.</li>
          <li>
            Rides are arranged directly between members. Nexstopp is not a party
            to the ride.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "3. Who can use Nexstopp",
    body: (
      <ul className={list}>
        <li>You must be at least 18 years old.</li>
        <li>You must provide accurate information and complete identity verification.</li>
        <li>
          To host, you must hold a valid driving licence and have a roadworthy,
          insured, and properly registered vehicle.
        </li>
      </ul>
    ),
  },
  {
    heading: "4. Cost-sharing, not fares",
    body: (
      <p>
        Nexstopp is built for genuine cost-sharing, not profit. Any amount members
        contribute toward fuel or running costs is voluntary and shared directly
        between them. It is not a commercial fare. Nexstopp does not set, collect,
        or take a commission on it, and members must not use the platform to run a
        commercial transport business.
      </p>
    ),
  },
  {
    heading: "5. Membership and payments",
    body: (
      <ul className={list}>
        <li>
          Core use and all safety features are free. You can also pay for an
          optional membership plan that adds convenience features.
        </li>
        <li>
          Membership is billed for the plan you choose. You can cancel anytime;
          cancellation stops future renewals.
        </li>
        <li>
          Nexstopp never processes payments between riders. Riders settle those
          directly with each other.
        </li>
      </ul>
    ),
  },
  {
    heading: "6. Your responsibilities",
    body: (
      <ul className={list}>
        <li>Keep your profile accurate and your account secure.</li>
        <li>Treat other members with respect; no harassment or discrimination.</li>
        <li>
          Follow all traffic laws; hosts are responsible for their vehicle,
          licence, and insurance.
        </li>
        <li>Do not impersonate anyone or create fake accounts.</li>
        <li>Do not use the platform for any unlawful or commercial-taxi purpose.</li>
      </ul>
    ),
  },
  {
    heading: "7. Safety features",
    body: (
      <p>
        Nexstopp provides safety tools to help keep you safe: live tracking,
        route-deviation and inactivity checks, SOS, and guardian alerts. They
        are provided on a best-effort basis and are not a substitute for the
        emergency services. In any emergency, call 112 directly. We cannot
        guarantee that an alert will always be delivered, for example if there is
        no network coverage.
      </p>
    ),
  },
  {
    heading: "8. Trust, ratings, and access",
    body: (
      <p>
        Ratings and trust scores help the community stay safe. We may limit,
        suspend, or remove access for members who receive serious safety reports,
        break these Terms, or put others at risk.
      </p>
    ),
  },
  {
    heading: "9. Prohibited conduct",
    body: (
      <ul className={list}>
        <li>Fraud, fake identities, or manipulating trust scores.</li>
        <li>Harassment, threats, or discrimination.</li>
        <li>Running a commercial taxi or charging fares through the platform.</li>
        <li>Interfering with or circumventing safety features.</li>
      </ul>
    ),
  },
  {
    heading: "10. Our role and liability",
    body: (
      <p>
        Nexstopp acts as an intermediary that connects members. Because rides are
        arranged and carried out between members, we are not responsible for their
        conduct or for the ride itself. To the extent permitted by law, Nexstopp
        is not liable for losses arising from a ride, another member&apos;s
        actions, or events outside our reasonable control. Nothing in these Terms
        limits any liability that cannot be limited under applicable law.
      </p>
    ),
  },
  {
    heading: "11. Suspension and termination",
    body: (
      <p>
        You may stop using Nexstopp and delete your account at any time. We may
        suspend or end your access if you break these Terms or create a safety
        risk for others.
      </p>
    ),
  },
  {
    heading: "12. Governing law",
    body: (
      <p>
        These Terms are governed by the laws of India. Any disputes are subject to
        the courts of Hyderabad, Telangana.
      </p>
    ),
  },
  {
    heading: "13. Changes to these terms",
    body: (
      <p>
        We may update these Terms as the product changes. We will revise the “last
        updated” date above and, for significant changes, notify you in the app.
        Continuing to use Nexstopp after an update means you accept the new Terms.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      lastUpdated="2 July 2026"
      intro={
        <p>
          These Terms explain how Nexstopp works and what we each agree to. In
          short, Nexstopp is a platform that helps community members share rides
          they are already taking. Members only share costs, directly with each
          other, and Nexstopp takes no commission.
        </p>
      }
      sections={sections}
    />
  );
}
