import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { colors, IconButton, Box } from '@mui/material';
import { Trans } from 'react-i18next';
import { VaccineRegistration } from '../../pages/Admin/types';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { VaccineRegistrationUpdateDialog } from '../VaccineRegistrationUpdateDialog/VaccineRegistrationUpdateDialog';
import { VaccineRegistrationDeleteDialog } from '../VaccineRegistrationDeleteDialog/VaccineRegistrationDeleteDialog';

interface Props {
  dataBody: VaccineRegistration[];
  handleRefetch: () => Promise<void>;
}
const tableHead = [
  'STT',
  'Họ tên',
  'Số cmnd/căn cước công dân',
  'Số điện thoại',
  'Trạng thái đăng ký',
  'Thao tác'
];
export const VaccineRegistrationTable = (props: Props) => {
  const { dataBody, handleRefetch } = props;
  const [vaccineRegistrationId, setVaccineRegistrationId] = useState<number>(0);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);
  const handleOpenUpdateModal = (id: number) => {
    setVaccineRegistrationId(id);
    setOpenUpdateModal(true);
  };

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const handleOpenDeleteModal = (id: number) => {
    setVaccineRegistrationId(id);
    setOpenDeleteModal(true);
  };

  return (
    <>
      <VaccineRegistrationDeleteDialog
        onClose={handleCloseDeleteModal}
        open={openDeleteModal}
        vaccineRegistrationId={vaccineRegistrationId}
        handleRefetch={handleRefetch}
      />
      <VaccineRegistrationUpdateDialog
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        handleRefetch={handleRefetch}
        data={dataBody}
        vaccineRegistrationId={vaccineRegistrationId}
      />
      <TableContainer
        component={Paper}
        sx={{ maxHeight: '850px', boxShadow: 'none' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHead.map((value: any, index: number) => (
                <TableCell align="center" key={index}>
                  <Trans>{value}</Trans>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataBody?.map((row: VaccineRegistration, index: number) => (
              <TableRow
                key={index}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  background: index % 2 === 0 ? colors.grey['100'] : null
                }}>
                <TableCell align="center" component="th" scope="row">
                  {index}
                </TableCell>
                <TableCell align="center">
                  {row.personalInformation.full_name}
                </TableCell>
                <TableCell align="center">
                  {row.personalInformation.citizen_id}
                </TableCell>
                <TableCell align="center">
                  {row.personalInformation.phone_number}
                </TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenUpdateModal(row.id)}
                      component="span">
                      <CreateIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleOpenDeleteModal(row.id)}
                      component="span">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
