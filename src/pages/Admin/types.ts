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
