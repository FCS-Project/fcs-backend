import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getMe(userId: string): Promise<{
        success: boolean;
        data: {
            name: string;
            email: string;
            roles: import(".prisma/client").Role[];
            type: import(".prisma/client").Type[];
            Documents: import(".prisma/client").Document[];
            createdAt: Date;
        };
    }>;
    findOne(id: string, role: string, userId: string): Promise<{
        success: boolean;
        data: {
            name: string;
            email: string;
            roles: import(".prisma/client").Role[];
            type: import(".prisma/client").Type[];
            Documents: import(".prisma/client").Document[];
            createdAt: Date;
        };
    }>;
    getUserDocuments(id: string, userId: string): Promise<{
        success: boolean;
        data: import(".prisma/client").Document[];
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        success: boolean;
        data: import(".prisma/client").User;
    }>;
    remove(id: string, role: string): Promise<{
        success: boolean;
    }>;
    getProfile(id: string): Promise<{
        success: boolean;
        data: {
            name: string;
            email: string;
            roles: import(".prisma/client").Role[];
            type: import(".prisma/client").Type[];
            mobileNumber: string;
            description: string;
            displaySrc: string;
            bannerSrc: string;
            location: string;
        };
    }>;
}
