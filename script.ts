import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // use this for testing related to database
  // run nodemon script.ts in terminal to run this file

  const user = await prisma.user.create({
    data: { name: 'xyz', email: 'xyz@gmail.com', password: 'xyz' },
  });
}

main()
  .catch((e) => {
    console.log(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
