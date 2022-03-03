import { LookUpCertificate } from '../../pages/VaccineCertificate/types';
export enum PriorityGroup {
  One = 'Nhóm 1',
  Two = 'Nhóm 2',
  Three = 'Nhóm 3'
}
export enum DesiredSessionOfInjection {
  Morning = 'Buổi sáng',
  Afternoon = 'Buổi chiều',
  Fulltime = 'Cả ngày'
}
export enum ListVaccines {
  Astra = 'COVID-19 Vaccine Astrazeneca',
  Pfizer = 'COVID-19 Vaccine Comirnaty (Pfizer)',
  Moderna = 'COVID-19 Vaccine Moderna',
  VeroCell = 'COVID-19 Vaccine (Vero Cell), Inactived',
  Gam = 'Vaccine Gam - COVID - Vac (SPUTNIK V)'
}
export interface HistoryOfTheFirstInjection {
  nameOfVaccine: ListVaccines;
  injectionDate: Date;
  shipmentNumber: string;
  injectionPlace: string;
  reactionAfterVaccination: string;
}
export interface VaccineRegistrationType extends LookUpCertificate {
  injectionOrderNumber: number;
  email: string;
  job: string;
  workUnit: string;
  currentAddress: string;
  provinceId: string;
  districtId: string;
  wardId: string;
  ethnic: string | null;
  nationality: string | null;
  priorityGroup: PriorityGroup | string;
  desiredDateOfInjection: Date | null;
  desiredSessionOfInjection: DesiredSessionOfInjection | null;
  historyOfTheFirstInjection: HistoryOfTheFirstInjection | null;
}
