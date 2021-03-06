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
              <Label required={true}>????ng k?? m??i ti??m th??? ?</Label>
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
                      <Trans>M??i th??? nh???t</Trans>
                    </MenuItem>
                    <MenuItem value={2}>
                      <Trans>M??i th??? hai</Trans>
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
            <Trans>1. Th??ng tin ng?????i ????ng k?? ti??m</Trans>
          </Typography>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Stack direction="column" spacing={1}>
                  <Label required={true}>
                    <Trans>H??? v?? t??n</Trans>
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
                    <Trans>Ng??y sinh</Trans>
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
                    <Trans>Gi???i t??nh</Trans>
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
                        <MenuItem value="N???">
                          <Trans>N???</Trans>
                        </MenuItem>
                      </TextField>
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <Stack direction="column" spacing={1}>
                  <Label required={true}>
                    <Trans>S??? ??i???n tho???i</Trans>
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
                    <Trans>S??? CMND/CCCD/M?? ?????nh danh c??ng d??n</Trans>
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
                    <Trans>S??? th??? BHYT</Trans>
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
                    <Trans>Ngh??? nghi???p</Trans>
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
                    <Trans>????n v??? c??ng t??c</Trans>
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
                    <Trans>?????a ch??? hi???n t???i</Trans>
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
                    <Trans>T???nh/Th??nh ph???</Trans>
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
                    <Trans>Qu???n/Huy???n</Trans>
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
                    <Trans>X??/Ph?????ng</Trans>
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
                    <Trans>D??n t???c</Trans>
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
                    <Trans>Qu???c t???ch</Trans>
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
                    <Trans>Nh??m ??u ti??n</Trans>
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
            <Trans>2. Th??ng tin ????ng k?? ti??m ch???ng</Trans>
          </Typography>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Stack direction="column" spacing={1}>
                  <Label required={false}>
                    <Trans>Ng??y mu???n ???????c ti??m (d??? ki???n)</Trans>
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
                    <Trans>Bu???i ti??m mong mu???n</Trans>
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
              <Trans>3. L???ch s??? ti??m m??i th??? 1</Trans>
            </Typography>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Stack direction="column" spacing={1}>
                    <Label required={true}>
                      <Trans>T??n v???c xin</Trans>
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
                      <Trans>Ng??y ti??m</Trans>
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
                      <Trans>S??? l??</Trans>
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
                      <Trans>?????a ??i???m ti??m</Trans>
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
                      <Trans>Ph???n ???ng sau ti??m ch???ng</Trans>
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
                          placeholder={t('Ph???n ???ng sau ti??m ch???ng')}
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
            {t('L??u ??')}:
          </Typography>
          <Box component="ul" ml={4}>
            <Typography variant="body1" component="li">
              {t(
                'Vi???c ????ng k?? th??ng tin ho??n to??n b???o m???t v?? ph???c v??? cho chi???n d???ch ti??m ch???ng V???c xin COVID - 19'
              )}
            </Typography>
            <Typography variant="body1" component="li">
              {' '}
              {t(
                'Xin vui l??ng ki???m tra k??? c??c th??ng tin b???t bu???c(VD: H??? v?? t??n, Ng??y th??ng n??m sinh, S??? ??i???n tho???i, S??? CMND/CCCD/M?? ?????nh danh c??ng d??n/HC ...)'
              )}
            </Typography>
            <Typography variant="body1" component="li">
              {' '}
              {t(
                'B???ng vi???c nh???n n??t "X??c nh???n", b???n ho??n to??n hi???u v?? ?????ng ?? ch???u tr??ch nhi???m v???i c??c th??ng tin ???? cung c???p'
              )}
            </Typography>
            <Typography variant="body1" component="li">
              {' '}
              {t(
                'C?? nh??n/T??? ch???c ????ng k?? th??nh c??ng tr??n h??? th???ng s??? ???????c ????a v??o danh s??ch ?????t ti??m. C?? s??? y t??? s??? th??ng b??o l???ch ti??m khi c?? v???c xin v?? k??? ho???ch ti??m ???????c ph?? duy???t. Tr??n tr???ng c???m ??n!'
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
          {t('Ti???p t???c')}
        </StyledButton>
      </Stack>
    </Box>
  );
};
