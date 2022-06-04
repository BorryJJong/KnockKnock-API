import {hash, compare, genSalt} from 'bcrypt';

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
