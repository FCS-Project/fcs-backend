import { BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { HttpService } from '@nestjs/axios';
export declare class DocumentService {
    private prisma;
    private readonly httpService;
    constructor(prisma: PrismaService, httpService: HttpService);
    create(createDocumentDto: CreateDocumentDto, userId: string): Promise<{
        success: boolean;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: import(".prisma/client").Document;
    }>;
    remove(id: string, userId: string): Promise<BadRequestException | {
        success: boolean;
    }>;
    uploadImage(): Promise<any>;
    getSharedDocs(userId: string): Promise<{
        success: boolean;
        data: {
            name: string;
            user: {
                name: string;
                displaySrc: string;
            };
            dataSrc: string;
            createdAt: Date;
        }[];
    }>;
}
