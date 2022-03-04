import { useState, useEffect } from 'react';
import {
  Box,
  Checkbox,
  Divider,
  Stack,
  Typography,
  colors
} from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Trans, useTranslation } from 'react-i18next';

import { StyledButton } from '../../components';

interface Props {
  onPrevStep: () => void;
}
export const StepFour = (props: Props) => {
  const { t } = useTranslation();
  const { onPrevStep } = props;
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
          sx={{ color: colors.indigo['700'] }}
          onClick={onPrevStep}
          startIcon={<ArrowBackIcon />}>
          {t('Quay lại')}
        </StyledButton>
        <StyledButton
          variant="contained"
          sx={{ backgroundColor: colors.indigo['700'] }}
          // type="submit"
          endIcon={<FileDownloadOutlinedIcon />}>
          {t('Xuất thông tin')}
        </StyledButton>
      </Stack>
    </>
  );
};
