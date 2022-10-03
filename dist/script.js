"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
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
}
main()
    .catch((e) => {
    console.log(e.message);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=script.js.map