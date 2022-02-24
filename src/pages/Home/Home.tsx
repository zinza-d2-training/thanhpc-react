import { useMemo, useState, useCallback, ChangeEvent, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  colors,
  Stack,
  Button,
  TextField,
  MenuItem
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

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
import { statisticVaccinationByLocalMore } from '../../db/statisticVaccinationByLocal';
import { StatisticVaccinationByLocal } from '../../pages/Home/types';
import { StyledLinearProgress } from '../../components/StyledLinearProgress/StyledLinearProgress';
import { administrativeUnits } from '../../db/administrativeUnits';

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
interface WardType {
  Id?: string;
  Name?: string;
  Level?: string;
}
interface DistrictType {
  Id?: string;
  Name?: string;
  Wards?: WardType[];
}
interface ProvinceType {
  Id?: string;
  Name?: string;
  Districts?: DistrictType[];
}
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
const getChildArr = (valueArgs: string, parentArr: any, nameArr: string) => {
  const unit = parentArr.find((value: any) => value.Id === valueArgs);
  return unit ? unit[nameArr] : [];
};
interface Address {
  provinceId: string;
  districtId: string;
  wardId: string;
}

export const Home = () => {
  const { control, getValues, setValue, trigger } = useForm<Address>({
    mode: 'onChange',
    defaultValues: {}
  });

  const provinceId = getValues('provinceId');
  const districtId = getValues('districtId');
  const listProvince = administrativeUnits;

  const listDistrict = useMemo(() => {
    return getChildArr(provinceId, listProvince, 'Districts');
  }, [provinceId, listProvince]);

  const listWard = useMemo(() => {
    return getChildArr(districtId, listDistrict, 'Wards');
  }, [districtId, listDistrict]);

  const [dataOnTable, setDataOnTable] = useState<StatisticVaccinationByLocal[]>(
    () => statisticVaccinationByLocal
  );

  const handleLoadMoreVaccinationByLocal = useCallback(() => {
    const newData: StatisticVaccinationByLocal[] =
      statisticVaccinationByLocalMore;
    setDataOnTable([...dataOnTable, ...newData]);
  }, [dataOnTable]);

  useEffect(() => {
    console.log('getValues', getValues());
  }, [getValues]);
  const handleChangeProvince = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    console.log('getValues', getValues());
    setValue('provinceId', e.target.value);
    setValue('districtId', '');
  };
  const handleChangeDistrict = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue('districtId', e.target.value);
    setValue('wardId', '');
  };
  const handleChangeWard = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue('wardId', e.target.value);
  };
  return (
    <>
      <Header />
      <Box>
        <Box sx={{ background: '#F7FBFE', py: 2, px: 4.5, mt: 4.1 }}>
          <Box sx={{ background: '#fff' }}>
            <Grid container>
              <Grid item={true} xs={4}>
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
              <Grid item={true} xs={4}>
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
              <Grid item={true} xs={4}>
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
                  {tableHead.map((value, index) => (
                    <TableCell key={index}>{value}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {dataOnTable.map(
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
                      <TableCell>
                        <StyledLinearProgress
                          color="#C65312"
                          number={row.expectedRate}
                        />
                      </TableCell>
                      <TableCell>
                        <StyledLinearProgress
                          color="#0593CF"
                          number={row.distributedRatio}
                        />
                      </TableCell>
                      <TableCell>
                        <StyledLinearProgress
                          color="#00884F"
                          number={row.rateOfInjectionOfAtLeastOneDoseOfVaccine}
                        />
                      </TableCell>
                      <TableCell>
                        <StyledLinearProgress
                          color="#AF8612"
                          number={row.vaccinationRate}
                        />
                      </TableCell>
                      <TableCell>
                        <StyledLinearProgress
                          color="#2D2188"
                          number={row.vaccineDistributionRate}
                        />
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack direction="row" justifyContent="center" py={3}>
            <Box
              component={Button}
              sx={{
                color: colors.indigo[700],
                textTransform: 'unset',
                fontSize: '18px',
                fontWeight: '400'
              }}
              onClick={handleLoadMoreVaccinationByLocal}>
              Xem thêm
            </Box>
          </Stack>
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
          <Typography variant="h6" sx={{ ml: 2 }}>
            Tra cứu điểm tiêm theo địa bàn
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ mb: 1 }}>
              <Controller
                name="provinceId"
                control={control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <TextField
                    placeholder="Tỉnh/Thành phố"
                    helperText={error?.message}
                    error={invalid}
                    {...field}
                    sx={{ mt: 1, minWidth: '300px' }}
                    onChange={(e) => handleChangeProvince(e)}
                    select>
                    {listProvince.length > 0
                      ? listProvince.map((value: ProvinceType) => (
                          <MenuItem value={value.Id} key={value.Id}>
                            {value.Name}
                          </MenuItem>
                        ))
                      : null}
                  </TextField>
                )}
              />
            </Box>
            <Box sx={{ mb: 1 }}>
              <Controller
                name="districtId"
                control={control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <TextField
                    placeholder="Tỉnh/Thành phố"
                    helperText={error?.message}
                    error={invalid}
                    {...field}
                    sx={{ mt: 1, minWidth: '300px' }}
                    onChange={(e) => handleChangeDistrict(e)}
                    select>
                    {listDistrict.length > 0
                      ? listDistrict.map((value: DistrictType) => (
                          <MenuItem value={value.Id} key={value.Id}>
                            {value.Name}
                          </MenuItem>
                        ))
                      : null}
                  </TextField>
                )}
              />
            </Box>
            <Box sx={{ mb: 1 }}>
              <Controller
                name="wardId"
                control={control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <TextField
                    placeholder="Tỉnh/Thành phố"
                    helperText={error?.message}
                    error={invalid}
                    {...field}
                    sx={{ mt: 1, minWidth: '300px' }}
                    onChange={(e) => handleChangeWard(e)}
                    select>
                    {listWard.length > 0
                      ? listWard.map((value: WardType) => (
                          <MenuItem value={value.Id} key={value.Id}>
                            {value.Name}
                          </MenuItem>
                        ))
                      : null}
                  </TextField>
                )}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
