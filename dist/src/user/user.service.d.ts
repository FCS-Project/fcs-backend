import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getMe(userId: string): Promise<{
        success: boolean;
        data: Omit<import(".prisma/client").User, "password" | "hashedRt" | "otp" | "otpCreatedAt" | "createdAt" | "updatedAt">;
    }>;
    findOne(id: string, role: string, userId: string): Promise<{
        success: boolean;
        data: Omit<import(".prisma/client").User, "password" | "hashedRt" | "otp" | "otpCreatedAt" | "createdAt" | "updatedAt">;
    }>;
    getUserDocuments(userId: string): Promise<{
        success: boolean;
        data: {
            Documents: import(".prisma/client").Document[];
        };
    }>;
    update(id: string, updateUserDto: UpdateUserDto, userId: string): Promise<{
        success: boolean;
        data: import(".prisma/client").User;
    }>;
    remove(id: string, role: string): Promise<{
        success: boolean;
    }>;
    getProfile(id: string, userId: string): Promise<{
        success: boolean;
        data: import(".prisma/client").User;
    }>;
    getHome(): Promise<{
        success: boolean;
        data: {
            id: string;
            name: string;
            type: import(".prisma/client").Type[];
            bannerSrc: string;
            location: string;
        }[];
    }>;
}
