import { HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
export declare class DocumentService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createDocumentDto: CreateDocumentDto): Promise<import(".prisma/client").Document | {
        success: boolean;
        message: any;
    }>;
    findAll(): Promise<import(".prisma/client").Document[]>;
    findOne(id: string): Promise<HttpException | import(".prisma/client").Document>;
    update(id: number, updateDocumentDto: UpdateDocumentDto): string;
    remove(id: string): Promise<HttpException | {
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
    }>;
}
