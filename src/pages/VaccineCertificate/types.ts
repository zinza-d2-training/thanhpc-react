export interface IVaccinate {
  id: string;
  number: number;
  time: Date;
  vaccinationName: string;
  shipmentNumber: string;
  vaccinationSite: string;
}

export interface Certificate {
  full_name: string;
  dob: Date;
  gender: string;
  phone_number: string;
  citizenId: string;
  healthInsuranceCardNumber: string;
  provinceId: string;
  districtId: string;
  wardId: string;
  vaccinate: IVaccinate[];
}
