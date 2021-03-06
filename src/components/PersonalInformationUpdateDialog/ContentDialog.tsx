import { yupResolver } from '@hookform/resolvers/yup';
import {
  Stack,
  Box,
  TextField,
  colors,
  CircularProgress,
  MenuItem
} from '@mui/material';
import { useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Trans } from 'react-i18next';
import { Label, StyledButton } from '..';
import { useUnitAdministrative } from '../../hooks/useUnitAdministrative';
import { personalInformationSchema } from '../../pages/Admin/schema';
import {
  PersonalInformation,
  PersonalInformationUpdate
} from '../../pages/Admin/types';
import { getChildArr } from '../../pages/User/functions';
import { DistrictType, ProvinceType, WardType } from '../../pages/User/types';
import { useUpdatePersonalInformation } from '../../hooks/usePersonalInformation';
import { getPersonalInformationById } from '../../pages/Admin/functions';
interface Props {
  onClose: () => void;
  handleRefetch: () => void;
  data: PersonalInformation[];
  personalInformationId: number;
}
export const ContentDialog = (props: Props) => {
  const { updatePersonalInformation } = useUpdatePersonalInformation();
  const { onClose, handleRefetch, data, personalInformationId } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const personalInformation = getPersonalInformationById(
    data,
    personalInformationId
  );
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    clearErrors,
    setError,
    trigger,
    formState: { isValid }
  } = useForm<PersonalInformationUpdate>({
    resolver: yupResolver(personalInformationSchema),
    mode: 'onChange',
    defaultValues: {
      injection_id: personalInformation?.injection_id,
      full_name: personalInformation?.full_name,
      dob: personalInformation?.dob,
      gender: personalInformation?.gender,
      phone_number: personalInformation?.phone_number,
      email: personalInformation?.email,
      citizen_id: personalInformation?.citizen_id,
      health_insurance_number: personalInformation?.health_insurance_number,
      occupation: personalInformation?.occupation,
      workplace: personalInformation?.workplace,
      address: personalInformation?.address,
      ethnic: personalInformation?.ethnic,
      nationality: personalInformation?.nationality,
      expected_date: personalInformation?.expected_date,
      session_id: personalInformation?.session_id,
      priority_group_id: personalInformation?.priority_group_id,
      ward_id: personalInformation?.ward_id,
      district_id: personalInformation?.ward.district.id,
      province_id: personalInformation?.ward.district.province.id
    }
  });
  const province_id = getValues('province_id');
  const district_id = getValues('district_id');
  const { listProvince } = useUnitAdministrative();

  const listDistrict = useMemo(() => {
    return getChildArr(province_id, listProvince, 'districts');
  }, [province_id, listProvince]);

  const listWard = useMemo(() => {
    return getChildArr(district_id, listDistrict, 'wards');
  }, [district_id, listDistrict]);

  const [allowClickDistrict, setAllowClickDistrict] = useState<boolean>(false);
  const [allowClickWard, setAllowClickWard] = useState<boolean>(false);

  const handleChangeProvince = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue('province_id', Number(e.target.value));
    setAllowClickDistrict(true);
    setAllowClickWard(false);
    setError('ward_id', { message: 'Tr?????ng n??y l?? b???t bu???c' });
    setError('district_id', { message: 'Tr?????ng n??y l?? b???t bu???c' });
    trigger();
  };

  const handleChangeDistrict = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue('district_id', Number(e.target.value));
    trigger();
    setAllowClickWard(true);
    setError('ward_id', { message: 'Tr?????ng n??y l?? b???t bu???c' });
  };
  const handleChangeWard = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue('ward_id', Number(e.target.value));
    clearErrors('ward_id');
    trigger();
  };
  const formSubmitHandler: SubmitHandler<PersonalInformationUpdate> = async (
    data: PersonalInformationUpdate
  ) => {
    setLoading(true);
    try {
      const response = await updatePersonalInformation({
        ...data,
        id: personalInformationId
      });
      if (response.request.status === 200) {
        setLoading(false);
        handleRefetch();
        onClose();
      }
    } catch (err) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Stack
        component="form"
        direction="column"
        onSubmit={handleSubmit(formSubmitHandler)}
        spacing={3}
        sx={{ px: 3, mt: 3 }}>
        <Box sx={{ width: '400px' }}>
          <Label required={true}>????ng k?? m??i ti??m th??? ?</Label>
          <Controller
            name="injection_id"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                fullWidth
                helperText={error?.message ? error?.message : null}
                autoComplete="on"
                error={invalid}
                {...field}
                sx={{ root: { height: '50px' }, mt: 1 }}
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
        </Box>

        <Box sx={{ width: '400px' }}>
          <Label required={true}>H??? v?? t??n</Label>
          <Controller
            name="full_name"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                fullWidth
                helperText={error?.message ? error?.message : null}
                autoComplete="on"
                error={invalid}
                {...field}
                sx={{ root: { height: '50px' }, mt: 1 }}></TextField>
            )}
          />
        </Box>
        <Box sx={{ width: '400px' }}>
          <Label required={true}>Ng??y sinh</Label>
          <Controller
            name="dob"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                fullWidth
                type="date"
                helperText={error?.message ? error?.message : null}
                autoComplete="on"
                error={invalid}
                {...field}
                sx={{ root: { height: '50px' }, mt: 1 }}></TextField>
            )}
          />
        </Box>
        <Box sx={{ width: '400px' }}>
          <Label required={true}>Gi???i t??nh</Label>
          <Controller
            name="gender"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                fullWidth
                helperText={error?.message ? error?.message : null}
                autoComplete="on"
                error={invalid}
                {...field}
                sx={{ root: { height: '50px' }, mt: 1 }}
                select>
                <MenuItem value={1}>
                  <Trans>Nam</Trans>
                </MenuItem>
                <MenuItem value={2}>
                  <Trans>N???</Trans>
                </MenuItem>
              </TextField>
            )}
          />
        </Box>
        <Box sx={{ width: '400px' }}>
          <Label required={true}>S??? ??i???n tho???i</Label>
          <Controller
            name="phone_number"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                fullWidth
                helperText={error?.message ? error?.message : null}
                autoComplete="on"
                error={invalid}
                {...field}
                sx={{ root: { height: '50px' }, mt: 1 }}></TextField>
            )}
          />
        </Box>
        <Box sx={{ width: '400px' }}>
          <Label required={true}>email</Label>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                fullWidth
                helperText={error?.message ? error?.message : null}
                autoComplete="on"
                error={invalid}
                {...field}
                sx={{ root: { height: '50px' }, mt: 1 }}></TextField>
            )}
          />
        </Box>
        <Box sx={{ width: '400px' }}>
          <Label required={true}>S??? cmnd/c??n c?????c c??ng d??n</Label>
          <Controller
            name="citizen_id"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                fullWidth
                helperText={error?.message ? error?.message : null}
                autoComplete="on"
                error={invalid}
                {...field}
                sx={{ root: { height: '50px' }, mt: 1 }}></TextField>
            )}
          />
        </Box>
        <Box sx={{ width: '400px' }}>
          <Label required={false}>S??? th??? bhyt</Label>
          <Controller
            name="health_insurance_number"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                fullWidth
                helperText={error?.message ? error?.message : null}
                autoComplete="on"
                error={invalid}
                {...field}
                sx={{ root: { height: '50px' }, mt: 1 }}></TextField>
            )}
          />
        </Box>
        <Box sx={{ width: '400px' }}>
          <Label required={false}>C??ng vi???c</Label>
          <Controller
            name="occupation"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                fullWidth
                helperText={error?.message ? error?.message : null}
                autoComplete="on"
                error={invalid}
                {...field}
                sx={{ root: { height: '50px' }, mt: 1 }}></TextField>
            )}
          />
        </Box>
        <Box sx={{ width: '400px' }}>
          <Label required={false}>N??i l??m vi???c</Label>
          <Controller
            name="workplace"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                fullWidth
                helperText={error?.message ? error?.message : null}
                autoComplete="on"
                error={invalid}
                {...field}
                sx={{ root: { height: '50px' }, mt: 1 }}></TextField>
            )}
          />
        </Box>
        <Box sx={{ width: '400px' }}>
          <Label required={false}>?????a ch???</Label>
          <Controller
            name="address"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                fullWidth
                helperText={error?.message ? error?.message : null}
                autoComplete="on"
                error={invalid}
                {...field}
                sx={{ root: { height: '50px' }, mt: 1 }}></TextField>
            )}
          />
        </Box>
        <Box sx={{ width: '400px' }}>
          <Label required={false}>D??n t???c</Label>
          <Controller
            name="ethnic"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                fullWidth
                helperText={error?.message ? error?.message : null}
                autoComplete="on"
                error={invalid}
                {...field}
                sx={{ root: { height: '50px' }, mt: 1 }}></TextField>
            )}
          />
        </Box>
        <Box sx={{ width: '400px' }}>
          <Label required={false}>Qu???c t???ch</Label>
          <Controller
            name="nationality"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                fullWidth
                helperText={error?.message ? error?.message : null}
                autoComplete="on"
                error={invalid}
                {...field}
                sx={{ root: { height: '50px' }, mt: 1 }}></TextField>
            )}
          />
        </Box>
        <Box sx={{ width: '400px' }}>
          <Label required={false}>Ng??y ti??m d??? ki???n</Label>
          <Controller
            name="expected_date"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                type="date"
                fullWidth
                helperText={error?.message ? error?.message : null}
                autoComplete="on"
                error={invalid}
                {...field}
                sx={{ root: { height: '50px' }, mt: 1 }}
              />
            )}
          />
        </Box>
        <Box sx={{ width: '400px' }}>
          <Label required={false}>Bu???i ti??m mong mu???n</Label>
          <Controller
            name="session_id"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                type="date"
                fullWidth
                helperText={error?.message ? error?.message : null}
                autoComplete="on"
                error={invalid}
                {...field}
                sx={{ root: { height: '50px' }, mt: 1 }}
                select>
                <MenuItem value={1}>Bu???i s??ng</MenuItem>
                <MenuItem value={2}>Bu???i chi???u</MenuItem>
              </TextField>
            )}></Controller>
        </Box>
        <Box sx={{ width: '400px' }}>
          <Label required={false}>Nh??m ??u ti??n</Label>
          <Controller
            name="priority_group_id"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                fullWidth
                helperText={error?.message ? error?.message : null}
                autoComplete="on"
                error={invalid}
                {...field}
                sx={{ root: { height: '50px' }, mt: 1 }}
                select>
                <MenuItem value={1}>Nh??m 1</MenuItem>
                <MenuItem value={2}>Nh??m 2</MenuItem>
              </TextField>
            )}></Controller>
        </Box>
        <Box sx={{ width: '400px' }}>
          <Label required={true}>T???nh/Th??nh ph???</Label>
          <Controller
            name="province_id"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                placeholder="T???nh/Th??nh ph???"
                fullWidth
                helperText={error?.message}
                error={invalid}
                {...field}
                sx={{ root: { height: '50px' }, mt: 1 }}
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
        </Box>
        <Box sx={{ width: '400px' }}>
          <Label required={true}>Qu???n/Huy???n</Label>
          <Controller
            name="district_id"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                fullWidth
                helperText={error?.message}
                placeholder="Qu???n/Huy???n"
                disabled={!allowClickDistrict}
                error={invalid}
                {...field}
                onChange={(e) => handleChangeDistrict(e)}
                sx={{ root: { height: '50px' }, mt: 1 }}
                select>
                {!!getValues('province_id')
                  ? listDistrict.map((value: DistrictType) => (
                      <MenuItem value={value.id} key={value.id}>
                        {value.name}
                      </MenuItem>
                    ))
                  : null}
              </TextField>
            )}
          />
        </Box>
        <Box sx={{ width: '400px' }}>
          <Label required={true}>X??/Ph?????ng</Label>
          <Controller
            name="ward_id"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                fullWidth
                disabled={!allowClickWard}
                placeholder="X??/Ph?????ng"
                helperText={error?.message}
                error={invalid}
                {...field}
                onChange={(e) => handleChangeWard(e)}
                sx={{ root: { height: '50px' }, mt: 1 }}
                select>
                {!!getValues('district_id')
                  ? listWard.map((value: WardType) => (
                      <MenuItem value={value.id} key={value.id}>
                        {value.name}
                      </MenuItem>
                    ))
                  : null}
              </TextField>
            )}
          />
        </Box>
        <Box
          sx={{
            justifyContent: 'right',
            display: 'flex',
            width: '400px',
            mb: '16px !important'
          }}>
          <StyledButton
            sx={{
              border: 1,
              borderColor: colors.indigo['700'],
              color: colors.indigo['700'],
              background: '#fff',
              mr: 1
            }}
            variant="contained"
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
            onClick={onClose}>
            <Trans>H???y b???</Trans>
          </StyledButton>
          <StyledButton
            type="submit"
            sx={{
              background: colors.indigo['700'],
              color: '#fff',
              '&:hover': {
                background: colors.indigo['600']
              }
            }}
            variant="contained"
            disabled={!isValid || loading}
            startIcon={loading && <CircularProgress size={20} />}>
            <Trans>X??c nh???n</Trans>
          </StyledButton>
        </Box>
      </Stack>
    </>
  );
};
