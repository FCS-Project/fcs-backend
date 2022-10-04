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
exports.DocumentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DocumentService = class DocumentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDocumentDto) {
        try {
            return await this.prisma.document.create({ data: createDocumentDto });
        }
        catch (error) {
            if (error.code == 'P2002') {
                throw new common_1.BadRequestException('A user with these credentials already exists!');
            }
            else {
                throw new common_1.HttpException(error, 500);
            }
        }
    }
    async findAll() {
        return this.prisma.document.findMany();
    }
    async findOne(id) {
        try {
            return await this.prisma.document.findUnique({ where: { id } });
        }
        catch (error) {
            return new common_1.HttpException(error, 500);
        }
    }
    update(id, updateDocumentDto) {
        return `This action updates a #${id} document`;
    }
    async remove(id) {
        try {
            return await this.prisma.document.delete({ where: { id } });
        }
        catch (error) {
            return new common_1.HttpException(error, 500);
        }
    }
};
DocumentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DocumentService);
exports.DocumentService = DocumentService;
//# sourceMappingURL=document.service.js.map