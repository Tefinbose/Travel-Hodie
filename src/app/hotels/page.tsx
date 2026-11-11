
import type { Metadata } from "next";
import ServicePage from "@/components/services/ServicePage";

export const metadata: Metadata = {
  title: "Hotel Reservations | TravelHodie",
  description: "Find accommodation options for your next domestic or international trip with TravelHodie.",
};

export default function HotelsPage() {
  return (
    <ServicePage
      eyebrow="Hotel Reservation Services"
      title="Find Your"
      titleHighlight="Perfect Stay."
      description="From comfortable family stays to premium holiday accommodation, get assistance finding a stay that suits your destination, preferences and budget."
      heroImage="/images/landing/hotels-luxury-resort.jpg"
      benefits={[
        "Accommodation options across destinations",
        "Family-friendly stay assistance",
        "Premium and luxury accommodation enquiries",
        "Options based on your budget",
        "Support with reservation details",
        "Stay planning for group travellers",
      ]}
      steps={[
        "Share your destination, check-in date and check-out date.",
        "Tell us your preferred accommodation type and budget.",
        "Our team will assist you with suitable options and reservation details.",
      ]}
      ctaTitle="Looking for the right place to stay?"
      ctaDescription="Share your accommodation requirements with TravelHodie and let us help you plan a comfortable stay."
    />
  );
}
