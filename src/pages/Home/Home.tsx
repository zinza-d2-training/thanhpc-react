import { useState, useCallback, ChangeEvent, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  colors,
  Stack,
  Button,
  TextField,
  Container,
  MenuItem
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import { Bar, Line } from 'react-chartjs-2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Trans } from 'react-i18next';
import { useTranslation } from 'react-i18next';

import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { VaccinatedTable } from '../../components/VaccinatedTable/VaccinatedTable';
import userPlusImg from '../../images/user-plus.png';
import needleImg from '../../images/needle.png';
import protectImg from '../../images/protect.png';
import { injectionDataByDay } from '../../db/injectionDataByDay';
import { highestInjectionRate } from '../../db/highestInjectionRate';
import { lowestInjectionRate } from '../../db/lowestInjectionRate';
import { statisticVaccinationByLocal } from '../../db/statisticVaccinationByLocal';
import { statisticVaccinationByLocalMore } from '../../db/statisticVaccinationByLocal';
import { StatisticVaccinationByLocal } from '../../pages/Home/types';
import { administrativeUnits } from '../../db/administrativeUnits';
import { lookUpInjectionSitesByLocation } from '../../db/lookUpInjectionSitesByLocation';
import { LookUpInjectionSitesByLocation } from '../../pages/Home/types';
import { WardType, DistrictType, ProvinceType } from '../../pages/User/types';

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
import { StyledButton } from '../../components';

Chart.register(
  LineController,
  BarElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title
);

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
const dataAfterLookUpByLocationHeader = [
  'STT',
  'Tên điểm tiêm',
  'Số nhà, tên đường',
  'Xã/Phường',
  'Quận/Huyện',
  'Tỉnh/Thành Phố',
  'Người đứng đầu cơ sở tiêm chủng',
  'Số bàn tiêm'
];
const getChildArr = (valueArgs: string, parentArr: any, nameArr: string) => {
  const unit = parentArr.find((value: any) => value.Id === valueArgs);
  return unit ? unit[nameArr] : [];
};
const getNameById = (id: string, arr: any) => {
  const name = arr.find((value: any) => value.Id === id)['Name'];
  return name;
};
const getDistrictName = (provinceId: string, districtId: string, arr: any) => {
  const listDistrict = arr.find((value: any) => value.Id === provinceId)[
    'Districts'
  ];
  if (listDistrict) {
    return listDistrict.find((value: any) => value.Id === districtId)['Name'];
  }
  return null;
};
const getWardName = (
  provinceId: string,
  districtId: string,
  wardId: string,
  arr: any
) => {
  const listDistrict = arr.find((value: any) => value.Id === provinceId)[
    'Districts'
  ];
  if (listDistrict) {
    const listWard = listDistrict.find((value: any) => value.Id === districtId)[
      'Wards'
    ];
    if (listWard) {
      let wardName =
        listWard.find((value: any) => value.Id === wardId)['Name'] ||
        'Không xác định';
      return wardName;
    }
  }
  return undefined;
};
interface Address {
  provinceId: string;
  districtId: string;
  wardId: string;
}

export const Home = () => {
  const { t } = useTranslation();
  const { control, getValues, setValue } = useForm<Address>({
    mode: 'onChange',
    defaultValues: {}
  });

  const listProvince = administrativeUnits;
  const [listDistrict, setListDistrict] = useState<DistrictType[]>([]);
  const [listWard, setListWard] = useState<WardType[]>([]);
  const [disableClickDistrict, setDisableClickDistrict] =
    useState<boolean>(true);
  const [disableClickWard, setDisableClickWard] = useState<boolean>(true);

  const [dataOnTable, setDataOnTable] = useState<StatisticVaccinationByLocal[]>(
    () => statisticVaccinationByLocal
  );
  const [dataAfterLookUpByLocation, setDataAfterLookUpByLocation] = useState<
    LookUpInjectionSitesByLocation[]
  >([]);

  const handleLoadMoreVaccinationByLocal = useCallback(() => {
    const newData: StatisticVaccinationByLocal[] =
      statisticVaccinationByLocalMore;
    setDataOnTable([...dataOnTable, ...newData]);
  }, [dataOnTable]);

  const handleChangeProvince = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue('provinceId', e.target.value);
    setValue('districtId', '');
    setValue('wardId', '');
    setListDistrict(getChildArr(e.target.value, listProvince, 'Districts'));
    setListWard([]);
    setDisableClickDistrict(false);
    setDisableClickWard(true);
  };
  const handleChangeDistrict = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue('districtId', e.target.value);
    setValue('wardId', '');
    setListWard(getChildArr(e.target.value, listDistrict, 'Wards'));
    setDisableClickWard(false);
  };
  const handleChangeWard = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue('wardId', e.target.value);
  };
  const handleSearchLookUp = () => {
    let newData: LookUpInjectionSitesByLocation[] = [];
    if (getValues('provinceId')) {
      newData = lookUpInjectionSitesByLocation.filter(
        (value) => value.provinceId === getValues('provinceId')
      );
      if (getValues('districtId')) {
        newData = newData.filter(
          (value) => value.districtId === getValues('districtId')
        );
        if (getValues('wardId')) {
          newData = newData.filter(
            (value) => value.wardId === getValues('wardId')
          );
        }
      }
    }
    newData.forEach((value) => {
      value.provinceName = getNameById(value.provinceId, administrativeUnits);
      value.districtName = getDistrictName(
        value.provinceId,
        value.districtId,
        administrativeUnits
      );
      value.wardName = getWardName(
        value.provinceId,
        value.districtId,
        value.wardId,
        administrativeUnits
      );
    });
    setDataAfterLookUpByLocation(newData);
  };
  useEffect(() => {
    lookUpInjectionSitesByLocation.forEach((value) => {
      value.provinceName = getNameById(value.provinceId, administrativeUnits);
      value.districtName = getDistrictName(
        value.provinceId,
        value.districtId,
        administrativeUnits
      );
      value.wardName = getWardName(
        value.provinceId,
        value.districtId,
        value.wardId,
        administrativeUnits
      );
    });
    setDataAfterLookUpByLocation(lookUpInjectionSitesByLocation);
  }, []);
  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Stack mt={10} mb={4} direction="column" spacing={4}>
          <Box
            sx={{
              background: '#F7FBFE',
              py: 2,
              mt: '32px'
            }}>
            <Box
              sx={{
                background: '#fff',
                mx: 4.5,
                px: 4
              }}>
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
                        <Trans>Đối tượng đăng ký tiêm</Trans>
                      </Typography>
                      <Typography sx={{ fontWeight: '500', fontSize: '28px' }}>
                        11,203,873{' '}
                        <Box component="i" fontSize="14px">
                          <Trans>(lượt)</Trans>
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
                        <Trans>Số mũi tiêm hôm qua</Trans>
                      </Typography>
                      <Typography sx={{ fontWeight: '500', fontSize: '28px' }}>
                        1,762,119{' '}
                        <Box component="i" fontSize="14px">
                          <Trans>(mũi)</Trans>
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
                        <Trans>Số mũi tiêm toàn quốc</Trans>
                      </Typography>
                      <Typography sx={{ fontWeight: '500', fontSize: '28px' }}>
                        22,203,153{' '}
                        <Box component="i" fontSize="14px">
                          <Trans>(mũi)</Trans>
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
              px: 4,
              mx: 4.5,
              border: '1px solid rgba(38, 56, 150, 0.14)',
              boxShadow: '0px 4px 12px rgba(34, 41, 47, 0.12)',
              borderRadius: '10px'
            }}>
            <Typography variant="h6" sx={{ mt: 3, ml: 2 }}>
              <Trans>Dữ liệu tiêm theo ngày</Trans>
            </Typography>
            <Box sx={{ mx: 2 }}>
              <Line
                data={{
                  labels: injectionDataByDay.map(
                    ({ day }) => `${day.getDate()}/${day.getMonth() + 1}`
                  ),
                  datasets: [
                    {
                      label: t('Đã tiêm'),
                      data: injectionDataByDay.map(({ amount }) => amount),
                      fill: false,
                      backgroundColor: colors.indigo[700],
                      borderColor: colors.indigo['700'],
                      tension: 0.1,
                      pointBackgroundColor: colors.red['400'],
                      pointHoverBackgroundColor: '#fff',
                      pointHoverBorderColor: colors.indigo['700']
                    }
                  ]
                }}
                height={60}
              />
            </Box>
          </Box>
          <Box>
            <Grid container spacing={4}>
              <Grid item={true} xs={6}>
                <Box
                  sx={{
                    minHeight: '700px',
                    py: 2,
                    border: '1px solid rgba(38, 56, 150, 0.14)',
                    boxShadow: '0px 4px 12px rgba(34, 41, 47, 0.12)',
                    borderRadius: '10px'
                  }}>
                  <Typography variant="h6" sx={{ mt: 3, ml: 2 }}>
                    <Trans>10 địa phương có tỷ lệ tiêm cao nhất</Trans>
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
                  <Box
                    sx={{
                      mx: 5,
                      mt: 0.5,
                      pb: 3,
                      height: '30px',
                      display: 'flex',
                      justifyContent: 'center'
                    }}>
                    <Box component="b">
                      <Trans>Ghi chú</Trans>:
                    </Box>
                    <Box component="i">
                      <Trans>
                        Số mũi tiêm thực tế có thể nhiều hơn số liều vắc xin
                        phân bổ
                      </Trans>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item={true} xs={6}>
                <Box
                  sx={{
                    py: 2,
                    border: '1px solid rgba(38, 56, 150, 0.14)',
                    boxShadow: '0px 4px 12px rgba(34, 41, 47, 0.12)',
                    borderRadius: '10px',
                    minHeight: '700px'
                  }}>
                  <Typography variant="h6" sx={{ mt: 3, ml: 2 }}>
                    <Trans>10 địa phương có tỷ lệ tiêm Thấp nhất</Trans>
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
                  <Box
                    sx={{
                      mx: 5,
                      mt: 0.5,
                      pb: 3,
                      height: '30px'
                    }}>
                    <Box component="b">
                      <Trans>Ghi chú</Trans>:
                    </Box>
                    <Box component="i">
                      <Trans>
                        Tỷ lệ tiêm tại một số tỉnh có thể thấp do chưa nhận đủ
                        vắc xin theo quyết định phân bổ
                      </Trans>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              py: 2,
              px: 4,
              border: '1px solid rgba(38, 56, 150, 0.14)',
              boxShadow: '0px 4px 12px rgba(34, 41, 47, 0.12)',
              borderRadius: '10px'
            }}>
            <Typography variant="h6" sx={{ mt: 3, ml: 2 }}>
              <Trans>Số liệu vắc xin theo địa phương</Trans>
            </Typography>
            <VaccinatedTable dataBody={dataOnTable} dataHead={tableHead} />
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
                <Trans>Xem thêm</Trans>
              </Box>
            </Stack>
          </Box>
          <Box
            sx={{
              pt: 2,
              px: 4,
              border: '1px solid rgba(38, 56, 150, 0.14)',
              boxShadow: '0px 4px 12px rgba(34, 41, 47, 0.12)',
              borderRadius: '10px'
            }}>
            <Typography variant="h6" sx={{ ml: 2 }}>
              <Trans>Tra cứu điểm tiêm theo địa bàn</Trans>
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ mb: 1, ml: 2 }}>
                <Controller
                  name="provinceId"
                  control={control}
                  render={({ field, fieldState: { invalid, error } }) => (
                    <TextField
                      placeholder="Tỉnh/Thành phố"
                      {...field}
                      sx={{
                        mt: 1,
                        minWidth: '300px',
                        '.MuiSelect-select': {
                          p: 1
                        }
                      }}
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
              <Box sx={{ mb: 1, ml: 2 }}>
                <Controller
                  name="districtId"
                  control={control}
                  render={({ field, fieldState: { invalid, error } }) => (
                    <TextField
                      placeholder="Quận/huyện"
                      {...field}
                      disabled={disableClickDistrict}
                      sx={{
                        mt: 1,
                        minWidth: '300px',
                        '.MuiSelect-select': {
                          p: 1
                        }
                      }}
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
              <Box sx={{ mb: 1, ml: 2 }}>
                <Controller
                  name="wardId"
                  control={control}
                  render={({ field, fieldState: { invalid, error } }) => (
                    <TextField
                      placeholder="Xã/Phường"
                      disabled={disableClickWard}
                      {...field}
                      sx={{
                        mt: 1,
                        minWidth: '300px',
                        '.MuiSelect-select': {
                          p: 1
                        }
                      }}
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
              <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
                <StyledButton
                  startIcon={<SearchIcon />}
                  sx={{
                    color: '#fff',
                    background: colors.indigo['700'],
                    '&:hover': {
                      color: '#fff',
                      background: colors.indigo['700']
                    }
                  }}
                  onClick={handleSearchLookUp}>
                  <Trans>Tìm kiếm</Trans>
                </StyledButton>
              </Box>
            </Box>
            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {dataAfterLookUpByLocationHeader.map((value, index) => (
                      <TableCell align="center" key={index}>
                        <Trans>{value}</Trans>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataAfterLookUpByLocation.length > 0
                    ? dataAfterLookUpByLocation.map(
                        (
                          row: LookUpInjectionSitesByLocation,
                          index: number
                        ) => (
                          <TableRow
                            key={index}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                              height: '63px',
                              background:
                                index % 2 === 0 ? colors.grey['100'] : null
                            }}>
                            <TableCell
                              align="center"
                              component="th"
                              scope="row">
                              {index}
                            </TableCell>
                            <TableCell align="center">
                              {row.locationName}
                            </TableCell>
                            <TableCell align="center">
                              {row.streetName}
                            </TableCell>
                            <TableCell align="center">{row.wardName}</TableCell>
                            <TableCell align="center">
                              {row.districtName}
                            </TableCell>
                            <TableCell align="center">
                              {row.provinceName}
                            </TableCell>
                            <TableCell align="center">{row.manager}</TableCell>
                            <TableCell align="center">
                              {row.numberOfInjectionTables}
                            </TableCell>
                          </TableRow>
                        )
                      )
                    : t('Không có dữ liệu')}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Stack>
      </Container>
      <Footer />
    </>
  );
};
