import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // use this for testing related to database
  // run nodemon script.ts in terminal to run this file

  console.log(await prisma.document.findMany());
}

main()
  .catch((e) => {
    console.log(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
