import { UserFormData } from '../Register/types';

export interface userInfo extends UserFormData {
  new_password: string;
  confirm_password: string;
}
