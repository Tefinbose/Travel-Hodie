import { hash } from "bcryptjs";
import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("Seeding TiDB Cloud database...");

  // 1. Admin Account
  const adminEmail = process.env.ADMIN_EMAIL || "admin@travelhodie.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "ownerofthebusiness2026";
  const adminName = process.env.ADMIN_NAME || "TravelHodie Admin";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await hash(adminPassword, 10);
    await prisma.user.create({
      data: {
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN",
        isActive: true,
      },
    });
    console.log(`Created admin user: ${adminEmail}`);
  } else {
    console.log(`Admin user verified: ${adminEmail}`);
  }

  // 2. Destinations Data (Domestic & International)
  const destinationsData = [
    {
      name: "Dubai",
      slug: "dubai",
      country: "United Arab Emirates",
      image: "/images/landing/cityscape-at-sunset.png",
      isFeatured: true,
      isActive: true,
      description: "Experience iconic skyscrapers, luxury shopping, and golden desert safaris.",
    },
    {
      name: "Maldives",
      slug: "maldives",
      country: "Maldives",
      image: "/images/landing/hotels-luxury-resort.jpg",
      isFeatured: true,
      isActive: true,
      description: "Pristine white sand beaches, turquoise lagoons, and luxury overwater villas.",
    },
    {
      name: "Kerala",
      slug: "kerala",
      country: "India",
      image: "/images/hero/tropical-island-lagoon.jpg",
      isFeatured: true,
      isActive: true,
      description: "God's Own Country with serene backwaters, tea gardens, and lush hill stations.",
    },
    {
      name: "Switzerland",
      slug: "switzerland",
      country: "Switzerland",
      image: "/images/hero/alpine-peaks-twilight.jpg",
      isFeatured: true,
      isActive: true,
      description: "Majestic snow-capped Alps, pristine lakes, and picturesque alpine villages.",
    },
    {
      name: "Bali",
      slug: "bali",
      country: "Indonesia",
      image: "/images/landing/sunset-silhouette-of-serenity.png",
      isFeatured: true,
      isActive: true,
      description: "Tropical paradise famous for emerald rice terraces, cliffside temples, and sunset beaches.",
    },
    {
      name: "Goa",
      slug: "goa",
      country: "India",
      image: "/images/hero/coastal-cliffs-sunset.jpg",
      isFeatured: true,
      isActive: true,
      description: "Sun-kissed beaches, vibrant coastal culture, Portuguese architecture, and nightlife.",
    },
    {
      name: "Kashmir",
      slug: "kashmir",
      country: "India",
      image: "/images/landing/group-travel-scenic.jpg",
      isFeatured: true,
      isActive: true,
      description: "Paradise on Earth with Dal Lake shikara rides, snow valleys, and breathtaking mountains.",
    },
    {
      name: "Umrah & Makkah",
      slug: "umrah-makkah",
      country: "Saudi Arabia",
      image: "/images/landing/umrah-makkah-spiritual.jpg",
      isFeatured: true,
      isActive: true,
      description: "Spiritual pilgrimage journeys with complete hotel, visa, and guided ground assistance.",
    },
  ];

  const destinationMap = new Map<string, string>();

  for (const d of destinationsData) {
    const record = await prisma.destination.upsert({
      where: { slug: d.slug },
      update: {
        name: d.name,
        country: d.country,
        image: d.image,
        isFeatured: d.isFeatured,
        isActive: d.isActive,
        description: d.description,
      },
      create: d,
    });
    destinationMap.set(d.slug, record.id);
    console.log(`Destination ready: ${d.name}`);
  }

  // 3. Holiday Packages Data
  const packagesData = [
    {
      title: "Enchanting Dubai & Desert Safari",
      slug: "enchanting-dubai-desert-safari",
      destinationSlug: "dubai",
      duration: "5 Days / 4 Nights",
      price: 48999,
      image: "/images/landing/cityscape-at-sunset.png",
      isFeatured: true,
      isActive: true,
      shortDescription: "Marvel at the Burj Khalifa, cruise Dubai Marina, and enjoy a dune-bashing desert safari with BBQ dinner.",
      description: "Immerse yourself in the wonders of Dubai. From the world's tallest tower to the traditional souks of Deira, this 5-day package offers a complete balance of modern marvels and authentic Arabian heritage. Includes 4-star hotel stay, daily breakfast, airport transfers, Burj Khalifa 124th-floor tickets, luxury desert safari with barbecue dinner, and a traditional dhow cruise dinner.",
    },
    {
      title: "Maldives Luxury Overwater Escape",
      slug: "maldives-luxury-overwater-escape",
      destinationSlug: "maldives",
      duration: "4 Days / 3 Nights",
      price: 89999,
      image: "/images/landing/hotels-luxury-resort.jpg",
      isFeatured: true,
      isActive: true,
      shortDescription: "Wake up to endless ocean views in a private overwater villa with complimentary speedboat transfers and all-inclusive dining.",
      description: "Escape to the idyllic archipelago of the Maldives. Stay in a private luxury overwater bungalow with direct access to crystal lagoon waters. Includes speedboat transfers from Male Airport, daily gourmet breakfast and dinner, snorkeling safari gear, and a sunset dolphin cruise.",
    },
    {
      title: "Serene Kerala Backwaters & Munnar Hills",
      slug: "serene-kerala-backwaters-munnar-hills",
      destinationSlug: "kerala",
      duration: "6 Days / 5 Nights",
      price: 24999,
      image: "/images/hero/tropical-island-lagoon.jpg",
      isFeatured: true,
      isActive: true,
      shortDescription: "Explore rolling tea plantations in Munnar, wildlife in Thekkady, and overnight houseboat cruise in Alleppey.",
      description: "Discover the best of God's Own Country. Begin your trip in the mist-laden tea estates of Munnar, visit spice plantations and Periyar Lake in Thekkady, and conclude with an unforgettable traditional houseboat stay gliding through the calm backwaters of Alleppey with authentic Kerala meals.",
    },
    {
      title: "Swiss Alps & Scenic Lakes Explorer",
      slug: "swiss-alps-scenic-lakes-explorer",
      destinationSlug: "switzerland",
      duration: "7 Days / 6 Nights",
      price: 149999,
      image: "/images/hero/alpine-peaks-twilight.jpg",
      isFeatured: true,
      isActive: true,
      shortDescription: "Journey through Zurich, Lucerne, Interlaken, and the breathtaking peaks of Mount Titlis and Jungfraujoch.",
      description: "Experience the magic of Switzerland. Ride scenic cogwheel trains, cruise crystal alpine lakes, and stand atop the snowy heights of Mount Titlis and Jungfraujoch - Top of Europe. Package includes Swiss Travel Pass, 4-star central hotels, mountain excursion passes, and city walking tours.",
    },
    {
      title: "Tropical Bali Island & Temple Tour",
      slug: "tropical-bali-island-temple-tour",
      destinationSlug: "bali",
      duration: "6 Days / 5 Nights",
      price: 54999,
      image: "/images/landing/sunset-silhouette-of-serenity.png",
      isFeatured: false,
      isActive: true,
      shortDescription: "Visit Ubud monkey forest, Tegallalang rice terraces, Tanah Lot sunset temple, and Nusa Penida island.",
      description: "Experience Bali's vibrant culture and breathtaking scenery. Explore Ubud's artistic heart, visit sacred water temples, swing above lush jungle ravines, and take a speedboat excursion to the iconic Kelingking Beach on Nusa Penida.",
    },
    {
      title: "Goa Sun & Coast Holiday",
      slug: "goa-sun-and-coast-holiday",
      destinationSlug: "goa",
      duration: "4 Days / 3 Nights",
      price: 17999,
      image: "/images/hero/coastal-cliffs-sunset.jpg",
      isFeatured: false,
      isActive: true,
      shortDescription: "Relax at North and South Goa beaches, historic Old Goa churches, and sunset Mandovi river cruise.",
      description: "Unwind on the golden shores of Goa. Enjoy comfortable beachside resort accommodation, private sightseeing of Old Goa heritage monuments, water sports adventures, and a relaxing evening sunset river cruise.",
    },
    {
      title: "Heavenly Kashmir Valley & Gulmarg Snow Tour",
      slug: "heavenly-kashmir-valley-gulmarg-snow",
      destinationSlug: "kashmir",
      duration: "5 Days / 4 Nights",
      price: 31999,
      image: "/images/landing/group-travel-scenic.jpg",
      isFeatured: false,
      isActive: true,
      shortDescription: "Stay in a traditional Dal Lake houseboat, ride the Gulmarg Gondola, and stroll Pahalgam's pine valleys.",
      description: "Experience the ethereal beauty of Kashmir. Float on a serene Shikara along Dal Lake in Srinagar, take the famous Gondola cable car ride in Gulmarg to snow-clad peaks, and admire the Lidder River in picturesque Pahalgam.",
    },
    {
      title: "Premium Umrah Spiritual Package",
      slug: "premium-umrah-spiritual-package",
      destinationSlug: "umrah-makkah",
      duration: "10 Days / 9 Nights",
      price: 82000,
      image: "/images/landing/umrah-makkah-spiritual.jpg",
      isFeatured: false,
      isActive: true,
      shortDescription: "Complete spiritual package with 5-star hotels within walking distance of Haram in Makkah and Madinah.",
      description: "Perform your Umrah with complete peace of mind. Package includes Umrah visa processing, direct flights, 5-star hotel accommodation close to the holy mosques, private AC ground transportation, and guided Ziyarat tours in Makkah and Madinah.",
    },
  ];

  for (const pkg of packagesData) {
    const destinationId = destinationMap.get(pkg.destinationSlug);
    if (!destinationId) continue;

    await prisma.package.upsert({
      where: { slug: pkg.slug },
      update: {
        title: pkg.title,
        duration: pkg.duration,
        price: pkg.price,
        image: pkg.image,
        isFeatured: pkg.isFeatured,
        isActive: pkg.isActive,
        shortDescription: pkg.shortDescription,
        description: pkg.description,
        destinationId,
      },
      create: {
        title: pkg.title,
        slug: pkg.slug,
        duration: pkg.duration,
        price: pkg.price,
        image: pkg.image,
        isFeatured: pkg.isFeatured,
        isActive: pkg.isActive,
        shortDescription: pkg.shortDescription,
        description: pkg.description,
        destinationId,
      },
    });
    console.log(`Package ready: ${pkg.title}`);
  }

  console.log("Database seeded successfully with destinations and holiday packages!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
