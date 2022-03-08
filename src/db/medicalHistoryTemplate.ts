import { IMedicalHistory, Answer } from '../pages/VaccineRegistration/types';

export const medicalHistoryTemplate: IMedicalHistory[] = [
  {
    id: 1,
    question: 'Tiền sử phản vệ từ độ 2 trở lên',
    diseaseSymptoms: '',
    answer: Answer.NO
  },
  {
    id: 2,
    question: 'Tiền sử bị COVID-19 trong vòng 6 tháng',
    answer: Answer.NO
  },
  {
    id: 3,
    question: 'Tiền sử tiêm vắc xin khác trong 14 ngày qua',
    diseaseSymptoms: '',
    answer: Answer.NO
  },
  {
    id: 4,
    question:
      'Tiền sử suy giảm miễn dịch, ung thư giai đoạn cuối, cắt lách, xơ gan...',
    answer: Answer.NO
  },
  {
    id: 5,
    question:
      'Đang dùng thuốc ức chế miễn dịch, corticoid liều ca (tương đương hoặc hơn 2mg prednisolon/kg/ngày trong ít nhất 7 ngày) hoặc điều trị hóa trị, xạ trị',
    answer: Answer.NO
  },
  {
    id: 6,
    question: 'Bệnh cấp tính',
    diseaseSymptoms: '',
    answer: Answer.NO
  },
  {
    id: 7,
    question: 'Tiền sử bệnh mạn tính, đang tiến triển',
    diseaseSymptoms: '',
    answer: Answer.NO
  },
  {
    id: 8,
    question: 'Tiền sử bệnh mạn tính đã điều trị ổn',
    answer: Answer.NO
  },
  {
    id: 9,
    question: 'Đang mang thai, phụ nữ đang nuôi con bằng sữa mẹ',
    answer: Answer.NO
  },
  {
    id: 10,
    question: 'Độ tuổi: ≥65 tuổi',
    answer: Answer.NO
  },
  {
    id: 11,
    question:
      'Tiền sử rối loạn đông máu/cầm máu hoặc đang dùng thuốc chống đông',
    answer: Answer.NO
  },
  {
    id: 12,
    question: 'Tiền sử dị ứng với các dị nguyên khác',
    diseaseSymptoms: '',
    answer: Answer.NO
  }
];
