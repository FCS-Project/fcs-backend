import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
export declare class DocumentController {
    private readonly documentService;
    constructor(documentService: DocumentService);
    create(createDocumentDto: CreateDocumentDto, userId: string): Promise<{
        success: boolean;
    }>;
    getSharedDocs(userId: string): Promise<{
        success: boolean;
        data: {
            createdAt: Date;
            name: string;
            user: {
                name: string;
                displaySrc: string;
            };
            dataSrc: string;
        }[];
    }>;
    findAll(): Promise<import(".prisma/client").Document[]>;
    findOne(id: string): Promise<{
        success: boolean;
        data: import(".prisma/client").Document;
    }>;
    remove(id: string, userId: string): Promise<import("@nestjs/common").BadRequestException | {
        success: boolean;
    }>;
}
