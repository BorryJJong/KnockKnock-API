import { Repository } from 'typeorm';
import { ParticipantUserDTO } from './dto/challenges.dto';
import { Challenges } from '../../entities/Challenges';
import { IChallengeTitle, IGetChallengeDetailRes, IGetListChallengeRes } from './challenges.interface';
import { CHALLENGES_SORT } from '@shared/enums/enum';
export declare class ChallengesRepository extends Repository<Challenges> {
    checkExistChallenge({ id }: {
        id: any;
    }): Promise<void>;
    findChallengeById(id: number): Promise<IGetChallengeDetailRes>;
    findChallengeAll(): Promise<Challenges[]>;
    getChallengeList(sort: CHALLENGES_SORT): Promise<IGetListChallengeRes[]>;
    getParticipantList(challengeId: number): Promise<ParticipantUserDTO[]>;
    getChallengeTitles(): Promise<IChallengeTitle[]>;
}
