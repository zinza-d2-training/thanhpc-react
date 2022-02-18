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
      <Box sx={{ position: 'relative', paddingBottom: '100%' }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
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
