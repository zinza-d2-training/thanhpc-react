import { Box, Stack, Link, Typography, colors } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { StyledButton } from '../../components';

import { VaccineRegistrationType } from './types';

import {
  getProvinceName,
  getDistrictName,
  getWardName
} from '../../pages/User/functions';
import { useUnitAdministrative } from '../../hooks/useUnitAdministrative';

interface Props {
  onPrevStep: () => void;
  data: VaccineRegistrationType;
}
export const StepFour = (props: Props) => {
  const { t } = useTranslation();
  const { onPrevStep, data } = props;

  const { listProvince } = useUnitAdministrative();

  const downloadPdfDocument = () => {
    const input = document.getElementById('element-to-print');
    html2canvas(input as HTMLElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(canvas);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'JPEG', 5, 15, pdfWidth - 10, pdfHeight - 10); // left top width height
      pdf.save('download.pdf');
    });
  };
  return (
    <>
      <Box id="element-to-print" width="100%">
        <Typography variant="h6" mb={2} align="center">
          {t('Đăng ký tiêm chủng COVID-19 thành công. Mã đặt tiêm của bạn là')}{' '}
          <Box component="span" sx={{ color: colors.red[700] }}>
            0120211103501237
          </Box>
          .
        </Typography>
        <Typography align="center" variant="body1" mb={2}>
          {' '}
          {t(
            'Cảm ơn quý khách đã đăng ký tiêm chủng vắc xin COVID-19. Hiện tại Bộ y tế đang tiến hành thu thập nhu cầu và thông tin để lập danh sách đối tượng đăng ký tiêm vắc xin COVID-19 theo từng địa bàn. Chúng tôi sẽ liên hệ với quý khách theo số điện thoại'
          )}{' '}
          <Box
            component="span"
            sx={{ color: (theme) => theme.palette.info.light }}>
            {data?.phone_number}
          </Box>{' '}
          {t('khi có kế hoạch tiêm trong thời gian sớm nhất.')}
        </Typography>
        <Typography variant="body1" mb={2} align="center">
          {t('Mời bạn tải ứng dụng "SỔ SỨC KHỎE ĐIỆN TỬ" tại')}{' '}
          <Link href="https://hssk.kcb.vn/#/sskdt" target="_blank">
            https://hssk.kcb.vn/#/sskdt
          </Link>{' '}
          {t(
            'để theo dõi kết quả đăng ký tiêm và nhận chứng nhận tiêm chủng COVID-19'
          )}
        </Typography>
        <Stack direction="row" sx={{ width: '100%' }} mb={2} mt={3}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">Họ tên</Typography>
            <Typography variant="body1" fontWeight="500">
              {data?.full_name}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">{t('Ngày sinh')}</Typography>
            <Typography variant="body1" fontWeight="500">
              {data?.dob}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">{t('Giới tính')}</Typography>
            <Typography variant="body1" fontWeight="500">
              {t(
                data?.gender as
                  | string
                  | TemplateStringsArray
                  | (string | TemplateStringsArray)[]
              )}
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" sx={{ width: '100%' }} mb={2}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">{t('Số điện thoại')}</Typography>
            <Typography variant="body1" fontWeight="500">
              {data?.phone_number}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">
              {t('Số CMND/CCCD/Mã định danh công dân')}
            </Typography>
            <Typography variant="body1" fontWeight="500">
              {data?.citizen_id}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">{t('Số thẻ BHYT')}</Typography>
            <Typography variant="body1" fontWeight="500">
              {data?.healthInsuranceCardNumber}
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" sx={{ width: '100%' }} mb={2}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">{t('Tỉnh/Thành phố')}</Typography>
            <Typography variant="body1" fontWeight="500">
              {getProvinceName(Number(data?.province_id), listProvince)}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">{t('Quận/Huyện')}</Typography>
            <Typography variant="body1" fontWeight="500">
              {getDistrictName(
                Number(data?.province_id),
                data?.district_id,
                listProvince
              )}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">{t('Xã/Phường')}</Typography>
            <Typography variant="body1" fontWeight="500">
              {getWardName(
                Number(data?.province_id),
                data?.district_id,
                data?.ward_id,
                listProvince
              )}
            </Typography>
          </Box>
        </Stack>
      </Box>
      <Stack
        direction="row"
        justifyContent="center"
        spacing={2}
        sx={{
          marginTop: '24px !important',
          marginBottom: '48px !important'
        }}>
        <StyledButton
          variant="outlined"
          sx={{ color: colors.indigo['700'] }}
          onClick={onPrevStep}
          startIcon={<ArrowBackIcon />}>
          {t('Quay lại')}
        </StyledButton>
        <StyledButton
          variant="contained"
          sx={{ backgroundColor: colors.indigo['700'] }}
          endIcon={<FileDownloadOutlinedIcon />}
          onClick={downloadPdfDocument}>
          {t('Xuất thông tin')}
        </StyledButton>
      </Stack>
    </>
  );
};
