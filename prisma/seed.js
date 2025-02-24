import { PrismaClient } from "@prisma/client";
import { PRODUCTS, ARTICLES } from "./mock.js";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();

  await prisma.product.deleteMany();

  await prisma.user.createMany({
    data: USERS,
    skipDuplicates: true,
  });

  await prisma.product.createMany({
    data: PRODUCTS,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
