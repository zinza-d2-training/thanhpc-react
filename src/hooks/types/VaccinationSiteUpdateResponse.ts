import { VaccinationSite } from '../../pages/Admin/types';

export interface VaccinationSiteCreateResponse {
  data: VaccinationSite;
  status: number;
  message: string;
}
