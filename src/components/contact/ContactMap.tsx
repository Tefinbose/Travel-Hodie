
export default function ContactMap() {
  const address =
    "Valamkoottil Towers, Judgemukku, Thrikkakara, Kakkanad, Kochi, Kerala 682021";

  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
            Find our office
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#071a35]">
            Visit TravelHodie
          </h2>

          <p className="mt-3 text-gray-600">
            Valamkoottil Towers, Judgemukku, Thrikkakara, Kakkanad, Kochi,
            Kerala – 682021.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200">
          <iframe
            title="TravelHodie office location"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
            width="100%"
            height="400"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block"
          />
        </div>

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm font-semibold text-red-600 hover:text-red-700"
        >
          Get directions →
        </a>
      </div>
    </section>
  );
}
