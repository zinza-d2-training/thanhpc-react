import { ContentDialog } from './ContentDialog';
import { Dialog, Divider } from '@mui/material';
import { HeaderDialog } from '../HeaderDialog/HeaderDialog';
import { PersonalInformation } from '../../pages/Admin/types';

interface Props {
  onClose: () => void;
  open: boolean;
  handleRefetch: () => void;
  data: PersonalInformation[];
  personalInformationId: number;
}
export const PersonalInformationUpdateDialog = (props: Props) => {
  const { onClose, open, handleRefetch, data, personalInformationId } = props;
  return (
    <Dialog open={open} hideBackdrop>
      <HeaderDialog onClose={onClose} title="Cập nhật thông tin cá nhân" />
      <Divider />
      <ContentDialog
        onClose={onClose}
        data={data}
        handleRefetch={handleRefetch}
        personalInformationId={personalInformationId}
      />
    </Dialog>
  );
};
