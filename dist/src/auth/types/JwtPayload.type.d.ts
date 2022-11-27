import { Role, Type } from '@prisma/client';
export declare type JwtPayload = {
    email: string;
    sub: string;
    roles: Role[];
    type: Type[];
};
