import { VaccinationSite } from './types';

export const getVaccinationSiteById = (
  arrArgs: VaccinationSite[],
  id: number
) => {
  return arrArgs.find((value: VaccinationSite) => value.id === id);
};
