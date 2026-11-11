
import type { Metadata } from "next";
import ServicePage from "@/components/services/ServicePage";

export const metadata: Metadata = {
  title: "Umrah Packages | TravelHodie",
  description: "Enquire about Umrah travel arrangements and personalised package assistance with TravelHodie.",
};

export default function UmrahPage() {
  return (
    <ServicePage
      eyebrow="Umrah Travel Services"
      title="A Meaningful Journey. Thoughtfully Planned."
      description="Plan your Umrah journey with assistance for travel arrangements, accommodation enquiries and other essential trip requirements."
      heroImage="/images/landing/umrah-makkah-spiritual.jpg"
      benefits={[
        "Umrah travel package enquiries",
        "Flight booking assistance",
        "Hotel accommodation arrangements",
        "Group and family travel assistance",
        "Travel documentation guidance",
        "Personalised itinerary support",
      ]}
      steps={[
        "Share your preferred travel dates and number of travellers.",
        "Discuss your accommodation and travel requirements.",
        "Review the proposed arrangements and confirm your booking.",
      ]}
      ctaTitle="Planning Your Umrah Journey?"
      ctaDescription="Speak with our team about your preferred dates, group size and travel requirements to explore suitable arrangements."
    />
  );
}
