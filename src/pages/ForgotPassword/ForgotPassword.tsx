import { useState } from 'react';
import { Box, Grid, TextField, colors } from '@mui/material';
import { Trans } from 'react-i18next';

import loginImg from '../../images/login.png';
import { StyledButton } from '../../components/StyledButton';
import { Label } from '../../components/Label';
import { useNavigate } from 'react-router-dom';
import { OTPInputDialog } from '../../components/OTPInputDialog/OTPInputDialog';

export const ForgotPassword = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [citizen_id, setCitizenId] = useState<string>('');
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^[0-9]*$/.test(e.target.value)) {
      setCitizenId(e.target.value);
      if (e.target.value.length === 9 || e.target.value.length === 12) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  };

  const handleCloseModal = () => setOpen(false);

  return (
    <Grid container>
      <OTPInputDialog
        open={open}
        onClose={handleCloseModal}
        onConfirm={handleCloseModal}
      />
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
              <Label required={true}>
                <Trans>
                  Để khôi phục mật khẩu, vui lòng nhập đúng số CMND/CCCD bạn đã
                  dùng để đăng ký
                </Trans>
              </Label>
            </Box>
            <Box>
              <TextField
                fullWidth
                onChange={handleChange}
                sx={{ borderRadius: 1, height: '50px' }}
                placeholder="123456789"
                value={citizen_id}
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
                }}
                onClick={handleBackToLogin}>
                <Trans>Quay lại</Trans>
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
                onClick={handleOpenModal}
                disabled={disabled}>
                <Trans>Gửi</Trans>
              </StyledButton>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
