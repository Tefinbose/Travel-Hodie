import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";
import PackageCard from "./PackageCard";

interface PackageItem {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  duration: string;
  price: number;
  image: string | null;
  destination: {
    name: string;
  };
}

export default function PackageGrid({
  packages,
}: {
  packages: PackageItem[];
}) {
  if (packages.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600 border border-red-100/80 shadow-sm">
          <Compass size={22} />
        </div>

        <h3 className="mt-4 text-xl font-extrabold text-[#101c32]">
          No holiday packages found
        </h3>

        <p className="mt-2 text-xs sm:text-sm text-slate-500">
          Try another search query or clear destination filters to discover available trips.
        </p>

        <Link
          href="/holidays"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-red-950/20 transition hover:-translate-y-0.5 hover:bg-red-500 active:scale-[0.98]"
        >
          View All Packages
          <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
      {packages.map((item) => (
        <PackageCard key={item.id} item={item} />
      ))}
    </div>
  );
}
