import { yupResolver } from '@hookform/resolvers/yup';
import {
  Stack,
  Box,
  TextField,
  colors,
  CircularProgress,
  MenuItem
} from '@mui/material';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Trans } from 'react-i18next';
import { Label, StyledButton } from '..';
import { vaccineRegistrationSchema } from '../../pages/Admin/schema';
import {
  VaccineRegistration,
  VaccineRegistrationUpdate
} from '../../pages/Admin/types';
import { useUpdateVaccineRegistration } from '../../hooks/useVaccineRegistration';
import { getVaccineRegistrationById } from '../../pages/Admin/functions';
interface Props {
  onClose: () => void;
  handleRefetch: () => void;
  data: VaccineRegistration[];
  vaccineRegistrationId: number;
}
export const ContentDialog = (props: Props) => {
  const { updateVaccineRegistration } = useUpdateVaccineRegistration();
  const { onClose, handleRefetch, data, vaccineRegistrationId } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const vaccineRegistration = getVaccineRegistrationById(
    data,
    vaccineRegistrationId
  );
  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = useForm<VaccineRegistrationUpdate>({
    resolver: yupResolver(vaccineRegistrationSchema),
    mode: 'onChange',
    defaultValues: {
      status: vaccineRegistration?.status,
      personal_info_id: vaccineRegistration?.personalInformation.id
    }
  });

  const formSubmitHandler: SubmitHandler<VaccineRegistrationUpdate> = async (
    data: VaccineRegistrationUpdate
  ) => {
    setLoading(true);
    try {
      const response = await updateVaccineRegistration({
        ...data,
        id: vaccineRegistrationId
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
          <Label required={true}>Trạng thái</Label>
          <Controller
            name="status"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                fullWidth
                helperText={error?.message}
                error={invalid}
                {...field}
                sx={{ root: { height: '50px' }, mt: 1 }}
                select>
                <MenuItem value="Thành công">Thành công</MenuItem>
                <MenuItem value="Thất bại">Thất bại</MenuItem>
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
