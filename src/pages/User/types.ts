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
  citizenId: string;
  status: Status;
  process: Process;
}
export interface userInfo extends UserFormData {
  new_password: string;
  confirm_password: string;
}
export interface WardType {
  Id?: string;
  Name?: string;
  Level?: string;
}
export interface DistrictType {
  Id?: string;
  Name?: string;
  Wards?: WardType[];
}
export interface ProvinceType {
  Id?: string;
  Name?: string;
  Districts?: DistrictType[];
}
