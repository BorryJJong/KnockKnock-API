import {Controller, Get, HttpStatus, Param} from '@nestjs/common';
import {
  ApiDefaultResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {ApiResponseDTO} from '@shared/dto/response.dto';
import {API_RESPONSE_MEESAGE} from '@shared/enums/enum';
import {ChallengesService} from './challenges.service';
import {
  GetListChallengeResDTO,
  GetChallengeReqDTO,
  GetChallengeResDTO,
  GetChallengeTitleReqDTO,
  GetChallengeDetailResDTO,
} from './dto/challenges.dto';

@ApiTags('challenges')
@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Get('/titles')
  @ApiOperation({
    summary: '챌린지 이름 목록 API',
    description: '피드 목록 검색에 필요한 챌린지 키워드 API',
    externalDocs: {
      description: 'Figma링크',
      url: 'https://www.figma.com/file/1g4o56bPFBBzbGfpL29jo2?node-id=1907:21526#208250263',
    },
    deprecated: false,
  })
  @ApiResponse({
    status: 200,
    description: '성공!!!',
    type: [GetChallengeTitleReqDTO],
  })
  @ApiDefaultResponse({
    description: '기본 응답 형태',
    type: ApiResponseDTO,
  })
  public async getChallengeTitles(): Promise<
    ApiResponseDTO<GetChallengeTitleReqDTO[]>
  > {
    try {
      const challengeTitles = await this.challengesService.getChallengeTitles();

      return new ApiResponseDTO<GetChallengeTitleReqDTO[]>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
        challengeTitles,
      );
    } catch (error) {
      return new ApiResponseDTO(
        HttpStatus.INTERNAL_SERVER_ERROR,
        API_RESPONSE_MEESAGE.FAIL,
        error.message,
      );
    }
  }

  @Get('/:id')
  @ApiOperation({summary: '챌린지 상세조회'})
  @ApiResponse({
    status: 200,
    description: '성공',
    type: GetChallengeResDTO,
  })
  @ApiDefaultResponse({
    description: '기본 응답 형태',
    type: ApiResponseDTO,
  })
  public async getChallenge(
    @Param() param: GetChallengeReqDTO,
  ): Promise<ApiResponseDTO<GetChallengeDetailResDTO>> {
    try {
      const challenge = await this.challengesService.getChallengeDetail(param);

      return new ApiResponseDTO<GetChallengeDetailResDTO>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
        challenge,
      );
    } catch (error) {
      return new ApiResponseDTO(
        HttpStatus.INTERNAL_SERVER_ERROR,
        API_RESPONSE_MEESAGE.FAIL,
        error.message,
      );
    }
  }

  @Get('/')
  @ApiOperation({summary: '챌린지 목록조회'})
  @ApiResponse({
    status: 200,
    description: '성공',
    type: [GetChallengeResDTO],
  })
  @ApiDefaultResponse({
    description: '기본 응답 형태',
    type: ApiResponseDTO,
  })
  public async getChallengeList(): Promise<
    ApiResponseDTO<GetListChallengeResDTO[]>
  > {
    try {
      const challenges = await this.challengesService.getChallengeList();
      return new ApiResponseDTO<GetListChallengeResDTO[]>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
        challenges,
      );
    } catch (error) {
      return new ApiResponseDTO(
        HttpStatus.INTERNAL_SERVER_ERROR,
        API_RESPONSE_MEESAGE.FAIL,
        error.message,
      );
    }
  }
}
