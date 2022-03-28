import { ManageDistributionFormUpdate } from '../pages/Admin/types';
import axiosClient from '../utils/axios/axios';
import { DistributionUpdateResult } from './types/DistributionUpdateResult';

export const UseDistributionUpdate = async (
  data: ManageDistributionFormUpdate
): Promise<DistributionUpdateResult> => {
  return await axiosClient.post(
    'http://localhost:4000/export-unit-administrative/distribution-update',
    data
  );
};
