import { useCallback } from 'react';
import { ManageDistributionFormUpdate } from '../pages/Admin/types';
import axiosClient from '../utils/axios/axios';
import { DistributionUpdateResult } from './types/DistributionUpdateResult';

export const useDistributionUpdate = () => {
  const mutation = useCallback(
    (data: ManageDistributionFormUpdate): Promise<DistributionUpdateResult> => {
      return axiosClient.put(
        'http://localhost:4000/export-unit-administrative/distribution-update',
        data
      );
    },
    []
  );
  return [mutation];
};
