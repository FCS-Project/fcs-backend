"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findOne(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id },
                select: {
                    name: true,
                    email: true,
                    roles: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
            if (user) {
                return { success: true, data: user };
            }
            else {
                throw new common_1.BadRequestException('User does not exist!');
            }
        }
        catch (error) {
            throw new common_1.HttpException(error, 500);
        }
    }
    async getUserDocuments(id) {
        try {
            const docs = await this.prisma.document.findMany({
                where: { userId: id },
            });
            if (docs) {
                return { success: true, data: docs };
            }
        }
        catch (error) {
            throw new common_1.HttpException(error, 500);
        }
    }
    async update(id, updateUserDto) {
        try {
            const updatedData = await this.prisma.user.update({
                where: { id },
                data: updateUserDto,
            });
            return { success: true, data: updatedData };
        }
        catch (error) {
            throw new common_1.HttpException(error, 500);
        }
    }
    async remove(id) {
        try {
            const user = await this.prisma.user.delete({ where: { id } });
            if (user) {
                return { success: true };
            }
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.BadRequestException('User does not exist!');
            }
            throw new common_1.HttpException(error, 500);
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map