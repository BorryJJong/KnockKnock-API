import {Test, TestingModule} from '@nestjs/testing';
import {Challenges} from '../../entities/Challenges';
import {ChallengesController} from './challenges.controller';
import {ChallengesRepository} from './challenges.repository';
import {ChallengesService} from './challenges.service';

describe('ChallengesController', () => {
  let controller: ChallengesController;
  let service: ChallengesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChallengesController],
      providers: [ChallengesService, ChallengesRepository],
    }).compile();

    controller = module.get<ChallengesController>(ChallengesController);
    service = module.get<ChallengesService>(ChallengesService);
  });

  it('GET 컨트롤러', () => {
    expect(controller).toBeDefined();
  });

  it('GET 서비스', () => {
    expect(service).toBeDefined();
  });

  test('API 테스트 / 피드 목록에 필요한 챌린지 종류를 반환한다', () => {
    // 고민 좀 해보고 다시하자
    // 챌린지 API
    const actual = controller.getChallengeList();

    const challenges: Challenges[] = [];
    challenges.push({
      id: 1,
      title: '플로깅',
      subTitle: '플로깅',
      content: '플로깅',
    } as Challenges);

    expect(actual).toBe(challenges);
  });
});
