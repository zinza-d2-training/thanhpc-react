import { LoginQueryResult } from '../features/login/responseLogin';
import { ILogin } from '../features/login/types';
import axiosClient from '../utils/axios/axios';

export const useLogin = async (
  userLogin: ILogin
): Promise<LoginQueryResult> => {
  return await axiosClient.post('http://localhost:4000/auth/login', userLogin);
};
