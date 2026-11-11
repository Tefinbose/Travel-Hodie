
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PackageDetails from "@/components/holidays/PackageDetails";

export const instant = false;

interface HolidayDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function HolidayDetailPage({
  params,
}: HolidayDetailPageProps) {
  await connection();
  const { slug } = await params;

  const item = await prisma.package.findFirst({
    where: {
      slug,
      isActive: true,
      destination: {
        isActive: true,
      },
    },
    include: {
      destination: {
        select: {
          name: true,
          country: true,
        },
      },
    },
  });

  if (!item) {
    notFound();
  }

  const packageData = {
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
      country: item.destination.country,
    },
  };

  return <PackageDetails packageData={packageData} />;
}
