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
  provinceName: string;
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
  locationName: string;
  streetName: string;
  ward_id: number;
  wardName?: string;
  district_id: number;
  districtName?: string;
  province_id: number;
  provinceName?: string;
  manager: string;
  numberOfInjectionTables: number;
}
