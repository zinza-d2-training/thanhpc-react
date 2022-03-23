import { ILogin } from '../features/login/types';
import axiosClient from '../utils/axios/axios';

export const useAuth = () => {
  const register = async (userRegister: FormData) => {
    try {
      return await axiosClient.post(
        'http://localhost:4000/auth/register',
        userRegister,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );
    } catch (err: any) {
      return err;
    }
  };
  const login = async (userLogin: ILogin) => {
    try {
      return await axiosClient.post(
        'http://localhost:4000/auth/login',
        userLogin
      );
    } catch (err: any) {
      return err;
    }
  };
  return {
    register,
    login
  };
};
