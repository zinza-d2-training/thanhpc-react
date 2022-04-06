import * as yup from 'yup';

export const distributionUpdateSchema = yup.object().shape({
  id: yup.string().required('Đây là trường bắt buộc!'),
  adult_population: yup.string().required('Đây là trường bắt buộc!'),
  distribution_plan: yup.string().required('Đây là trường bắt buộc!'),
  actual_distribution: yup.string().required('Đây là trường bắt buộc!'),
  injected_number: yup.string().required('Đây là trường bắt buộc!')
});
export const vaccinationSiteSchema = yup.object().shape({
  name: yup.string().required('Đây là trường bắt buộc!'),
  street_name: yup.string().required('Đây là trường bắt buộc!'),
  ward_id: yup.string().required('Đây là trường bắt buộc!'),
  district_id: yup.string().required('Đây là trường bắt buộc!'),
  province_id: yup.string().required('Đây là trường bắt buộc!'),
  site_manager: yup.string().required('Đây là trường bắt buộc!'),
  number_of_vaccination_table: yup.string().required('Đây là trường bắt buộc!')
});
export const vaccineRegistrationSchema = yup.object().shape({
  status: yup.string().required('Đây là trường bắt buộc!'),
  personal_info_id: yup.string().required('Đây là trường bắt buộc!')
});
export const personalInformationSchema = yup.object().shape({
  injection_id: yup.number().required('Đây là trường bắt buộc!'),
  full_name: yup.string().required('Đây là trường bắt buộc!'),
  dob: yup.date().required('Đây là trường bắt buộc!'),
  gender: yup.number().required('Đây là trường bắt buộc!'),
  phone_number: yup.string().required('Đây là trường bắt buộc!'),
  email: yup.string(),
  citizen_id: yup.string().required('Đây là trường bắt buộc!'),
  health_insurance_number: yup.string(),
  occupation: yup.string(),
  workplace: yup.string(),
  address: yup.string(),
  ethnic: yup.string(),
  nationality: yup.string(),
  expected_date: yup.date(),
  session_id: yup.number(),
  priority_group_id: yup.number().required('Đây là trường bắt buộc!'),
  ward_id: yup.string().required('Đây là trường bắt buộc!'),
  district_id: yup.string().required('Đây là trường bắt buộc!'),
  province_id: yup.string().required('Đây là trường bắt buộc!')
});
