import {Controller, Get, HttpStatus, Param, Query} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {
  DefaultErrorApiResponseDTO,
  InternalServerApiResponseDTO,
  OkApiResponseDTO,
  OkApiResponseListDataDTO,
} from '@shared/decorator/swagger.decorator';
import {ApiResponseDTO, ErrorDTO} from '@shared/dto/response.dto';
import {API_RESPONSE_MEESAGE} from '@shared/enums/enum';
import {ChallengesService} from './challenges.service';
import {
  GetListChallengeResDTO,
  GetChallengeReqDTO,
  GetChallengeResDTO,
  GetChallengeTitleReqDTO,
  GetChallengeDetailResDTO,
  GetChallengeListReqQueryDTO,
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
  @OkApiResponseListDataDTO(GetChallengeTitleReqDTO)
  @DefaultErrorApiResponseDTO()
  @InternalServerApiResponseDTO()
  public async getChallengeTitles(): Promise<
    ApiResponseDTO<GetChallengeTitleReqDTO[] | ErrorDTO>
  > {
    try {
      const challengeTitles = await this.challengesService.getChallengeTitles();

      return new ApiResponseDTO<GetChallengeTitleReqDTO[]>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
        challengeTitles,
      );
    } catch (error) {
      return new ApiResponseDTO<ErrorDTO>(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }

  @Get('/:id')
  @ApiOperation({summary: '챌린지 상세조회'})
  @OkApiResponseDTO(GetChallengeResDTO)
  @DefaultErrorApiResponseDTO()
  @InternalServerApiResponseDTO()
  public async getChallenge(
    @Param() param: GetChallengeReqDTO,
  ): Promise<ApiResponseDTO<GetChallengeDetailResDTO | ErrorDTO>> {
    try {
      const challenge = await this.challengesService.getChallengeDetail(param);

      return new ApiResponseDTO<GetChallengeDetailResDTO>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
        challenge,
      );
    } catch (error) {
      return new ApiResponseDTO<ErrorDTO>(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }

  @Get('/')
  @ApiOperation({summary: '챌린지 목록조회'})
  @OkApiResponseListDataDTO(GetChallengeResDTO)
  @DefaultErrorApiResponseDTO()
  @InternalServerApiResponseDTO()
  public async getChallengeList(
    @Query() query: GetChallengeListReqQueryDTO,
  ): Promise<ApiResponseDTO<GetListChallengeResDTO[] | ErrorDTO>> {
    try {
      const challenges = await this.challengesService.getChallengeList(query);

      return new ApiResponseDTO<GetListChallengeResDTO[]>(
        HttpStatus.OK,
        API_RESPONSE_MEESAGE.SUCCESS,
        challenges,
      );
    } catch (error) {
      return new ApiResponseDTO<ErrorDTO>(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }
}
