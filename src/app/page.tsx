
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";

import HeroSection from "@/components/home/HeroSection";
import TravelSearchSection from "@/components/home/TravelSearchSection";
import ServicesSection from "@/components/home/ServicesSection";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import FeaturedPackages from "@/components/home/FeaturedPackages";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CustomTravelCTA from "@/components/home/CustomTravelCTA";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";

export const instant = false;

export default async function HomePage() {
  await connection();

  let destinationData: {
    id: string;
    name: string;
    slug: string;
    country: string | null;
    image: string | null;
  }[] = [];

  let packageData: {
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
  }[] = [];

  try {
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

    destinationData = destinations.map((destination) => ({
      id: destination.id,
      name: destination.name,
      slug: destination.slug,
      country: destination.country,
      image: destination.image,
    }));

    packageData = packages.map((item) => ({
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
  } catch (error) {
    console.error("Database unavailable on HomePage, using fallback state:", error);
  }

  return (
    <>
      <main className="overflow-hidden bg-white">
        <HeroSection />

        <TravelSearchSection />

        <ServicesSection />

        <FeaturedDestinations destinations={destinationData} />

        <FeaturedPackages packages={packageData} />

        <WhyChooseUs />

        <CustomTravelCTA />
      </main>

      <FloatingWhatsApp />
    </>
  );
}
