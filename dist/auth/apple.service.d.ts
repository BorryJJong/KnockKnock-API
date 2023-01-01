import { IUserPropertiesResponse } from 'src/auth/auth.interface';
export declare class AppleService {
    private readonly bundleId;
    private readonly endPoint;
    private readonly authPath;
    private readonly revokePath;
    getUserProperties(appleToken: string): Promise<IUserPropertiesResponse>;
    revoke(socialUuid: string, client_secret: any): Promise<void>;
}
