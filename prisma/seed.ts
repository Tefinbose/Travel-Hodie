import { hash } from "bcryptjs";
import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("Seeding TiDB Cloud database...");

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
    console.log(`Admin user already exists: ${adminEmail}`);
  }

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
