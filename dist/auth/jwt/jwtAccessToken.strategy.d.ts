import { AuthService } from 'src/auth/auth.service';
export interface IPayload {
    sub: number;
    iat: Date;
    exp: number;
}
declare const JwtAccessTokenStrategy_base: new (...args: any[]) => any;
export declare class JwtAccessTokenStrategy extends JwtAccessTokenStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(payload: IPayload, done: any): Promise<any>;
}
export {};
