import { Typography } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

interface Props {
  onClose: () => void;
}
export const HeaderDialog = (props: Props) => {
  const { onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        pl: 3,
        py: 2,
        display: 'flex',
        justifyContent: 'space-between'
      }}
      {...other}>
      <Typography variant="h6">Xác thực OTP</Typography>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500]
        }}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
};
