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
