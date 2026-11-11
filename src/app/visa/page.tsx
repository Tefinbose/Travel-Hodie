
import type { Metadata } from "next";
import ServicePage from "@/components/services/ServicePage";

export const metadata: Metadata = {
  title: "Visa Assistance | TravelHodie",
  description: "Get travel visa application guidance and documentation assistance with TravelHodie.",
};

export default function VisaPage() {
  return (
    <ServicePage
      eyebrow="Visa Assistance"
      title="Prepare for Your International Journey."
      description="Understand the visa application process with assistance from our travel team. Get guidance on documentation, application requirements and the next steps for your intended destination."
      heroImage="/images/scrapbook/boarding-pass-passport-stamps.jpg"
      benefits={[
        "Destination-specific visa guidance",
        "Application documentation assistance",
        "Information about visa requirements",
        "Support with application preparation",
        "Guidance on application procedures",
        "Assistance with travel-related queries",
      ]}
      steps={[
        "Share your destination, nationality and intended travel dates.",
        "Our team will explain the relevant application requirements.",
        "Prepare your documents and follow the applicable visa process.",
      ]}
      ctaTitle="Planning an international trip?"
      ctaDescription="Contact our team to discuss the visa requirements for your destination. Visa approval is always subject to the relevant authorities."
    />
  );
}
