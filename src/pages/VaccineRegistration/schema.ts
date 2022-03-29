import * as yup from 'yup';

export const vaccineRegistrationSchema = yup.object().shape({
  injectionOrderNumber: yup
    .number()
    .required('Đây là trường bắt buộc!')
    .test('test', 'Đây là trường bắt buộc!', (value) => value !== 0),
  citizen_id: yup
    .string()
    .required('Đây là trường bắt buộc!')
    .matches(
      /^\d{9}$|^\d{12}$/g,
      'Số chứng minh nhân dân/Căn cước công dân không hợp lệ!'
    ),
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
  ward_id: yup.number().required('Đây là trường bắt buộc!'),
  priorityGroup: yup.string().required('Đây là trường bắt buộc!'),
  historyOfTheFirstInjection: yup.object().shape({
    nameOfVaccine: yup.string().test(
      'test',
      'Đây là trường bắt buộc!',
      (value, originalValue: any) =>
        originalValue.from[1].value.injectionOrderNumber === 1 ||
        value !== undefined // no error when injectionOrderNumber = 1 or value !== undefined
    ),
    injectionDate: yup
      .string()
      .test('test', 'Đây là trường bắt buộc!', (value, originalValue: any) => {
        return (
          originalValue.from[1].value.injectionOrderNumber === 1 ||
          value !== undefined // no error when injectionOrderNumber = 1 or value !== undefined
        );
      })
  })
});
