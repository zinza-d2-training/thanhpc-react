import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import {
  VaccineRegistration,
  VaccineRegistrationCreate,
  VaccineRegistrationUpdate
} from '../pages/Admin/types';
import axiosClient from '../utils/axios/axios';
import { VaccineRegistrationCreateResponse } from './types/VaccineRegistrationCreateResponse';

export const useGetVaccineRegistration = () => {
  const [vaccineRegistrations, setVaccineRegistrations] = useState<
    VaccineRegistration[]
  >([]);
  const reFetchVaccineRegistrations = useCallback(async () => {
    const { data } = await axiosClient.get<VaccineRegistration[]>(
      'http://localhost:4000/vaccine-registrations'
    );
    setVaccineRegistrations(data);
  }, []);
  useEffect(() => {
    reFetchVaccineRegistrations();
  }, [reFetchVaccineRegistrations]);
  return { vaccineRegistrations, reFetchVaccineRegistrations };
};
export const useDeleteVaccineRegistration = () => {
  const deleteVaccineRegistration = useCallback(
    async (id: number): Promise<AxiosResponse> => {
      return await axiosClient.delete(
        `http://localhost:4000/vaccine-registrations/delete/${id}`
      );
    },
    []
  );
  return { deleteVaccineRegistration };
};
export const useUpdateVaccineRegistration = () => {
  const updateVaccineRegistration = useCallback(
    async (data: VaccineRegistrationUpdate): Promise<AxiosResponse> => {
      return await axiosClient.put(
        `http://localhost:4000/vaccine-registrations/update`,
        data
      );
    },
    []
  );
  return { updateVaccineRegistration };
};
export const useCreateVaccineRegistration = () => {
  const createVaccineRegistration = useCallback(
    async (
      data: VaccineRegistrationCreate
    ): Promise<AxiosResponse<VaccineRegistrationCreateResponse>> => {
      return await axiosClient.post(
        `http://localhost:4000/vaccine-registrations/create`,
        data
      );
    },
    []
  );
  return { createVaccineRegistration };
};
