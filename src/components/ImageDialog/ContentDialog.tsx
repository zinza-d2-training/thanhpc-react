import DialogContent from '@mui/material/DialogContent';
import { Box } from '@mui/material';

interface Props {
  onClose: () => void;
  image: any;
}

export const ContentDialog = (props: Props) => {
  const { image } = props;
  return (
    <DialogContent>
      <Box>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
          component="img"
          alt={image ? image.file.name : null}
          src={image.preview}
        />
      </Box>
    </DialogContent>
  );
};
