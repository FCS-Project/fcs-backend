import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto): Promise<import(".prisma/client").Product>;
    findAll(): Promise<{
        success: boolean;
        data: {
            id: string;
            name: string;
            user: {
                name: string;
                displaySrc: string;
            };
            imgSrc: string;
            price: string;
        }[];
    }>;
    findOne(id: string): string;
    remove(id: string): string;
}
