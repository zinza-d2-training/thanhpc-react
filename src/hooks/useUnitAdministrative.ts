import { ProvinceType } from '../pages/User/types';
import axiosClient from '../utils/axios/axios';

export const UseUnitAdministrative = async (): Promise<ProvinceType[]> => {
  return await axiosClient.get(
    'http://localhost:4000/export-unit-administrative'
  );
};
