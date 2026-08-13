import prisma from "../lib/prisma";

async function testDatabase() {
  try {
    console.log("🔌 Connecting to database...");

    await prisma.$connect();

    console.log("✅ Connected!");

    // CREATE
    console.log("\n🟢 CREATE");

    const user = await prisma.user.create({
      data: {
        name: "Database Test User",
        email: `db-test-${Date.now()}@example.com`,
        passwordHash: "test-password-hash",
      },
    });

    console.log("Created user:", user);

    // READ
    console.log("\n🔵 READ");

    const foundUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    console.log("Found user:", foundUser);

    // UPDATE
    console.log("\n🟡 UPDATE");

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: "Updated Test User",
      },
    });

    console.log("Updated user:", updatedUser);

    // DELETE
    console.log("\n🔴 DELETE");

    const deletedUser = await prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    console.log("Deleted user:", deletedUser);

    await prisma.$disconnect();

    console.log("\n🎉 CRUD TEST PASSED!");
  } catch (error) {
    console.error("\n❌ CRUD TEST FAILED:", error);

    await prisma.$disconnect();

    process.exit(1);
  }
}

testDatabase();