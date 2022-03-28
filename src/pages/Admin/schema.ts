import * as yup from 'yup';

export const adminSchema = yup.object().shape({
  province_id: yup.number().required('Đây là trường bắt buộc!'),
  adult_population: yup.number().required('Đây là trường bắt buộc!'),
  distribution_plan: yup.number().required('Đây là trường bắt buộc!'),
  actual_distribution: yup.number().required('Đây là trường bắt buộc!')
});
