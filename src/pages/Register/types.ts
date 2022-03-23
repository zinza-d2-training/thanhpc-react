import { NestedValue } from 'react-hook-form';
import { IFile } from '../../components/FileUploadImage/types';
import { User } from '../../models/User';

export interface UserFormData extends User {
  files: NestedValue<IFile[]>;
  province_id: string;
  district_id: string;
  ward_id: string;
}
export enum Gender {
  Male = 1,
  Female = 2
}
