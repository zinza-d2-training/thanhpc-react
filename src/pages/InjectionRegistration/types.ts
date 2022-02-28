export interface IInjectionRegistration {
  citizenId: string;
  phone_number: string;
}
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
