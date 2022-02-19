export interface User {
  id: number;
  citizenId: string;
  password: string;
  full_name: string;
  image: string | null;
  dob: string;
  gender: string;
  phone_number: string;
}
export type UserInsertInput = Pick<
  User,
  | 'citizenId'
  | 'password'
  | 'full_name'
  | 'image'
  | 'dob'
  | 'gender'
  | 'phone_number'
>;
export type UserSetInput = Partial<UserInsertInput>;
