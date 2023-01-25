import {ApiProperty} from '@nestjs/swagger';
import {SOCIAL_TYPE} from '@shared/enums/enum';
import {IsBoolean, IsString} from 'class-validator';
import {UserInfoResDTO} from 'src/api/users/dto/users.dto';

export class AuthInfoResponseDTO {
  @ApiProperty({example: 'access_token', type: String})
  @IsString()
  private accessToken: string;

  @ApiProperty({example: 'refreash_token', type: String})
  @IsString()
  private refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}

export class SocialLoginResponseDTO {
  @ApiProperty({description: '회원가입 유무', example: 'true', type: Boolean})
  @IsBoolean()
  private isExistUser: boolean;

  @ApiProperty({
    description: '회원 정보',
    example: UserInfoResDTO,
    type: UserInfoResDTO,
    required: false,
  })
  private userInfo?: UserInfoResDTO;

  @ApiProperty({
    description: '토큰 정보',
    example: AuthInfoResponseDTO,
    type: AuthInfoResponseDTO,
    required: false,
  })
  private authInfo?: AuthInfoResponseDTO;

  constructor(
    isExistUser: boolean,
    userInfo?: UserInfoResDTO,
    authInfo?: AuthInfoResponseDTO,
  ) {
    this.isExistUser = isExistUser;
    this.userInfo = userInfo;
    this.authInfo = authInfo;
  }
}

export class SocialLoginRequestDTO {
  @IsString()
  @ApiProperty({
    description: '소셜 UUID',
    example: '플랫폼(kakao, apple)에서 제공해주는 socialUuid',
  })
  socialUuid: string;

  @IsString()
  @ApiProperty({
    description: '소셜 종류(kakao, apple)',
    example: 'KAKAO',
    enum: SOCIAL_TYPE,
  })
  socialType: SOCIAL_TYPE;
}

export class SignUpRequestDTO extends SocialLoginRequestDTO {
  @IsString()
  @ApiProperty({description: '닉네임', example: 'hiYong94'})
  nickname: string;

  @ApiProperty({
    description: '이미지 파일 업로드',
    example: '',
    type: 'file',
  })
  image: string;
}

export class SignUpResponseDTO {
  @ApiProperty({
    description: '토큰 정보',
    example: AuthInfoResponseDTO,
    type: AuthInfoResponseDTO,
  })
  private authInfo: AuthInfoResponseDTO;

  constructor(authInfo: AuthInfoResponseDTO) {
    this.authInfo = authInfo;
  }
}
