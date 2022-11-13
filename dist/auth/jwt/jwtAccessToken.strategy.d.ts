import { IPayload } from './jwt.payload';
declare const JwtAccessTokenStrategy_base: new (...args: any[]) => any;
export declare class JwtAccessTokenStrategy extends JwtAccessTokenStrategy_base {
    constructor();
    validate(payload: IPayload): Promise<void>;
}
export {};
