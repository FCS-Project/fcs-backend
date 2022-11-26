import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators';
import { GetCurrentUserType } from 'src/common/decorators/get-current-user-type.decorator';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Public()
  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @GetCurrentUserType() type: string,
  ) {
    return this.productService.create(createProductDto, type);
  }

  @Public()
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
