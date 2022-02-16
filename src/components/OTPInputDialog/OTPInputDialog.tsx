import { HeaderDialog } from './HeaderDialog';
import { ContentDialog } from './ContentDialog';

import { Dialog, Divider } from '@mui/material';

interface Props {
  onClose: () => void;
  open: boolean;
}

export const OTPInputDialog = (props: Props) => {
  const { onClose, open } = props;
  return (
    <Dialog open={open} hideBackdrop>
      <HeaderDialog onClose={onClose} />
      <Divider />
      <ContentDialog onClose={onClose} />
    </Dialog>
  );
};
