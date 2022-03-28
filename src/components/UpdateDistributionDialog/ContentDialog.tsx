import { Stack, Box, colors, MenuItem, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Trans } from 'react-i18next';
import { Label } from '../../components/Label';
import { ProvinceType } from '../../pages/User/types';
import { StyledButton } from '../StyledButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { adminSchema } from '../../pages/Admin/schema';
import { ManageDistributionFormUpdate } from '../../pages/Admin/types';

interface Props {
  onClose: () => void;
  onConfirm: () => void;
  data: ProvinceType[];
}

export const ContentDialog = (props: Props) => {
  // const { onClose, onConfirm } = props;
  const { data } = props;
  const listProvince = data;
  const { control, trigger, setValue } = useForm<ManageDistributionFormUpdate>({
    resolver: yupResolver(adminSchema),
    mode: 'onChange'
  });
  const handleChangeProvince = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue('province_id', Number(e.target.value));
    trigger();
  };
  return (
    <>
      <Stack
        component="form"
        direction="column"
        spacing={3}
        sx={{ px: 3, mt: 3 }}>
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
          <Label required={true}>Dân số {'>'}= 18 tuổi</Label>
          <Controller
            name="adult_population"
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
          <Label required={true}>Dự kiếm phân bổ</Label>
          <Controller
            name="distribution_plan"
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
          <Label required={true}>Phân bổ thực tế</Label>
          <Controller
            name="actual_distribution"
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
      </Stack>
      <Box
        sx={{
          justifyContent: 'right',
          display: 'flex',
          mt: 5,
          mb: 2.1,
          mr: 3
        }}>
        <StyledButton
          sx={{
            border: 1,
            borderColor: colors.indigo['700'],
            color: colors.indigo['700'],
            background: '#fff',
            mr: 1
          }}
          // onClick={onClose}
        >
          <Trans>Hủy bỏ</Trans>
        </StyledButton>
        <StyledButton
          sx={{
            background: colors.indigo['700'],
            color: '#fff',
            '&:hover': {
              background: colors.indigo['600']
            }
          }}
          variant="contained"
          // disabled={disabled}
          // onClick={onConfirm}
        >
          <Trans>Xác nhận</Trans>
        </StyledButton>
      </Box>
    </>
  );
};
