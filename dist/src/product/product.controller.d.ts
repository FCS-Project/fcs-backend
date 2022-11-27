import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto, type: string): Promise<{
        sucess: boolean;
    }>;
    findAll(): Promise<{
        success: boolean;
        data: {
            user: {
                name: string;
                displaySrc: string;
            };
            name: string;
            id: string;
            price: string;
            imgSrc: string;
        }[];
    }>;
    findOne(id: string): string;
    remove(id: string): string;
}
