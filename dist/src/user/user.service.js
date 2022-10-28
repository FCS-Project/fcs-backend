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
function exclude(user, ...keys) {
    for (const key of keys) {
        delete user[key];
    }
    return user;
}
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getMe(userId) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
            });
            const data = exclude(user, 'password', 'hashedRt', 'otp', 'otpCreatedAt');
            if (user) {
                return {
                    success: true,
                    data: data,
                };
            }
            else {
                throw new common_1.BadRequestException('User does not exist');
            }
        }
        catch (error) {
            throw new common_1.HttpException(error, 500);
        }
    }
    async findOne(id, role, userId) {
        if (role === 'Admin' || userId === id) {
            try {
                const user = await this.prisma.user.findUnique({
                    where: { id },
                });
                const data = exclude(user, 'password', 'hashedRt', 'otp', 'otpCreatedAt');
                if (user) {
                    return { success: true, data: data };
                }
                else {
                    throw new common_1.BadRequestException('User does not exist!');
                }
            }
            catch (error) {
                throw new common_1.HttpException(error, 500);
            }
        }
        else {
            throw new common_1.BadRequestException('Access Denied');
        }
    }
    async getUserDocuments(userId) {
        try {
            const docs = await this.prisma.document.findMany({
                where: { id: userId },
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
    async remove(id, role) {
        if (role === 'Admin') {
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
        else {
            throw new common_1.BadRequestException('Access Denied');
        }
    }
    async getProfile(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id },
            });
            const data = exclude(user, 'password', 'hashedRt', 'otp', 'otpCreatedAt');
            if (user.type[0] == 'Professional' || user.roles[0] == 'Organisation') {
                return {
                    success: true,
                    data: data,
                };
            }
            else {
                throw new common_1.BadRequestException('Access Denied.');
            }
        }
        catch (error) {
            throw new common_1.HttpException(error, 500);
        }
    }
    async getHome() {
        try {
            const users = await this.prisma.user.findMany();
            const homeData = [];
            let len = 0;
            for (let i = 0; i < users.length; i++) {
                if (users[i].type[0] === 'Professional' ||
                    users[i].roles[0] === 'Organisation') {
                    const user = exclude(users[i], 'password', 'hashedRt', 'otp', 'otpCreatedAt');
                    homeData[len] = user;
                    len++;
                    console.log(homeData);
                }
            }
            return {
                success: true,
                data: homeData,
            };
        }
        catch (error) {
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