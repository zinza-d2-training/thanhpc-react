import {
  PersonalInformation,
  VaccinationSite,
  VaccineRegistration
} from './types';

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
export const getVaccineRegistrationById = (
  arrArgs: VaccineRegistration[],
  id: number
) => {
  return arrArgs.find((value: VaccineRegistration) => value.id === id);
};
