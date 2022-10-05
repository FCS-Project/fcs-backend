import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
export declare class DocumentController {
    private readonly documentService;
    constructor(documentService: DocumentService);
    create(createDocumentDto: CreateDocumentDto): Promise<import(".prisma/client").Document>;
    findAll(): Promise<import(".prisma/client").Document[]>;
    findOne(id: string): Promise<import(".prisma/client").Document>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
