import { AxiosResponse } from 'axios';
import { useCallback } from 'react';
import { LoginQueryResult } from '../features/login/responseLogin';
import { ILogin } from '../features/login/types';
import axiosClient from '../utils/axios/axios';

export const useLogin = () => {
  const login = useCallback(
    (data: ILogin): Promise<AxiosResponse<LoginQueryResult>> => {
      return axiosClient.post('http://localhost:4000/auth/login', data);
    },
    []
  );
  return { login };
};
