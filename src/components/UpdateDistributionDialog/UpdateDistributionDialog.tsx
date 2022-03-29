import { ContentDialog } from './ContentDialog';
import { Dialog, Divider } from '@mui/material';
import { HeaderDialog } from '../HeaderDialog/HeaderDialog';
import { ProvinceType } from '../../pages/User/types';

interface Props {
  onClose: () => void;
  open: boolean;
  data: ProvinceType[];
  provinceId: number;
  handleRefetch: () => void;
}

export const UpdateDistributionDialog = (props: Props) => {
  const { onClose, open, data, provinceId, handleRefetch } = props;
  return (
    <Dialog open={open} hideBackdrop>
      <HeaderDialog onClose={onClose} title="Cập Nhật Phân Bổ" />
      <Divider />
      <ContentDialog
        onClose={onClose}
        provinceId={provinceId}
        data={data}
        handleRefetch={handleRefetch}
      />
    </Dialog>
  );
};
