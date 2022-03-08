import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const translationVn = {};

const translationEn = {
  'Đăng nhập': 'Login',
  'Trang chủ': 'Home',
  'Đăng ký tiêm': 'Vaccine Registration',
  'CỔNG THÔNG TIN TIÊM CHỦNG COVID-19': 'COVID-19 VACCINE PORTAL',
  'Tra cứu': 'Search',
  'Tra cứu chứng nhận tiêm': 'Search for your Covid-19 vaccine certificate',
  'Cập nhật nhanh và chính xác nhất': 'Fastest and most accurate',
  'Tra cứu kết quả đăng ký': 'Search for your registration reference number',
  'Tài liệu': 'Document',
  'Xin chào': 'Hi',
  'Trang cá nhân': 'Profile',
  'Đăng xuất': 'Logout',
  'Đối tượng đăng ký tiêm': 'Total number of subjects registered for injection',
  'Số mũi tiêm hôm qua': 'Total vaccine doses administered (yesterday)',
  'Số mũi tiêm toàn quốc': 'Total vaccine doses administered nationwide',
  '(lượt)': '(turns)',
  '(mũi)': '(vaccinations)',
  'Dữ liệu tiêm theo ngày': 'Daily statistic',
  'Đã tiêm': 'Vaccinated',
  '10 địa phương có tỷ lệ tiêm cao nhất':
    'Top 10 provinces with the highest vaccination rates',
  '(Tính theo số mũi tiêm/ số vắc xin phân bổ theo quyết định)':
    '(Total vaccines administered/ Total vaccines alloced)',
  'Ghi chú': 'Note',
  'Số mũi tiêm thực tế có thể nhiều hơn số liều vắc xin phân bổ':
    'Total number dose administered can be greater than total number of dose allocated',
  '10 địa phương có tỷ lệ tiêm Thấp nhất':
    'Top 10 provinces with the lowest vaccination rates',
  'Tỷ lệ tiêm tại một số tỉnh có thể thấp do chưa nhận đủ vắc xin theo quyết định phân bổ':
    'Vaccination rates in some provinces may be lower due to not receiving enough vaccines according to the allocation decision',
  'Số liệu vắc xin theo địa phương': 'Vaccine doses administered by location',
  'Xem thêm': 'Expand',
  'Tổng tiêm / tổng phân bố (%)':
    'Total Vaccinated/Total vaccine allocated reality (%)',
  STT: 'No',
  'Tỉnh/Thành phố': 'Province',
  'Dự kiến KH phân bổ': 'Vaccine allocation plan',
  'Phân bổ thực tế': 'Vaccine allocated',
  'Dân số >= 18 tuổi': 'Population over 18 years old',
  'Số liều đã tiêm': 'Total vaccine doses administered',
  'Tỷ lệ dự kiến phân bổ theo kế hoạch/ dân số (>= 18 tuổi)':
    'Expected vaccine allocated by population (over 18s)',
  'Tỷ lệ đã phân bổ/ dân số (>= 18 tuổi)':
    'Actual vaccine allocated by population (over 18s)',
  'Tỷ lệ đã tiêm ít nhất 1 mũi/ dân số (>= 18 tuổi)':
    'Total number of people received at least one dose (over 18s)',
  'Tỷ lệ tiêm chủng/ Vắc xin phân bổ thực tế':
    'Vaccination rate (over the total number of allocated vaccines)',
  'Tỷ lệ phân bổ vắc xin/Tổng số phân bổ cả nước': 'Vaccine allocated rate',
  'Tra cứu điểm tiêm theo địa bàn': 'Vaccination sites by locations',
  'Tên điểm tiêm': 'Site name',
  'Số nhà, tên đường': 'Number, Street name',
  'Xã/Phường': 'Ward',
  'Quận/Huyện': 'District',
  'Tỉnh/Thành Phố': 'Province',
  'Người đứng đầu cơ sở tiêm chủng': 'Site manager',
  'Số bàn tiêm': 'Number of vaccination table',
  'Tìm kiếm': 'Search',
  '© Bản quyền thuộc TRUNG TÂM CÔNG NGHỆ PHÒNG, CHỐNG DỊCH COVID-19 QUỐC GIA':
    '© Copyright NATIONAL COVID-19 PREVENTION AND CONTROL TECHNOLOGY CENTER',
  'Phát triển bởi': 'Developed by',
  'Tải sổ sức khỏe điện tử để đăng ký tiêm và nhận giấy chứng nhận tiêm':
    'Download “The e-health book” app to register for your Covid-19 vaccine and receive a vaccination certificate',
  'App tiêm di động (Cho HCM)': 'Mobile vaccination clinic app (For HCM City)',
  'Tra cứu đăng ký tiêm': 'Look up injection registration',
  'Số CMND/CCCD/Mã định danh công dân': 'Citizen identification code/Passport',
  'Số điện thoại': 'Phone number',
  'Lưu ý': 'Note',
  'Cá nhân/Tổ chức đăng ký thành công trên hệ thống sẽ được đưa vào danh sách đặt tiêm. Cơ sở y tế sẽ thông báo lịch tiêm khi có vắc xin và kế hoạch tiêm được phê duyệt. Trân trọng cảm ơn!':
    'Individuals/Organizations that successfully register on the system will be included in the injection order list. The medical facility will notify the injection schedule when the vaccine is available and the injection plan is approved. Sincerely thank you!',
  'Nhập lại': 'Retype',
  'Họ và tên': 'Fullname',
  'Ngày sinh': 'Date of birth',
  'Ngày/Tháng/Năm': 'Day/Month/Year',
  'Giới tính': 'Gender',
  Nam: 'Male',
  Nữ: 'Female',
  'Số CMND/CCCD': 'Citizen identification code',
  'Số thẻ BHYT': 'Health insurance number',
  'Nếu bạn đã tiêm nhưng chưa được ghi nhận, hãy liên hệ với cơ sở tiêm và đề nghị cập nhật thông tin lên Nền tảng tiêm chủng để có thể nhận được Chứng nhận tiêm hoặc phản ánh thông tin mũi tiêm':
    'If you are vaccinated but your vaccination status is not updated, contact the vaccination site and request to update your information to the “COVID-19 VACCINE PORTAL”. You can obtain your Covid-19 vaccine certificate and provide your vaccination feedback',
  'tại đây': 'here',
  'Thông tin cá nhân': 'Personal information',
  'Tiền sử bệnh': 'Medical history',
  'Phiếu đồng ý tiêm': 'Covid-19 vaccine consent form',
  'Hoàn thành': 'Complete',
  'Đăng ký mũi tiêm thứ': 'Vaccination',
  'Mũi thứ 1': 'Dose',
  'Mũi thứ 2': 'Next dose',
  '1. Thông tin người đăng ký tiêm': '1. Vaccinated person information',
  'Đây là trường bắt buộc!': 'This field is required!',
  'Số căn cước hoặc chứng minh thư không hợp lệ!': 'Citizen ID is invalid!',
  'Số điện thoại không hợp lệ!': 'Phone number is invalid!',
  'Email không hợp lệ!': 'Email is invalid!',
  'Mật khẩu không khớp!': 'Password is not match!',
  'Nghề nghiệp': 'Occupation',
  'Đơn vị công tác': 'Workplace',
  'Địa chỉ hiện tại': 'Address',
  'Dân tộc': 'Ethnic',
  'Quốc tịch': 'Nationality',
  'Nhóm ưu tiên': 'Priority group',
  Nhóm: 'Group',
  '2. Thông tin đăng ký tiêm chủng': '2. Vaccination registration information',
  'Ngày muốn được tiêm': 'Your preferred vaccination date',
  'Ngày muốn được tiêm (dự kiến)': 'Date you want to be injected (expected)',
  'Buổi tiêm mong muốn': 'Session',
  'Buổi sáng': 'Morning',
  'Buổi chiều': 'Afternoon',
  'Cả ngày': 'All day',
  '3. Lịch sử tiêm mũi thứ 1': '3. History of injection 1',
  'Tên Vaccine': 'Vaccine name',
  'Ngày tiêm': 'Vaccination date',
  'Số lô': 'Lot number',
  'Địa điểm tiêm': 'Injection site',
  'Phản ứng sau tiêm chủng': 'Reactions after injection',
  'Việc đăng ký thông tin hoàn toàn bảo mật và phục vụ cho chiến dịch tiêm chủng Vắc xin COVID - 19':
    'The registration of information is completely confidential and serves the vaccination campaign COVID-19 vaccine',
  'Xin vui lòng kiểm tra kỹ các thông tin bắt buộc(VD: Họ và tên, Ngày tháng năm sinh, Số điện thoại, Số CMND/CCCD/Mã định danh công dân/HC ...)':
    'Please double check the required information (eg: Full name, Date of birth, Phone number, ID number/CCCD/Citizen identification number/HC...)',
  'Bằng việc nhấn nút "Xác nhận", bạn hoàn toàn hiểu và đồng ý chịu trách nhiệm với các thông tin đã cung cấp':
    'By clicking the "Confirm" button, you fully understand and agree to be responsible for the information provided',
  'Tiếp tục': 'Continue',
  'Tiền sử': 'Prehistoric',
  'Triệu chứng': 'Symptom',
  Có: 'Yes',
  Không: 'No',
  'Không rõ': 'Not sure',
  'Tiền sử phản vệ từ độ 2 trở lên': 'History of anaphylaxis grade 2 or higher',
  'Tiền sử bị COVID-19 trong vòng 6 tháng':
    'History of COVID-19 within 6 months',
  'Tiền sử tiêm vắc xin khác trong 14 ngày qua':
    'History of other vaccinations in the past 14 days',
  'Tiền sử suy giảm miễn dịch, ung thư giai đoạn cuối, cắt lách, xơ gan...':
    'History of immunodeficiency, end stage cancer, splenectomy, cirrhosis...',
  'Đang dùng thuốc ức chế miễn dịch, corticoid liều ca (tương đương hoặc hơn 2mg prednisolon/kg/ngày trong ít nhất 7 ngày) hoặc điều trị hóa trị, xạ trị':
    'Currently taking immunosuppressive drugs, high dose corticosteroids (equivalent to or more than 2mg prednisolone/kg/day for at least 7 days) or receiving chemotherapy, radiation therapy',
  'Bệnh cấp tính': 'Acute illness',
  'Tiền sử bệnh mạn tính, đang tiến triển':
    'History of chronic, progressive disease',
  'Tiền sử bệnh mạn tính đã điều trị ổn':
    'History of chronic disease that has been treated well',
  'Đang mang thai, phụ nữ đang nuôi con bằng sữa mẹ':
    'Pregnant, women who are breastfeeding',
  'Độ tuổi: ≥65 tuổi': 'Age: 65 years old',
  'Tiền sử rối loạn đông máu/cầm máu hoặc đang dùng thuốc chống đông':
    'History of coagulation/hemostasis disorder or taking anticoagulants',
  'Tiền sử dị ứng với các dị nguyên khác':
    'History of allergy to other allergens',
  'Nếu có, ghi rõ loại tác nhân dị ứng': 'If yes, specify type of allergen',
  'Quay lại': 'Back',
  'Tiêm chủng vắc xin là biện pháp phòng chống dịch hiệu quả, tuy nhiên vắc xin phòng COVID-19 có thể không phòng được bệnh hoàn toàn. Người được tiêm chủng vắc xin phòng COVID-19 có thể phòng được bệnh hoặc giảm mức độ nặng nếu mắc bệnh. Tuy nhiên, sau khi tiêm chủng vẫn phải tiếp tục thực hiện nghiêm các biện pháp phòng chống dịch theo quy định.':
    'Vaccination is an effective prevention against disease, but the vaccine against COVID-19 may not completely prevent the disease. People vaccinated against COVID-19 can prevent or reduce the severity of the disease if they do get sick. However, after intravenous injection, it is necessary to continue to implement epidemic prevention measures as prescribed.',
  'Tiêm chủng vắc xin phòng COVID-19 có thể gây ra một số biểu hiện tại chỗ tiêm hoặc toàn thân như sưng, đau chỗ tiêm, nhức đầu, buồn nôn, sốt, đau cơ…hoặc tai biến nặng sau tiêm chủng. Tiêm vắc xin mũi 2 do Pfizer sản xuất ở người đã tiêm mũi 1 bằng vắc xin AstraZeneca có thể tăng khả năng xảy ra phản ứng thông thường sau tiêm chủng.':
    'Vaccination against COVID-19 vaccine may cause some symptoms at the injection site or the whole body such as swelling, pain at the injection site, headache, nausea, fever, muscle pain... or serious complications after vaccination. Vaccination of the second dose of Pfizer-manufactured vaccine in a person who has received the first dose of AstraZeneca vaccine may increase the likelihood of a common post-vaccination reaction.',
  'Khi có triệu chứng bất thường về sức khỏe, người được tiêm chủng cần đến ngay cơ sở y tế gần nhất để được tư vấn, thăm khám và điều trị kịp thời.':
    'When having abnormal health symptoms, the vaccinated person should immediately go to the nearest medical facility for timely advice, examination and treatment.',
  'Sau khi đã đọc các thông tin nêu trên, tôi đã hiểu về các nguy cơ và':
    'Having read the above information, I understand the risks and',
  'Đồng ý tiêm chủng': 'Agree to be vaccinated',
  'Đăng ký tiêm chủng COVID-19 thành công. Mã đặt tiêm của bạn là':
    'Successful registration for COVID-19 vaccination. Your order number is',
  'Cảm ơn quý khách đã đăng ký tiêm chủng vắc xin COVID-19. Hiện tại Bộ y tế đang tiến hành thu thập nhu cầu và thông tin để lập danh sách đối tượng đăng ký tiêm vắc xin COVID-19 theo từng địa bàn. Chúng tôi sẽ liên hệ với quý khách theo số điện thoại':
    'Thank you for signing up for the COVID-19 vaccine. Currently, the Ministry of Health is collecting needs and information to make a list of people registering for COVID-19 vaccine by each locality. We will contact you by phone number',
  'khi có kế hoạch tiêm trong thời gian sớm nhất.':
    'when planning to inject as soon as possible.',
  'Mời bạn tải ứng dụng "SỔ SỨC KHỎE ĐIỆN TỬ" tại':
    'Please download the application "Electronic HEALTH BOOK" at',
  'để theo dõi kết quả đăng ký tiêm và nhận chứng nhận tiêm chủng COVID-19':
    'to track the results of vaccination registration and receive a certificate of vaccination against COVID-19',
  'Xuất thông tin': 'Export information',
  'Cộng hòa xã hội chủ nghĩa Việt Nam': 'Socialist Republic of Vietnam',
  'Độc lập - Tự do - Hạnh phúc': 'Independence - Freedom - Happiness',
  'Chứng nhận tiêm chủng covid-19':
    'Certificate of vaccination against covid-19',
  'Địa chỉ': 'Address',
  'Kết luận': 'Conclude',
  'Đã được tiêm phòng vắc xin phòng bệnh Covid-19':
    'Have been vaccinated against Covid-19',
  'Chưa được tiêm phòng vắc xin phòng bệnh Covid-19':
    'Not vaccinated against Covid-19',
  'Mũi số': 'Nose',
  'Thời gian tiêm': 'Injection time',
  'Tên vắc xin': 'Name of the vaccine',
  'Nơi tiêm': 'Place of injection',
  'Đăng ký tiêm mũi tiếp theo': 'Register for the next injection',
  'Đã tiêm 1 mũi Vaccine': 'Got 1 dose of Vaccine',
  'Đã tiêm 2 mũi Vaccine': 'Got 2 dose of Vaccine',
  'Họ tên': 'Fullname',
  'Trạng thái': 'Status',
  'Thao tác': 'Operation',
  'Đăng ký thành công': 'Registration success',
  'Đăng ký thất bại': 'Registration failed',
  'Quá trình xử lý': 'Processing',
  'Chuyển cơ sở tiêm': 'Transfer of injection facility',
  'Xác nhận': 'Confirm',
  'Theo dõi lịch sử đăng ký tiêm':
    'Keep track of injection registration history',
  'Chọn tối thiểu 2 ảnh': 'Choose the minimum 2 images',
  'Mã số định danh': 'Identifier code',
  'Số CMND/CCCD/Mã định danh': 'ID No./CCCD/Identifier',
  'Hủy bỏ': 'Cancel',
  Lưu: 'Lưu',
  'Mật khẩu': 'Password',
  'Mật khẩu mới': 'New password',
  'Nhập lại mật khẩu': 'Confirm password',
  'Chứng nhận tiêm chủng': 'Certificate of vaccination',
  'Kết quả đăng ký': 'Registration results',
  'Tài khoản': 'Account',
  'Giới thiệu nền tảng quản lý tiêm chủng vắc xin phòng Covid-19':
    'Introducing the Covid-19 vaccine program',
  'HD Chuẩn hóa dữ iệu và import danh sách đối tượng tiêm chủng Covid-19, danh sách nhập hồi cứu':
    'Covid-19 vaccine recipients data processing instructions (including data standardization, data importation and retrospective data/ historical data)',
  'HD cài đặt và sử dụng ứng dụng SSKĐT dành cho người dân':
    '“The e-healthcare” application instruction for users',
  'HD đăng ký cơ sở tiêm chủng Covid-19':
    'A Quick guide in the Covid-19 vaccine process',
  'HD đăng ký tiêm chủng Covid-19':
    'Instructions for approving and allocating the Covid-19 vaccine registration',
  'HD đăng ký tiêm chủng Covid-19 dành cho cơ quan, tổ chức':
    'Instructions for registering a Covid-19 vaccine locations',
  'HD đăng ký tiêm chủng Covid-19 dành cho người dân':
    'Instructions for Covid-19 vaccine registration for agencies and organizations',
  'HDSD ứng dụng SSKĐT trong quá trình tiêm chủng Covid-19':
    'Instructions for Covid-19 vaccine registration for individual',
  'Quy trình ứng dụng nền tảng quản lý điều hành tiêm chủng Covid-19':
    'Instructions for using “The e-health” application during Covid-19 vaccination',
  'Tên tài liệu': 'Document name',
  'Tải về': 'Download',
  'Vui lòng chọn đúng 2 ảnh': 'Please choose correct 2 photos',
  'Không có dữ liệu': 'No data',
  'Đăng ký tài khoản': 'Register account',
  'Ảnh chụp CMND/CCCD 2 mặt': 'Photo of two-sided ID card',
  'Mã xác minh sẽ được gửi bằng tin nhắn đến SĐT bạn đăng ký':
    'Verification code will be sent by text message to your registered phone number',
  'Nếu bạn không nhận được tin nhắn, xin vui lòng thử lại sau:':
    'If you do not receive the message, please try again later:',
  'Số chứng minh nhân dân/Căn cước công dân không hợp lệ!':
    'Invalid ID/Citizen ID number!',
  'Vui lòng nhập đúng định dạng!': 'Please enter the correct format!',
  'Họ và tên không bao gồm số': 'First and last name do not include number',
  'Mật khẩu phải có ít nhất 8 ký tự!':
    'Password must be at least 8 characters!',
  'Đăng ký tiêm chủng COVID-19 thành công. Mã đặt tiêm của bạn là 0120211103501237.':
    'Successful registration for COVID-19 vaccination. Your injection order number is 0120211103501237.',
  'Đăng kí mũi tiêm thứ ?': 'Sign up for the second injection?',
  'Mũi thứ nhất': 'First injection',
  'Mũi thứ hai': 'Second injection'
};

i18n.use(initReactI18next).init({
  resources: {
    vn: { translation: translationVn },
    en: { translation: translationEn }
  },
  lng: 'vn',
  fallbackLng: 'vn',
  interpolation: { escapeValue: false }
});

export default i18n;
