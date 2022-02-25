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
  provinceId: number;
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
  wardId: string;
  wardName?: string;
  districtId: string;
  districtName?: string;
  provinceId: string;
  provinceName?: string;
  manager: string;
  numberOfInjectionTables: number;
}
