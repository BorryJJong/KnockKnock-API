import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {IUserPropertiesResponse} from 'src/auth/auth.interface';
import jwt from 'jsonwebtoken';
import {JwksClient} from 'jwks-rsa';
import {isPast} from 'date-fns';
import got from 'got';

interface AppleJwtTokenPayload {
  iss: string;
  aud: string;
  exp: number;
  iat: number;
  sub: string;
  nonce: string;
  c_hash: string;
  email?: string;
  email_verified?: string;
  is_private_email?: string;
  auth_time: number;
  nonce_supported: boolean;
}

@Injectable()
export class AppleService {
  private readonly bundleId = process.env.APPLE_BUNDLE_ID;
  private readonly endPoint = 'https://appleid.apple.com';
  private readonly authPath = '/auth/keys';
  private readonly revokePath = '/auth/revoke';

  public async getUserProperties(
    appleToken: string,
  ): Promise<IUserPropertiesResponse> {
    try {
      const decodedToken = jwt.decode(appleToken, {complete: true}) as {
        header: {kid: string; alg: jwt.Algorithm};
        payload: {sub: string};
      };
      const keyIdFromToken = decodedToken.header.kid;
      const applePublicKeyUrl = this.endPoint + this.authPath;

      const jwksClient = new JwksClient({jwksUri: applePublicKeyUrl});
      const key = await jwksClient.getSigningKey(keyIdFromToken);
      const publicKey = key.getPublicKey();

      const payload: AppleJwtTokenPayload = jwt.verify(appleToken, publicKey, {
        algorithms: [decodedToken.header.alg],
      }) as AppleJwtTokenPayload;

      const {iss, aud, exp, sub} = payload;

      if (isPast(new Date(exp * 1000))) {
        throw new HttpException(
          {
            message: '애플 토큰이 만료됐습니다',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      if (iss !== this.endPoint || aud !== this.bundleId) {
        throw new HttpException(
          {
            message: '애플 토큰이 유효하지 않습니다',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      return {
        id: sub,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: '애플 로그인 토큰 검증 실패',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async revoke(socialUuid: string, client_secret): Promise<void> {
    try {
      const response = await got.post(`${this.endPoint}${this.revokePath}`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        searchParams: {
          client_id: this.bundleId,
          client_secret: client_secret,
          token: socialUuid,
          token_type_hint: 'access_token',
        },
        responseType: 'json',
      });

      console.log(response);
    } catch (error) {
      throw new HttpException(
        {
          message: '애플 회원탈퇴 토큰 검증 실패',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
