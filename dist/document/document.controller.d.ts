import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
export declare class DocumentController {
    private readonly documentService;
    constructor(documentService: DocumentService);
    create(createDocumentDto: CreateDocumentDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateDocumentDto: UpdateDocumentDto): string;
    remove(id: string): string;
}
