export interface IVaccinate {
  id: string;
  number: number;
  time: Date;
  vaccinationName: string;
  shipmentNumber: string;
  vaccinationSite: string;
}

export interface LookUpCertificate {
  full_name: string;
  dob: Date;
  gender: string;
  phone_number: string;
  citizenId: string;
  healthInsuranceCardNumber: string;
}
export interface LookUpCertificateResult {
  full_name: string;
  dob: Date;
  gender: string;
  phone_number: string;
  citizenId: string;
  healthInsuranceCardNumber: string;
  address: string;
  vaccines: IVaccinate[];
}
