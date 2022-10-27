import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import { Tokens } from './types';
import { Role } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { OtpSignInDto } from './dto/otpSignIn.dto';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    updateRtHash(userId: string, rt: string): Promise<void>;
    getTokens(userId: string, email: string, roles: Role[]): Promise<Tokens>;
    signIn(signInDto: SignInDto): Promise<Tokens>;
    signUp(signUpDto: SignUpDto): Promise<Tokens>;
    logout(userId: string): Promise<{
        success: boolean;
    }>;
    refreshToken(userId: string, rt: string): Promise<Tokens>;
    otpSignIn(otpSignInDto: OtpSignInDto): Promise<{
        success: boolean;
    }>;
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<Tokens | {
        success: boolean;
    }>;
}
