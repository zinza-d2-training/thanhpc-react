import { Box, Typography, colors } from '@mui/material';
import OtpInput from 'react-otp-input';
import DialogContent from '@mui/material/DialogContent';
import { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';

import { useClock } from '../../hooks/useClock';
import forgotPasswordImg from '../../images/forgot-password.png';
import { StyledButton } from '../StyledButton/index';

interface Props {
  onClose: () => void;
  onConfirm: () => void;
}

export const ContentDialog = (props: Props) => {
  const { onClose, onConfirm } = props;
  const [otp, setOtp] = useState<string>('');
  const [isShowResendOtp, setIsShowResendOtp] = useState<boolean>(false);
  const { time, setTime } = useClock({ hours: 0, minutes: 2, seconds: 0 });
  const [disabled, setDisabled] = useState<boolean>(true);

  const handleChangeOtp = (otp: string) => {
    setOtp(otp);
  };

  const resendOtp = () => {
    setTime({ hours: 0, minutes: 2, seconds: 0 });
    setIsShowResendOtp(false);
    setOtp('');
  };

  useEffect(() => {
    if (otp.length === 6) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [otp]);

  useEffect(() => {
    if (time === '00:00:00') {
      setIsShowResendOtp(true);
    }
  }, [time]);

  return (
    <DialogContent>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          component="img"
          sx={{
            height: '140px',
            width: '140px',
            objectFit: 'cover',
            verticalAlign: 'middle',
            mb: 3
          }}
          alt=""
          src={forgotPasswordImg}
        />
      </Box>
      <Box>
        <Typography sx={{ px: 16, textAlign: 'center' }}>
          <Trans>
            Mã xác minh sẽ được gửi bằng tin nhắn đến SĐT bạn đăng ký
          </Trans>
        </Typography>
      </Box>
      <Box sx={{ px: 16, mt: 4, display: 'flex', justifyContent: 'center' }}>
        <OtpInput
          value={otp}
          onChange={handleChangeOtp}
          numInputs={6}
          inputStyle={{
            width: 40,
            height: 40,
            border: 'none',
            fontSize: '24px',
            outline: 'none',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.075)',
            borderBottom: '1px solid #f00'
          }}
          focusStyle={{
            borderBottom: `1px solid ${colors.blueGrey['500']}`
          }}
          separator={
            <Box
              sx={{
                mr: 2
              }}></Box>
          }
        />
      </Box>
      <Box sx={{ mt: 4.5, display: 'flex', justifyContent: 'center' }}>
        <Typography sx={{ color: colors.blueGrey['400'] }}>
          <Trans>
            Nếu bạn không nhận được tin nhắn, xin vui lòng thử lại sau:
          </Trans>
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
        <Typography sx={{ color: colors.blueGrey['400'] }}>{time}</Typography>
      </Box>
      {isShowResendOtp && (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', mb: 5.2 }}
          onClick={resendOtp}>
          <Typography
            sx={{
              color: colors.blue['600'],
              cursor: 'pointer',
              '&:hover': {
                color: colors.blue['800']
              }
            }}>
            <Trans>Gửi lại mã OTP?</Trans>
          </Typography>
        </Box>
      )}
      <Box sx={{ justifyContent: 'center', display: 'flex', mt: 5, mb: 2.1 }}>
        <StyledButton
          sx={{
            border: 1,
            borderColor: colors.indigo['700'],
            color: colors.indigo['700'],
            background: '#fff',
            mr: 1
          }}
          onClick={onClose}>
          <Trans>Hủy bỏ</Trans>
        </StyledButton>
        <StyledButton
          sx={{
            background: colors.indigo['700'],
            color: '#fff',
            '&:hover': {
              background: colors.indigo['600']
            }
          }}
          variant="contained"
          disabled={disabled}
          onClick={onConfirm}>
          <Trans>Xác nhận</Trans>
        </StyledButton>
      </Box>
    </DialogContent>
  );
};
