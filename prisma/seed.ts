// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";

// const prisma = new PrismaClient();

// async function main() {
//   const hashedPassword = await bcrypt.hash("admin123", 10);

//   const admin = await prisma.user.upsert({
//     where: { email: "admin@gmail.com" },
//     update: {}, // Tidak diupdate kalau sudah ada
//     create: {
//       name: "Admin User",
//       email: "admin@gmail.com",
//       password: hashedPassword,
//       role: "ADMIN",
//     },
//   });

//   console.log("✅ Admin user seeded:", admin);
// }

// main()
//   .then(() => prisma.$disconnect())
//   .catch(async (e) => {
//     console.error("❌ Error seeding admin:", e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
