
import DestinationCard, {
  DestinationCardData,
} from "./DestinationCard";

export default function DestinationGrid({
  destinations,
}: {
  destinations: DestinationCardData[];
}) {
  if (destinations.length === 0) {
    return (
      <div className="rounded-2xl bg-gray-50 px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-[#101D35]">
          No destinations available yet
        </h2>
        <p className="mt-3 text-gray-600">
          Please check back soon for our latest travel destinations.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {destinations.map((destination) => (
        <DestinationCard
          key={destination.id}
          destination={destination}
        />
      ))}
    </div>
  );
}
