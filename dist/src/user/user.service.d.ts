import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(id: string): Promise<{
        success: boolean;
        data: import(".prisma/client").User;
    }>;
    getUserDocuments(id: string): Promise<{
        success: boolean;
        data: import(".prisma/client").Document[];
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        success: boolean;
        data: import(".prisma/client").User;
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
