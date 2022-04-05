import { yupResolver } from '@hookform/resolvers/yup';
import {
  Stack,
  Box,
  TextField,
  colors,
  CircularProgress,
  MenuItem,
  IconButton,
  InputBase,
  Paper,
  Typography,
  Grid
} from '@mui/material';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Trans } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import { Label, StyledButton } from '..';
import { vaccineRegistrationSchema } from '../../pages/Admin/schema';
import {
  GetPersonalInformationByCitizenIdResult,
  VaccineRegistrationCreate
} from '../../pages/Admin/types';
import { useCreateVaccineRegistration } from '../../hooks/useVaccineRegistration';
import { useGetPersonalInformationByCitizenId } from '../../hooks/usePersonalInformation';
interface Props {
  onClose: () => void;
  handleRefetch: () => void;
}
export const ContentDialog = (props: Props) => {
  const { createVaccineRegistration } = useCreateVaccineRegistration();
  const { getPersonalInformationByCitizenId } =
    useGetPersonalInformationByCitizenId();
  const [citizenId, setCitizenId] = useState<string>('');
  const [searchResult, setSearchResult] =
    useState<GetPersonalInformationByCitizenIdResult>();
  const { onClose, handleRefetch } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    trigger,
    setValue,
    formState: { isValid }
  } = useForm<VaccineRegistrationCreate>({
    resolver: yupResolver(vaccineRegistrationSchema),
    mode: 'onChange',
    defaultValues: {
      status: undefined,
      personal_info_id: undefined
    }
  });
  const formSubmitHandler: SubmitHandler<VaccineRegistrationCreate> = async (
    data: VaccineRegistrationCreate
  ) => {
    console.log('data', data);
    setLoading(true);
    try {
      const response = await createVaccineRegistration(data);
      if (response.request.status === 201) {
        setLoading(false);
        handleRefetch();
        onClose();
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = async () => {
    try {
      if (citizenId === '') {
        throw new Error('Citizen Id not found');
      }
      const result = await getPersonalInformationByCitizenId(citizenId);
      setSearchResult({
        citizen_id: result.data.citizen_id,
        full_name: result.data.full_name,
        phone_number: result.data.phone_number,
        dob: result.data.dob
      });
      setValue('personal_info_id', result.data.id);
      trigger();
    } catch (err) {
      setSearchResult(undefined);
    }
  };
  const handleChangeCitizenId = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setCitizenId(e.target.value);
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
        <Box sx={{ width: '400px' }}>
          <Label required={false}>Tìm kiếm thông tin cá nhân</Label>
          <Paper
            component="form"
            sx={{
              p: '2px 4px',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              width: 400
            }}>
            <InputBase
              onChange={(e) => handleChangeCitizenId(e)}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Nhập cmnd/căn cước công dân"
            />
            <IconButton
              onClick={handleSearch}
              sx={{ p: '10px', borderRadius: '50%' }}
              aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
        {searchResult ? (
          <Box sx={{ width: '400px' }}>
            <Typography variant="h5">Kết quả tra cứu: </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2">
                  Số cmnd/căn cước công dân:{' '}
                </Typography>
                <Box component="b">{searchResult.citizen_id}</Box>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">Họ tên:</Typography>
                <Box component="b">{searchResult.full_name}</Box>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">Số điện thoại:</Typography>
                <Box component="b">{searchResult.phone_number}</Box>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">Ngày sinh: </Typography>
                <Box component="b">{searchResult.dob.toLocaleString()}</Box>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box sx={{ width: '400px' }}>
            <Typography variant="h5">Không có kết quả</Typography>
          </Box>
        )}
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
