import { ContentDialog } from './ContentDialog';
import { Dialog, Divider } from '@mui/material';
import { HeaderDialog } from '../HeaderDialog/HeaderDialog';
import { VaccinationSite } from '../../pages/Admin/types';

interface Props {
  onClose: () => void;
  open: boolean;
  handleRefetch: () => void;
  data: VaccinationSite[];
  vaccinationSiteId: number;
}
export const VaccinationSiteUpdateDialog = (props: Props) => {
  const { onClose, open, handleRefetch, data, vaccinationSiteId } = props;
  return (
    <Dialog open={open} hideBackdrop>
      <HeaderDialog onClose={onClose} title="Cập nhật điểm tiêm" />
      <Divider />
      <ContentDialog
        onClose={onClose}
        data={data}
        handleRefetch={handleRefetch}
        vaccinationSiteId={vaccinationSiteId}
      />
    </Dialog>
  );
};
