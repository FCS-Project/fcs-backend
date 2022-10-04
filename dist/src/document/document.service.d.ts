import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { GetUserDocumentDto } from './dto/user-document.dto';
export declare class DocumentService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createDocumentDto: CreateDocumentDto): Promise<import(".prisma/client").Document>;
    findAll(): Promise<import(".prisma/client").Document[]>;
    findUserDocuments(getUserDocumentDto: GetUserDocumentDto): Promise<import(".prisma/client").Document[]>;
    findOne(id: string): Promise<import(".prisma/client").Document>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
