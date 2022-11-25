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
            const data = exclude(user, 'password', 'hashedRt', 'otp', 'otpCreatedAt', 'createdAt', 'updatedAt');
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
    async getUserDocuments(userId) {
        try {
            const docs = await this.prisma.user.findUnique({
                where: { id: userId },
                select: { documents: true },
            });
            if (docs) {
                return { success: true, data: docs };
            }
        }
        catch (error) {
            throw new common_1.HttpException(error, 500);
        }
    }
    async update(id, updateUserDto, userId) {
        if (id === userId) {
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
        else {
            throw new common_1.BadRequestException('Access Denied.');
        }
    }
    async remove(id, role) {
        if (role === 'Admin') {
            try {
                const docs = await this.prisma.document.deleteMany({
                    where: { userId: id },
                });
                const sharedDocs = await this.prisma.document.deleteMany({
                    where: { sharedWith: id },
                });
                if (docs && sharedDocs) {
                    const user = await this.prisma.user.delete({ where: { id } });
                    if (user) {
                        return { success: true };
                    }
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
    async getProfile(handle, userId, role) {
        if (role === 'Admin') {
            try {
                const user = await this.prisma.user.findUnique({
                    where: { handle: handle },
                });
                const data = exclude(user, 'password', 'hashedRt', 'otp', 'otpCreatedAt', 'createdAt', 'updatedAt');
                if (data) {
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
        if (userId) {
            try {
                const user = await this.prisma.user.findMany({
                    where: {
                        OR: [
                            { type: { has: 'Professional' } },
                            { roles: { has: 'Organisation' } },
                        ],
                        handle: handle,
                    },
                });
                for (const element of user) {
                    exclude(element, 'password', 'hashedRt', 'otp', 'otpCreatedAt', 'createdAt', 'updatedAt');
                }
                const data = user[0];
                if (data) {
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
    }
    async getHome(userId) {
        try {
            const users = await this.prisma.user.findMany({
                where: {
                    OR: [
                        { type: { has: 'Professional' } },
                        { roles: { has: 'Organisation' } },
                    ],
                    NOT: [{ id: userId }],
                },
                select: {
                    id: true,
                    name: true,
                    type: true,
                    displaySrc: true,
                    bannerSrc: true,
                    location: true,
                    handle: true,
                },
            });
            if (users) {
                return {
                    success: true,
                    data: users,
                };
            }
            else {
                throw new common_1.BadRequestException('No Data.');
            }
        }
        catch (error) {
            throw new common_1.HttpException(error, 500);
        }
    }
    async getUsers(role) {
        try {
            if (role === 'Admin') {
                const users = await this.prisma.user.findMany({
                    where: { roles: { has: 'User' } },
                    select: {
                        handle: true,
                        name: true,
                        type: true,
                        displaySrc: true,
                        bannerSrc: true,
                        location: true,
                    },
                });
                return {
                    success: true,
                    data: users,
                };
            }
            else {
                throw new common_1.BadRequestException('Access Denied');
            }
        }
        catch (error) {
            throw new common_1.HttpException(error, 500);
        }
    }
    async getOrganisations(role) {
        try {
            if (role === 'Admin') {
                const users = await this.prisma.user.findMany({
                    where: { roles: { has: 'Organisation' } },
                    select: {
                        handle: true,
                        name: true,
                        type: true,
                        displaySrc: true,
                        bannerSrc: true,
                        location: true,
                    },
                });
                return {
                    success: true,
                    data: users,
                };
            }
            else {
                throw new common_1.BadRequestException('Access Denied');
            }
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