declare const JwtRefreshTokenStrategy_base: new (...args: any[]) => any;
export declare class JwtRefreshTokenStrategy extends JwtRefreshTokenStrategy_base {
    constructor();
    validate(request: Request, payload: any): any;
}
export {};
