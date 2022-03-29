import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  citizen_id: yup
    .string()
    .required('Đây là trường bắt buộc!')
    .matches(
      /^\d{9}$|^\d{12}$/g,
      'Số chứng minh nhân dân/Căn cước công dân không hợp lệ!'
    ),
  password: yup
    .string()
    .required('Đây là trường bắt buộc!')
    .matches(/^\S{8,}$/g, 'Mật khẩu phải có ít nhất 8 ký tự!'),
  full_name: yup
    .string()
    .required('Đây là trường bắt buộc!')
    .matches(/^([^0-9]*)$/, 'Họ và tên không bao gồm số'),
  dob: yup.string().required('Đây là trường bắt buộc!'),
  gender: yup.string().required('Đây là trường bắt buộc!'),
  phone_number: yup
    .string()
    .required('Đây là trường bắt buộc!')
    .matches(
      /(03|05|07|08|09|84[1|3|5|7|9]|01[2|6|8|9])+([0-9]{8})\b/,
      'Vui lòng nhập đúng định dạng!'
    ),
  province_id: yup.number().required('Đây là trường bắt buộc!'),
  district_id: yup.number().required('Đây là trường bắt buộc!'),
  ward_id: yup.number().required('Đây là trường bắt buộc!')
});

export const injectionRegistrationSchema = yup.object().shape({
  citizen_id: yup
    .string()
    .required('Đây là trường bắt buộc!')
    .matches(
      /^\d{9}$|^\d{12}$/g,
      'Số chứng minh nhân dân/Căn cước công dân không hợp lệ!'
    ),
  phone_number: yup
    .string()
    .required('Đây là trường bắt buộc!')
    .matches(
      /(03|05|07|08|09|84[1|3|5|7|9]|01[2|6|8|9])+([0-9]{8})\b/,
      'Vui lòng nhập đúng định dạng!'
    )
});
