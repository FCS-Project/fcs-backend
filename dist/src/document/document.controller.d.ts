import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
export declare class DocumentController {
    private readonly documentService;
    constructor(documentService: DocumentService);
    create(createDocumentDto: CreateDocumentDto): Promise<import(".prisma/client").Document>;
    findAll(): Promise<import(".prisma/client").Document[]>;
    findOne(id: string): Promise<import(".prisma/client").Document | import("@nestjs/common").HttpException>;
    update(id: string, updateDocumentDto: UpdateDocumentDto): string;
    remove(id: string): Promise<import(".prisma/client").Document | import("@nestjs/common").HttpException>;
}
