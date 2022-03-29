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
  nameOfVaccine?: ListVaccines;
  injectionDate?: Date | string;
  shipmentNumber?: string;
  injectionPlace?: string;
  reactionAfterVaccination?: string;
}
export interface VaccineRegistrationType extends LookUpCertificate {
  injectionOrderNumber: number;
  email: string;
  job: string;
  workUnit: string;
  currentAddress: string;
  province_id: number;
  district_id: number;
  ward_id: number;
  ethnic: string;
  nationality: string;
  priorityGroup: PriorityGroup | string;
  desiredDateOfInjection: Date | string;
  desiredSessionOfInjection: DesiredSessionOfInjection | string;
  historyOfTheFirstInjection?: HistoryOfTheFirstInjection;
}

// step2
export interface IMedicalHistory {
  id: number;
  question: string;
  diseaseSymptoms?: string;
  answer: Answer;
}

export enum Answer {
  YES = 'YES',
  NO = 'NO',
  NOT_SURE = 'NOT_SURE'
}
