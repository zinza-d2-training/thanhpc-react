import { ContentDialog } from './ContentDialog';
import { Dialog, Divider } from '@mui/material';
import { HeaderDialog } from '../HeaderDialog/HeaderDialog';
import { ProvinceType } from '../../pages/User/types';

interface Props {
  onClose: () => void;
  onConfirm: () => void;
  open: boolean;
  data: ProvinceType[];
}

export const UpdateDistributionDialog = (props: Props) => {
  const { onClose, open, onConfirm, data } = props;
  return (
    <Dialog open={open} hideBackdrop>
      <HeaderDialog onClose={onClose} title="Cập Nhật Phân Bổ" />
      <Divider />
      <ContentDialog onClose={onClose} onConfirm={onConfirm} data={data} />
    </Dialog>
  );
};
