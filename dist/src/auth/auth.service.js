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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require('bcrypt');
const saltRounds = 12;
let AuthService = class AuthService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async signIn(signInDto) {
        if (signInDto.email) {
            const user = await this.prisma.user.findUnique({
                where: { email: signInDto.email },
            });
            if (user) {
                const result = await bcrypt.compare(signInDto.password, user.password);
                if (result) {
                    return { success: true, data: user };
                }
                else {
                    return { success: false, message: 'Invalid User Credentials!' };
                }
            }
            else {
                return {
                    success: false,
                    message: `User with email address '${signInDto.email}' does not exist!`,
                };
            }
        }
        if (signInDto.mobileNumber) {
            const user = await this.prisma.user.findUnique({
                where: { mobileNumber: signInDto.mobileNumber },
            });
            if (user) {
                const result = await bcrypt.compare(signInDto.password, user.password);
                if (result) {
                    return { success: true, data: user };
                }
                else {
                    return { success: false, message: 'Invalid User Credentials!' };
                }
            }
            else {
                return {
                    success: false,
                    message: `User with mobile number '${signInDto.mobileNumber}' does not exist!`,
                };
            }
        }
    }
    async signUp(signUpDto) {
        try {
            const hash = await bcrypt.hash(signUpDto.password, saltRounds);
            signUpDto.password = hash;
            return await this.prisma.user.create({ data: signUpDto });
        }
        catch (error) {
            if ((error.code = 'P2002')) {
                throw new common_1.BadRequestException('A user with these credentials already exists!');
            }
            else {
                throw new common_1.HttpException(error, 500);
            }
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map