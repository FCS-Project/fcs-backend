import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findOne(id: string): Promise<{
        success: boolean;
        data: import(".prisma/client").User;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        data?: undefined;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        success: boolean;
        data: import(".prisma/client").User;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
    }>;
    getDocuments(id: string): Promise<(import(".prisma/client").User & {
        Documents: import(".prisma/client").Document[];
    })[]>;
}
