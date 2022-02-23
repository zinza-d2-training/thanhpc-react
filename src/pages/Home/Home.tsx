import { useMemo } from 'react';
import { Box, Grid, Typography, colors } from '@mui/material';
import { Bar, Line } from 'react-chartjs-2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Header } from '../../components/Header/Header';
import userPlusImg from '../../images/user-plus.png';
import needleImg from '../../images/needle.png';
import protectImg from '../../images/protect.png';
import { injectionDataByDay } from '../../db/injectionDataByDay';
import { highestInjectionRate } from '../../db/highestInjectionRate';
import { lowestInjectionRate } from '../../db/lowestInjectionRate';
import { statisticVaccinationByLocal } from '../../db/statisticVaccinationByLocal';
import { StatisticVaccinationByLocal } from '../../pages/Home/types';

import {
  Chart,
  LineController,
  LineElement,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title
} from 'chart.js';

Chart.register(
  LineController,
  BarElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title
);

export const Home = () => {
  const tableContent = useMemo(
    () => [...statisticVaccinationByLocal],
    [statisticVaccinationByLocal]
  );
  console.log(tableContent);
  const tableHead = [
    'STT',
    'Tỉnh/Thành phố',
    'Dự kiến KH phân bổ',
    'Phân bổ thực tế',
    'Dân số >= 18 tuổi',
    'Số liều đã tiêm',
    'Tỷ lệ dự kiến phân bổ theo kế hoạch/ dân số (>= 18 tuổi)',
    'Tỷ lệ đã phân bổ/ dân số (>= 18 tuổi)',
    'Tỷ lệ đã tiêm ít nhất 1 mũi/ dân số (>= 18 tuổi)',
    'Tỷ lệ tiêm chủng/ Vắc xin phân bổ thực tế',
    'Tỷ lệ phân bổ vắc xin/Tổng số phân bổ cả nước'
  ];

  return (
    <>
      <Header />
      <Box>
        <Box sx={{ background: '#F7FBFE', py: 2, px: 4.5, mt: 4.1 }}>
          <Box sx={{ background: '#fff' }}>
            <Grid container>
              <Grid item xs={4}>
                <Box
                  sx={{
                    display: 'flex',
                    borderRight: '1px solid',
                    borderColor: colors.grey['300']
                  }}>
                  <Box
                    component="img"
                    src={userPlusImg}
                    sx={{ ml: 2, my: 3.5, mr: 3, objectFit: 'contain' }}
                  />
                  <Box sx={{ my: 3.5 }}>
                    <Typography sx={{ fontWeight: '700', fontSize: '16px' }}>
                      Đối tượng đăng ký tiêm
                    </Typography>
                    <Typography sx={{ fontWeight: '500', fontSize: '28px' }}>
                      11,203,873{' '}
                      <Box component="i" fontSize="14px">
                        (lượt)
                      </Box>
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    display: 'flex',
                    borderRight: '1px solid',
                    borderColor: colors.grey['300']
                  }}>
                  <Box
                    component="img"
                    src={needleImg}
                    sx={{ ml: 2, my: 3.5, mr: 3, objectFit: 'contain' }}
                  />
                  <Box sx={{ my: 3.5 }}>
                    <Typography sx={{ fontWeight: '700', fontSize: '16px' }}>
                      Số mũi tiêm hôm qua
                    </Typography>
                    <Typography sx={{ fontWeight: '500', fontSize: '28px' }}>
                      1,762,119{' '}
                      <Box component="i" fontSize="14px">
                        (mũi)
                      </Box>
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    display: 'flex'
                  }}>
                  <Box
                    component="img"
                    src={protectImg}
                    sx={{ ml: 2, my: 3.5, mr: 3, objectFit: 'contain' }}
                  />
                  <Box sx={{ my: 3.5 }}>
                    <Typography sx={{ fontWeight: '700', fontSize: '16px' }}>
                      Số mũi tiêm toàn quốc
                    </Typography>
                    <Typography sx={{ fontWeight: '500', fontSize: '28px' }}>
                      22,203,153{' '}
                      <Box component="i" fontSize="14px">
                        (mũi)
                      </Box>
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box
          sx={{
            py: 2,
            mt: 4,
            mx: 4.5,
            border: '1px solid rgba(38, 56, 150, 0.14)',
            boxShadow: '0px 4px 12px rgba(34, 41, 47, 0.12)',
            borderRadius: '10px'
          }}>
          <Typography variant="h6" sx={{ mt: 3, ml: 2 }}>
            Dữ liệu tiêm theo ngày
          </Typography>
          <Box sx={{ mx: 2 }}>
            <Line
              data={{
                labels: injectionDataByDay.map(
                  ({ day }) => `${day.getDate()}/${day.getMonth() + 1}`
                ),
                datasets: [
                  {
                    label: 'Đã tiêm',
                    data: injectionDataByDay.map(({ amount }) => amount),
                    fill: false,
                    borderColor: colors.indigo['700'],
                    tension: 0.1,
                    pointBackgroundColor: colors.red['400'],
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: colors.indigo['700']
                  }
                ]
              }}
            />
          </Box>
        </Box>
        <Box sx={{ marginTop: '46px', mx: 4.5 }}>
          <Grid container spacing={3}>
            <Grid xs={6}>
              <Box
                sx={{
                  ml: 3,
                  mr: 2,
                  py: 2,
                  border: '1px solid rgba(38, 56, 150, 0.14)',
                  boxShadow: '0px 4px 12px rgba(34, 41, 47, 0.12)',
                  borderRadius: '10px'
                }}>
                <Typography variant="h6" sx={{ mt: 3, ml: 2 }}>
                  10 địa phương có tỷ lệ tiêm cao nhất
                </Typography>
                <Box sx={{ mx: 5, mt: 0.5 }}>
                  <Bar
                    data={{
                      labels: highestInjectionRate.map(
                        ({ province }) => province
                      ),
                      datasets: [
                        {
                          data: highestInjectionRate.map(
                            ({ amount, totalSupplied }) =>
                              parseFloat(
                                ((amount / totalSupplied) * 100).toFixed(2)
                              ).toString()
                          ),
                          borderColor: colors.indigo['700'],
                          backgroundColor: colors.indigo['700'],
                          indexAxis: 'y',
                          maxBarThickness: 20
                        }
                      ]
                    }}
                    height={300}
                  />
                </Box>
                <Box sx={{ mx: 5, mt: 0.5, pb: 3, height: '30px' }}>
                  <Box component="b">Ghi chú:</Box>
                  <Box component="i">
                    Số mũi tiêm thực tế có thể nhiều hơn số liều vắc xin phân bổ
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid xs={6}>
              <Box
                sx={{
                  // py: 2,
                  // ml: 1,
                  ml: 3,
                  mr: 2,
                  py: 2,
                  border: '1px solid rgba(38, 56, 150, 0.14)',
                  boxShadow: '0px 4px 12px rgba(34, 41, 47, 0.12)',
                  borderRadius: '10px'
                }}>
                <Typography variant="h6" sx={{ mt: 3, ml: 2 }}>
                  10 địa phương có tỷ lệ tiêm Thấp nhất
                </Typography>
                <Box sx={{ mx: 5, mt: 0.5 }}>
                  <Bar
                    data={{
                      labels: lowestInjectionRate.map(
                        ({ province }) => province
                      ),
                      datasets: [
                        {
                          data: lowestInjectionRate.map(
                            ({ amount, totalSupplied }) =>
                              parseFloat(
                                ((amount / totalSupplied) * 100).toFixed(2)
                              ).toString()
                          ),
                          borderColor: colors.blue['700'],
                          backgroundColor: colors.blue['700'],
                          indexAxis: 'y',
                          maxBarThickness: 20
                        }
                      ]
                    }}
                    height={300}
                  />
                </Box>
                <Box sx={{ mx: 5, mt: 0.5, pb: 3, height: '30px' }}>
                  <Box component="b">Ghi chú:</Box>
                  <Box component="i">
                    Tỷ lệ tiêm tại một số tỉnh có thể thấp do chưa nhận đủ vắc
                    xin theo quyết định phân bổ
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            py: 2,
            mt: 4,
            mx: 4.5,
            border: '1px solid rgba(38, 56, 150, 0.14)',
            boxShadow: '0px 4px 12px rgba(34, 41, 47, 0.12)',
            borderRadius: '10px'
          }}>
          <Typography variant="h6" sx={{ mt: 3, ml: 2 }}>
            Số liệu vắc xin theo địa phương
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {tableHead.map((value) => (
                    <TableCell>{value}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableContent.map(
                  (row: StatisticVaccinationByLocal, index: number) => (
                    <TableRow
                      key={index}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 }
                      }}>
                      <TableCell component="th" scope="row">
                        {index}
                      </TableCell>
                      <TableCell>{row.provinceName}</TableCell>
                      <TableCell>{row.distributionPlan}</TableCell>
                      <TableCell>{row.actualDistribution}</TableCell>
                      <TableCell>{row.population}</TableCell>
                      <TableCell>{row.numberOfInjected}</TableCell>
                      <TableCell>{row.expectedRate}</TableCell>
                      <TableCell>{row.distributedRatio}</TableCell>
                      <TableCell>
                        {row.rateOfInjectionOfAtLeastOneDoseOfVaccine}
                      </TableCell>
                      <TableCell>{row.vaccinationRate}</TableCell>
                      <TableCell>{row.vaccineDistributionRate}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};
