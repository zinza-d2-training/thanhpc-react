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
import { vaccinationSiteSchema } from '../../pages/Admin/schema';
import {
  VaccinationSite,
  VaccinationSiteUpdate
} from '../../pages/Admin/types';
import { getChildArr } from '../../pages/User/functions';
import { DistrictType, ProvinceType, WardType } from '../../pages/User/types';
import { useUpdateVaccinationSite } from '../../hooks/useVaccinationSite';
import { getVaccinationSiteById } from '../../pages/Admin/functions';
interface Props {
  onClose: () => void;
  handleRefetch: () => void;
  data: VaccinationSite[];
  vaccinationSiteId: number;
}
export const ContentDialog = (props: Props) => {
  const { updateVaccinationSite } = useUpdateVaccinationSite();
  const { onClose, handleRefetch, data, vaccinationSiteId } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const vaccinationSite = getVaccinationSiteById(data, vaccinationSiteId);
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    clearErrors,
    setError,
    trigger,
    formState: { isValid }
  } = useForm<VaccinationSiteUpdate>({
    resolver: yupResolver(vaccinationSiteSchema),
    mode: 'onChange',
    defaultValues: {
      name: vaccinationSite?.name,
      street_name: vaccinationSite?.street_name,
      ward_id: vaccinationSite?.ward_id,
      district_id: vaccinationSite?.ward.district.id,
      province_id: vaccinationSite?.ward.district.province.id,
      site_manager: vaccinationSite?.site_manager,
      number_of_vaccination_table: vaccinationSite?.number_of_vaccination_table
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
  const formSubmitHandler: SubmitHandler<VaccinationSiteUpdate> = async (
    data: VaccinationSiteUpdate
  ) => {
    setLoading(true);
    try {
      const response = await updateVaccinationSite({
        ...data,
        id: vaccinationSiteId
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
          <Label required={true}>Tên điểm tiêm</Label>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
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
          <Label required={true}>Số nhà, tên đường</Label>
          <Controller
            name="street_name"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
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
        <Box sx={{ width: '400px' }}>
          <Label required={true}>Người đứng đầu cơ sở tiêm chủng</Label>
          <Controller
            name="site_manager"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
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
          <Label required={true}>Số bàn tiêm</Label>
          <Controller
            name="number_of_vaccination_table"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
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
