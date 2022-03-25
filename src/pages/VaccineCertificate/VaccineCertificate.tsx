import {
  Box,
  Grid,
  Typography,
  colors,
  Stack,
  Link,
  TextField,
  Container,
  MenuItem
} from '@mui/material';
import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CachedIcon from '@mui/icons-material/Cached';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation, Trans } from 'react-i18next';

import { Label } from '../../components/Label';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { ConfirmInjection } from '../../components/ConfirmInjection/ConfirmInjection';
import { LookUpCertificate } from './types';
import { vaccineCertificateSchema } from './schema';
import { StyledButton } from '../../components';
import { lookUpCertificateResult } from '../../db/lookUpCertificateResult';
import { OTPInputDialog } from '../../components/OTPInputDialog/OTPInputDialog';

export const VaccineCertificate = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const { handleSubmit, reset, control } = useForm<LookUpCertificate>({
    resolver: yupResolver(vaccineCertificateSchema),
    mode: 'onChange',
    defaultValues: {
      full_name: '',
      dob: undefined,
      gender: 'male',
      phone_number: '',
      citizen_id: '',
      healthInsuranceCardNumber: ''
    }
  });
  const handleCloseModal = () => setOpen(false);
  const handleSubmitForm: SubmitHandler<LookUpCertificate> = () => {
    setOpen(true);
  };
  const handleReset = () => {
    reset();
  };
  const handleConfirmModal = () => {
    setOpen(false);
    setShowInfo(true);
  };

  return (
    <>
      <OTPInputDialog
        open={open}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
      />
      <Header />
      <Box sx={{ minHeight: '500px' }}>
        <Box
          sx={{
            mt: '112px',
            mb: '40px',
            height: '64px',
            background: colors.grey['100'],
            display: 'flex',
            alignItems: 'center'
          }}>
          <Container maxWidth="xl">
            <Typography variant="h5">
              <Trans>Tra cứu chứng nhận tiêm</Trans>
            </Typography>
          </Container>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Container maxWidth="xl">
            <Box
              component="form"
              onSubmit={handleSubmit(handleSubmitForm)}
              onReset={handleReset}>
              <Grid container spacing={2}>
                <Grid item xs={2} xl={2}>
                  <Box sx={{}}>
                    <Label required={true}>Họ và tên</Label>
                    <Controller
                      name="full_name"
                      control={control}
                      render={({ field, fieldState: { invalid, error } }) => (
                        <TextField
                          size="small"
                          fullWidth
                          helperText={
                            error?.message ? t(`${error?.message}`) : null
                          }
                          error={invalid}
                          placeholder={t('Họ và tên')}
                          {...field}
                          sx={{ root: { height: '50px' }, mt: 1 }}
                        />
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item xs={2} xl={2}>
                  <Box sx={{}}>
                    <Label required={true}>Ngày sinh</Label>
                    <Controller
                      name="dob"
                      control={control}
                      render={({ field, fieldState: { invalid, error } }) => (
                        <TextField
                          size="small"
                          fullWidth
                          helperText={
                            error?.message ? t(`${error?.message}`) : null
                          }
                          error={invalid}
                          type="date"
                          {...field}
                          sx={{ root: { height: '50px' }, mt: 1 }}
                        />
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item xs={2} xl={2}>
                  <Box sx={{}}>
                    <Label required={true}>Giới tính</Label>
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field, fieldState: { invalid, error } }) => (
                        <TextField
                          size="small"
                          fullWidth
                          helperText={
                            error?.message ? t(`${error?.message}`) : null
                          }
                          error={invalid}
                          {...field}
                          sx={{ root: { height: '50px' }, mt: 1 }}
                          select>
                          <MenuItem value="male">{t('Nam')}</MenuItem>
                          <MenuItem value="female">{t('Nữ')}</MenuItem>
                        </TextField>
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item xs={2} xl={2}>
                  <Box sx={{}}>
                    <Label required={true}>Số điện thoại</Label>
                    <Controller
                      name="phone_number"
                      control={control}
                      render={({ field, fieldState: { invalid, error } }) => (
                        <TextField
                          size="small"
                          fullWidth
                          helperText={
                            error?.message ? t(`${error?.message}`) : null
                          }
                          error={invalid}
                          placeholder={t('Số điện thoại')}
                          {...field}
                          sx={{ root: { height: '50px' }, mt: 1 }}
                        />
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item xs={2} xl={2}>
                  <Box sx={{}}>
                    <Label required={false}>Số CMND/CCCD</Label>
                    <Controller
                      name="citizen_id"
                      control={control}
                      render={({ field, fieldState: { invalid, error } }) => (
                        <TextField
                          size="small"
                          fullWidth
                          placeholder={t('Số CMND/CCCD')}
                          {...field}
                          sx={{ root: { height: '50px' }, mt: 1 }}
                        />
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item xs={2} xl={2}>
                  <Box sx={{}}>
                    <Label required={false}>Số thẻ BHYT</Label>
                    <Controller
                      name="healthInsuranceCardNumber"
                      control={control}
                      render={({ field, fieldState: { invalid, error } }) => (
                        <TextField
                          size="small"
                          fullWidth
                          placeholder={t('Số thẻ BHYT')}
                          {...field}
                          sx={{ root: { height: '50px' }, mt: 1 }}
                        />
                      )}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Box sx={{ color: colors.red['600'], mt: 3 }}>
                <Box component="b">
                  <Trans>Ghi chú</Trans>:
                </Box>{' '}
                <Box component="i">
                  <Trans>
                    Nếu bạn đã tiêm nhưng chưa được ghi nhận, hãy liên hệ với cơ
                    sở tiêm và đề nghị cập nhật thông tin lên Nền tảng tiêm
                    chủng để có thể nhận được Chứng nhận tiêm hoặc phản ánh
                    thông tin mũi tiêm
                  </Trans>{' '}
                  <Link
                    sx={{
                      color: colors.red[600],
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      textDecorationColor: colors.red[600]
                    }}>
                    <Trans>tại đây</Trans>
                  </Link>
                </Box>
              </Box>
              <Stack
                direction="row"
                justifyContent="center"
                spacing={2}
                mt={3}
                sx={{ mb: '86px' }}>
                <StyledButton
                  variant="outlined"
                  sx={{ color: colors.indigo['700'] }}
                  startIcon={<CachedIcon />}
                  type="reset">
                  <Trans>Nhập lại</Trans>
                </StyledButton>
                <StyledButton
                  variant="contained"
                  startIcon={<SearchIcon />}
                  sx={{ backgroundColor: colors.indigo['700'] }}
                  type="submit">
                  <Trans>Tra cứu</Trans>
                </StyledButton>
              </Stack>
            </Box>

            {showInfo ? (
              <ConfirmInjection data={lookUpCertificateResult} />
            ) : null}
          </Container>
        </Box>
      </Box>
      <Footer />
    </>
  );
};
