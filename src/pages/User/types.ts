import { UserFormData } from '../Register/types';

export enum Status {
  Success = 'Success',
  Failure = 'Failure'
}
export enum Process {
  One = 'Đăng ký thành công',
  Two = 'Chuyển cơ sở tiêm',
  Three = 'Đã tiêm'
}
export interface IInjectionRegistrationResult {
  id: string;
  full_name: string;
  dob: Date;
  gender: string;
  phone_number: string;
  citizen_id: string;
  status: Status;
  process: Process;
}
export interface userInfo extends UserFormData {
  new_password: string;
  confirm_password: string;
}
export interface WardType {
  id: number;
  name: string;
  district_id: number;
  created_at: Date;
  updated_at: Date;
}
export interface DistrictType {
  id: number;
  name: string;
  province_id: number;
  created_at: Date;
  updated_at: Date;
  wards: WardType[];
}
export interface ProvinceType {
  id: number;
  name: string;
  distribution_plan: number;
  actual_distribution: number;
  adult_population: number;
  injected_number: number;
  created_at: Date;
  updated_at: Date;
  districts: DistrictType[];
}
