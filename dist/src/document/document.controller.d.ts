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
            name: string;
            user: {
                name: string;
                displaySrc: string;
            };
            dataSrc: string;
            createdAt: Date;
        }[];
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: import(".prisma/client").Document;
    }>;
    remove(id: string, userId: string): Promise<import("@nestjs/common").BadRequestException | {
        success: boolean;
    }>;
}
