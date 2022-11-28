import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto, type: string): Promise<{
        success: boolean;
    }>;
    findAll(): Promise<{
        success: boolean;
        data: {
            id: string;
            name: string;
            price: string;
            imgSrc: string;
            user: {
                name: string;
                displaySrc: string;
            };
        }[];
    }>;
}
