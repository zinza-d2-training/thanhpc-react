import { LookUpCertificateResult } from '../pages/VaccineCertificate/types';
export const lookUpCertificateResult: LookUpCertificateResult = {
  full_name: 'Phạm Công Thành',
  dob: new Date('2000-10-23'),
  gender: 'male',
  phone_number: '0986249793',
  citizen_id: '184415207',
  healthInsuranceCardNumber: '39390173912',
  address: 'Số 105 Yên Bình, Phường Phúc La, Quận Hà Đông, Hà Nội',
  vaccines: [
    {
      id: 'vaccine-astrazeneca',
      number: 1,
      time: new Date('09/11/2021 14:00'),
      vaccinationName: 'COVID-19 Vaccine AstraZeneca',
      shipmentNumber: 'NJ0342',
      vaccinationSite: 'TYT Dịch Vọng Hậu'
    },
    {
      id: 'vaccine-fizer',
      number: 2,
      time: new Date('10/11/2021 14:00'),
      vaccinationName: 'COVID-19 Vaccine AstraZeneca',
      shipmentNumber: 'NJ0342',
      vaccinationSite: 'TYT Dịch Vọng Hậu'
    }
  ]
};
