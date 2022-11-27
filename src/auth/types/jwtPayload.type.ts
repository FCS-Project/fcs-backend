import { Role, Type } from '@prisma/client';

export type JwtPayload = {
  email: string;
  sub: string;
  roles: Role[];
  type: Type[];
};
