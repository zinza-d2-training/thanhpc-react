import * as yup from 'yup';

export const vaccineCertificateSchema = yup.object().shape({
  full_name: yup
    .string()
    .required('Đây là trường bắt buộc!')
    .matches(/^([^0-9]*)$/, 'Họ và tên không bao gồm số'),
  dob: yup.date().required('Đây là trường bắt buộc!'),
  gender: yup.string().required('Đây là trường bắt buộc!'),
  phone_number: yup
    .string()
    .required('Đây là trường bắt buộc!')
    .matches(
      /(03|05|07|08|09|84[1|3|5|7|9]|01[2|6|8|9])+([0-9]{8})\b/,
      'Vui lòng nhập đúng định dạng!'
    ),
  citizen_id: yup.string(),
  healthInsuranceCardNumber: yup.string()
});
