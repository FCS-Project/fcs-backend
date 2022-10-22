import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { Tokens } from './types';
import { Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(signInDto: SignInDto): Promise<Tokens>;
    signUp(signUpDto: SignUpDto): Promise<Tokens>;
    logout(req: Request): Promise<void>;
    refreshToken(): string;
}
