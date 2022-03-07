import { useState } from 'react';
import { Typography, colors, Checkbox, Stack, TextField } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Trans, useTranslation } from 'react-i18next';

import { StyledButton } from '../../components';
import { IMedicalHistory, Answer } from './types';
interface Props {
  onNextStep: () => void;
  onPrevStep: () => void;
  receiveData: (data: IMedicalHistory[]) => void;
  data: IMedicalHistory[];
}
export const StepTwo = (props: Props) => {
  const { t } = useTranslation();
  const { onNextStep, onPrevStep, receiveData, data } = props;
  const [medicalHistory, setMedicalHistory] = useState<IMedicalHistory[]>(data);
  const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMedicalHistory((prev: IMedicalHistory[]) => {
      let nextState = prev.map((value) => {
        if (value.question === event.target.name) {
          return {
            ...value,
            answer: event.target.value as Answer
          };
        }
        return value;
      });

      return nextState;
    });
  };
  const handleChangeDiseaseSymptoms = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMedicalHistory((prev: IMedicalHistory[]) => {
      let nextState = [...prev];
      nextState.forEach((value) => {
        if (value.question === event.target.name) {
          value.diseaseSymptoms = event.target.value;
        }
      });
      return nextState;
    });
  };
  const onNextStepTwo = () => {
    receiveData(medicalHistory);
    onNextStep();
  };
  return (
    <>
      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography variant="body1" fontWeight="bold">
                  <Trans>Tiền sử</Trans>
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1" fontWeight="bold">
                  <Trans>Triệu chứng</Trans>
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1" fontWeight="bold">
                  <Trans>Có</Trans>
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1" fontWeight="bold">
                  <Trans>Không</Trans>
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1" fontWeight="bold">
                  <Trans>Không rõ</Trans>
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicalHistory.map((row: IMedicalHistory) => (
              <TableRow
                key={row.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  height: '63px',
                  background: colors.grey['100']
                }}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ maxWidth: '600px' }}>
                  {`${row.id}. ${t(row.question)}`}
                </TableCell>
                <TableCell align="center" sx={{ maxWidth: '450px', py: 1 }}>
                  {row.diseaseSymptoms !== undefined && (
                    <TextField
                      placeholder={t('Nếu có, ghi rõ loại tác nhân dị ứng')}
                      size="small"
                      sx={{
                        width: '372px',
                        'input::placeholder': { textAlign: 'center' }
                      }}
                      name={row.question}
                      value={row.diseaseSymptoms}
                      onChange={handleChangeDiseaseSymptoms}
                    />
                  )}
                </TableCell>
                <TableCell sx={{ py: 1 }} align="center">
                  <Checkbox
                    name={row.question}
                    value={Answer.YES}
                    checked={row.answer === Answer.YES}
                    onChange={handleChangeAnswer}
                  />
                </TableCell>
                <TableCell sx={{ py: 1 }} align="center">
                  <Checkbox
                    name={row.question}
                    value={Answer.NO}
                    checked={row.answer === Answer.NO}
                    onChange={handleChangeAnswer}
                  />
                </TableCell>
                <TableCell sx={{ py: 1 }} align="center">
                  <Checkbox
                    name={row.question}
                    value={Answer.NOT_SURE}
                    checked={row.answer === Answer.NOT_SURE}
                    onChange={(e) => handleChangeAnswer(e)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
          endIcon={<ArrowForwardIcon />}
          onClick={onNextStepTwo}>
          {t('Tiếp tục')}
        </StyledButton>
      </Stack>
    </>
  );
};
