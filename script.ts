import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const dto = {
    name: 'Aryan Teng',
    email: 'aryanteng892@gmail.com',
    password: 'test-password',
  };

  const user = await prisma.user.create({
    data: {
      name: 'Aryan Teng',
      email: 'aryanteng892@gmail.com',
      password: 'test-password',
    },
  });

  console.log(user);
}

main()
  .catch((e) => {
    console.log(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
