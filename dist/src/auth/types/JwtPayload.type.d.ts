import { Role } from '@prisma/client';
export declare type JwtPayload = {
    email: string;
    sub: string;
    roles: Role[];
};
