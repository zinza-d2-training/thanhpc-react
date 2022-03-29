import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  colors,
  MenuItem,
  Grid,
  Stack,
  TextField
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, Resolver, SubmitHandler } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

import { vaccineRegistrationSchema } from './schema';
import { StyledButton } from '../../components';
import { Label } from '../../components/Label';
import {
  VaccineRegistrationType,
  PriorityGroup,
  DesiredSessionOfInjection,
  ListVaccines
} from './types';
import { getChildArr } from '../../pages/User/functions';
import { WardType, DistrictType, ProvinceType } from '../../pages/User/types';
import { useUnitAdministrative } from '../../hooks/useUnitAdministrative';

interface Props {
  onNextStep: () => void;
  data: VaccineRegistrationType | null;
  receiveData: (data: VaccineRegistrationType) => void;
}
export const StepOne = (props: Props) => {
  const { onNextStep, data, receiveData } = props;
  const [allowClickDistrict, setAllowClickDistrict] = useState<boolean>(false);
  const [allowClickWard, setAllowClickWard] = useState<boolean>(false);
  const [listDistrict, setListDistrict] = useState<DistrictType[]>([]);
  const [listWard, setListWard] = useState<WardType[]>([]);
  const { t } = useTranslation();
  const PriorityGroupArr = Object.values(PriorityGroup);
  const ListVaccinesArr = Object.values(ListVaccines);
  const DesiredSessionOfInjectionArr = Object.values(DesiredSessionOfInjection);
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    trigger,
    clearErrors,
    watch
  } = useForm<VaccineRegistrationType>({
    resolver: yupResolver(
      vaccineRegistrationSchema
    ) as Resolver<VaccineRegistrationType>,
    mode: 'onChange',
    defaultValues: data
      ? data
      : {
          injectionOrderNumber: 1,
          email: '',
          job: '',
          workUnit: '',
          currentAddress: '',
          province_id: 0,
          district_id: 0,
          ward_id: 0,
          ethnic: '',
          nationality: '',
          priorityGroup: '',
          desiredDateOfInjection: new Date('2000-10-23'),
          desiredSessionOfInjection: ''
        }
  });
  const injectionOrderNumber = watch('injectionOrderNumber');
  const { listProvince } = useUnitAdministrative();

  const handleChangeProvince = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setListDistrict(
      getChildArr(Number(e.target.value), listProvince, 'districts')
    );
    setListWard([]);
    setValue('province_id', Number(e.target.value));
    setAllowClickDistrict(true);
    setValue('district_id', 0);
    setValue('ward_id', 0);
    if (getValues('province_id') !== Number(e.target.value)) {
      setAllowClickWard(false);
    }
    trigger();
  };

  const handleChangeDistrict = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue('district_id', Number(e.target.value));
    setValue('ward_id', 0);
    trigger();
    setListWard(getChildArr(Number(e.target.value), listDistrict, 'wards'));
    setAllowClickWard(true);
  };
  const handleChangeWard = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue('ward_id', Number(e.target.value));
    clearErrors('ward_id');
    trigger();
  };
  const formSubmitHandler: SubmitHandler<VaccineRegistrationType> = (
    data: VaccineRegistrationType
  ) => {
    receiveData(data);
    onNextStep();
  };

  useEffect(() => {
    if (injectionOrderNumber) {
      trigger();
    }
  }, [injectionOrderNumber, trigger]);

  return (
    <Box component="form" onSubmit={handleSubmit(formSubmitHandler)}>
      <Stack direction="column" spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Stack direction="column" spacing={1}>
              <Label required={true}>Đăng kí mũi tiêm thứ ?</Label>
              <Controller
                name="injectionOrderNumber"
                control={control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <TextField
                    size="small"
                    helperText={error?.message ? t(`${error?.message}`) : null}
                    error={invalid}
                    {...field}
                    select>
                    <MenuItem value={1}>
                      <Trans>Mũi thứ nhất</Trans>
                    </MenuItem>
                    <MenuItem value={2}>
                      <Trans>Mũi thứ hai</Trans>
                    </MenuItem>
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
            <Trans>1. Thông tin người đăng ký tiêm</Trans>
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
                        <MenuItem value="Nam">
                          <Trans>Nam</Trans>
                        </MenuItem>
                        <MenuItem value="Nữ">
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
                    name="citizen_id"
                    control={control}
                    render={({ field, fieldState: { invalid, error } }) => (
                      <TextField
                        size="small"
                        defaultValue={getValues('citizen_id')}
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
                    name="province_id"
                    control={control}
                    render={({ field, fieldState: { invalid, error } }) => (
                      <TextField
                        size="small"
                        helperText={
                          error?.message ? t(`${error?.message}`) : null
                        }
                        error={invalid}
                        {...field}
                        onChange={(e) => handleChangeProvince(e)}
                        select>
                        {listProvince.length > 0
                          ? listProvince.map((value: ProvinceType) => (
                              <MenuItem value={value.id} key={value.id}>
                                {value.name}
                              </MenuItem>
                            ))
                          : null}
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
                    name="district_id"
                    control={control}
                    render={({ field, fieldState: { invalid, error } }) => (
                      <TextField
                        size="small"
                        disabled={!allowClickDistrict}
                        helperText={
                          error?.message ? t(`${error?.message}`) : null
                        }
                        error={invalid}
                        {...field}
                        onChange={(e) => handleChangeDistrict(e)}
                        select>
                        {listDistrict.length > 0
                          ? listDistrict.map((value: DistrictType) => (
                              <MenuItem value={value.id} key={value.id}>
                                {value.name}
                              </MenuItem>
                            ))
                          : null}
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
                    name="ward_id"
                    control={control}
                    render={({ field, fieldState: { invalid, error } }) => (
                      <TextField
                        size="small"
                        disabled={!allowClickWard}
                        helperText={
                          error?.message ? t(`${error?.message}`) : null
                        }
                        error={invalid}
                        {...field}
                        onChange={(e) => handleChangeWard(e)}
                        select>
                        {listWard.length > 0
                          ? listWard.map((value: WardType) => (
                              <MenuItem value={value.id} key={value.id}>
                                {value.name}
                              </MenuItem>
                            ))
                          : null}
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
            <Trans>2. Thông tin đăng ký tiêm chủng</Trans>
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
        {injectionOrderNumber === 2 && (
          <Stack direction="column" spacing={2}>
            <Typography variant="body1" sx={{ fontWeight: '500' }}>
              <Trans>3. Lịch sử tiêm mũi thứ 1</Trans>
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
                          select>
                          {ListVaccinesArr.map((value) => (
                            <MenuItem key={value} value={value}>
                              {value}
                            </MenuItem>
                          ))}
                        </TextField>
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
        <StyledButton
          variant="contained"
          sx={{ backgroundColor: colors.indigo['700'] }}
          type="submit"
          endIcon={<ArrowForwardIcon />}>
          {t('Tiếp tục')}
        </StyledButton>
      </Stack>
    </Box>
  );
};
