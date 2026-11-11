
import type { Metadata } from "next";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";

import DestinationsHero from "@/components/destinations/DestinationsHero";
import DestinationGrid from "@/components/destinations/DestinationGrid";

export const instant = false;

export const metadata: Metadata = {
  title: "Explore Destinations | TravelHodie",
  description:
    "Discover exciting domestic and international travel destinations with TravelHodie.",
};

export default async function DestinationsPage() {
  await connection();
  let destinations: any[] = [];

  try {
    destinations = await prisma.destination.findMany({
      where: {
        isActive: true,
      },
      include: {
        _count: {
          select: {
            packages: {
              where: {
                isActive: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Database unavailable on DestinationsPage:", error);
  }

  const destinationData = destinations.map((destination) => ({
    id: destination.id,
    name: destination.name,
    slug: destination.slug,
    country: destination.country,
    image: destination.image,
    packageCount: destination._count?.packages ?? 0,
  }));

  return (
    <>
      <DestinationsHero />

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C62835]">
            Where Would You Like to Go?
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#101D35] md:text-4xl">
            Explore Our Destinations
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-gray-600">
            Discover beautiful places, unique experiences and memorable
            journeys with our carefully selected destinations.
          </p>
        </div>

        <DestinationGrid destinations={destinationData} />
      </section>
    </>
  );
}
