export interface User {
  citizenId: string;
  password: string;
  fullname: string;
}
export type UserInsertInput = Pick<User, 'citizenId' | 'password' | 'fullname'>;
export type UserSetInput = Partial<UserInsertInput>;
