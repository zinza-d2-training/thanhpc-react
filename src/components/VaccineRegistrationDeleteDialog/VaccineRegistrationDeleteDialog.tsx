import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import { useState } from 'react';
import { useDeleteVaccineRegistration } from '../../hooks/useVaccineRegistration';
interface Props {
  open: boolean;
  onClose: () => void;
  vaccineRegistrationId: number;
  handleRefetch: () => void;
}

export const VaccineRegistrationDeleteDialog = (props: Props) => {
  const { open, onClose, vaccineRegistrationId, handleRefetch } = props;
  const [error, setError] = useState<boolean>(false);
  const { deleteVaccineRegistration } = useDeleteVaccineRegistration();
  const onConfirm = async () => {
    try {
      const response = await deleteVaccineRegistration(vaccineRegistrationId);
      if (response.request.status === 200) {
        handleRefetch();
        onClose();
      }
    } catch (err) {
      setError(true);
    }
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Bạn chắc chắn?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {error
              ? 'Có lỗi xảy ra!'
              : 'Dữ liệu tiem chủng đã xóa không thể khôi phục. Bạn chắc chắn?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy bỏ</Button>
          <Button onClick={onConfirm} autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
