import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import { useState } from 'react';
import { useDeleteVaccinationSite } from '../../hooks/useVaccinationSite';
interface Props {
  open: boolean;
  onClose: () => void;
  vaccinationSiteId: number;
  handleRefetch: () => void;
}

export const VaccinationSiteDeleteDialog = (props: Props) => {
  const { open, onClose, vaccinationSiteId, handleRefetch } = props;
  const [error, setError] = useState<boolean>(false);
  const { deleteVaccinationSite } = useDeleteVaccinationSite();
  const onConfirm = async () => {
    try {
      const response = await deleteVaccinationSite(vaccinationSiteId);
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
