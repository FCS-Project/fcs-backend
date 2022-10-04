import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
export declare class DocumentController {
    private readonly documentService;
    constructor(documentService: DocumentService);
    create(createDocumentDto: CreateDocumentDto): Promise<import(".prisma/client").Document | {
        success: boolean;
        message: any;
    }>;
    findAll(): Promise<import(".prisma/client").Document[]>;
    findOne(id: string): Promise<import("@nestjs/common").HttpException | import(".prisma/client").Document>;
    update(id: string, updateDocumentDto: UpdateDocumentDto): string;
    remove(id: string): Promise<import("@nestjs/common").HttpException | {
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
    }>;
}
