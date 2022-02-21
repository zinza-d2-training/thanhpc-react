import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

interface Props {
  onClose: () => void;
  title: string;
}
export const HeaderDialog = (props: Props) => {
  const { onClose, title, ...other } = props;

  return (
    <DialogTitle
      sx={{
        pl: 3,
        py: 2,
        display: 'flex',
        justifyContent: 'space-between',
        width: '80%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}
      {...other}>
      {title}
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
