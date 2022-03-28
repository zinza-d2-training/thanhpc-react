export interface ManageUpdateDistribution {
  province_id: number;
  province_name: string;
  distribution_plan: number;
  actual_distribution: number;
  adult_population: number;
  number_of_injected: number;
  vaccination_rate: number;
  vaccine_distribution_rate: number;
}
export interface ManageDistributionFormUpdate {
  province_id: number;
  distribution_plan: number;
  actual_distribution: number;
  adult_population: number;
}
