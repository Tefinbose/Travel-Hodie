
import Link from "next/link";
import DestinationPackageCard, {
  DestinationPackageData,
} from "./DestinationPackageCard";

interface DestinationData {
  name: string;
  country: string | null;
  description: string | null;
  image: string | null;
}

export default function DestinationDetails({
  destination,
  packages,
}: {
  destination: DestinationData;
  packages: DestinationPackageData[];
}) {
  return (
    <main className="bg-white">
      {/* Destination hero */}
      <section
        className="relative flex min-h-[480px] md:min-h-[580px] items-end bg-[#101D35] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(16,29,53,0.95), rgba(16,29,53,0.3)), url("${destination.image || "/images/hero/tropical-island-lagoon.jpg"
            }")`,
        }}
      >
          <div className="mx-auto w-full max-w-7xl px-6 pb-20 pt-36 sm:pt-40 md:pt-44 md:pb-24 text-white">
            <Link
              href="/destinations"
              className="mb-6 inline-block text-sm font-medium text-gray-200 hover:text-white"
            >
              ← All Destinations
            </Link>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#E6B85C]">
              {destination.country || "Explore with TravelHodie"}
            </p>

            <h1 className="mt-3 text-4xl font-bold md:text-6xl">
              {destination.name}
            </h1>

            <p className="mt-5 max-w-2xl leading-8 text-gray-200">
              {destination.description}
            </p>
          </div>
      </section>

      {/* Packages */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C62835]">
            Explore Packages
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#101D35] md:text-4xl">
            Holiday Packages in {destination.name}
          </h2>

          <p className="mt-3 max-w-2xl text-gray-600">
            Explore our available holiday packages and find the right
            experience for your next journey.
          </p>
        </div>

        {packages.length > 0 ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((item) => (
              <DestinationPackageCard
                key={item.id}
                packageData={item}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-gray-50 px-6 py-14 text-center">
            <h3 className="text-xl font-bold text-[#101D35]">
              Packages coming soon
            </h3>
            <p className="mt-3 text-gray-600">
              We are preparing exciting holiday packages for this destination.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex rounded-lg bg-[#C62835] px-6 py-3 font-semibold text-white hover:bg-[#a91e2a]"
            >
              Contact Us
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
