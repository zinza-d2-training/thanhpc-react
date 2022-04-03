import { PersonalInformation } from '../../pages/Admin/types';

export interface PersonalInformationCreateResponse {
  data: PersonalInformation;
  status: number;
  message: string;
}
