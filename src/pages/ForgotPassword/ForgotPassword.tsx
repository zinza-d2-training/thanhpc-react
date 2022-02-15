import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Modal,
  colors,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import OtpInput from 'react-otp-input';

import loginImg from '../../images/login.png';
import forgotPasswordImg from '../../images/forgot-password.png';
import { StyledButton } from '../../components/StyledButton';
import { useClock } from '../../hooks/useClock';

const ForgotPassword = () => {
  const [otp, setOtp] = useState<string>('');
  const [isShowResendOtp, setIsShowResendOtp] = useState<boolean>(false);
  const { time, setTime } = useClock({ hours: 0, minutes: 0, seconds: 0 });
  const [open, setOpen] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);

  const handleOpenModal = () => {
    setTime({ hours: 0, minutes: 2, seconds: 0 });
    setOpen(true);
  };

  const handleCloseModal = () => setOpen(false);

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
    if (time === '00:00:00' && open === true) {
      setIsShowResendOtp(true);
    }
  }, [time, open]);

  return (
    <Grid container>
      <Modal open={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            outline: 'none',
            boxShadow: 24,
            borderRadius: 1
          }}>
          <Box
            sx={{
              pl: 3,
              py: 2,
              display: 'flex',
              justifyContent: 'space-between'
            }}>
            <Typography variant="h6">Xác thực OTP</Typography>
            <CloseIcon
              sx={{
                width: '50px',
                textAlign: 'center',
                cursor: 'pointer',
                color: 'rgba(0, 0, 0, 0.54)'
              }}
              fontSize="small"
              onClick={handleCloseModal}
            />
          </Box>
          <Divider />
          <Box>
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
          </Box>
          <Box>
            <Typography sx={{ px: 16, textAlign: 'center' }}>
              Mã xác minh sẽ được gửi bằng tin nhắn đến SĐT bạn đăng ký
            </Typography>
          </Box>
          <Box
            sx={{ px: 16, mt: 4, display: 'flex', justifyContent: 'center' }}>
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
              Nếu bạn không nhận được tin nhắn, xin vui lòng thử lại sau:
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Typography sx={{ color: colors.blueGrey['400'] }}>
              {time}
            </Typography>
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
                Gửi lại mã OTP?
              </Typography>
            </Box>
          )}
          <Box
            sx={{ justifyContent: 'center', display: 'flex', mt: 5, mb: 2.1 }}>
            <StyledButton
              sx={{
                border: 1,
                borderColor: colors.indigo['700'],
                color: colors.indigo['700'],
                background: '#fff',
                mr: 1
              }}
              onClick={handleCloseModal}>
              Hủy Bỏ
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
              disabled={disabled}>
              Xác Nhận
            </StyledButton>
          </Box>
        </Box>
      </Modal>
      <Grid item xs={6}>
        <Box
          component="img"
          sx={{
            height: '100vh',
            width: '100%',
            objectFit: 'cover',
            verticalAlign: 'middle'
          }}
          alt=""
          src={loginImg}
        />
      </Grid>
      <Grid item xs={6}>
        <Box
          component="form"
          sx={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Box
            sx={{
              width: '479px'
            }}>
            <Box sx={{ justifyContent: 'center', display: 'flex', mb: 3 }}>
              <Typography
                variant="body1"
                sx={{
                  position: 'relative',
                  textAlign: 'center',
                  width: '80%'
                }}>
                Để khôi phục mật khẩu, vui lòng nhập đúng số CMND/CCCD bạn đã
                dùng để đăng ký
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: colors.red['600'],
                  position: 'absolute',
                  right: '188px',
                  top: '228px'
                }}>
                (*)
              </Typography>
            </Box>
            <Box>
              <TextField
                fullWidth
                sx={{ borderRadius: 1 }}
                placeholder="123456789"
              />
            </Box>
            <Box sx={{ justifyContent: 'center', display: 'flex', mt: 5 }}>
              <StyledButton
                sx={{
                  border: 1,
                  borderColor: colors.indigo['700'],
                  color: colors.indigo['700'],
                  background: '#fff',
                  mr: 1
                }}>
                Quay lại
              </StyledButton>
              <StyledButton
                sx={{
                  background: colors.indigo['700'],
                  color: '#fff',
                  '&:hover': {
                    background: colors.indigo['600']
                  }
                }}
                onClick={handleOpenModal}>
                Gửi
              </StyledButton>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
export default ForgotPassword;
