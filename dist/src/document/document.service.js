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
const FormData = require("form-data");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const sign_pdf_util_1 = require("./utils/sign-pdf.util");
let DocumentService = class DocumentService {
    constructor(prisma, httpService) {
        this.prisma = prisma;
        this.httpService = httpService;
    }
    async create(createDocumentDto, userId) {
        try {
            await (0, sign_pdf_util_1.signingPDF)(createDocumentDto.dataURI);
            const pdfSrc = await this.uploadImage();
            const data = {
                userId: userId,
                sharedWith: createDocumentDto.sharedWith,
                dataSrc: pdfSrc,
                name: createDocumentDto.name,
            };
            await this.prisma.document.create({ data: data });
            return {
                success: true,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error, 500);
        }
    }
    async findAll() {
        return this.prisma.document.findMany();
    }
    async findOne(id) {
        try {
            const document = await this.prisma.document.findUnique({ where: { id } });
            if (document) {
                return {
                    success: true,
                    data: document,
                };
            }
            else {
                throw new common_1.BadRequestException('Document does not exist!');
            }
        }
        catch (error) {
            throw new common_1.HttpException(error, 500);
        }
    }
    async remove(id, userId) {
        try {
            const document = await this.prisma.document.findUnique({ where: { id } });
            if (document) {
                if (document.userId === userId) {
                    await this.prisma.document.delete({ where: { id } });
                    return { success: true };
                }
                else {
                    return new common_1.BadRequestException('Access Denied');
                }
            }
            else {
                throw new common_1.BadRequestException('Document does not exist!');
            }
        }
        catch (error) {
            throw new common_1.HttpException(error, 500);
        }
    }
    async uploadImage() {
        const pdf2base64 = require('pdf-to-base64');
        const formData = new FormData();
        const file = await pdf2base64('src/document/test_assets/exported_file.pdf').then((response) => {
            return response;
        });
        formData.append('file', 'data:application/pdf;base64,' + file);
        formData.append('upload_preset', 'my-uploads');
        const responseData = await (0, rxjs_1.firstValueFrom)(this.httpService
            .post('https://api.cloudinary.com/v1_1/simply-sites1/image/upload', formData, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
            .pipe((0, rxjs_1.map)((response) => [response.data, response.status])));
        return responseData[0].secure_url;
    }
    async getSharedDocs(userId) {
        try {
            const sharedDocs = await this.prisma.document.findMany({
                where: { sharedWith: userId },
                select: {
                    user: {
                        select: {
                            name: true,
                            displaySrc: true,
                        },
                    },
                },
            });
            if (sharedDocs) {
                return {
                    success: true,
                    data: sharedDocs,
                };
            }
            else {
                return {
                    success: true,
                    data: null,
                };
            }
        }
        catch (error) {
            throw new common_1.HttpException(error, 500);
        }
    }
};
DocumentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        axios_1.HttpService])
], DocumentService);
exports.DocumentService = DocumentService;
//# sourceMappingURL=document.service.js.map