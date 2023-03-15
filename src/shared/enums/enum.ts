export enum FEED_SEARCH_TYPE {
  POPULAR = 'POPULAR',
  USER_NICK_NAME = 'USER_NICK_NAME',
  CHALLENGE_TAG = 'CHALLENGE_TAG',
}

export enum SOCIAL_TYPE {
  KAKAO = 'KAKAO',
  APPLE = 'APPLE',
  NONE = 'NONE',
}

export enum ERRPR_CODE {
  DEFAULT = 'DEFAULT',
  VALIDATION_ERROR = 'VALIDATION_ERROR', // 예외처리 에러
  UNAUTHENTICATED = 'UNAUTHENTICATED', // 토큰 만료
  UNAUTHORIZED = 'UNAUTHORIZED', // 권한 없음
}

export enum CHALLENGES_SORT {
  BRAND_NEW = 'BRAND_NEW',
  POPULAR = 'POPULAR',
}

export enum API_RESPONSE_MEESAGE {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

export enum REPORT_TYPE {
  INAPPROPRIATE_CONTENT = 'INAPPROPRIATE_CONTENT', // 음란,욕설,비방 등 부적절한 내용
  UNAUTHORIZED_USE = 'UNAUTHORIZED_USE', //저작권 및 초상권 무단 도용
  PERSONAL_INFORMATION_EXTRUSION = 'PERSONAL_INFORMATION_EXTRUSION', // 개인정보 유출,
}

export enum EVENT_TAP {
  ONGOING = 'ONGOING',
  END = 'END',
}

export enum BANNER_TYPE {
  MAIN = 'MAIN',
  BAR = 'BAR',
}

export enum S3_OBJECT {
  SHOP = 'SHOP',
  BANNER = 'BANNER',
  CHALLENGE = 'CHALLENGE',
  USER = 'USER',
  FEED = 'FEED',
  EVENT = 'EVENT',
}

export enum BANNER_TARGET_SCREEN {
  CHALLENGE_GOGO = 'CHALLENGE_GOGO',
  CHALLENGE_UPCYCLING = 'CHALLENGE_UPCYCLING',
  CHALLENGE_BRAVE = 'CHALLENGE_BRAVE',
  FEED_WRITE = 'FEED_WRITE',
}
