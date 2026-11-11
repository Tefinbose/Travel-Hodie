import type { Metadata } from "next";
import ServicePage from "@/components/services/ServicePage";

export const metadata: Metadata = {
  title: "Group Travel | TravelHodie",
  description: "Organize custom group tours, corporate trips, family vacations, and group holiday packages with TravelHodie.",
};

export default function GroupTravelPage() {
  return (
    <ServicePage
      eyebrow="Group Travel"
      title="Unforgettable Journeys,"
      titleHighlight="Better Together."
      description="Plan tailor-made group holidays, corporate retreats, educational journeys, and family reunions with TravelHodie's dedicated group travel experts."
      heroImage="/images/landing/group-travel-scenic.jpg"
      benefits={[
        "Customized itineraries tailored for groups of all sizes",
        "Discounted group fares on flights and hotel accommodations",
        "Dedicated group coordinator and on-trip assistance",
        "Specialized dining, transport, and private sightseeing",
        "Flexible payment options and simple group coordination",
        "24/7 dedicated travel support throughout your trip",
      ]}
      steps={[
        "Share your group size, preferred destinations, and travel dates.",
        "Our specialists prepare a personalized itinerary and package quote.",
        "Confirm your booking and enjoy a hassle-free group vacation.",
      ]}
      ctaTitle="Planning a trip with friends, family, or colleagues?"
      ctaDescription="Get in touch with our group travel coordinators to design your ideal group itinerary today."
    />
  );
}

