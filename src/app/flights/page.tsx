
import type { Metadata } from "next";
import ServicePage from "@/components/services/ServicePage";

export const metadata: Metadata = {
  title: "Flight Booking | TravelHodie",
  description: "Get assistance with domestic and international flight bookings through TravelHodie.",
};

export default function FlightsPage() {
  return (
    <ServicePage
      eyebrow="Flight Booking Services"
      title="Fly Anywhere. Travel Without Limits."
      description="Plan your next journey with flight booking assistance for domestic and international destinations. Let our team help you explore suitable travel options."
      heroImage="/images/hero-airplane-island.jpg"
      benefits={[
        "Domestic and international flight assistance",
        "Options based on your travel preferences",
        "Support with itinerary planning",
        "Individual and group flight enquiries",
        "Assistance with booking-related queries",
        "Personalised travel support",
      ]}
      steps={[
        "Share your departure city, destination and travel dates.",
        "Our team will help you explore suitable flight options.",
        "Confirm your preferred itinerary and booking details.",
      ]}
      ctaTitle="Ready to book your next flight?"
      ctaDescription="Tell us where you want to go and our team will help you plan your flight."
    />
  );
}
