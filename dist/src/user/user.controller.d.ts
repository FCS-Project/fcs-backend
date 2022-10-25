import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findOne(id: string, role: string, userId: string): Promise<import("@nestjs/common").BadRequestException | {
        success: boolean;
        data: {
            name: string;
            email: string;
            roles: import(".prisma/client").Role[];
            createdAt: Date;
            updatedAt: Date;
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
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
