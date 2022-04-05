import { PersonalInformation, VaccinationSite } from './types';

export const getVaccinationSiteById = (
  arrArgs: VaccinationSite[],
  id: number
) => {
  return arrArgs.find((value: VaccinationSite) => value.id === id);
};
export const getPersonalInformationById = (
  arrArgs: PersonalInformation[],
  id: number
) => {
  return arrArgs.find((value: PersonalInformation) => value.id === id);
};
