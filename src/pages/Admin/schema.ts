import * as yup from 'yup';

export const adminSchema = yup.object().shape({
  id: yup.string().required('Đây là trường bắt buộc!'),
  adult_population: yup.string().required('Đây là trường bắt buộc!'),
  distribution_plan: yup.string().required('Đây là trường bắt buộc!'),
  actual_distribution: yup.string().required('Đây là trường bắt buộc!'),
  injected_number: yup.string().required('Đây là trường bắt buộc!')
});
