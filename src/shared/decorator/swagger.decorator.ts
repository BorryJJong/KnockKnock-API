import {User} from '@entities/User';
import {applyDecorators, Type} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import {ApiResponseDTO, NoneDataDTO, ErrorDTO} from '@shared/dto/response.dto';

export const OkApiResponseDTO = <T extends Type<any>>(
  data: T,
  apiDescription?: string,
) => {
  return applyDecorators(
    ApiOkResponse({
      description: apiDescription
        ? apiDescription
        : 'API 성공(응답값에 데이터가 있음)',
      schema: {
        allOf: [
          {$ref: getSchemaPath(ApiResponseDTO)},
          {
            properties: {
              data:
                data.name === 'Boolean'
                  ? {type: 'boolean', items: {$ref: getSchemaPath(data)}}
                  : {$ref: getSchemaPath(data)},
            },
          },
        ],
      },
    }),
  );
};

export const OkApiResponseListDataDTO = <T extends Type<any>>(data: T) => {
  return applyDecorators(
    ApiOkResponse({
      description: 'API 성공(응답값에 데이터가 있음)',
      schema: {
        allOf: [
          {$ref: getSchemaPath(ApiResponseDTO)},
          {
            properties: {
              data: {
                type: 'array',
                items: {$ref: getSchemaPath(data)},
              },
            },
          },
        ],
      },
    }),
  );
};

export const OkApiResponseNoneDataDTO = () => {
  return applyDecorators(
    ApiOkResponse({
      description: 'API 성공(응답값에 데이터가 없음)',
      type: NoneDataDTO,
    }),
  );
};

export const DefaultErrorApiResponseDTO = () => {
  return applyDecorators(
    ApiResponse({
      description: '서버 에러 구조',
      type: ErrorDTO,
    }),
  );
};

export const ForbiddenApiResponseDTO = () => {
  return applyDecorators(
    ApiForbiddenResponse({
      description: 'API 권한 없음',
    }),
  );
};

export const InternalServerApiResponseDTO = () => {
  return applyDecorators(
    ApiInternalServerErrorResponse({
      description: 'API 서버 에러',
    }),
  );
};

export const ConflictApiResponseDTO = () => {
  return applyDecorators(
    ApiConflictResponse({
      description: 'API 처리 중 비지니스 로직상 불가능하거나 모순이 생긴 에러',
    }),
  );
};

export const UnauthorizedApiResponseDTO = () => {
  return applyDecorators(
    ApiUnauthorizedResponse({
      description: 'API 권한이 없는 에러',
    }),
  );
};
