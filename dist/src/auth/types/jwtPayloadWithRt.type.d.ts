import { JwtPayload } from './JwtPayload.type';
export declare type JwtPayloadWithRt = JwtPayload & {
    refreshToken: string;
};
