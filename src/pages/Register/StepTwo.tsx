import { UseFormReturn } from 'react-hook-form';
import { Box, TextField, MenuItem } from '@mui/material';
import { useMemo, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { Label } from '../../components/Label';
import { Gender, UserFormData } from './types';

interface Props {
  handleDisable: (isHaveErrors: boolean, length?: number) => void;
  methods: UseFormReturn<UserFormData, object>;
}

export const StepTwo = (props: Props) => {
  const {
    formState: { errors },
    control
  } = props.methods;
  const { handleDisable } = props;
  const isHaveErrors = useMemo(() => {
    return (
      !!errors.citizen_id ||
      !!errors.password ||
      !!errors.full_name ||
      !!errors.dob ||
      !!errors.gender ||
      !!errors.phone_number
    );
  }, [
    errors.citizen_id,
    errors.password,
    errors.full_name,
    errors.dob,
    errors.gender,
    errors.phone_number
  ]);

  useEffect(() => {
    handleDisable(isHaveErrors);
  }, [handleDisable, isHaveErrors]);

  return (
    <>
      <Box sx={{ mb: 2, minWidth: '450px' }}>
        <Label required={true}>Họ và tên</Label>
        <Controller
          name="full_name"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              helperText={
                errors.full_name?.message ? errors.full_name?.message : null
              }
              error={errors.full_name?.message ? true : false}
              placeholder="Nguyễn Văn A"
              {...field}
              sx={{ root: { height: '50px' }, mt: 1 }}
            />
          )}
        />
      </Box>
      <Box sx={{ mb: 2, minWidth: '450px' }}>
        <Label required={true}>Ngày sinh</Label>
        <Controller
          name="dob"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              helperText={errors.dob?.message ? errors.dob?.message : null}
              error={errors.dob?.message ? true : false}
              type="date"
              {...field}
              sx={{ root: { height: '50px' }, mt: 1 }}
            />
          )}
        />
      </Box>
      <Box sx={{ mb: 2, minWidth: '450px' }}>
        <Label required={true}>Giới tính</Label>
        <Controller
          name="gender"
          control={control}
          defaultValue="male"
          render={({ field }) => (
            <TextField
              fullWidth
              helperText={
                errors.gender?.message ? errors.gender?.message : null
              }
              error={errors.gender?.message ? true : false}
              {...field}
              sx={{ root: { height: '50px' }, mt: 1 }}
              select>
              <MenuItem value={Gender.Male}>Nam</MenuItem>
              <MenuItem value={Gender.Female}>Nữ</MenuItem>
            </TextField>
          )}
        />
      </Box>
      <Box sx={{ mb: 2, minWidth: '450px' }}>
        <Label required={true}>Số điện thoại</Label>
        <Controller
          name="phone_number"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              helperText={
                errors.phone_number?.message
                  ? errors.phone_number?.message
                  : null
              }
              error={errors.phone_number?.message ? true : false}
              placeholder="123456789"
              {...field}
              sx={{ root: { height: '50px' }, mt: 1 }}
            />
          )}
        />
      </Box>
    </>
  );
};
