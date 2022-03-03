import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  colors,
  MenuItem,
  Grid,
  Stack,
  TextField
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, Resolver, SubmitHandler } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

import { vaccineRegistrationSchema } from './schema';
import { StyledButton } from '../../components';
import { Label } from '../../components/Label';
import {
  VaccineRegistrationType,
  PriorityGroup,
  DesiredSessionOfInjection
} from './types';

const convertEnumToArr = (value: any) => {
  const listProp = [];
  for (let i in value) {
    listProp.push(value[i]);
  }
  return listProp;
};

interface Props {
  onNextStep: () => void;
}
export const StepOne = (props: Props) => {
  const { onNextStep } = props;
  const { t } = useTranslation();
  const PriorityGroupArr = convertEnumToArr(PriorityGroup);
  const DesiredSessionOfInjectionArr = convertEnumToArr(
    DesiredSessionOfInjection
  );
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<VaccineRegistrationType>({
    resolver: yupResolver(
      vaccineRegistrationSchema
    ) as Resolver<VaccineRegistrationType>,
    mode: 'onChange',
    defaultValues: {
      injectionOrderNumber: 0,
      email: '',
      job: '',
      workUnit: '',
      currentAddress: '',
      provinceId: '',
      districtId: '',
      wardId: '',
      ethnic: '',
      nationality: '',
      priorityGroup: '',
      desiredDateOfInjection: new Date('2000-10-23'),
      desiredSessionOfInjection: null,
      historyOfTheFirstInjection: null
    }
  });
  const formSubmitHandler: SubmitHandler<VaccineRegistrationType> = (
    data: VaccineRegistrationType
  ) => {
    console.log(data);
    onNextStep();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(formSubmitHandler)}>
      <Stack direction="column" spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Stack direction="column" spacing={1}>
              <Label required={true}>Đăng kí mũi tiêm thứ</Label>
              <Controller
                name="injectionOrderNumber"
                control={control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <TextField
                    size="small"
                    helperText={error?.message ? t(`${error?.message}`) : null}
                    defaultValue={0}
                    error={invalid}
                    {...field}
                    select>
                    <MenuItem value={1}>mũi thứ nhất</MenuItem>
                    <MenuItem value={2}>mũi thứ hai</MenuItem>
                  </TextField>
                )}
              />
            </Stack>
          </Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={3}></Grid>
        </Grid>
        <Stack direction="column" spacing={2}>
          <Typography variant="body1" sx={{ fontWeight: '500' }}>
            1. Thông tin người đăng ký tiêm
          </Typography>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Stack direction="column" spacing={1}>
                  <Label required={true}>
                    <Trans>Họ và tên</Trans>
                  </Label>
                  <Controller
                    name="full_name"
                    control={control}
                    render={({ field, fieldState: { invalid, error } }) => (
                      <TextField
                        size="small"
                        defaultValue={getValues('full_name')}
                        helperText={
                          error?.message ? t(`${error?.message}`) : null
                        }
                        error={invalid}
                        {...field}
                      />
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <Stack direction="column" spacing={1}>
                  <Label required={true}>
                    <Trans>Ngày sinh</Trans>
                  </Label>
                  <Controller
                    name="dob"
                    control={control}
                    render={({ field, fieldState: { invalid, error } }) => (
                      <TextField
                        type="date"
                        defaultValue={getValues('dob')}
                        size="small"
                        helperText={
                          error?.message ? t(`${error?.message}`) : null
                        }
                        error={invalid}
                        {...field}
                      />
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <Stack direction="column" spacing={1}>
                  <Label required={true}>
                    <Trans>Giới tính</Trans>
                  </Label>
                  <Controller
                    name="gender"
                    defaultValue="male"
                    control={control}
                    render={({ field, fieldState: { invalid, error } }) => (
                      <TextField
                        size="small"
                        helperText={
                          error?.message ? t(`${error?.message}`) : null
                        }
                        error={invalid}
                        {...field}
                        select>
                        <MenuItem value="male">
                          <Trans>Nam</Trans>
                        </MenuItem>
                        <MenuItem value="female">
                          <Trans>Nữ</Trans>
                        </MenuItem>
                      </TextField>
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <Stack direction="column" spacing={1}>
                  <Label required={true}>
                    <Trans>Số điện thoại</Trans>
                  </Label>
                  <Controller
                    name="phone_number"
                    control={control}
                    defaultValue="098624979"
                    render={({ field, fieldState: { invalid, error } }) => (
                      <TextField
                        size="small"
                        helperText={
                          error?.message ? t(`${error?.message}`) : null
                        }
                        error={invalid}
                        placeholder="123456789"
                        {...field}
                      />
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <Stack direction="column" spacing={1}>
                  <Label required={false}>
                    <Trans>Email</Trans>
                  </Label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState: { invalid, error } }) => (
                      <TextField
                        size="small"
                        defaultValue={getValues('email')}
                        helperText={
                          error?.message ? t(`${error?.message}`) : null
                        }
                        error={invalid}
                        {...field}
                      />
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <Stack direction="column" spacing={1}>
                  <Label required={true}>
                    <Trans>Số CMND/CCCD/Mã định danh công dân</Trans>
                  </Label>
                  <Controller
                    name="citizenId"
                    control={control}
                    render={({ field, fieldState: { invalid, error } }) => (
                      <TextField
                        size="small"
                        defaultValue={getValues('citizenId')}
                        helperText={
                          error?.message ? t(`${error?.message}`) : null
                        }
                        error={invalid}
                        {...field}
                      />
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <Stack direction="column" spacing={1}>
                  <Label required={false}>
                    <Trans>Số thẻ BHYT</Trans>
                  </Label>
                  <Controller
                    name="healthInsuranceCardNumber"
                    control={control}
                    render={({ field, fieldState: { invalid, error } }) => (
                      <TextField
                        size="small"
                        defaultValue={getValues('healthInsuranceCardNumber')}
                        helperText={
                          error?.message ? t(`${error?.message}`) : null
                        }
                        error={invalid}
                        {...field}
                      />
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={3}>
                <Stack direction="column" spacing={1}>
                  <Label required={false}>
                    <Trans>Nghề nghiệp</Trans>
                  </Label>
                  <Controller
                    name="job"
                    control={control}
                    render={({ field, fieldState: { invalid, error } }) => (
                      <TextField
                        size="small"
                        defaultValue={getValues('job')}
                        helperText={
                          error?.message ? t(`${error?.message}`) : null
                        }
                        error={invalid}
                        {...field}
                      />
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <Stack direction="column" spacing={1}>
                  <Label required={false}>
                    <Trans>Đơn vị công tác</Trans>
                  </Label>
                  <Controller
                    name="workUnit"
                    control={control}
                    render={({ field, fieldState: { invalid, error } }) => (
                      <TextField
                        size="small"
                        defaultValue={getValues('workUnit')}
                        helperText={
                          error?.message ? t(`${error?.message}`) : null
                        }
                        error={invalid}
                        {...field}
                      />
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <Stack direction="column" spacing={1}>
                  <Label required={false}>
                    <Trans>Địa chỉ hiện tại</Trans>
                  </Label>
                  <Controller
                    name="currentAddress"
                    control={control}
                    render={({ field, fieldState: { invalid, error } }) => (
                      <TextField
                        size="small"
                        defaultValue={getValues('currentAddress')}
                        helperText={
                          error?.message ? t(`${error?.message}`) : null
                        }
                        error={invalid}
                        {...field}
                      />
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={3}>
                <Stack direction="column" spacing={1}>
                  <Label required={true}>
                    <Trans>Tỉnh/Thành phố</Trans>
                  </Label>
                  <Controller
                    name="provinceId"
                    control={control}
                    render={({ field, fieldState: { invalid, error } }) => (
                      <TextField
                        size="small"
                        // disabled={disablePersonalInfo}
                        // helperText={
                        //   error?.message ? t(`${error?.message}`) : null
                        // }
                        error={invalid}
                        // defaultValue={getProvinceName(
                        //   getValues('provinceId'),
                        //   listProvince
                        // )}
                        {...field}
                        // onChange={(e) => handleChangeProvince(e)}
                        select>
                        {/* {listProvince.length > 0
                                  ? listProvince.map((value: ProvinceType) => (
                                      <MenuItem value={value.Id} key={value.Id}>
                                        {value.Name}
                                      </MenuItem>
                                    ))
                                  : null} */}
                      </TextField>
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <Stack direction="column" spacing={1}>
                  <Label required={true}>
                    <Trans>Quận/Huyện</Trans>
                  </Label>
                  <Controller
                    name="districtId"
                    control={control}
                    // defaultValue={
                    //   getValues('districtId')
                    //     ? getDistrictName(
                    //         getValues('provinceId'),
                    //         getValues('districtId'),
                    //         listProvince
                    //       ) || undefined
                    //     : undefined
                    // }
                    render={({ field, fieldState: { invalid, error } }) => (
                      <TextField
                        size="small"
                        // disabled={
                        //   disablePersonalInfo ||
                        //   !allowClickDistrict
                        // }
                        // helperText={
                        //   error?.message ? t(`${error?.message}`) : null
                        // }
                        error={invalid}
                        {...field}
                        // onChange={(e) => handleChangeDistrict(e)}
                        select>
                        {/* {listDistrict.length > 0
                                  ? listDistrict.map((value: DistrictType) => (
                                      <MenuItem value={value.Id} key={value.Id}>
                                        {value.Name}
                                      </MenuItem>
                                    ))
                                  : null} */}
                      </TextField>
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <Stack direction="column" spacing={1}>
                  <Label required={true}>
                    <Trans>Xã/Phường</Trans>
                  </Label>
                  <Controller
                    name="wardId"
                    control={control}
                    // defaultValue={
                    //   getValues('wardId')
                    //     ? getWardName(
                    //         getValues('provinceId'),
                    //         getValues('districtId'),
                    //         getValues('wardId'),
                    //         listProvince
                    //       )
                    //     : ''
                    // }
                    render={({ field, fieldState: { invalid, error } }) => (
                      <TextField
                        size="small"
                        // disabled={
                        //   disablePersonalInfo ||
                        //   !allowClickWard
                        // }
                        // helperText={
                        //   error?.message ? t(`${error?.message}`) : null
                        // }
                        error={invalid}
                        {...field}
                        // onChange={(e) => handleChangeWard(e)}
                        select>
                        {/* {listWard.length > 0
                                  ? listWard.map((value: WardType) => (
                                      <MenuItem value={value.Id} key={value.Id}>
                                        {value.Name}
                                      </MenuItem>
                                    ))
                                  : null} */}
                      </TextField>
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={3}>
                <Stack direction="column" spacing={1}>
                  <Label required={false}>
                    <Trans>Dân tộc</Trans>
                  </Label>
                  <Controller
                    name="ethnic"
                    control={control}
                    render={({ field, fieldState: { invalid, error } }) => (
                      <TextField
                        size="small"
                        defaultValue={getValues('ethnic')}
                        {...field}
                      />
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <Stack direction="column" spacing={1}>
                  <Label required={false}>
                    <Trans>Quốc tịch</Trans>
                  </Label>
                  <Controller
                    name="nationality"
                    control={control}
                    render={({ field, fieldState: { invalid, error } }) => (
                      <TextField
                        size="small"
                        defaultValue={getValues('nationality')}
                        {...field}
                      />
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <Stack direction="column" spacing={1}>
                  <Label required={true}>
                    <Trans>Nhóm ưu tiên</Trans>
                  </Label>
                  <Controller
                    name="priorityGroup"
                    control={control}
                    render={({ field, fieldState: { invalid, error } }) => (
                      <TextField
                        size="small"
                        defaultValue={getValues('priorityGroup')}
                        helperText={
                          error?.message ? t(`${error?.message}`) : null
                        }
                        error={invalid}
                        {...field}
                        select>
                        {PriorityGroupArr.map((value, index) => (
                          <MenuItem value={value} key={index}>
                            {value}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Stack>
        <Stack direction="column" spacing={2}>
          <Typography variant="body1" sx={{ fontWeight: '500' }}>
            2. Thông tin đăng ký tiêm chủng
          </Typography>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Stack direction="column" spacing={1}>
                  <Label required={false}>
                    <Trans>Ngày muốn được tiêm (dự kiến)</Trans>
                  </Label>
                  <Controller
                    name="desiredDateOfInjection"
                    control={control}
                    render={({ field, fieldState: { invalid, error } }) => (
                      <TextField
                        type="date"
                        defaultValue={getValues('desiredDateOfInjection')}
                        size="small"
                        helperText={
                          error?.message ? t(`${error?.message}`) : null
                        }
                        error={invalid}
                        {...field}
                      />
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <Stack direction="column" spacing={1}>
                  <Label required={false}>
                    <Trans>Buổi tiêm mong muốn</Trans>
                  </Label>
                  <Controller
                    name="desiredSessionOfInjection"
                    control={control}
                    render={({ field, fieldState: { invalid, error } }) => (
                      <TextField
                        size="small"
                        defaultValue={getValues('desiredSessionOfInjection')}
                        helperText={
                          error?.message ? t(`${error?.message}`) : null
                        }
                        error={invalid}
                        {...field}
                        select>
                        {DesiredSessionOfInjectionArr.map((value, index) => (
                          <MenuItem value={value} key={index}>
                            {value}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Stack>
        {getValues('injectionOrderNumber') === 2 && (
          <Stack direction="column" spacing={2}>
            <Typography variant="body1" sx={{ fontWeight: '500' }}>
              3. Lịch sử tiêm mũi thứ 1
            </Typography>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Stack direction="column" spacing={1}>
                    <Label required={true}>
                      <Trans>Tên vắc xin</Trans>
                    </Label>
                    <Controller
                      name="historyOfTheFirstInjection.nameOfVaccine"
                      control={control}
                      render={({ field, fieldState: { invalid, error } }) => (
                        <TextField
                          size="small"
                          defaultValue={getValues(
                            'historyOfTheFirstInjection.nameOfVaccine'
                          )}
                          helperText={
                            error?.message ? t(`${error?.message}`) : null
                          }
                          error={invalid}
                          {...field}
                        />
                      )}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={3}>
                  <Stack direction="column" spacing={1}>
                    <Label required={true}>
                      <Trans>Ngày tiêm</Trans>
                    </Label>
                    <Controller
                      name="historyOfTheFirstInjection.injectionDate"
                      control={control}
                      render={({ field, fieldState: { invalid, error } }) => (
                        <TextField
                          type="date"
                          defaultValue={getValues(
                            'historyOfTheFirstInjection.injectionDate'
                          )}
                          size="small"
                          helperText={
                            error?.message ? t(`${error?.message}`) : null
                          }
                          error={invalid}
                          {...field}
                        />
                      )}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={3}>
                  <Stack direction="column" spacing={1}>
                    <Label required={false}>
                      <Trans>Số lô</Trans>
                    </Label>
                    <Controller
                      name="historyOfTheFirstInjection.shipmentNumber"
                      control={control}
                      render={({ field, fieldState: { invalid, error } }) => (
                        <TextField
                          size="small"
                          defaultValue={getValues(
                            'historyOfTheFirstInjection.shipmentNumber'
                          )}
                          helperText={
                            error?.message ? t(`${error?.message}`) : null
                          }
                          error={invalid}
                          {...field}
                        />
                      )}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={3}>
                  <Stack direction="column" spacing={1}>
                    <Label required={false}>
                      <Trans>Địa điểm tiêm</Trans>
                    </Label>
                    <Controller
                      name="historyOfTheFirstInjection.injectionPlace"
                      control={control}
                      render={({ field, fieldState: { invalid, error } }) => (
                        <TextField
                          size="small"
                          defaultValue={getValues(
                            'historyOfTheFirstInjection.injectionPlace'
                          )}
                          helperText={
                            error?.message ? t(`${error?.message}`) : null
                          }
                          error={invalid}
                          {...field}
                        />
                      )}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="column" spacing={1}>
                    <Label required={false}>
                      <Trans>Phản ứng sau tiêm chủng</Trans>
                    </Label>
                    <Controller
                      name="historyOfTheFirstInjection.reactionAfterVaccination"
                      control={control}
                      render={({ field, fieldState: { invalid, error } }) => (
                        <TextField
                          defaultValue={getValues(
                            'historyOfTheFirstInjection.reactionAfterVaccination'
                          )}
                          helperText={
                            error?.message ? t(`${error?.message}`) : null
                          }
                          error={invalid}
                          {...field}
                          placeholder={t('Phản ứng sau tiêm chủng')}
                          fullWidth
                          multiline
                          minRows={3}
                          maxRows={6}
                        />
                      )}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        )}
        <Box sx={{ color: colors.red[700] }}>
          <Typography variant="body1" fontWeight="bold">
            {t('Lưu ý')}:
          </Typography>
          <Box component="ul" ml={4}>
            <Typography variant="body1" component="li">
              {t(
                'Việc đăng ký thông tin hoàn toàn bảo mật và phục vụ cho chiến dịch tiêm chủng Vắc xin COVID - 19'
              )}
            </Typography>
            <Typography variant="body1" component="li">
              {' '}
              {t(
                'Xin vui lòng kiểm tra kỹ các thông tin bắt buộc(VD: Họ và tên, Ngày tháng năm sinh, Số điện thoại, Số CMND/CCCD/Mã định danh công dân/HC ...)'
              )}
            </Typography>
            <Typography variant="body1" component="li">
              {' '}
              {t(
                'Bằng việc nhấn nút "Xác nhận", bạn hoàn toàn hiểu và đồng ý chịu trách nhiệm với các thông tin đã cung cấp'
              )}
            </Typography>
            <Typography variant="body1" component="li">
              {' '}
              {t(
                'Cá nhân/Tổ chức đăng ký thành công trên hệ thống sẽ được đưa vào danh sách đặt tiêm. Cơ sở y tế sẽ thông báo lịch tiêm khi có vắc xin và kế hoạch tiêm được phê duyệt. Trân trọng cảm ơn!'
              )}
            </Typography>
          </Box>
        </Box>
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        spacing={2}
        sx={{
          marginTop: '24px !important',
          marginBottom: '48px !important'
        }}>
        {/* {
          <StyledButton
            variant="outlined"
            // onClick={props.onBackStep}
            sx={{ color: colors.indigo['700'] }}
            onClick={handlePreviousStep}
            startIcon={<ArrowBackIcon />}>
            {t('Quay lại')}
          </StyledButton>
        } */}
        <StyledButton
          // disabled={disabledButton}
          variant="contained"
          sx={{ backgroundColor: colors.indigo['700'] }}
          type="submit"
          endIcon={<ArrowForwardIcon />}
          // onClick={handleNextStep}
        >
          {t('Tiếp tục')}
        </StyledButton>
      </Stack>
    </Box>
  );
};
