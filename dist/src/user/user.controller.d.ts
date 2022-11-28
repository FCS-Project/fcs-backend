import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(role: string): Promise<{
        success: boolean;
        data: {
            type: import(".prisma/client").Type[];
            name: string;
            displaySrc: string;
            bannerSrc: string;
            location: string;
            handle: string;
        }[];
    }>;
    getOrganisations(role: string): Promise<{
        success: boolean;
        data: {
            type: import(".prisma/client").Type[];
            name: string;
            displaySrc: string;
            bannerSrc: string;
            location: string;
            handle: string;
        }[];
    }>;
    getMe(userId: string): Promise<{
        success: boolean;
        data: Omit<import(".prisma/client").User, "password" | "hashedRt" | "otp" | "otpCreatedAt" | "createdAt" | "updatedAt">;
    }>;
    findDocuments(userId: string): Promise<{
        success: boolean;
        data: {
            documents: import(".prisma/client").Document[];
        };
    }>;
    getHome(userId: string): Promise<{
        success: boolean;
        data: {
            type: import(".prisma/client").Type[];
            id: string;
            name: string;
            displaySrc: string;
            bannerSrc: string;
            location: string;
            handle: string;
        }[];
    }>;
    getProfile(handle: string, userId: string, role: string): Promise<{
        success: boolean;
        data: Omit<import(".prisma/client").User, "password" | "hashedRt" | "otp" | "otpCreatedAt" | "createdAt" | "updatedAt">;
    }>;
    update(id: string, updateUserDto: UpdateUserDto, userId: string): Promise<{
        success: boolean;
        data: import(".prisma/client").User;
    }>;
    remove(id: string, role: string): Promise<{
        success: boolean;
    }>;
}
