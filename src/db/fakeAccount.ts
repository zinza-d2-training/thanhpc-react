import { User } from '../models/User';
export const fakeAccount: User = {
  id: 'abc',
  citizenId: '123456789',
  password: 'password123',
  full_name: 'Phạm Công Thành',
  dob: new Date('2000-23-10'),
  gender: 'male',
  phone_number: '0986249793',
  provinceId: '01',
  districtId: '001',
  wardId: '00001'
};
