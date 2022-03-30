import { useState, useCallback, useEffect } from 'react';
import { ProvinceType } from '../pages/User/types';
import axiosClient from '../utils/axios/axios';

export const useUnitAdministrative = () => {
  const [listProvince, setListProvince] = useState<ProvinceType[]>([]);
  const reFetchListProvince = useCallback(async () => {
    const { data } = await axiosClient.get<ProvinceType[]>(
      'http://localhost:4000/export-unit-administrative'
    );
    setListProvince(data);
  }, []);
  useEffect(() => {
    reFetchListProvince();
  }, [reFetchListProvince]);
  return { listProvince, reFetchListProvince };
};
