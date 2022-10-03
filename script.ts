import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // use this for testing related to database
  // run nodemon script.ts in terminal to run this file
}

main()
  .catch((e) => {
    console.log(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
