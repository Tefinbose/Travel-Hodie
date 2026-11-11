
import type { Metadata } from "next";
import ServicePage from "@/components/services/ServicePage";

export const metadata: Metadata = {
  title: "Travel Insurance | TravelHodie",
  description: "Explore travel insurance assistance for domestic and international journeys with TravelHodie.",
};

export default function InsurancePage() {
  return (
    <ServicePage
      eyebrow="Travel Insurance Assistance"
      title="Travel With"
      titleHighlight="Greater Peace of Mind."
      description="Understand travel insurance options for your upcoming journey. Our team can help you explore available plans and understand their coverage and conditions."
      heroImage="/images/hero/alpine-peaks-twilight.jpg"
      benefits={[
        "Domestic and international travel enquiries",
        "Assistance exploring insurance options",
        "Information about policy coverage",
        "Guidance on travel insurance requirements",
        "Support with policy-related queries",
        "Assistance during travel planning",
      ]}
      steps={[
        "Share your destination, travel dates and traveller details.",
        "Explore available insurance plans and their coverage.",
        "Review the policy terms before selecting a suitable plan.",
      ]}
      ctaTitle="Planning a safer journey?"
      ctaDescription="Contact TravelHodie to explore travel insurance options. Coverage, exclusions and eligibility depend on the insurer and selected policy."
    />
  );
}
