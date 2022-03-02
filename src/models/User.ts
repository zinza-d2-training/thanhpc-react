export interface User {
  id: string;
  citizenId: string;
  phone_number: string;
  full_name: string;
  dob: string;
  gender: string;
  provinceId: string;
  districtId: string;
  wardId: string;
  password: string;
}
export type UserInsertInput = Pick<
  User,
  'citizenId' | 'password' | 'full_name' | 'dob' | 'gender' | 'phone_number'
>;
export type UserSetInput = Partial<UserInsertInput>;
