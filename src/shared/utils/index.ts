import {hash, compare, genSalt} from 'bcrypt';
import {format} from 'date-fns';
import {multiply} from 'ramda';

export const hashPassword = async (password: string): Promise<string> => {
  const saltRound = 10;
  const salt = await genSalt(saltRound);
  return await hash(password, salt);
};

export const isComparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await compare(password, hash);
};

/**
 * fill zero
 * @param {string} n 0을 붙일 수
 * @param {number} num_length 자릿수
 * @returns
 */
export const zeroFill = (n: number, num_length: number): string => {
  const s = n.toString();
  return s.length >= num_length
    ? s
    : new Array(num_length - s.length + 1).join('0') + n;
};

/**
 * Format Date to String (YYYY.MM.DD)
 * @param {Date} date
 * @returns {string} YYYY.MM.DD
 */
export const dateFormat = (date: Date): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  // const hour = date.getHours();
  // const minute = date.getMinutes();

  const monthStr = zeroFill(month, 2);
  const dayStr = zeroFill(day, 2);
  // const hourStr = zeroFill(hour, 2);
  // const minuteStr = zeroFill(minute, 2);

  // return `${date.getFullYear()}.${monthStr}.${dayStr} ${hourStr}:${minuteStr}`;
  return `${date.getFullYear()}.${monthStr}.${dayStr}`;
};

/**
 * Convert UTC to KST (UTC + 9시간)
 * @param {String} utc UTC 시간 : 2022-07-13T01:07:35.130Z
 * @returns {Date} KST 시간
 */
export const convertTime = (utc: Date): Date => {
  return new Date(Date.parse(utc + ''));
};

/**
 * Format Date to String (YYYY.MM.DD)
 * @param {Date} date
 * @returns {string} YYYY.MM.DD
 */
export const dateFormatV2 = (targetDate: Date) => {
  return `${format(targetDate, 'yyyy.MM.dd')}`;
};

/**
 * Convert Time to String
 * < 60분   : n분 전
 * < 24시간 : n시간 전
 * < 72시간 : n일 전
 * 3일 ~    : YYYY.MM.DD HH:MM
 * @param {Date} t
 * @returns {string}
 */
export const convertTimeToStr = (t: Date): string => {
  const now = new Date();
  const time = t;

  const diff = Math.floor((now.getTime() - time.getTime()) / 1000 / 60);
  if (diff < 60) {
    return `${diff}분 전`;
  }

  const diffHour = Math.floor(diff / 60);
  if (diffHour < 24) {
    return `${diffHour}시간 전`;
  }

  const diffDay = Math.floor(diff / 60 / 24);
  if (diffDay < 2) {
    return `${diffDay}일 전`;
  }

  return dateFormat(t);
};

export const getCurrentPageCount = (page: number, take: number): number => {
  return (page - 1) * take;
};

export const isPageNext = (
  page: number,
  take: number,
  total: number,
): boolean => {
  return total > multiply(page, take);
};

export const commafy = (num: number) => {
  const str = num.toString().split('.');
  if (str[0].length >= 4) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
  return str.join('.');
};

// dto transform convert boolean
export const dtoConvertBoolean = (value: any): boolean => {
  return value === 'true' || value === true || value === 1 || value === '1';
};

// Used to unmarshal: typeorm column string ids to array
export const stringIdsToArrayTransformer = {
  from(str: string): number[] {
    return str.split(',').map(data => +data);
  },
  to(ids: number[]): string {
    return ids.join(',').toString();
  },
};
