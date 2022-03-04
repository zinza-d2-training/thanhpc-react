import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  colors,
  MenuItem,
  Grid,
  Stack,
  TextField
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, Resolver, SubmitHandler } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

import { vaccineRegistrationSchema } from './schema';
import { StyledButton } from '../../components';
import { Label } from '../../components/Label';
import {
  VaccineRegistrationType,
  PriorityGroup,
  DesiredSessionOfInjection
} from './types';

interface Props {
  onNextStep: () => void;
  onPrevStep: () => void;
}
export const StepTwo = (props: Props) => {
  const { t } = useTranslation();
  const { onNextStep, onPrevStep } = props;
  return (
    <>
      <Stack
        direction="row"
        justifyContent="center"
        spacing={2}
        sx={{
          marginTop: '24px !important',
          marginBottom: '48px !important'
        }}>
        <StyledButton
          variant="outlined"
          // onClick={props.onBackStep}
          sx={{ color: colors.indigo['700'] }}
          onClick={onPrevStep}
          startIcon={<ArrowBackIcon />}>
          {t('Quay lại')}
        </StyledButton>
        <StyledButton
          // disabled={disabledButton}
          variant="contained"
          sx={{ backgroundColor: colors.indigo['700'] }}
          // type="submit"
          endIcon={<ArrowForwardIcon />}
          onClick={onNextStep}>
          {t('Tiếp tục')}
        </StyledButton>
      </Stack>
    </>
  );
};
