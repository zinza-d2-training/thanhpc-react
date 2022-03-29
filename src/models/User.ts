export interface User {
  id?: string;
  citizen_id: string;
  phone_number: string;
  full_name: string;
  dob: string;
  gender: string;
  province_id?: number;
  district_id?: number;
  password: string;
  ward_id: number;
}
export type UserInsertInput = Pick<
  User,
  'citizen_id' | 'password' | 'full_name' | 'dob' | 'gender' | 'phone_number'
>;
export type UserSetInput = Partial<UserInsertInput>;
