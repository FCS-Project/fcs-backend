import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
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
