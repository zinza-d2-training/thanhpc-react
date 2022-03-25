import * as yup from 'yup';

export const loginSchema = yup.object().shape({
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
    .matches(/^\S{8,}$/g, 'Mật khẩu phải có ít nhất 8 ký tự!')
});
