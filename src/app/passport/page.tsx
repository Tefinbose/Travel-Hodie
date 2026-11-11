
import type { Metadata } from "next";
import ServicePage from "@/components/services/ServicePage";

export const metadata: Metadata = {
  title: "Passport Assistance | TravelHodie",
  description: "Get guidance on passport application and renewal procedures with TravelHodie.",
};

export default function PassportPage() {
  return (
    <ServicePage
      eyebrow="Passport Assistance"
      title="Get Ready for Your Next Journey."
      description="Need help understanding passport application or renewal procedures? Our team can guide you through general documentation requirements and the applicable application process."
      heroImage="/images/scrapbook/boarding-pass-passport-stamps.jpg"
      benefits={[
        "General passport application guidance",
        "Passport renewal procedure information",
        "Documentation checklist assistance",
        "Guidance on application steps",
        "Information about appointment procedures",
        "Travel documentation support",
      ]}
      steps={[
        "Tell us whether you need a new passport or renewal guidance.",
        "Our team will explain the general documentation requirements.",
        "Complete the official application through the authorised government portal.",
      ]}
      ctaTitle="Need Help With Your Passport?"
      ctaDescription="Contact TravelHodie for general passport procedure guidance. Passport applications and approvals are handled by the relevant government authorities."
    />
  );
}
