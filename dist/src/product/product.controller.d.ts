import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto): Promise<import(".prisma/client").Product>;
    findAll(): Promise<import(".prisma/client").Product[]>;
    findOne(id: string): string;
    remove(id: string): string;
}
