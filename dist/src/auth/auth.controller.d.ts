import { SignInDto } from './dto/signIn.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(signInDto: SignInDto): Promise<{
        success: boolean;
        data: import(".prisma/client").User;
    }>;
    signUp(signUpDto: SignUpDto): Promise<{
        success: boolean;
        data: import(".prisma/client").User;
    }>;
}
