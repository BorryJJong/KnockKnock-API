"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedApiResponseDTO = exports.ConflictApiResponseDTO = exports.InternalServerApiResponseDTO = exports.ForbiddenApiResponseDTO = exports.DefaultErrorApiResponseDTO = exports.OkApiResponseNoneDataDTO = exports.OkApiResponseListDataDTO = exports.OkApiResponseDTO = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../dto/response.dto");
const OkApiResponseDTO = (data, apiDescription) => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOkResponse)({
        description: apiDescription
            ? apiDescription
            : 'API 성공(응답값에 데이터가 있음)',
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(response_dto_1.ApiResponseDTO) },
                {
                    properties: {
                        data: data.name === 'Boolean'
                            ? { type: 'boolean', items: { $ref: (0, swagger_1.getSchemaPath)(data) } }
                            : { $ref: (0, swagger_1.getSchemaPath)(data) },
                    },
                },
            ],
        },
    }));
};
exports.OkApiResponseDTO = OkApiResponseDTO;
const OkApiResponseListDataDTO = (data) => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOkResponse)({
        description: 'API 성공(응답값에 데이터가 있음)',
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(response_dto_1.ApiResponseDTO) },
                {
                    properties: {
                        data: {
                            type: 'array',
                            items: { $ref: (0, swagger_1.getSchemaPath)(data) },
                        },
                    },
                },
            ],
        },
    }));
};
exports.OkApiResponseListDataDTO = OkApiResponseListDataDTO;
const OkApiResponseNoneDataDTO = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOkResponse)({
        description: 'API 성공(응답값에 데이터가 없음)',
        type: response_dto_1.NoneDataDTO,
    }));
};
exports.OkApiResponseNoneDataDTO = OkApiResponseNoneDataDTO;
const DefaultErrorApiResponseDTO = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiResponse)({
        description: '서버 에러 구조',
        type: response_dto_1.ErrorDTO,
    }));
};
exports.DefaultErrorApiResponseDTO = DefaultErrorApiResponseDTO;
const ForbiddenApiResponseDTO = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiForbiddenResponse)({
        description: 'API 권한 없음',
    }));
};
exports.ForbiddenApiResponseDTO = ForbiddenApiResponseDTO;
const InternalServerApiResponseDTO = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'API 서버 에러',
    }));
};
exports.InternalServerApiResponseDTO = InternalServerApiResponseDTO;
const ConflictApiResponseDTO = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiConflictResponse)({
        description: 'API 처리 중 비지니스 로직상 불가능하거나 모순이 생긴 에러',
    }));
};
exports.ConflictApiResponseDTO = ConflictApiResponseDTO;
const UnauthorizedApiResponseDTO = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiUnauthorizedResponse)({
        description: 'API 권한이 없는 에러',
    }));
};
exports.UnauthorizedApiResponseDTO = UnauthorizedApiResponseDTO;
//# sourceMappingURL=swagger.decorator.js.map