import { useState } from 'react';
import {
  Box,
  Checkbox,
  Divider,
  Stack,
  Typography,
  colors
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';

import { StyledButton } from '../../components';

import needleImg from '../../images/needle-mini.png';
import plusImg from '../../images/plus.png';
import protect2Img from '../../images/protect2.png';
import { OTPInputDialog } from '../../components/OTPInputDialog/OTPInputDialog';

interface Props {
  onNextStep: () => void;
  onPrevStep: () => void;
  receiveData: (data: boolean) => void;
  data: boolean;
}
export const StepThree = (props: Props) => {
  const { t } = useTranslation();
  const { onNextStep, onPrevStep, data, receiveData } = props;
  const [checked, setChecked] = useState<boolean>(data);
  const [open, setOpen] = useState<boolean>(false);
  const handleChangeAcceptInjection = () => {
    setChecked(!checked);
  };
  const handleCloseModal = () => setOpen(false);
  const handleConfirmModal = () => {
    setOpen(false);
    onNextStep();
  };
  const handleShowModal = () => {
    setOpen(true);
    receiveData(checked);
  };
  return (
    <>
      <OTPInputDialog
        open={open}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
      />
      <Stack direction="row" alignItems="center" mb={2} spacing={2}>
        <Box component="img" src={protect2Img} />
        <Typography variant="body1">
          {' '}
          1.{' '}
          {t(
            'Tiêm chủng vắc xin là biện pháp phòng chống dịch hiệu quả, tuy nhiên vắc xin phòng COVID-19 có thể không phòng được bệnh hoàn toàn. Người được tiêm chủng vắc xin phòng COVID-19 có thể phòng được bệnh hoặc giảm mức độ nặng nếu mắc bệnh. Tuy nhiên, sau khi tiêm chủng vẫn phải tiếp tục thực hiện nghiêm các biện pháp phòng chống dịch theo quy định.'
          )}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" mb={2} spacing={2}>
        <Box component="img" src={needleImg} />
        <Typography variant="body1">
          {' '}
          2.{' '}
          {t(
            'Tiêm chủng vắc xin phòng COVID-19 có thể gây ra một số biểu hiện tại chỗ tiêm hoặc toàn thân như sưng, đau chỗ tiêm, nhức đầu, buồn nôn, sốt, đau cơ…hoặc tai biến nặng sau tiêm chủng. Tiêm vắc xin mũi 2 do Pfizer sản xuất ở người đã tiêm mũi 1 bằng vắc xin AstraZeneca có thể tăng khả năng xảy ra phản ứng thông thường sau tiêm chủng.'
          )}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" mb={2} spacing={2}>
        <Box component="img" src={plusImg} />
        <Typography variant="body1">
          {' '}
          3.{' '}
          {t(
            'Khi có triệu chứng bất thường về sức khỏe, người được tiêm chủng cần đến ngay cơ sở y tế gần nhất để được tư vấn, thăm khám và điều trị kịp thời.'
          )}
        </Typography>
      </Stack>
      <Divider />
      <Stack direction="row" alignItems="center" spacing={2} mt={2}>
        <Typography variant="body1">
          {t(
            'Sau khi đã đọc các thông tin nêu trên, tôi đã hiểu về các nguy cơ và'
          )}
          :{' '}
        </Typography>
        <Typography
          component="label"
          htmlFor="accept-injection"
          variant="body1"
          sx={{ userSelect: 'none', cursor: 'pointer' }}>
          <Checkbox
            id="accept-injection"
            checked={checked}
            onChange={handleChangeAcceptInjection}
          />
          {t('Đồng ý tiêm chủng')}
        </Typography>
      </Stack>
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
          disabled={!checked}
          variant="contained"
          sx={{ backgroundColor: colors.indigo['700'] }}
          // type="submit"
          endIcon={<ArrowForwardIcon />}
          onClick={handleShowModal}>
          {t('Tiếp tục')}
        </StyledButton>
      </Stack>
    </>
  );
};
