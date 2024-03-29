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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductService = class ProductService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProductDto, type) {
        try {
            if (type === 'Pharmacy') {
                await this.prisma.product.create({ data: createProductDto });
                return {
                    success: true,
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
    async findAll() {
        try {
            const data = await this.prisma.product.findMany({
                select: {
                    id: true,
                    name: true,
                    price: true,
                    imgSrc: true,
                    user: {
                        select: {
                            name: true,
                            displaySrc: true,
                        },
                    },
                },
            });
            if (data) {
                return {
                    success: true,
                    data: data,
                };
            }
            else {
                throw new common_1.BadRequestException('No Products');
            }
        }
        catch (error) {
            throw new common_1.HttpException(error, 500);
        }
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map