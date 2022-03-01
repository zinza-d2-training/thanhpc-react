import { IInjectionRegistrationResult } from '../pages/InjectionRegistration/types';
import { Status, Process } from '../pages/InjectionRegistration/types';

export const injectionRegistrationResult: IInjectionRegistrationResult[] = [
  {
    id: 'huv123vax',
    full_name: 'Phạm Công Thành',
    dob: new Date('2000-23-10'),
    gender: 'male',
    phone_number: '0986249793',
    citizenId: '123456789',
    status: Status.Success,
    process: Process.One
  },
  {
    id: 'bal28acnx',
    full_name: 'Nguyễn Văn Trường',
    dob: new Date('11/05/2000'),
    gender: 'male',
    phone_number: '0865265498',
    citizenId: '718390472',
    status: Status.Failure,
    process: Process.Three
  }
];
