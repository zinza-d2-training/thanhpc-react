export interface User {
  citizenId: string;
  password: string;
  full_name: string;
}
export type UserInsertInput = Pick<
  User,
  'citizenId' | 'password' | 'full_name'
>;
export type UserSetInput = Partial<UserInsertInput>;
