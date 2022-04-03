export interface InjectionDataByDay {
  amount: number;
  day: Date;
}

export interface InjectedByTotalSupplied {
  province: string;
  amount: number;
  totalSupplied: number;
}
export interface StatisticVaccinationByLocal {
  province_id: number;
  province_name: string;
  distributionPlan: number;
  actualDistribution: number;
  population: number;
  numberOfInjected: number;
  expectedRate: number;
  distributedRatio: number;
  rateOfInjectionOfAtLeastOneDoseOfVaccine: number;
  vaccinationRate: number;
  vaccineDistributionRate: number;
}
export interface LookUpInjectionSitesByLocation {
  name: string;
  street_name: string;
  ward_id: number;
  ward_name?: string;
  district_id: number;
  district_name?: string;
  province_id: number;
  province_name?: string;
  manager: string;
  number_of_vaccination_table: number;
}
export interface Address {
  province_id: number;
  district_id: number;
  ward_id: number;
}
