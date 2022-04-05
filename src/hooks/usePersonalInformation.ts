import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import {
  PersonalInformation,
  PersonalInformationCreate,
  PersonalInformationUpdate
} from '../pages/Admin/types';
import axiosClient from '../utils/axios/axios';
import { PersonalInformationCreateResponse } from './types/PersonalInformationUpdateResponse';

export const useGetPersonalInformation = () => {
  const [personalInformations, setPersonalInformations] = useState<
    PersonalInformation[]
  >([]);
  const reFetchPersonalInformations = useCallback(async () => {
    const { data } = await axiosClient.get<PersonalInformation[]>(
      'http://localhost:4000/personal-informations'
    );
    setPersonalInformations(data);
  }, []);
  useEffect(() => {
    reFetchPersonalInformations();
  }, [reFetchPersonalInformations]);
  return { personalInformations, reFetchPersonalInformations };
};
export const useGetPersonalInformationByCitizenId = () => {
  const getPersonalInformationByCitizenId = useCallback(
    async (citizen_id: string): Promise<AxiosResponse> => {
      return await axiosClient.get<PersonalInformation>(
        `http://localhost:4000/personal-informations/${citizen_id}`
      );
    },
    []
  );

  return { getPersonalInformationByCitizenId };
};
export const useDeletePersonalInformation = () => {
  const deletePersonalInformation = useCallback(
    async (id: number): Promise<AxiosResponse> => {
      return await axiosClient.delete(
        `http://localhost:4000/personal-informations/delete/${id}`
      );
    },
    []
  );
  return { deletePersonalInformation };
};
export const useUpdatePersonalInformation = () => {
  const updatePersonalInformation = useCallback(
    async (data: PersonalInformationUpdate): Promise<AxiosResponse> => {
      return await axiosClient.put(
        `http://localhost:4000/personal-informations/update`,
        data
      );
    },
    []
  );
  return { updatePersonalInformation };
};
export const useCreatePersonalInformation = () => {
  const createPersonalInformation = useCallback(
    async (
      data: PersonalInformationCreate
    ): Promise<AxiosResponse<PersonalInformationCreateResponse>> => {
      return await axiosClient.post(
        `http://localhost:4000/personal-informations/create`,
        data
      );
    },
    []
  );
  return { createPersonalInformation };
};
