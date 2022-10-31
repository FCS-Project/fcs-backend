import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from 'src/common/decorators';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';

@ApiTags('Document')
@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  create(
    @Body() createDocumentDto: CreateDocumentDto,
    @GetCurrentUserId() userId: string,
  ) {
    return this.documentService.create(createDocumentDto, userId);
  }

  @Get()
  findAll() {
    return this.documentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentService.findOne(id);
  }

  @Get('/shared')
  getSharedDocs(@GetCurrentUserId() userId: string) {
    return this.documentService.getSharedDocs(userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetCurrentUserId() userId: string) {
    return this.documentService.remove(id, userId);
  }
}
