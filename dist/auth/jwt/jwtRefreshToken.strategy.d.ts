import { IPayload } from './jwt.payload';
declare const JwtRefreahTokenStrategy_base: new (...args: any[]) => any;
export declare class JwtRefreahTokenStrategy extends JwtRefreahTokenStrategy_base {
    constructor();
    validate(payload: IPayload): Promise<void>;
}
export {};
