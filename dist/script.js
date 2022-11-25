"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
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
//# sourceMappingURL=script.js.map