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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const razorpay_typescript_1 = require("razorpay-typescript");
let OrderService = class OrderService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createOrderDto) {
        try {
            const instance = new razorpay_typescript_1.Razorpay({
                authKey: {
                    key_id: process.env.RAZORPAY_KEY_ID,
                    key_secret: process.env.RAZORPAY_SECRET,
                },
            });
            const options = {
                amount: parseInt(createOrderDto.amount),
                currency: 'INR',
            };
            const order = await instance.orders.create(options);
            const data = await this.prisma.order.create({ data: createOrderDto });
            return {
                success: true,
                data: data,
                razorpayData: order,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error, 500);
        }
    }
    findOne(id) {
        return `This action returns a #${id} order`;
    }
    async update(id, updateOrderDto) {
        try {
            const order = await this.prisma.order.findUnique({ where: { id } });
            if (order) {
                await this.prisma.order.update({ where: { id }, data: updateOrderDto });
                return {
                    success: true,
                };
            }
            else {
                throw new common_1.BadRequestException('Invalid Order ID!');
            }
        }
        catch (error) {
            throw new common_1.HttpException(error, 500);
        }
    }
    remove(id) {
        return `This action removes a #${id} order`;
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map