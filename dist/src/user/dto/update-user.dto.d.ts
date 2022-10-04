import { Role } from '@prisma/client';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<unknown>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    name: string;
    email: string;
    password: string;
    mobileNumber: string;
    role: Role;
}
export {};
