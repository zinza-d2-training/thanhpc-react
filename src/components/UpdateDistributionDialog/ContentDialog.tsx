import {
  Stack,
  Box,
  colors,
  TextField,
  Typography,
  CircularProgress
} from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Trans } from 'react-i18next';
import { Label } from '../../components/Label';
import { ProvinceType } from '../../pages/User/types';
import { StyledButton } from '../StyledButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { distributionUpdateSchema } from '../../pages/Admin/schema';
import { ManageDistributionFormUpdate } from '../../pages/Admin/types';
import { useState } from 'react';
import { useDistributionUpdate } from '../../hooks/useDistributionUpdate';
import { getProvinceById } from '../../pages/User/functions';

interface Props {
  onClose: () => void;
  data: ProvinceType[];
  provinceId: number;
  handleRefetch: () => void;
}

export const ContentDialog = (props: Props) => {
  const { data, provinceId, handleRefetch, onClose } = props;
  const listProvince = data;
  const [mutation] = useDistributionUpdate();
  const province = getProvinceById(provinceId, listProvince);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = useForm<ManageDistributionFormUpdate>({
    resolver: yupResolver(distributionUpdateSchema),
    mode: 'onChange',
    defaultValues: {
      id: province?.id,
      distribution_plan: province?.distribution_plan,
      actual_distribution: province?.actual_distribution,
      adult_population: province?.adult_population,
      injected_number: province?.injected_number
    }
  });

  const formSubmitHandler: SubmitHandler<ManageDistributionFormUpdate> = async (
    data: ManageDistributionFormUpdate
  ) => {
    setLoading(true);
    try {
      const response = await mutation(data);
      if (response.status === 200) {
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
          <Typography variant="h5">{province?.name}</Typography>
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
        <Box sx={{ width: '400px' }}>
          <Label required={true}>Số liều đã tiêm</Label>
          <Controller
            name="injected_number"
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
