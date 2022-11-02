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
            documents: import(".prisma/client").Document[];
        };
    }>;
    update(id: string, updateUserDto: UpdateUserDto, userId: string): Promise<{
        success: boolean;
        data: import(".prisma/client").User;
    }>;
    remove(id: string, role: string): Promise<{
        success: boolean;
    }>;
    getProfile(id: string, userId: string, role: string): Promise<{
        success: boolean;
        data: Omit<import(".prisma/client").User, "password" | "hashedRt" | "otp" | "otpCreatedAt" | "createdAt" | "updatedAt">;
    }>;
    getHome(userId: string): Promise<{
        success: boolean;
        data: {
            id: string;
            name: string;
            type: import(".prisma/client").Type[];
            displaySrc: string;
            bannerSrc: string;
            location: string;
        }[];
    }>;
    getUsers(role: string): Promise<{
        success: boolean;
        data: {
            id: string;
            name: string;
            type: import(".prisma/client").Type[];
            displaySrc: string;
            bannerSrc: string;
            location: string;
        }[];
    }>;
    getOrganisations(role: string): Promise<{
        success: boolean;
        data: {
            id: string;
            name: string;
            type: import(".prisma/client").Type[];
            displaySrc: string;
            bannerSrc: string;
            location: string;
        }[];
    }>;
}
