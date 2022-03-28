import { useState } from 'react';
import { Box, Container, Typography, colors } from '@mui/material';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useTranslation } from 'react-i18next';

import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';
import { StepThree } from './StepThree';
import { StepFour } from './StepFour';

import { VaccineRegistrationType, IMedicalHistory } from './types';
import { medicalHistoryTemplate } from '../../db/medicalHistoryTemplate';
enum tabRegister {
  PersonalInfo = 0,
  MedicalHistory = 1,
  ConsentFormForInjection = 2,
  Complete = 3
}
export const VaccineRegistration = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [dataStepOne, setDataStepOne] = useState<VaccineRegistrationType>({
    injectionOrderNumber: 0,
    email: '',
    job: '',
    workUnit: '',
    currentAddress: '',
    province_id: 0,
    district_id: 0,
    ward_id: 0,
    ethnic: '',
    nationality: '',
    priorityGroup: '',
    desiredDateOfInjection: '',
    desiredSessionOfInjection: '',
    full_name: '',
    dob: new Date(),
    gender: '',
    phone_number: '',
    citizen_id: '',
    healthInsuranceCardNumber: ''
  });
  const [dataStepTwo, setDataStepTwo] = useState<IMedicalHistory[]>();
  const [dataStepThree, setDataStepThree] = useState<boolean>();
  let contentComponent = null;

  const handlePreviousStep = () => {
    setActiveStep(activeStep - 1);
  };
  const handleNextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const handleSubmitDataStepOne = (data: VaccineRegistrationType) => {
    setDataStepOne(data);
  };
  const handleSubmitDataStepTwo = (data: IMedicalHistory[]) => {
    setDataStepTwo(data);
  };
  const handleSubmitDataStepThree = (data: boolean) => {
    setDataStepThree(data);
  };
  switch (activeStep) {
    case tabRegister.PersonalInfo:
      contentComponent = (
        <StepOne
          onNextStep={handleNextStep}
          data={dataStepOne || null}
          receiveData={handleSubmitDataStepOne}
        />
      );
      break;
    case tabRegister.MedicalHistory:
      contentComponent = (
        <StepTwo
          onNextStep={handleNextStep}
          onPrevStep={handlePreviousStep}
          data={dataStepTwo || medicalHistoryTemplate}
          receiveData={handleSubmitDataStepTwo}
        />
      );
      break;
    case tabRegister.ConsentFormForInjection:
      contentComponent = (
        <StepThree
          onNextStep={handleNextStep}
          onPrevStep={handlePreviousStep}
          data={dataStepThree || false}
          receiveData={handleSubmitDataStepThree}
        />
      );
      break;
    case tabRegister.Complete:
      contentComponent = (
        <StepFour onPrevStep={handlePreviousStep} data={dataStepOne} />
      );
      break;
  }

  const steps = [
    t('Thông tin cá nhân'),
    t('Tiền sử bệnh'),
    t('Phiếu đồng ý tiêm'),
    t('Hoàn thành')
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
            <Typography variant="h5">{t('Đăng ký tiêm')}</Typography>
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
