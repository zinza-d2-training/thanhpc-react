import { NestedValue } from 'react-hook-form';
import { IFile } from '../../components/FileUploadImage/types';
import { User } from '../../models/User';

export interface UserFormData extends User {
  files: NestedValue<IFile[]>;
  province_id: number;
  district_id: number;
  ward_id: number;
}
export interface IRegister extends User {
  files: File[];
}
export enum Gender {
  Male = 1,
  Female = 2
}
