export interface User {
  id: number | null;
  citizenId: string;
  password: string;
  full_name: string;
  image: Array<File> | null;
}
export type UserInsertInput = Pick<
  User,
  'citizenId' | 'password' | 'full_name'
>;
export type UserSetInput = Partial<UserInsertInput>;
