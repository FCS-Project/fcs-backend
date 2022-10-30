import { BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { HttpService } from '@nestjs/axios';
export declare class DocumentService {
    private prisma;
    private readonly httpService;
    constructor(prisma: PrismaService, httpService: HttpService);
    create(createDocumentDto: CreateDocumentDto): Promise<import(".prisma/client").Document>;
    findAll(): Promise<import(".prisma/client").Document[]>;
    findOne(id: string): Promise<{
        success: boolean;
        data: import(".prisma/client").Document;
    }>;
    remove(id: string, userId: string): Promise<BadRequestException | {
        success: boolean;
    }>;
    uploadImage(): Promise<any>;
}
