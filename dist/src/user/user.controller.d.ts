import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getMe(userId: string): Promise<{
        success: boolean;
        data: Omit<import(".prisma/client").User, "password" | "hashedRt" | "otp" | "otpCreatedAt">;
    }>;
    findOne(id: string, role: string, userId: string): Promise<{
        success: boolean;
        data: Omit<import(".prisma/client").User, "password" | "hashedRt" | "otp" | "otpCreatedAt">;
    }>;
    findDocuments(userId: string): Promise<{
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
        data: Omit<import(".prisma/client").User, "password" | "hashedRt" | "otp" | "otpCreatedAt">;
    }>;
}
