import DialogContent from '@mui/material/DialogContent';
import { Box } from '@mui/material';

interface IFile {
  file?: File | undefined;
  preview: string;
}
interface Props {
  onClose: () => void;
  image: IFile | undefined;
}

export const ContentDialog = (props: Props) => {
  const { image } = props;
  return (
    <DialogContent>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'contain'
        }}
        component="img"
        alt={image ? image?.file?.name : null || undefined}
        src={image?.preview}
      />
    </DialogContent>
  );
};
