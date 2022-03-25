import { Dialog, Divider } from '@mui/material';
import { ContentDialog } from './ContentDialog';
import { HeaderDialog } from '../HeaderDialog/HeaderDialog';

interface IFile {
  file?: File | undefined;
  preview: string;
}

interface Props {
  onClose: () => void;
  open: boolean;
  image: IFile | undefined;
}

export const ImageDialog = (props: Props) => {
  const { onClose, open, image } = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <HeaderDialog title={image ? image.file?.name : null} onClose={onClose} />
      <Divider />
      <ContentDialog onClose={onClose} image={image} />
    </Dialog>
  );
};
