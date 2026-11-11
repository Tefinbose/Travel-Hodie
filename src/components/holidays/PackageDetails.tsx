
import Link from "next/link";

interface PackageDetailsProps {
  packageData: {
    id: string;
    title: string;
    slug: string;
    shortDescription: string | null;
    description: string;
    duration: string;
    price: number;
    image: string | null;
    destination: {
      name: string;
    };
  };
}

export default function PackageDetails({
  packageData,
}: PackageDetailsProps) {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative flex min-h-[420px] items-center bg-[#14243A]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url(${packageData.image || "/images/hero/tropical-island-lagoon.jpg"})`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#14243A] via-[#14243A]/90 to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-28 md:pt-36">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#E5B96D]">
            Explore Holiday Packages
          </p>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {packageData.title}
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
            {packageData.shortDescription ||
              packageData.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/90">
            <span>📍 {packageData.destination.name}</span>
            <span>🕒 {packageData.duration}</span>
          </div>
        </div>
      </section>

      {/* Package Content */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1fr_360px]">
        {/* Left Content */}
        <div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C62835]">
              About This Journey
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#14243A]">
              Discover Your Next Adventure
            </h2>

            <div className="mt-6 whitespace-pre-line text-base leading-8 text-gray-600">
              {packageData.description}
            </div>
          </div>

          {/* Package Highlights */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-[#14243A]">
              Why Choose This Package?
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="rounded-xl bg-gray-50 p-6">
                <span className="text-2xl">✈️</span>
                <h3 className="mt-3 font-semibold text-[#14243A]">
                  Memorable Experiences
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Discover destinations and create unforgettable travel
                  memories.
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-6">
                <span className="text-2xl">🧳</span>
                <h3 className="mt-3 font-semibold text-[#14243A]">
                  Carefully Planned
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Travel arrangements designed to make your journey
                  convenient and comfortable.
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-6">
                <span className="text-2xl">🤝</span>
                <h3 className="mt-3 font-semibold text-[#14243A]">
                  Personalised Assistance
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Our team is available to help with your travel
                  requirements.
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-6">
                <span className="text-2xl">🌍</span>
                <h3 className="mt-3 font-semibold text-[#14243A]">
                  Explore More
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Enjoy a travel experience tailored to your interests.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-7 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#C62835]">
            Package Price
          </p>

          <div className="mt-3">
            <span className="text-3xl font-bold text-[#14243A]">
              ₹{packageData.price.toLocaleString("en-IN")}
            </span>

            <span className="ml-2 text-sm text-gray-500">
              / person
            </span>
          </div>

          <div className="my-6 space-y-4 border-y border-gray-100 py-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Destination</span>
              <span className="font-semibold text-[#14243A]">
                {packageData.destination.name}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Duration</span>
              <span className="font-semibold text-[#14243A]">
                {packageData.duration}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Package</span>
              <span className="font-semibold text-[#14243A]">
                Holiday Tour
              </span>
            </div>
          </div>

          {/* Book This Package Button */}
          <Link
            href={`/booking/${packageData.slug}`}
            className="inline-flex w-full items-center justify-center rounded-lg bg-[#C62835] px-6 py-3 font-semibold text-white transition hover:bg-[#a91e2a]"
          >
            Book This Package
          </Link>

          {/* Enquiry Button */}
          <Link
            href={`/contact?package=${encodeURIComponent(
              packageData.title
            )}`}
            className="mt-3 inline-flex w-full items-center justify-center rounded-lg border border-[#14243A] px-6 py-3 font-semibold text-[#14243A] transition hover:bg-[#14243A] hover:text-white"
          >
            Send an Enquiry
          </Link>

          <p className="mt-5 text-center text-xs leading-5 text-gray-500">
            Final availability and pricing will be confirmed by our
            TravelHodie team.
          </p>
        </aside>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#14243A] px-5 py-16 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E5B96D]">
            TravelHodie
          </p>

          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Ready to Begin Your Journey?
          </h2>

          <p className="mt-4 leading-7 text-white/70">
            Let us help you plan a comfortable and memorable travel
            experience.
          </p>

          <Link
            href={`/booking/${packageData.slug}`}
            className="mt-8 inline-flex rounded-lg bg-[#C62835] px-8 py-4 font-semibold text-white transition hover:bg-[#a91e2a]"
          >
            Book Your Holiday
          </Link>
        </div>
      </section>
    </main>
  );
}
