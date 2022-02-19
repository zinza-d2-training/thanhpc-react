import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  citizenId: yup
    .string()
    .required('Đây là trường bắt buộc!')
    .matches(
      /^\d{9}$|^\d{12}$/g,
      'Số chứng minh nhân dân/Căn cước công dân không hợp lệ!'
    ),
  password: yup
    .string()
    .required('Đây là trường bắt buộc!')
    .matches(/^\S{8,}$/g, 'Mật khẩu phải có ít nhất 8 ký tự!')
});
export const registerSchema = yup.object().shape({
  citizenId: yup
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
      /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
      'Vui lòng nhập đúng định dạng'
    ),
  province: yup.string().required('Đây là trường bắt buộc!'),
  district: yup.string().required('Đây là trường bắt buộc!'),
  ward: yup.string().required('Đây là trường bắt buộc!')
});
