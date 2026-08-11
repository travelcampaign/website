import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Nexstopp",
  description:
    "How Nexstopp collects, uses, and protects your data. We never sell your personal information.",
};

const list = "list-disc pl-5 space-y-2";

const sections: LegalSection[] = [
  {
    heading: "1. Who we are",
    body: (
      <p>
        Nexstopp is a carpooling platform for India built around community and
        safety. We are currently running a pilot in Hyderabad. We connect
        verified community members who are already travelling the same way so
        they can share the ride. We are a technology platform, not a taxi
        service or transport operator, and we never process payments for rides.
      </p>
    ),
  },
  {
    heading: "2. Information we collect",
    body: (
      <>
        <p>We collect only what we need to run a safe carpool:</p>
        <ul className={list}>
          <li>
            <strong>Account details</strong>: your mobile number (verified by a
            one-time password), name, and gender. You may add a profile photo.
          </li>
          <li>
            <strong>Identity verification (KYC)</strong>: to keep the community
            trusted, we verify a government ID. We store your verification{" "}
            <em>status</em> and a masked reference (for example, only the last
            few digits), not full ID numbers where it can be avoided.
          </li>
          <li>
            <strong>Vehicle details</strong>: vehicle type, make/model, and
            registration number, if you host rides.
          </li>
          <li>
            <strong>Location</strong>: precise GPS only while a ride is active
            and during a short safety window after the ride. We use it for live
            tracking, for route-deviation and inactivity checks, and to match
            you with people going your way.
          </li>
          <li>
            <strong>Guardians (emergency contacts)</strong>: the names and phone
            numbers you choose to add. We use these only to alert them if a
            safety check is triggered.
          </li>
          <li>
            <strong>Ride & community data</strong>: routes, times, ride history,
            ratings, and your trust score.
          </li>
          <li>
            <strong>Device & usage</strong>: basic diagnostics needed to keep
            the app working.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "3. How we use your information",
    body: (
      <ul className={list}>
        <li>Match you with hosts and riders travelling the same route.</li>
        <li>
          Run safety features: live tracking, route-deviation and inactivity
          detection, SOS, and guardian alerts.
        </li>
        <li>Maintain trust scores, ratings, and identity verification.</li>
        <li>Manage your membership and provide customer support.</li>
        <li>Keep the platform secure and prevent fraud or misuse.</li>
      </ul>
    ),
  },
  {
    heading: "4. Location, in detail",
    body: (
      <p>
        We access precise location only while you are in an active ride and for a
        short safety window (up to 30 minutes) after it ends. Ending a ride stops
        location sharing. We use Google Maps to draw routes and estimate travel
        times. We do not track your location in the background when you are not on
        a ride.
      </p>
    ),
  },
  {
    heading: "5. When we share information",
    body: (
      <>
        <p>
          <strong>We never sell your personal data.</strong> We earn from
          membership fees, not from advertising to you or profiling you. We
          share data only in these limited situations:
        </p>
        <ul className={list}>
          <li>
            <strong>With other members, to make a ride work</strong>: a host and
            rider see each other&apos;s first name, trust score, verification
            badge, pickup point, and live location during the shared ride.
          </li>
          <li>
            <strong>With service providers who help us operate</strong>: Twilio
            (to send OTP and guardian SMS) and Google Maps (routing and
            geocoding). They may process data only on our instructions.
          </li>
          <li>
            <strong>Your guardians, during a safety event</strong>: if a safety
            check is triggered, we share your live location and profile with the
            emergency contacts you added.
          </li>
          <li>
            <strong>When the law requires it</strong>: to comply with a valid
            legal request, or to protect someone&apos;s safety in an emergency.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "6. Payments",
    body: (
      <p>
        Nexstopp is peer-to-peer. Any money members choose to share toward fuel
        or costs is settled directly between them, for example by cash or UPI.
        We do not collect, hold, or process it, and we take no commission. The
        only payment we handle is your optional membership subscription.
      </p>
    ),
  },
  {
    heading: "7. How long we keep it",
    body: (
      <p>
        We keep your information while your account is active and for as long as
        needed to provide the service, resolve disputes, and meet legal
        obligations. You can ask us to delete your account and associated data at
        any time.
      </p>
    ),
  },
  {
    heading: "8. Your choices and rights",
    body: (
      <ul className={list}>
        <li>Access and correct your profile information in the app.</li>
        <li>Add or remove guardians at any time.</li>
        <li>Turn location sharing off by ending a ride.</li>
        <li>Request a copy of your data, or ask us to delete your account.</li>
        <li>Withdraw consent for optional processing.</li>
      </ul>
    ),
  },
  {
    heading: "9. Identity documents and Aadhaar",
    body: (
      <p>
        Where identity verification uses Aadhaar, we handle it with your explicit
        consent and follow applicable law, including masking. We do not store
        your full Aadhaar number. You are never required to share your Aadhaar to
        use safety features, which are free for everyone.
      </p>
    ),
  },
  {
    heading: "10. Security",
    body: (
      <p>
        We protect your data with measures such as OTP-based sign-in, encrypted
        transport, access controls, and masking of sensitive identifiers. No
        system is perfectly secure, but we work to keep your information safe and
        to limit what we collect in the first place.
      </p>
    ),
  },
  {
    heading: "11. Children",
    body: (
      <p>
        Nexstopp is for adults. You must be at least 18 years old to create an
        account.
      </p>
    ),
  },
  {
    heading: "12. Changes to this policy",
    body: (
      <p>
        We may update this policy as the product grows. We will revise the “last
        updated” date above and, for significant changes, notify you in the app.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="2 July 2026"
      intro={
        <p>
          This policy explains what information Nexstopp collects, how we use
          it, and the choices you have. We collect only what a safe carpool
          needs, and we never sell your data.
        </p>
      }
      sections={sections}
    />
  );
}
