import { IRegister } from '../pages/Register/types';
import axiosClient from '../utils/axios/axios';
import { ResponseRegister } from '../utils/axios/types';

export const UseRegister = async (
  userRegister: IRegister
): Promise<ResponseRegister> => {
  const formData = new FormData();
  userRegister.files.forEach((file) => formData.append('files', file));
  formData.append('citizen_id', userRegister.citizen_id);
  formData.append('password', userRegister.password);
  formData.append('full_name', userRegister.full_name);
  formData.append('dob', userRegister.dob);
  formData.append('gender', userRegister.gender);
  formData.append('phone_number', userRegister.phone_number);
  formData.append('ward_id', userRegister.ward_id.toString());

  return await axiosClient.post(
    'http://localhost:4000/auth/register',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
  );
};
