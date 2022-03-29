import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Trans } from 'react-i18next';

interface Props {
  onClose: () => void;
  title: string | null | undefined;
}
export const HeaderDialog = (props: Props) => {
  const { onClose, title, ...other } = props;

  return (
    <DialogTitle
      sx={{
        pl: 3,
        py: 2,
        display: 'flex',
        justifyContent: 'space-between'
      }}
      {...other}>
      <Trans>{title}</Trans>
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
