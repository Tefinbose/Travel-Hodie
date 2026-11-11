import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("Seeding database...");
  // Add initial seed data here if needed
  console.log("Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

