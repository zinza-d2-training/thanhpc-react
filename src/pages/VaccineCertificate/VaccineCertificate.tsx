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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CachedIcon from '@mui/icons-material/Cached';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo';

import { Label } from '../../components/Label';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { LookUpCertificate } from './types';
import { IVaccinate } from './types';
import { vaccineCertificateSchema } from '../../validations/yups/schema';
import { StyledButton } from '../../components';
import { lookUpCertificateResult } from '../../db/lookUpCertificateResult';
import headerImg from '../../images/header.png';
import qrImg from '../../images/qr.png';
import { OTPInputDialog } from '../../components/OTPInputDialog/OTPInputDialog';

export const VaccineCertificate = () => {
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
      citizenId: '',
      healthInsuranceCardNumber: ''
    }
  });
  const handleCloseModal = () => setOpen(false);
  const handleSubmitForm: SubmitHandler<LookUpCertificate> = () =>
    // data: LookUpCertificate
    {
      // console.log('data', data);
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
          <Typography variant="h5">Tra cứu chứng nhận tiêm</Typography>
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
                        fullWidth
                        helperText={error?.message}
                        error={invalid}
                        placeholder="Họ và tên"
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
                        fullWidth
                        helperText={error?.message}
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
                        fullWidth
                        helperText={error?.message}
                        error={invalid}
                        {...field}
                        sx={{ root: { height: '50px' }, mt: 1 }}
                        select>
                        <MenuItem value="male">Nam</MenuItem>
                        <MenuItem value="female">Nữ</MenuItem>
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
                        fullWidth
                        helperText={error?.message}
                        error={invalid}
                        placeholder="Số điện thoại"
                        {...field}
                        sx={{ root: { height: '50px' }, mt: 1 }}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={2} xl={2}>
                <Box sx={{}}>
                  <Label required={true}>Số CMND/CCCD</Label>
                  <Controller
                    name="citizenId"
                    control={control}
                    render={({ field, fieldState: { invalid, error } }) => (
                      <TextField
                        fullWidth
                        placeholder="Số CMND/CCCD"
                        {...field}
                        sx={{ root: { height: '50px' }, mt: 1 }}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={2} xl={2}>
                <Box sx={{}}>
                  <Label required={true}>Số thẻ BHYT</Label>
                  <Controller
                    name="healthInsuranceCardNumber"
                    control={control}
                    render={({ field, fieldState: { invalid, error } }) => (
                      <TextField
                        fullWidth
                        placeholder="Số thẻ BHYT"
                        {...field}
                        sx={{ root: { height: '50px' }, mt: 1 }}
                      />
                    )}
                  />
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ color: colors.red['600'], mt: 3 }}>
              <Box component="b">Ghi chú:</Box>{' '}
              <Box component="i">
                Nếu bạn đã tiêm nhưng chưa được ghi nhận, hãy liên hệ với cơ sở
                tiêm và đề nghị cập nhật thông tin lên Nền tảng tiêm chủng để có
                thể nhận được Chứng nhận tiêm hoặc phản ánh thông tin mũi tiêm{' '}
                <Link
                  sx={{
                    color: colors.red[600],
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    textDecorationColor: colors.red[600]
                  }}>
                  tại đây
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
                Nhập lại
              </StyledButton>
              <StyledButton
                variant="contained"
                startIcon={<SearchIcon />}
                sx={{ backgroundColor: colors.indigo['700'] }}
                type="submit">
                Tra cứu
              </StyledButton>
            </Stack>
          </Box>

          {showInfo ? (
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <Stack
                  direction="column"
                  sx={{
                    alignItems: 'center'
                  }}>
                  <Typography variant="body1">
                    CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: '500'
                    }}>
                    Độc lập - Tự do - Hạnh phúc
                  </Typography>
                </Stack>
                <Box>
                  <Box
                    sx={{
                      my: 3,
                      display: 'flex',
                      justifyContent: 'center'
                    }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: '500'
                      }}>
                      CHỨNG NHẬN TIÊM CHỦNG COVID-19
                    </Typography>
                  </Box>
                  <Grid container rowSpacing={2}>
                    <Grid item={true} xs={4}>
                      <Stack direction="column" spacing={1}>
                        <Typography variant="body1">Họ và tên</Typography>
                        <Typography variant="body1" sx={{ fontWeight: '500' }}>
                          {lookUpCertificateResult.full_name}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item={true} xs={4}>
                      <Stack direction="column" spacing={1}>
                        <Typography variant="body1">Ngày sinh</Typography>
                        <Typography variant="body1" sx={{ fontWeight: '500' }}>
                          {lookUpCertificateResult.dob.toLocaleDateString()}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item={true} xs={4}>
                      <Stack direction="column" spacing={1}>
                        <Typography variant="body1">Số CMND/CCCD</Typography>
                        <Typography variant="body1" sx={{ fontWeight: '500' }}>
                          {lookUpCertificateResult.citizenId}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item={true} xs={4}>
                      <Stack direction="column" spacing={1}>
                        <Typography variant="body1">Số thẻ BHYT</Typography>
                        <Typography variant="body1" sx={{ fontWeight: '500' }}>
                          {lookUpCertificateResult.healthInsuranceCardNumber}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item={true} xs={4}>
                      <Stack direction="column" spacing={1}>
                        <Typography variant="body1">Số điện thoại</Typography>
                        <Typography variant="body1" sx={{ fontWeight: '500' }}>
                          {lookUpCertificateResult.phone_number}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item={true} xs={12}>
                      <Stack direction="column" spacing={1}>
                        <Typography variant="body1">Địa chỉ</Typography>
                        <Typography variant="body1" sx={{ fontWeight: '500' }}>
                          {lookUpCertificateResult.address}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item={true} xs={12}>
                      <Stack direction="column" spacing={1}>
                        <Typography variant="body1">Kết luận</Typography>
                        <Typography variant="body1" sx={{ fontWeight: '500' }}>
                          {lookUpCertificateResult.vaccines.length > 0
                            ? 'Đã được tiêm phòng vắc xin phòng bệnh Covid-19'
                            : 'Chưa được tiêm phòng vắc xin phòng bệnh Covid-19'}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item={true} xs={12}>
                      <TableContainer
                        component={Paper}
                        sx={{ maxHeight: '850px', boxShadow: 'none' }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow sx={{ background: colors.grey['100'] }}>
                              <TableCell align="center">Mũi số</TableCell>
                              <TableCell align="center">
                                Thời gian tiêm
                              </TableCell>
                              <TableCell align="center">Tên vắc xin</TableCell>
                              <TableCell align="center">Số lô</TableCell>
                              <TableCell align="center">Nơi tiêm</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {lookUpCertificateResult.vaccines.map(
                              (row: IVaccinate, index: number) => (
                                <TableRow
                                  key={row.id}
                                  sx={{
                                    '&:last-child td, &:last-child th': {
                                      border: 0
                                    },
                                    background:
                                      index % 2 === 1
                                        ? colors.grey['100']
                                        : null,
                                    '&:hover': {
                                      background: colors.grey['200']
                                    }
                                  }}>
                                  <TableCell
                                    align="center"
                                    component="th"
                                    scope="row">
                                    {row.number}
                                  </TableCell>
                                  <TableCell align="center">
                                    {row.time.toLocaleDateString()}
                                  </TableCell>
                                  <TableCell align="center">
                                    {row.vaccinationName}
                                  </TableCell>
                                  <TableCell align="center">
                                    {row.shipmentNumber}
                                  </TableCell>
                                  <TableCell align="center">
                                    {row.vaccinationSite}
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Stack
                  direction="column"
                  spacing={3}
                  sx={{
                    background: colors.amber['200'],
                    boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.175)',
                    alignItems: 'center'
                  }}>
                  <Box
                    component="img"
                    src={headerImg}
                    sx={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      mt: 3
                    }}
                  />
                  <Typography variant="h5" sx={{ color: '#fff' }}>
                    ĐÃ TIÊM {lookUpCertificateResult.vaccines.length} MŨI VẮC
                    XIN
                  </Typography>
                  <Box
                    component="img"
                    src={qrImg}
                    sx={{
                      width: '196px',
                      height: '196px',
                      objectFit: 'cover'
                    }}
                  />
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      mb: '24px !important',
                      background: '#fff',
                      width: 'calc(100% - 48px)',
                      padding: '20px',
                      borderRadius: '8px 8px 8px 0px'
                    }}>
                    <Stack direction="column" spacing={6}>
                      <PersonIcon />
                      <DateRangeIcon />
                      <FeaturedVideoIcon />
                    </Stack>
                    <Stack direction="column" spacing={2}>
                      <Stack>
                        <Typography variant="body1">Họ và tên</Typography>
                        <Typography variant="body1" sx={{ fontWeight: '500' }}>
                          {lookUpCertificateResult.full_name}
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography variant="body1">Ngày sinh</Typography>
                        <Typography variant="body1" sx={{ fontWeight: '500' }}>
                          {lookUpCertificateResult.dob.toLocaleDateString()}
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography variant="body1">Số CMND/CCCD</Typography>
                        <Typography variant="body1" sx={{ fontWeight: '500' }}>
                          {lookUpCertificateResult.citizenId}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          ) : null}
        </Container>
      </Box>
      <Footer />
    </>
  );
};
