import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    signIn(signInDto: SignInDto): Promise<{
        success: boolean;
        data: {
            id: string;
            name: string;
            email: string;
            mobileNumber: string;
            roles: import(".prisma/client").Role[];
            Documents: import(".prisma/client").Document[];
            createdAt: Date;
        };
    } | {
        success: boolean;
        data: import(".prisma/client").User;
    }>;
    signUp(signUpDto: SignUpDto): Promise<{
        success: boolean;
        data: {
            id: string;
            name: string;
            email: string;
            mobileNumber: string;
            roles: import(".prisma/client").Role[];
            Documents: import(".prisma/client").Document[];
            createdAt: Date;
        };
    }>;
}
