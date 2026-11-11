
import type { Metadata } from "next";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

import DestinationDetails from "@/components/destinations/DestinationDetails";

export const instant = false;

interface DestinationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;

  const destination = await prisma.destination.findFirst({
    where: {
      slug,
      isActive: true,
    },
    select: {
      name: true,
      country: true,
    },
  });

  if (!destination) {
    return {
      title: "Destination Not Found | TravelHodie",
    };
  }

  return {
    title: `${destination.name} Holidays | TravelHodie`,
    description: `Explore holiday packages and travel experiences in ${destination.name}, ${destination.country || ""} with TravelHodie.`,
  };
}

export default async function DestinationPage({
  params,
}: DestinationPageProps) {
  await connection();
  const { slug } = await params;

  const destination = await prisma.destination.findFirst({
    where: {
      slug,
      isActive: true,
    },
    include: {
      packages: {
        where: {
          isActive: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!destination) {
    notFound();
  }

  const packageData = destination.packages.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    shortDescription: item.shortDescription,
    duration: item.duration,
    price: Number(item.price),
    image: item.image,
  }));

  const destinationData = {
    name: destination.name,
    country: destination.country,
    description: destination.description,
    image: destination.image,
  };

  return (
    <DestinationDetails
      destination={destinationData}
      packages={packageData}
    />
  );
}
