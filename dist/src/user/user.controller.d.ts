import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getMe(userId: string): Promise<{
        success: boolean;
        data: import(".prisma/client").Prisma.Prisma__UserClient<{
            name: string;
            email: string;
            roles: import(".prisma/client").Role[];
            type: import(".prisma/client").Type[];
            Documents: import(".prisma/client").Document[];
            createdAt: Date;
        }, never>;
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
    findDocuments(userId: string, id: string): Promise<{
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
