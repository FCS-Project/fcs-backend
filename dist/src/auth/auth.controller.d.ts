import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(signInDto: SignInDto): Promise<{
        success: boolean;
        data: {
            name: string;
            email: string;
            mobileNumber: string;
            roles: import(".prisma/client").Role[];
            id: string;
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
            name: string;
            email: string;
            mobileNumber: string;
            roles: import(".prisma/client").Role[];
            id: string;
            Documents: import(".prisma/client").Document[];
            createdAt: Date;
        };
    }>;
}
