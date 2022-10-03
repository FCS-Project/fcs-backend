import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const bcrypt = require('bcrypt');
  const saltRounds = 12;
  const dto = {
    name: 'Aryan Teng',
    email: 'aryanteng892@gmail.com',
    password: '1234',
  };
  const hash = await bcrypt.hash(dto.password, saltRounds);
  dto.password = hash;
  console.log(dto);
  const check = await bcrypt.compare('1234', dto.password);
  console.log(check);

  // result == false

  //   console.log(dto);

  //   const user = await prisma.user.create({
  //     data: dto,
  //   });

  //   console.log(user);
}

main()
  .catch((e) => {
    console.log(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
