import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // use this for testing related to database
  // run nodemon script.ts in terminal to run this file
  // const user = await prisma.user.create({
  //   data: { name: 'xyz', email: 'xyz@gmail.com', password: 'xyz' },
  // });
  // console.log(user);
  const data = {
    name: 'Crocin',
    imgSrc: 'hi',
    price: '1111',
    userId: '8936450f-6c72-4641-89e9-348bc353ddca',
  };
  const product = await prisma.product.create({ data: data });

  const pros = await prisma.product.findMany();
  console.log(pros);
}

main()
  .catch((e) => {
    console.log(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
