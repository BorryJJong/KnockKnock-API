import {Injectable} from '@nestjs/common';
import got from 'got';

export interface IUserPropertiesResponse {
  id: number;
}

@Injectable()
export class KakaoService {
  private readonly adminKey = '159e55e782a3dc22b69c18658c2114c2';

  private readonly endPointV1 = 'https://kapi.kakao.com/v1';
  private readonly endPointV2 = 'https://kapi.kakao.com/v2';
  private readonly userMePath = '/user/me';
  private readonly logoutPath = '/user/logout';
  private readonly unlinkPath = '/user/unlink';

  public async getUserProperties(
    kakaoToken: string,
  ): Promise<IUserPropertiesResponse> {
    const response = await got.post<IUserPropertiesResponse>(
      `${this.endPointV2}${this.userMePath}`,
      {
        headers: {
          Authorization: `Bearer ${kakaoToken}`,
        },
        responseType: 'json',
      },
    );
    return response.body;
  }

  public async logout(targetId: string, kakaoAdminKey: string) {
    kakaoAdminKey = this.adminKey;

    const response = await got.post<{id: number}>(
      `${this.endPointV1}${this.logoutPath}`,
      {
        headers: {
          Authorization: `KakaoAK ${kakaoAdminKey}`,
        },
        searchParams: {
          target_id_type: 'user_id',
          target_id: Number(targetId),
        },
        responseType: 'json',
        allowGetBody: true,
      },
    );

    const statusCode = response.statusCode;
    const {id} = response.body;
    return {
      statusCode,
      id,
    };
  }

  public async unlink(targetId: string, kakaoAdminKey: string) {
    kakaoAdminKey = this.adminKey;

    const response = await got.post<{id: number}>(
      `${this.endPointV1}${this.unlinkPath}`,
      {
        headers: {
          Authorization: `KakaoAK ${kakaoAdminKey}`,
        },
        searchParams: {
          target_id_type: 'user_id',
          target_id: Number(targetId),
        },
        responseType: 'json',
        allowGetBody: true,
      },
    );

    const statusCode = response.statusCode;
    const {id} = response.body;
    return {
      statusCode,
      id,
    };
  }
}
