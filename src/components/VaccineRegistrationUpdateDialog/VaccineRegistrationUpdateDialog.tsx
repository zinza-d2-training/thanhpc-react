import { ContentDialog } from './ContentDialog';
import { Dialog, Divider } from '@mui/material';
import { HeaderDialog } from '../HeaderDialog/HeaderDialog';
import { VaccineRegistration } from '../../pages/Admin/types';

interface Props {
  onClose: () => void;
  open: boolean;
  handleRefetch: () => void;
  data: VaccineRegistration[];
  vaccineRegistrationId: number;
}
export const VaccineRegistrationUpdateDialog = (props: Props) => {
  const { onClose, open, handleRefetch, data, vaccineRegistrationId } = props;
  return (
    <Dialog open={open} hideBackdrop>
      <HeaderDialog onClose={onClose} title="Cập nhật điểm tiêm" />
      <Divider />
      <ContentDialog
        onClose={onClose}
        data={data}
        handleRefetch={handleRefetch}
        vaccineRegistrationId={vaccineRegistrationId}
      />
    </Dialog>
  );
};
