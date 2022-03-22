import { NestedValue } from 'react-hook-form';
import { IFile } from '../../components/FileUploadImage/types';
import { User } from '../../models/User';

export interface UserFormData extends User {
  images: NestedValue<IFile[]>;
  province_id: string;
  district_id: string;
  ward_id: string;
}
