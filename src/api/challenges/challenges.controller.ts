import {Controller, Get, Param} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
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
  public async getChallengeTitles(): Promise<GetChallengeTitleReqDTO[]> {
    return this.challengesService.getChallengeTitles();
  }

  @Get('/:id')
  @ApiOperation({summary: '챌린지 상세조회'})
  @ApiResponse({
    status: 200,
    description: '성공',
    type: GetChallengeResDTO,
  })
  public async getChallenge(
    @Param() param: GetChallengeReqDTO,
  ): Promise<GetChallengeDetailResDTO> {
    return this.challengesService.getChallengeDetail(param);
  }

  @Get('/')
  @ApiOperation({summary: '챌린지 목록조회'})
  @ApiResponse({
    status: 200,
    description: '성공',
    type: GetChallengeResDTO,
  })
  public async getChallengeList(): Promise<GetListChallengeResDTO[]> {
    return this.challengesService.getChallengeList();
  }
}
