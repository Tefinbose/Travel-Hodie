
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import ContactMap from "@/components/contact/ContactMap";

interface ContactPageProps {
  searchParams: Promise<{
    package?: string;
  }>;
}

export const instant = false;

export const metadata = {
  title: "Contact Us | TravelHodie",
  description:
    "Contact TravelHodie for holiday packages, flight bookings, hotels, visa assistance and personalised travel services.",
};

export default async function ContactPage({
  searchParams,
}: ContactPageProps) {
  const params = await searchParams;
  const packageName = params.package?.trim() || "";

  return (
    <main className="min-h-screen bg-gray-50">
      <ContactHero />

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16">
        <ContactInfo />

        <ContactForm packageName={packageName} />
      </section>

      <ContactMap />
    </main>
  );
}
