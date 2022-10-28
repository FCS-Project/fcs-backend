import { Role } from '@prisma/client';
export declare class UpdateUserDto {
    name: string;
    email: string;
    password: string;
    mobileNumber: string;
    role: Role;
    location: string;
    description: string;
    displaySrc: string;
    bannerSrc: string;
}
