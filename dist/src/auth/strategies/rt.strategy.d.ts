import { Strategy } from 'passport-jwt';
import { JwtPayload } from '../types/JwtPayload.type';
import { Request } from 'express';
import { JwtPayloadWithRt } from '../types/jwtPayloadWithRt.type';
declare const RtStrategy_base: new (...args: any[]) => Strategy;
export declare class RtStrategy extends RtStrategy_base {
    constructor();
    validate(req: Request, payload: JwtPayload): JwtPayloadWithRt;
}
export {};
