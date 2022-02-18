import { Dialog, Divider } from '@mui/material';
import { HeaderDialog } from './HeaderDialog';
import { ContentDialog } from './ContentDialog';

interface Props {
  onClose: () => void;
  open: boolean;
  image: any;
}

export const ImageDialog = (props: Props) => {
  const { onClose, open, image } = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <HeaderDialog title={image ? image.file.name : null} onClose={onClose} />
      <Divider />
      <ContentDialog onClose={onClose} image={image} />
    </Dialog>
  );
};
