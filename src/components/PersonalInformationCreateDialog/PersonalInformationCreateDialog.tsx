import { ContentDialog } from './ContentDialog';
import { Dialog, Divider } from '@mui/material';
import { HeaderDialog } from '../HeaderDialog/HeaderDialog';

interface Props {
  onClose: () => void;
  open: boolean;
  handleRefetch: () => void;
}
export const PersonalInformationCreateDialog = (props: Props) => {
  const { onClose, open, handleRefetch } = props;
  return (
    <Dialog open={open} hideBackdrop>
      <HeaderDialog onClose={onClose} title="Thêm điểm tiêm" />
      <Divider />
      <ContentDialog onClose={onClose} handleRefetch={handleRefetch} />
    </Dialog>
  );
};
