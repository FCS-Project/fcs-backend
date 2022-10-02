import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
export declare class DocumentService {
    create(createDocumentDto: CreateDocumentDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDocumentDto: UpdateDocumentDto): string;
    remove(id: number): string;
}
