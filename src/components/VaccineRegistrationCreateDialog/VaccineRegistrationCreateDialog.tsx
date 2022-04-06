import { ContentDialog } from './ContentDialog';
import { Dialog, Divider } from '@mui/material';
import { HeaderDialog } from '../HeaderDialog/HeaderDialog';

interface Props {
  onClose: () => void;
  open: boolean;
  handleRefetch: () => void;
}
export const VaccineRegistrationCreateDialog = (props: Props) => {
  const { onClose, open, handleRefetch } = props;
  return (
    <Dialog open={open} hideBackdrop>
      <HeaderDialog onClose={onClose} title="Thêm bản đăng ký" />
      <Divider />
      <ContentDialog onClose={onClose} handleRefetch={handleRefetch} />
    </Dialog>
  );
};
