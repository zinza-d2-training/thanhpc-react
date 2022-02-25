export interface User {
  id: number;
  citizenId: string;
  password: string;
  full_name: string;
  dob: string;
  gender: string;
  phone_number: string;
}
export type UserInsertInput = Pick<
  User,
  'citizenId' | 'password' | 'full_name' | 'dob' | 'gender' | 'phone_number'
>;
export type UserSetInput = Partial<UserInsertInput>;
