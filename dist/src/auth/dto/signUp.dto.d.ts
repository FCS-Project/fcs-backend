import { Role, Type } from '@prisma/client';
export declare class SignUpDto {
    name: string;
    email: string;
    password: string;
    mobileNumber: string;
    roles: Role[];
    type: Type[];
    location: string;
    displaySrc: string;
    bannerSrc: string;
    description: string;
}
