import { Repository } from 'typeorm';
import { GetListChallengeResDTO, ParticipantUserDTO } from './dto/challenges.dto';
import { Challenges } from '../../entities/Challenges';
import { IChallengeTitle } from './challenges.interface';
import { CHALLENGES_SORT } from '@shared/enums/enum';
export declare class ChallengesRepository extends Repository<Challenges> {
    checkExistChallenge({ id }: {
        id: any;
    }): Promise<void>;
    findChallengeById(id: number): Promise<Challenges>;
    findChallengeAll(): Promise<Challenges[]>;
    getChallengeList(sort: CHALLENGES_SORT): Promise<GetListChallengeResDTO[]>;
    getParticipantList(challengeId: number): Promise<ParticipantUserDTO[]>;
    getChallengeTitles(): Promise<IChallengeTitle[]>;
}
