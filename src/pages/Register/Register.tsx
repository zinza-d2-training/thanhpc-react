import { useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { Box, Grid, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import loginImg from '../../images/login.png';
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';
import { StepThree } from './StepThree';
import { useForm, FormProvider, Resolver } from 'react-hook-form';
import { registerSchema } from './schema';
import { OTPInputDialog } from '../../components/OTPInputDialog/OTPInputDialog';
import { UserFormData } from './types';
import axios from 'axios';

const steps = ['Số CMND/CCCD', 'Thông tin cá nhân', 'Địa chỉ'];
export const Register = () => {
  const methods = useForm<UserFormData>({
    resolver: yupResolver(registerSchema) as Resolver<UserFormData>,
    mode: 'onChange',
    defaultValues: { province_id: '', ward_id: '', district_id: '' }
  });
  const [open, setOpen] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [activeStep, setActiveStep] = useState<number>(0);

  let contentComponent = null;
  const navigate = useNavigate();

  const handleOpenModal = () => setOpen(true);
  async function handleCloseModal() {
    setOpen(false);
    const files = methods.getValues('images').map((value) => value.file);
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file as File));
    formData.append('citizen_id', methods.getValues('citizen_id'));
    formData.append('password', methods.getValues('password'));
    formData.append('full_name', methods.getValues('full_name'));
    formData.append('dob', methods.getValues('dob'));
    formData.append('gender', methods.getValues('gender'));
    formData.append('phone_number', methods.getValues('phone_number'));
    formData.append('ward_id', methods.getValues('ward_id'));
    await axios({
      method: 'POST',
      url: 'http://localhost:4000/auth/register',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData
    })
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        console.log('error', error);
      });
    return;
  }

  const handleSkip = () => {
    if (activeStep === steps.length - 1) {
      handleOpenModal();
    } else {
      setActiveStep(activeStep + 1);
    }
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
    if (activeStep === 0) {
      navigate('/');
    }
  };
  const handleDisable = (isHaveErrors: boolean, length?: number) => {
    if (length) {
      if (length < 2) {
        return setDisabled(true);
      }
    }
    if (isHaveErrors) {
      return setDisabled(true);
    }
    setDisabled(false);
  };

  switch (activeStep) {
    case 0:
      contentComponent = (
        <StepOne methods={methods} handleDisable={handleDisable} maxImage={2} />
      );
      break;
    case 1:
      contentComponent = (
        <StepTwo methods={methods} handleDisable={handleDisable} />
      );
      break;
    case 2:
      contentComponent = (
        <StepThree methods={methods} handleDisable={handleDisable} />
      );
      break;
    default:
      break;
  }
  return (
    <Grid container>
      <OTPInputDialog
        open={open}
        onClose={handleCloseModal}
        onConfirm={handleCloseModal}
      />
      <Grid item xs={6}>
        <Box
          component="img"
          sx={{
            height: '100vh',
            width: '50%',
            position: 'fixed',
            objectFit: 'cover',
            verticalAlign: 'middle'
          }}
          alt=""
          src={loginImg}
        />
      </Grid>
      <Grid item xs={6}>
        <Box
          sx={{
            display: 'flex',
            alignItem: 'center',
            flexDirection: 'column'
          }}>
          <Typography
            variant="h4"
            sx={{
              mt: 2.75,
              mb: 1.25,
              '@media(min-height: 768px)': { mt: '150px', mb: 3 },
              '@media(min-height: 920px)': { mt: '25vh' },
              textAlign: 'center',
              fontWeight: 'bold'
            }}>
            Đăng ký tài khoản
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column'
            }}>
            <Stepper
              sx={{ width: '500px', my: 2 }}
              alternativeLabel
              activeStep={activeStep}>
              {steps.map((label, index) => {
                return (
                  <Step key={index}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <Box sx={{ mt: 2 }}>
              <FormProvider {...methods}>
                <Box
                  component="form"
                  sx={{
                    width: '450px',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column'
                  }}>
                  {contentComponent}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%'
                    }}>
                    <Button
                      variant="text"
                      startIcon={<ArrowBackIcon />}
                      onClick={handleBack}
                      sx={{
                        color: 'rgba(0, 0, 0, 0.87)',
                        marginRight:
                          activeStep === steps.length - 1 ? 'auto' : null
                      }}>
                      Quay lại
                    </Button>
                    <Button
                      sx={{
                        marginLeft: activeStep === 0 ? 'auto' : null
                      }}
                      type="button"
                      onClick={handleSkip}
                      disabled={disabled}
                      endIcon={<ArrowForwardIcon />}>
                      {activeStep === steps.length - 1
                        ? 'Hoàn thành'
                        : 'Tiếp tục'}
                    </Button>
                  </Box>
                </Box>
              </FormProvider>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
