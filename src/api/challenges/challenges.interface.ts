import {ParticipantUserDTO} from 'src/api/challenges/dto/challenges.dto';

export interface IChallengeTitle {
  id: number;
  title: string;
}

export interface IGetListChallengeRes {
  id: number;
  title: string;
  subTitle: string;
  content: string;
  regDate: Date;
  mainImage: string;
  rnk: number;
  postCnt: number;
  participants: ParticipantUserDTO[];
}

export interface IGetChallengeDetailRes {
  id: number;
  title: string;
  subTitle: string;
  content: string;
  contentImage: string;
}
