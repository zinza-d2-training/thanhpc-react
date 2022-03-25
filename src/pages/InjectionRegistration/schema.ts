import * as yup from 'yup';

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
