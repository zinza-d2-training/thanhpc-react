import { useState } from 'react';

import {
  Box,
  Container,
  Typography,
  colors,
  IconButton,
  Stack,
  Chip,
  TextField,
  Grid
} from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import SearchIcon from '@mui/icons-material/Search';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { Label } from '../../components/Label';
import { StyledButton } from '../../components';
import { InjectionRegistrationDialog } from '../../components/InjectionRegistrationDialog/InjectionRegistrationDialog';
import {
  IInjectionRegistration,
  IInjectionRegistrationResult,
  Status
} from './types';
import { injectionRegistrationSchema } from '../../validations/yups/schema';
import { injectionRegistrationResult } from '../../db/injectionRegistration';

export const InjectionRegistration = () => {
  const [showInjectionResult, setShowInjectionResult] =
    useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [dataToDialog, setDataToDialog] =
    useState<IInjectionRegistrationResult>();

  const {
    formState: { errors, isValid },
    handleSubmit,
    reset,
    control
  } = useForm<IInjectionRegistration>({
    resolver: yupResolver(injectionRegistrationSchema),
    mode: 'onChange',
    defaultValues: {
      citizenId: '',
      phone_number: ''
    }
  });
  const handleShowInfo = (info: IInjectionRegistrationResult) => {
    setDataToDialog(info);
    setOpen(true);
  };
  const handleShowInjectionResult: SubmitHandler<IInjectionRegistration> = () =>
    // data
    {
      // console.log(data);
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
          <Typography variant="h5">Tra cứu đăng ký tiêm</Typography>
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
                    Số CMND/CCCD/Mã định danh công dân
                  </Label>
                  <Controller
                    name="citizenId"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        helperText={
                          errors.citizenId?.message
                            ? errors.citizenId?.message
                            : null
                        }
                        error={errors.citizenId?.message ? true : false}
                        placeholder="Số CMND/CCCD/Mã định danh công dân"
                        {...field}
                        sx={{ root: { height: '50px' }, mt: 1 }}
                      />
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack direction="column" spacing={1}>
                  <Label required={true}>Số điện thoại</Label>
                  <Controller
                    name="phone_number"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        helperText={
                          errors.phone_number?.message
                            ? errors.phone_number?.message
                            : null
                        }
                        error={errors.phone_number?.message ? true : false}
                        placeholder="Số điện thoại"
                        {...field}
                        sx={{ root: { height: '50px' }, mt: 1 }}
                      />
                    )}
                  />
                </Stack>
              </Grid>
            </Grid>
            <Box sx={{ color: colors.red['600'] }}>
              <Box component="b">Lưu ý:</Box>{' '}
              <Box component="i">
                Cá nhân/Tổ chức đăng ký thành công trên hệ thống sẽ được đưa vào
                danh sách đặt tiêm. Cơ sở y tế sẽ thông báo lịch tiêm khi có vắc
                xin và kế hoạch tiêm được phê duyệt. Trân trọng cảm ơn!
              </Box>
            </Box>
            <Box>
              <Stack direction="row" justifyContent="center" spacing={2}>
                <StyledButton
                  variant="outlined"
                  sx={{ color: colors.indigo['700'] }}
                  startIcon={<CachedIcon />}
                  type="reset">
                  Nhập lại
                </StyledButton>
                <StyledButton
                  variant="contained"
                  startIcon={<SearchIcon />}
                  sx={{ backgroundColor: colors.indigo['700'] }}
                  disabled={!isValid}
                  type="submit">
                  Tra cứu
                </StyledButton>
              </Stack>
            </Box>
          </Stack>
        </Box>
        {showInjectionResult && (
          <TableContainer
            component={Paper}
            sx={{ maxHeight: '850px', boxShadow: 'none', mb: 3 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow
                  sx={{
                    background: colors.grey['100']
                  }}>
                  <TableCell align="center">STT</TableCell>
                  <TableCell align="center">Họ và tên</TableCell>
                  <TableCell align="center">Ngày sinh </TableCell>
                  <TableCell align="center">Giới tính</TableCell>
                  <TableCell align="center">Số điện thoại</TableCell>
                  <TableCell align="center">Số CMND/CCCD</TableCell>
                  <TableCell align="center">Trạng thái</TableCell>
                  <TableCell align="center">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {injectionRegistrationResult.map(
                  (row: IInjectionRegistrationResult, index: number) => (
                    <TableRow
                      key={index}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        background: index % 2 === 1 ? colors.grey['100'] : null
                      }}>
                      <TableCell align="center" component="th" scope="row">
                        {index}
                      </TableCell>
                      <TableCell align="center">{row.full_name}</TableCell>
                      <TableCell align="center">
                        {`${
                          row.dob.getDate().toString().length > 1
                            ? row.dob.getDate()
                            : '0' + row.dob.getDate()
                        }/${row.dob.getMonth() + 1}/${row.dob.getFullYear()}`}
                      </TableCell>
                      <TableCell align="center">{row.gender}</TableCell>
                      <TableCell align="center">{row.phone_number}</TableCell>
                      <TableCell align="center">{row.citizenId}</TableCell>
                      <TableCell align="center">
                        {row.status === Status.Success ? (
                          <Chip
                            label="Đăng ký thành công"
                            variant="outlined"
                            sx={{
                              background: colors.indigo['50'],
                              border: `1px solid ${colors.blue['500']}`,
                              color: colors.blue['500']
                            }}
                          />
                        ) : (
                          <Chip
                            label="Đăng ký thất bại"
                            variant="outlined"
                            sx={{
                              background: colors.indigo['50'],
                              border: `1px solid ${colors.red['500']}`,
                              color: colors.red['500']
                            }}
                          />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => handleShowInfo(row)}>
                          <InfoOutlinedIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
      <Footer />
    </>
  );
};
