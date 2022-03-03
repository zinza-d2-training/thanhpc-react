import { useState, useEffect } from 'react';
import { Box, Container, Typography, colors, Stack } from '@mui/material';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Trans, useTranslation } from 'react-i18next';

import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';
import { StepThree } from './StepThree';
import { StepFour } from './StepFour';

export const VaccineRegistration = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState<number>(0);
  let contentComponent = null;
  enum tabRegister {
    PersonalInfo = 0,
    MedicalHistory = 1,
    ConsentFormForInjection = 2,
    Complete = 3
  }
  const handlePreviousStep = () => {
    setActiveStep(activeStep - 1);
  };
  const handleNextStep = () => {
    setActiveStep(activeStep + 1);
  };

  switch (activeStep) {
    case tabRegister.PersonalInfo:
      contentComponent = <StepOne onNextStep={handleNextStep} />;
      break;
    case tabRegister.MedicalHistory:
      contentComponent = (
        <StepTwo onNextStep={handleNextStep} onPrevStep={handlePreviousStep} />
      );
      break;
    case tabRegister.ConsentFormForInjection:
      contentComponent = (
        <StepThree
          onNextStep={handleNextStep}
          onPrevStep={handlePreviousStep}
        />
      );
      break;
    case tabRegister.Complete:
      contentComponent = (
        <StepFour onNextStep={handleNextStep} onPrevStep={handlePreviousStep} />
      );
      break;
  }

  const steps = [
    'Thông tin cá nhân',
    'Tiền sử bệnh',
    'Phiếu đồng ý tiêm',
    'Hoàn thành'
  ];

  return (
    <>
      <Header />
      <Box sx={{ minHeight: '500px' }}>
        <Box
          sx={{
            mt: '112px',
            mb: '40px',
            height: '64px',
            background: colors.grey['100'],
            display: 'flex',
            alignItems: 'center'
          }}>
          <Container maxWidth="xl">
            <Typography variant="h5">Đăng ký tiêm</Typography>
          </Container>
        </Box>
        <Box>
          <Container maxWidth="xl">
            <Box sx={{ mb: 10 }}>
              <Stepper
                sx={{ width: '100%', my: 2 }}
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
            </Box>
            {contentComponent}
          </Container>
        </Box>
      </Box>
      <Footer />
    </>
  );
};
