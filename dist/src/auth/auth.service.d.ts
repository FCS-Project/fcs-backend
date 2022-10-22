import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import { Tokens } from './types';
import { Role } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    updateRtHash(userId: string, rt: string): Promise<void>;
    getTokens(userId: string, email: string, roles: Role[]): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    signIn(signInDto: SignInDto): Promise<Tokens>;
    signUp(signUpDto: SignUpDto): Promise<Tokens>;
    logout(): string;
    refreshToken(): string;
}
