import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { Tokens } from './types';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(signInDto: SignInDto): Promise<Tokens>;
    signUp(signUpDto: SignUpDto): Promise<Tokens>;
    logout(userId: string): Promise<{
        success: boolean;
    }>;
    refreshToken(userId: string, refreshToken: string): Promise<Tokens>;
}
