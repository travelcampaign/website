import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refunds & Cancellation",
  alternates: { canonical: "/refunds" },
  description:
    "How membership billing, cancellation, and refunds work on Nexstopp. Ride cost-sharing happens directly between riders and is not billed by us.",
};

/* Payment gateways in India require a published refund policy before
   activating live mode, and app stores require one for subscriptions.
   Everything here is deliberately conservative and plain: membership is
   the only thing Nexstopp ever charges for. */

const sections: LegalSection[] = [
  {
    heading: "What Nexstopp charges for",
    body: (
      <p>
        The only thing Nexstopp ever bills is the optional Plus membership.
        Fuel cost-sharing for rides happens directly between riders. That
        money never passes through Nexstopp, so we cannot charge, refund, or
        arbitrate it.
      </p>
    ),
  },
  {
    heading: "Cancelling your membership",
    body: (
      <p>
        You can cancel from inside the app at any time, and no reason is
        needed. Cancelling stops the next renewal. Your membership benefits
        continue until the end of the period you already paid for, and
        nothing renews after that. Every safety feature stays with you
        either way, because safety was never part of the paid plan.
      </p>
    ),
  },
  {
    heading: "Refunds",
    body: (
      <>
        <p>
          If you were charged in error, or you cancelled and were still
          billed, write to us within 7 days of the charge and we will refund
          it in full. Refunds go back to the original payment method,
          usually within 5 to 7 working days depending on your bank.
        </p>
        <p className="mt-4">
          Partly used membership months are not refunded pro-rata, which is
          also why the membership is monthly and cheap rather than annual
          and locked in.
        </p>
      </>
    ),
  },
  {
    heading: "How to reach us",
    body: (
      <p>
        Email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-trust underline">
          {CONTACT_EMAIL}
        </a>{" "}
        with the phone number on your account and the date of the charge. A
        person reads every one of these.
      </p>
    ),
  },
];

export default function RefundsPage() {
  return (
    <LegalPage
      title="Refunds & Cancellation"
      lastUpdated="17 August 2026"
      intro={
        <p>
          The short version: membership is the only thing we bill, you can
          cancel it anytime, and a wrong charge gets refunded in full. The
          detail is below.
        </p>
      }
      sections={sections}
    />
  );
}
