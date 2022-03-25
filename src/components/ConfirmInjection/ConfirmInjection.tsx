import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Grid, Typography, colors, Stack } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo';
import { Trans } from 'react-i18next';

import qrImg from '../../images/qr.png';
import headerImg from '../../images/header.png';
import {
  LookUpCertificateResult,
  IVaccinate
} from '../../pages/VaccineCertificate/types';

interface Props {
  data: LookUpCertificateResult;
}
export const ConfirmInjection = (props: Props) => {
  const { data } = props;
  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <Stack
          direction="column"
          sx={{
            alignItems: 'center'
          }}>
          <Typography variant="body1" sx={{ textTransform: 'uppercase' }}>
            <Trans>Cộng hòa xã hội chủ nghĩa Việt Nam</Trans>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: '500'
            }}>
            <Trans>Độc lập - Tự do - Hạnh phúc</Trans>
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
                fontWeight: '500',
                textTransform: 'uppercase'
              }}>
              <Trans>Chứng nhận tiêm chủng covid-19</Trans>
            </Typography>
          </Box>
          <Grid container rowSpacing={2}>
            <Grid item={true} xs={4}>
              <Stack direction="column" spacing={1}>
                <Typography variant="body1">
                  <Trans>Họ và tên</Trans>
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: '500' }}>
                  {data.full_name}
                </Typography>
              </Stack>
            </Grid>
            <Grid item={true} xs={4}>
              <Stack direction="column" spacing={1}>
                <Typography variant="body1">
                  <Trans>Ngày sinh</Trans>
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: '500' }}>
                  {data.dob.toLocaleDateString()}
                </Typography>
              </Stack>
            </Grid>
            <Grid item={true} xs={4}>
              <Stack direction="column" spacing={1}>
                <Typography variant="body1">
                  <Trans>Số CMND/CCCD</Trans>
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: '500' }}>
                  {data.citizen_id}
                </Typography>
              </Stack>
            </Grid>
            <Grid item={true} xs={4}>
              <Stack direction="column" spacing={1}>
                <Typography variant="body1">
                  <Trans>Số thẻ BHYT</Trans>
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: '500' }}>
                  {data.healthInsuranceCardNumber}
                </Typography>
              </Stack>
            </Grid>
            <Grid item={true} xs={4}>
              <Stack direction="column" spacing={1}>
                <Typography variant="body1">
                  <Trans>Số điện thoại</Trans>
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: '500' }}>
                  {data.phone_number}
                </Typography>
              </Stack>
            </Grid>
            <Grid item={true} xs={12}>
              <Stack direction="column" spacing={1}>
                <Typography variant="body1">
                  <Trans>Địa chỉ</Trans>
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: '500' }}>
                  {data.address}
                </Typography>
              </Stack>
            </Grid>
            <Grid item={true} xs={12}>
              <Stack direction="column" spacing={1}>
                <Typography variant="body1">
                  <Trans>Kết luận</Trans>
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: '500' }}>
                  <Trans>
                    {data.vaccines.length > 0
                      ? 'Đã được tiêm phòng vắc xin phòng bệnh Covid-19'
                      : 'Chưa được tiêm phòng vắc xin phòng bệnh Covid-19'}
                  </Trans>
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
                      <TableCell align="center">
                        <Trans>Mũi số</Trans>
                      </TableCell>
                      <TableCell align="center">
                        <Trans>Thời gian tiêm</Trans>
                      </TableCell>
                      <TableCell align="center">
                        <Trans>Tên vắc xin</Trans>
                      </TableCell>
                      <TableCell align="center">
                        <Trans>Số lô</Trans>
                      </TableCell>
                      <TableCell align="center">
                        <Trans>Nơi tiêm</Trans>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.vaccines.map((row: IVaccinate, index: number) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          '&:last-child td, &:last-child th': {
                            border: 0
                          },
                          background:
                            index % 2 === 1 ? colors.grey['100'] : null,
                          '&:hover': {
                            background: colors.grey['200']
                          }
                        }}>
                        <TableCell align="center" component="th" scope="row">
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
                    ))}
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
          <Typography
            variant="h5"
            sx={{ color: '#fff', textTransform: 'uppercase' }}>
            <Trans>Đã tiêm {data.vaccines.length.toString()} mũi Vaccine</Trans>
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
                <Typography variant="body1">
                  <Trans>Họ và tên</Trans>
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: '500' }}>
                  {data.full_name}
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="body1">
                  <Trans>Ngày sinh</Trans>
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: '500' }}>
                  {data.dob.toLocaleDateString()}
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="body1">
                  <Trans>Số CMND/CCCD</Trans>
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: '500' }}>
                  {data.citizen_id}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};
