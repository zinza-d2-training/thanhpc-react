import {
  IconButton,
  Dialog,
  Divider,
  Box,
  Stack,
  Typography,
  colors
} from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import {
  IInjectionRegistrationResult,
  Process
} from '../../pages/InjectionRegistration/types';
import { StyledButton } from '../StyledButton';
interface Props {
  open: boolean;
  onClose: () => void;
  data: IInjectionRegistrationResult | undefined;
}
const getProcessStatus = (listStatus: any) => {
  const listStatusResult = [];
  for (let i in listStatus) {
    listStatusResult.push(listStatus[i]);
  }
  return listStatusResult;
};

export const InjectionRegistrationDialog = (props: Props) => {
  const { open, onClose, data } = props;
  console.log('data?.dob', data?.dob.getDate()?.toString());
  const steps = getProcessStatus(Process);
  const activeStep = steps.findIndex((step) => step === data?.process);
  return (
    <Dialog
      open={open}
      sx={{
        boxShadow:
          '0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)',
        borderRadius: 1
      }}>
      <DialogTitle
        sx={{
          pl: 3,
          py: 2,
          display: 'flex',
          justifyContent: 'space-between'
        }}>
        Theo dõi lịch sử đăng ký tiêm
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Stack direction="column" spacing={2}>
          <Typography variant="h6">Thông tin cá nhân</Typography>
          <Stack direction="row" spacing={3}>
            <Stack spacing={1}>
              <Typography>Họ và tên</Typography>
              <Typography sx={{ fontWeight: '500' }}>
                {data?.full_name}
              </Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography>Ngày sinh</Typography>
              <Typography sx={{ fontWeight: '500' }}>
                {data?.dob.toLocaleDateString()}
              </Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography>Số điện thoại</Typography>
              <Typography sx={{ fontWeight: '500' }}>
                {data?.phone_number}
              </Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography>Số CMND/CCCD</Typography>
              <Typography sx={{ fontWeight: '500' }}>
                {data?.citizenId}
              </Typography>
            </Stack>
          </Stack>
          <Typography variant="h6">Quá trình xử lý</Typography>
          <Stepper activeStep={activeStep + 1} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <StyledButton
              variant="contained"
              sx={{ backgroundColor: colors.indigo['700'] }}
              onClick={onClose}
              type="button">
              Xác Nhận
            </StyledButton>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
