import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
export declare class LoginService {
    private prisma;
    constructor(prisma: PrismaService);
    login(loginDto: LoginDto): Promise<{
        success: boolean;
        data: import(".prisma/client").User;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        data?: undefined;
    }>;
}
