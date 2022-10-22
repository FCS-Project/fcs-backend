import { Strategy } from 'passport-jwt';
import { JwtPayload } from '../types/JwtPayload.type';
declare const AtStrategy_base: new (...args: any[]) => Strategy;
export declare class AtStrategy extends AtStrategy_base {
    constructor();
    validate(payload: JwtPayload): JwtPayload;
}
export {};
