import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getMe(userId: string): Promise<{
        success: boolean;
        data: Omit<import(".prisma/client").User, "password" | "hashedRt" | "otp" | "otpCreatedAt">;
    }>;
    findDocuments(userId: string): Promise<{
        success: boolean;
        data: {
            Documents: import(".prisma/client").Document[];
        };
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
    findOne(id: string, role: string, userId: string): Promise<{
        success: boolean;
        data: Omit<import(".prisma/client").User, "password" | "hashedRt" | "otp" | "otpCreatedAt">;
    }>;
    update(id: string, updateUserDto: UpdateUserDto, userId: string): Promise<{
        success: boolean;
        data: import(".prisma/client").User;
    }>;
    remove(id: string, role: string): Promise<{
        success: boolean;
    }>;
    getProfile(id: string): Promise<{
        success: boolean;
        data: import(".prisma/client").User;
    }>;
}
