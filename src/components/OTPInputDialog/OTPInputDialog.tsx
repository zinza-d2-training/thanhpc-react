import { ContentDialog } from './ContentDialog';
import { Dialog, Divider } from '@mui/material';
import { HeaderDialog } from '../HeaderDialog/HeaderDialog';

interface Props {
  onClose: () => void;
  onConfirm: () => void;
  open: boolean;
}

export const OTPInputDialog = (props: Props) => {
  const { onClose, open, onConfirm } = props;
  return (
    <Dialog open={open} hideBackdrop>
      <HeaderDialog onClose={onClose} title="Xác thực OTP" />
      <Divider />
      <ContentDialog onClose={onClose} onConfirm={onConfirm} />
    </Dialog>
  );
};
