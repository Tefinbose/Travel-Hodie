
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";

import HeroSection from "@/components/home/HeroSection";
import TravelSearchSection from "@/components/home/TravelSearchSection";
import ServicesSection from "@/components/home/ServicesSection";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import FeaturedPackages from "@/components/home/FeaturedPackages";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CustomTravelCTA from "@/components/home/CustomTravelCTA";

export const instant = false;

export default async function HomePage() {
  await connection();
  const [destinations, packages] = await Promise.all([
    prisma.destination.findMany({
      where: {
        isActive: true,
      },
      orderBy: { createdAt: "desc" },
      take: 16,
    }),

    prisma.package.findMany({
      where: {
        isActive: true,
        isFeatured: true,
        destination: {
          isActive: true,
        },
      },
      include: {
        destination: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 4,
    }),
  ]);

  const destinationData = destinations.map((destination) => ({
    id: destination.id,
    name: destination.name,
    slug: destination.slug,
    country: destination.country,
    image: destination.image,
  }));

  const packageData = packages.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    shortDescription: item.shortDescription,
    description: item.description,
    duration: item.duration,
    price: Number(item.price),
    image: item.image,
    destination: {
      name: item.destination.name,
    },
  }));

  return (
    <main className="overflow-hidden bg-white">
      <HeroSection />

      <TravelSearchSection />

      <ServicesSection />

      <FeaturedDestinations destinations={destinationData} />

      <FeaturedPackages packages={packageData} />

      <WhyChooseUs />

      <CustomTravelCTA />
    </main>
  );
}
