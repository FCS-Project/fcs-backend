import { HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
export declare class DocumentService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createDocumentDto: CreateDocumentDto): Promise<import(".prisma/client").Document>;
    findAll(): Promise<import(".prisma/client").Document[]>;
    findOne(id: string): Promise<import(".prisma/client").Document | HttpException>;
    update(id: number, updateDocumentDto: UpdateDocumentDto): string;
    remove(id: string): Promise<import(".prisma/client").Document | HttpException>;
}
