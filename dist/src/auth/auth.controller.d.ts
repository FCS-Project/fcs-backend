import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { Tokens } from './types';
import { OtpSignInDto } from './dto/otpSignIn.dto';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(signInDto: SignInDto): Promise<Tokens>;
    otpSignIn(otpSignIn: OtpSignInDto): Promise<{
        success: boolean;
    }>;
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<Tokens>;
    signUp(signUpDto: SignUpDto): Promise<Tokens>;
    logout(userId: string): Promise<{
        success: boolean;
    }>;
    refreshToken(userId: string, refreshToken: string): Promise<Tokens>;
}
