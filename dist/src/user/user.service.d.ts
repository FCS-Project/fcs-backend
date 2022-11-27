import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getMe(userId: string): Promise<{
        success: boolean;
        data: Omit<import(".prisma/client").User, "createdAt" | "password" | "updatedAt" | "hashedRt" | "otp" | "otpCreatedAt">;
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
    getProfile(handle: string, userId: string, role: string): Promise<{
        success: boolean;
        data: Omit<import(".prisma/client").User, "createdAt" | "password" | "updatedAt" | "hashedRt" | "otp" | "otpCreatedAt">;
    }>;
    getHome(userId: string): Promise<{
        success: boolean;
        data: {
            id: string;
            name: string;
            displaySrc: string;
            type: import(".prisma/client").Type[];
            bannerSrc: string;
            location: string;
            handle: string;
        }[];
    }>;
    getUsers(role: string): Promise<{
        success: boolean;
        data: {
            name: string;
            displaySrc: string;
            type: import(".prisma/client").Type[];
            bannerSrc: string;
            location: string;
            handle: string;
        }[];
    }>;
    getOrganisations(role: string): Promise<{
        success: boolean;
        data: {
            name: string;
            displaySrc: string;
            type: import(".prisma/client").Type[];
            bannerSrc: string;
            location: string;
            handle: string;
        }[];
    }>;
}
