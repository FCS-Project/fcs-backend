import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    signIn(signInDto: SignInDto): Promise<{
        success: boolean;
        data: import(".prisma/client").User;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        data?: undefined;
    }>;
    signUp(signUpDto: SignUpDto): Promise<{
        success: boolean;
        data: import(".prisma/client").User;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        data?: undefined;
    }>;
}
