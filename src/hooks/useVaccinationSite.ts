import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import {
  VaccinationSite,
  VaccinationSiteCreate,
  VaccinationSiteUpdate
} from '../pages/Admin/types';
import axiosClient from '../utils/axios/axios';
import { VaccinationSiteCreateResponse } from './types/VaccinationSiteCreateResponse';

export const useGetVaccinationSite = () => {
  const [vaccinationSites, setVaccinationSites] = useState<VaccinationSite[]>(
    []
  );
  const reFetchVaccinationSites = useCallback(async () => {
    const { data } = await axiosClient.get<VaccinationSite[]>(
      'http://localhost:4000/vaccination-sites'
    );
    setVaccinationSites(data);
  }, []);
  useEffect(() => {
    reFetchVaccinationSites();
  }, [reFetchVaccinationSites]);
  return { vaccinationSites, reFetchVaccinationSites };
};
export const useDeleteVaccinationSite = () => {
  const deleteVaccinationSite = useCallback(
    async (id: number): Promise<AxiosResponse> => {
      return await axiosClient.delete(
        `http://localhost:4000/vaccination-sites/delete/${id}`
      );
    },
    []
  );
  return { deleteVaccinationSite };
};
export const useUpdateVaccinationSite = () => {
  const updateVaccinationSite = useCallback(
    async (data: VaccinationSiteUpdate): Promise<AxiosResponse> => {
      return await axiosClient.put(
        `http://localhost:4000/vaccination-sites/update`,
        data
      );
    },
    []
  );
  return { updateVaccinationSite };
};
export const useCreateVaccinationSite = () => {
  const createVaccinationSite = useCallback(
    async (
      data: VaccinationSiteCreate
    ): Promise<AxiosResponse<VaccinationSiteCreateResponse>> => {
      return await axiosClient.post(
        `http://localhost:4000/vaccination-sites/create`,
        data
      );
    },
    []
  );
  return { createVaccinationSite };
};
