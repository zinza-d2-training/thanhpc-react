import { useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { Box, Grid, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { yupResolver } from '@hookform/resolvers/yup';

import loginImg from '../../images/login.png';
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';
import { StepThree } from './StepThree';
import { useForm, FormProvider } from 'react-hook-form';
import { userSchema } from '../../validations/yups/schema';
import { User } from '../../models/User';

const steps = ['Số CMND/CCCD', 'Thông tin cá nhân', 'Địa chỉ'];
export const Register = () => {
  const methods = useForm<User>({
    resolver: yupResolver(userSchema),
    mode: 'onChange'
  });
  const onSubmit = (data: any) => console.log(data);
  const {
    formState: { errors, isValid },
    control
  } = useForm<User>({
    resolver: yupResolver(userSchema),
    mode: 'onChange'
  });

  const [disabled, setDisabled] = useState<boolean>(true);
  const [activeStep, setActiveStep] = useState<number>(0);

  let contentComponent = null;

  const handleSkip = () => {
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleDisable = (isValid: boolean, length: number) => {
    if (length < 2 || !isValid) {
      return setDisabled(true);
    }
    setDisabled(false);
  };

  switch (activeStep) {
    case 0:
      contentComponent = <StepOne {...methods} handleDisable={handleDisable} />;
      break;
    case 1:
      contentComponent = <StepTwo {...methods} handleDisable={handleDisable} />;
      break;
    case 2:
      contentComponent = <StepThree />;
      break;
    default:
      break;
  }
  return (
    <Grid container>
      <Grid item xs={6}>
        <Box
          component="img"
          sx={{
            height: '100vh',
            width: '100%',
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
              sx={{ width: '500px' }}
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
                  onSubmit={methods.handleSubmit(onSubmit)}
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
                        display: activeStep === 0 ? 'none' : 'inherit',
                        marginRight:
                          activeStep === steps.length - 1 ? 'auto' : null
                      }}>
                      Quay lại
                    </Button>
                    <Button
                      sx={{
                        display:
                          activeStep === steps.length - 1 ? 'none' : 'inherit',
                        marginLeft: activeStep === 0 ? 'auto' : null
                      }}
                      type="submit"
                      onClick={handleSkip}
                      disabled={disabled}
                      endIcon={<ArrowForwardIcon />}>
                      Tiếp tục
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
