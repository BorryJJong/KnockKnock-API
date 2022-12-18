import { IUserPropertiesResponse } from 'src/auth/auth.interface';
export declare class AppleService {
    private readonly bundleId;
    private readonly endPoint;
    private readonly authPath;
    getUserProperties(appleToken: string): Promise<IUserPropertiesResponse>;
}
