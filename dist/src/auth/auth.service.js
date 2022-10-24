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
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const saltRounds = 12;
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async updateRtHash(userId, rt) {
        const hash = await bcrypt.hash(rt, saltRounds);
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                hashedRt: hash,
            },
        });
    }
    async getTokens(userId, email, roles) {
        const jwtPayload = {
            sub: userId,
            email: email,
            roles: roles,
        };
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: 'at-secret',
                expiresIn: '15m',
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: 'rt-secret',
                expiresIn: '7d',
            }),
        ]);
        return {
            access_token: at,
            refresh_token: rt,
        };
    }
    async signIn(signInDto) {
        try {
            if (signInDto.email != '') {
                const user = await this.prisma.user.findUnique({
                    where: { email: signInDto.email },
                });
                if (user) {
                    const result = await bcrypt.compare(signInDto.password, user.password);
                    if (result) {
                        const tokens = await this.getTokens(user.id, user.email, user.roles);
                        await this.updateRtHash(user.id, tokens.refresh_token);
                        return tokens;
                    }
                    else {
                        throw new common_1.BadRequestException('Invalid User Credentials!');
                    }
                }
                else {
                    throw new common_1.BadRequestException('User does not exist!');
                }
            }
            else {
                const user = await this.prisma.user.findUnique({
                    where: { mobileNumber: signInDto.mobileNumber },
                });
                if (user) {
                    const result = await bcrypt.compare(signInDto.password, user.password);
                    if (result) {
                        const tokens = await this.getTokens(user.id, user.email, user.roles);
                        await this.updateRtHash(user.id, tokens.refresh_token);
                        return tokens;
                    }
                    else {
                        throw new common_1.BadRequestException('Invalid User Credentials!');
                    }
                }
                else {
                    throw new common_1.BadRequestException('User does not exist!');
                }
            }
        }
        catch (error) {
            throw new common_1.HttpException(error, 500);
        }
    }
    async signUp(signUpDto) {
        try {
            const hash = await bcrypt.hash(signUpDto.password, saltRounds);
            signUpDto.password = hash;
            const user = await this.prisma.user.create({
                data: signUpDto,
            });
            const tokens = await this.getTokens(user.id, user.email, user.roles);
            await this.updateRtHash(user.id, tokens.refresh_token);
            return tokens;
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.BadRequestException('A user with this email address already exists!');
            }
            else {
                throw new common_1.HttpException(error, 500);
            }
        }
    }
    async logout(userId) {
        await this.prisma.user.updateMany({
            where: {
                id: userId,
                hashedRt: { not: null },
            },
            data: {
                hashedRt: null,
            },
        });
        return { success: true };
    }
    async refreshToken(userId, rt) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new common_1.ForbiddenException('Access Denied');
        }
        const rtMatches = await bcrypt.compare(rt, user.hashedRt);
        if (!rtMatches) {
            throw new common_1.ForbiddenException('Access Denied');
        }
        const tokens = await this.getTokens(user.id, user.email, user.roles);
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map