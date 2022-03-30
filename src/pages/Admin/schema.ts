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
