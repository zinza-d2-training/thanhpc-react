export interface ManageUpdateDistribution {
  province_id: number;
  province_name: string;
  distribution_plan: number;
  actual_distribution: number;
  adult_population: number;
  injected_number: number;
  vaccination_rate: number;
  vaccine_distribution_rate: number;
}
export interface ManageDistributionFormUpdate {
  id: number;
  distribution_plan: number;
  actual_distribution: number;
  adult_population: number;
  injected_number: number;
}
interface District {
  id: number;
  name: string;
  province: Province;
}
interface Province {
  id: number;
  name: string;
}
interface Ward {
  id: number;
  name: string;
  district: District;
}
export interface VaccinationSite {
  id: number;
  name: string;
  street_name: string;
  ward_id: number;
  site_manager: string;
  number_of_vaccination_table: number;
  ward: Ward;
}
export interface VaccinationSiteCreate {
  name: string;
  street_name: string;
  ward_id: number;
  district_id: number;
  province_id: number;
  site_manager: string;
  number_of_vaccination_table: number;
}
export interface VaccinationSiteUpdate extends VaccinationSiteCreate {
  id: number;
}

export interface PriorityGroup {
  id: number;
  name: string;
}
export interface Injection {
  id: number;
  name: string;
}
export interface PersonalInformation {
  id: number;
  injection_id: number;
  full_name: string;
  dob: Date;
  gender: number;
  phone_number: string;
  email: string | null;
  citizen_id: string;
  health_insurance_number: string | null;
  occupation: string | null;
  workplace: string | null;
  address: string | null;
  ward_id: number;
  ethnic: string | null;
  nationality: string | null;
  priority_group_id: number;
  expected_date: Date | null;
  session_id: number | null;
  priorityGroup: PriorityGroup;
  injection: Injection;
  ward: Ward;
}

export interface PersonalInformationCreate {
  injection_id: number;
  full_name: string;
  dob: Date;
  gender: number;
  phone_number: string;
  email: string | null;
  citizen_id: string;
  health_insurance_number: string | null;
  occupation: string | null;
  workplace: string | null;
  address: string | null;
  ward_id: number;
  district_id: number;
  province_id: number;
  ethnic: string | null;
  nationality: string | null;
  priority_group_id: number;
  expected_date: Date | null;
  session_id: number | null;
}
export interface PersonalInformationUpdate extends PersonalInformationCreate {
  id: number;
}
export interface GetPersonalInformationByCitizenIdResult {
  citizen_id: string;
  full_name: string;
  phone_number: string;
  dob: Date;
}

export interface VaccineRegistration {
  id: number;
  status: string;
  personalInformation: PersonalInformation;
}
export interface VaccineRegistrationCreate {
  personal_info_id: number;
  status: string;
}
export interface VaccineRegistrationUpdate extends VaccineRegistrationCreate {
  id: number;
}
