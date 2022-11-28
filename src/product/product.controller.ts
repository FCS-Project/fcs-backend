import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserType } from 'src/common/decorators/get-current-user-type.decorator';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @GetCurrentUserType() type: string,
  ) {
    return this.productService.create(createProductDto, type);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }
}
