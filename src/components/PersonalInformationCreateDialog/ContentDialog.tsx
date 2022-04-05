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
import { PersonalInformationCreate } from '../../pages/Admin/types';
import { getChildArr } from '../../pages/User/functions';
import { DistrictType, ProvinceType, WardType } from '../../pages/User/types';
import { useCreatePersonalInformation } from '../../hooks/usePersonalInformation';
interface Props {
  onClose: () => void;
  handleRefetch: () => void;
}
export const ContentDialog = (props: Props) => {
  const { createPersonalInformation } = useCreatePersonalInformation();
  const { onClose, handleRefetch } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    clearErrors,
    setError,
    trigger,
    formState: { isValid }
  } = useForm<PersonalInformationCreate>({
    resolver: yupResolver(personalInformationSchema),
    mode: 'onChange',
    defaultValues: {
      injection_id: undefined,
      full_name: undefined,
      dob: undefined,
      gender: undefined,
      phone_number: undefined,
      email: undefined,
      citizen_id: undefined,
      health_insurance_number: undefined,
      occupation: undefined,
      workplace: undefined,
      address: undefined,
      ethnic: undefined,
      nationality: undefined,
      expected_date: undefined,
      session_id: undefined,
      priority_group_id: undefined,
      ward_id: undefined,
      district_id: undefined,
      province_id: undefined
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
    setError('ward_id', { message: 'Trường này là bắt buộc' });
    setError('district_id', { message: 'Trường này là bắt buộc' });
    trigger();
  };

  const handleChangeDistrict = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue('district_id', Number(e.target.value));
    trigger();
    setAllowClickWard(true);
    setError('ward_id', { message: 'Trường này là bắt buộc' });
  };
  const handleChangeWard = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue('ward_id', Number(e.target.value));
    clearErrors('ward_id');
    trigger();
  };
  const formSubmitHandler: SubmitHandler<PersonalInformationCreate> = async (
    data: PersonalInformationCreate
  ) => {
    setLoading(true);
    try {
      const response = await createPersonalInformation(data);
      if (response.request.status === 201) {
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
          <Label required={true}>Đăng kí mũi tiêm thứ ?</Label>
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
                  <Trans>Mũi thứ nhất</Trans>
                </MenuItem>
                <MenuItem value={2}>
                  <Trans>Mũi thứ hai</Trans>
                </MenuItem>
              </TextField>
            )}
          />
        </Box>

        <Box sx={{ width: '400px' }}>
          <Label required={true}>Họ và tên</Label>
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
          <Label required={true}>Ngày sinh</Label>
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
          <Label required={true}>Giới tính</Label>
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
                  <Trans>Nữ</Trans>
                </MenuItem>
              </TextField>
            )}
          />
        </Box>
        <Box sx={{ width: '400px' }}>
          <Label required={true}>Số điện thoại</Label>
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
          <Label required={true}>Số cmnd/căn cước công dân</Label>
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
          <Label required={false}>Số thẻ bhyt</Label>
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
          <Label required={false}>Công việc</Label>
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
          <Label required={false}>Nơi làm việc</Label>
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
          <Label required={false}>Địa chỉ</Label>
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
          <Label required={false}>Dân tộc</Label>
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
          <Label required={false}>Quốc tịch</Label>
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
          <Label required={false}>Ngày tiêm dự kiến</Label>
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
          <Label required={false}>Buổi tiêm mong muốn</Label>
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
                <MenuItem value={1}>Buổi sáng</MenuItem>
                <MenuItem value={2}>Buổi chiều</MenuItem>
              </TextField>
            )}></Controller>
        </Box>
        <Box sx={{ width: '400px' }}>
          <Label required={false}>Nhóm ưu tiên</Label>
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
                <MenuItem value={1}>Nhóm 1</MenuItem>
                <MenuItem value={2}>Nhóm 2</MenuItem>
              </TextField>
            )}></Controller>
        </Box>
        <Box sx={{ width: '400px' }}>
          <Label required={true}>Tỉnh/Thành phố</Label>
          <Controller
            name="province_id"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                placeholder="Tỉnh/Thành phố"
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
          <Label required={true}>Quận/Huyện</Label>
          <Controller
            name="district_id"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                fullWidth
                helperText={error?.message}
                placeholder="Quận/Huyện"
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
          <Label required={true}>Xã/Phường</Label>
          <Controller
            name="ward_id"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                fullWidth
                disabled={!allowClickWard}
                placeholder="Xã/Phường"
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
            <Trans>Hủy bỏ</Trans>
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
            <Trans>Xác nhận</Trans>
          </StyledButton>
        </Box>
      </Stack>
    </>
  );
};
