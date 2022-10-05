import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';

@ApiTags('Document')
@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentService.create(createDocumentDto);
  }

  @Get()
  findAll() {
    return this.documentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentService.remove(id);
  }
}
