import { useState } from 'react';

import {
  Box,
  Container,
  Typography,
  colors,
  Stack,
  TextField,
  Grid
} from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import SearchIcon from '@mui/icons-material/Search';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Trans } from 'react-i18next';
import { useTranslation } from 'react-i18next';

import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { Label } from '../../components/Label';
import { StyledButton } from '../../components';
import { InjectionRegistrationDialog } from '../../components/InjectionRegistrationDialog/InjectionRegistrationDialog';
import { TableInjectionRegistrationResult } from '../../components/TableInjectionRegistrationResult/TableInjectionRegistrationResult';
import { IInjectionRegistration, IInjectionRegistrationResult } from './types';
import { injectionRegistrationSchema } from './schema';
import { injectionRegistrationResult } from '../../db/injectionRegistration';

export const InjectionRegistration = () => {
  const [showInjectionResult, setShowInjectionResult] =
    useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [dataToDialog, setDataToDialog] =
    useState<IInjectionRegistrationResult>();
  const { t } = useTranslation();

  const {
    formState: { isValid },
    handleSubmit,
    reset,
    control
  } = useForm<IInjectionRegistration>({
    resolver: yupResolver(injectionRegistrationSchema),
    mode: 'onChange',
    defaultValues: {
      citizen_id: '',
      phone_number: ''
    }
  });
  const handleShowInfo = (info: IInjectionRegistrationResult) => {
    setDataToDialog(info);
    setOpen(true);
  };
  const handleShowInjectionResult: SubmitHandler<
    IInjectionRegistration
  > = () => {
    setShowInjectionResult(true);
  };
  const handleReset = () => {
    reset();
    setDataToDialog(undefined);
  };
  const onCloseDialog = () => {
    setOpen(false);
  };
  return (
    <>
      <InjectionRegistrationDialog
        open={open}
        onClose={onCloseDialog}
        data={dataToDialog}
      />
      <Header />
      <Box
        sx={{
          mt: '112px',
          mb: '40px',
          height: '64px',
          width: '100vw',
          background: colors.grey['100'],
          display: 'flex',
          alignItems: 'center'
        }}>
        <Container maxWidth="xl">
          <Typography variant="h5">
            <Trans>Tra cứu đăng ký tiêm</Trans>
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="xl">
        <Box
          component="form"
          sx={{ mb: '110px' }}
          onReset={handleReset}
          onSubmit={handleSubmit(handleShowInjectionResult)}>
          <Stack direction="column" spacing={3}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Stack direction="column" spacing={1}>
                  <Label required={true}>
                    <Trans>Số CMND/CCCD/Mã định danh công dân</Trans>
                  </Label>
                  <Controller
                    name="citizen_id"
                    control={control}
                    render={({ field, fieldState: { invalid, error } }) => (
                      <TextField
                        fullWidth
                        size="small"
                        helperText={
                          error?.message ? t(`${error?.message}`) : null
                        }
                        error={invalid}
                        placeholder={t('Số CMND/CCCD/Mã định danh công dân')}
                        {...field}
                        sx={{ root: { height: '50px' }, mt: 1 }}
                      />
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack direction="column" spacing={1}>
                  <Label required={true}>
                    <Trans>Số điện thoại</Trans>
                  </Label>
                  <Controller
                    name="phone_number"
                    control={control}
                    render={({ field, fieldState: { invalid, error } }) => (
                      <TextField
                        fullWidth
                        size="small"
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
                </Stack>
              </Grid>
            </Grid>
            <Box sx={{ color: colors.red['600'] }}>
              <Box component="b">
                <Trans>Lưu ý</Trans>:
              </Box>{' '}
              <Box component="i">
                <Trans>
                  Cá nhân/Tổ chức đăng ký thành công trên hệ thống sẽ được đưa
                  vào danh sách đặt tiêm. Cơ sở y tế sẽ thông báo lịch tiêm khi
                  có vắc xin và kế hoạch tiêm được phê duyệt. Trân trọng cảm ơn!
                </Trans>
              </Box>
            </Box>
            <Box>
              <Stack direction="row" justifyContent="center" spacing={2}>
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
                  disabled={!isValid}
                  type="submit">
                  <Trans>Tra cứu</Trans>
                </StyledButton>
              </Stack>
            </Box>
          </Stack>
        </Box>
        {showInjectionResult && (
          <TableInjectionRegistrationResult
            data={injectionRegistrationResult}
            handleShowInfo={handleShowInfo}
          />
        )}
      </Container>
      <Footer />
    </>
  );
};
