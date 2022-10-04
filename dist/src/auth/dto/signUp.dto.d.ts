import { Role } from '@prisma/client';
export declare class SignUpDto {
    name: string;
    email: string;
    password: string;
    mobileNumber: string;
    role: Role;
}
