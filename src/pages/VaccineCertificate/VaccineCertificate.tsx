import {
  Box,
  Grid,
  Typography,
  colors,
  Stack,
  Button,
  TextField,
  Container,
  MenuItem
} from '@mui/material';
import { useForm, Controller, Resolver } from 'react-hook-form';

import { Label } from '../../components/Label';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { Certificate } from './types';
import { yupResolver } from '@hookform/resolvers/yup';
import { vaccineCertificateSchema } from '../../validations/yups/schema';

interface OptionGender {
  name: string;
  value: string;
}
interface InputField {
  fieldName: string;
  required: boolean;
  fieldType: string;
  nameProperty: string;
  options?: OptionGender[];
}
const inputFields: InputField[] = [
  {
    fieldName: 'Họ và tên',
    required: true,
    fieldType: 'text',
    nameProperty: 'full_name'
  },
  {
    fieldName: 'Ngày sinh',
    required: true,
    fieldType: 'date',
    nameProperty: 'dob'
  },
  {
    fieldName: 'Giới tính',
    required: true,
    fieldType: 'select',
    nameProperty: 'gender',
    options: [
      { name: 'Nam', value: 'male' },
      { name: 'Nữ', value: 'female' }
    ]
  },
  {
    fieldName: 'Số điện thoại',
    required: true,
    fieldType: 'text',
    nameProperty: 'phone_number'
  },
  {
    fieldName: 'Số CMND/CCCD',
    required: false,
    fieldType: 'text',
    nameProperty: 'citizenId'
  },
  {
    fieldName: 'Số thẻ BHYT',
    required: false,
    fieldType: 'text',
    nameProperty: 'healthInsuranceCardNumber'
  }
];
export const VaccineCertificate = () => {
  const {
    formState: { errors },
    control
  } = useForm<Certificate>({
    resolver: yupResolver(vaccineCertificateSchema),
    mode: 'onChange'
    // defaultValues: { provinceId: '', wardId: '', districtId: '' }
  });
  return (
    <>
      <Header />
      <Box
        sx={{
          mt: '112px',
          mb: '40px',
          height: '64px',
          width: '100vw',
          background: colors.grey['100'],
          display: 'flex',
          alignItems: 'center'
        }}>
        <Container maxWidth="xl">
          <Typography variant="h5">Tra cứu chứng nhận tiêm</Typography>
        </Container>
      </Box>
      <Box sx={{ mb: 3 }}>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            {inputFields.map((inputField: InputField) => (
              <Grid item xs={2} xl={2}>
                <Box sx={{}}>
                  <Label required={inputField.required ? true : false}>
                    {inputField.fieldName}
                  </Label>
                  <Controller
                    name={inputField.nameProperty}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        type={inputField.fieldType}
                        // helperText={
                        //   errors.full_name?.message
                        //     ? errors.full_name?.message
                        //     : null
                        // }
                        // error={errors.full_name?.message ? true : false}
                        placeholder={inputField.fieldName}
                        {...field}
                        sx={{ root: { height: '50px' }, mt: 1 }}
                        select={inputField.options ? true : false}>
                        {inputField.options
                          ? inputField.options.map((option) => (
                              <MenuItem value={option.value}>
                                {option.name}
                              </MenuItem>
                            ))
                          : null}
                      </TextField>
                    )}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};
