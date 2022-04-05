import { VaccineRegistration } from '../../pages/Admin/types';

export interface VaccineRegistrationCreateResponse {
  data: VaccineRegistration;
  status: number;
  message: string;
}
