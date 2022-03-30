import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { colors, IconButton, Box } from '@mui/material';
import { Trans } from 'react-i18next';
import { VaccinationSite } from '../../pages/Admin/types';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { VaccinationSiteUpdateDialog } from '../VaccinationSiteUpdateDialog/VaccinationSiteUpdateDialog';
import { VaccinationSiteDeleteDialog } from '../VaccinationSiteDeleteDialog/VaccinationSiteDeleteDialog';

interface Props {
  dataBody: VaccinationSite[];
  handleRefetch: () => Promise<void>;
}
const tableHead = [
  'STT',
  'Tên điểm tiêm',
  'Số nhà, tên đường',
  'Xã/Phường',
  'Quận/Huyện',
  'Tỉnh/Thành Phố',
  'Người đứng đầu cơ sở tiêm chủng',
  'Số bàn tiêm',
  'Thao tác'
];
export const VaccinationSiteTable = (props: Props) => {
  const { dataBody, handleRefetch } = props;
  const [vaccinationSiteId, setVaccinationSiteId] = useState<number>(0);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);
  const handleOpenUpdateModal = (id: number) => {
    setVaccinationSiteId(id);
    setOpenUpdateModal(true);
  };

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const handleOpenDeleteModal = (id: number) => {
    setVaccinationSiteId(id);
    setOpenDeleteModal(true);
  };

  return (
    <>
      <VaccinationSiteDeleteDialog
        onClose={handleCloseDeleteModal}
        open={openDeleteModal}
        vaccinationSiteId={vaccinationSiteId}
        handleRefetch={handleRefetch}
      />
      <VaccinationSiteUpdateDialog
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        handleRefetch={handleRefetch}
        data={dataBody}
        vaccinationSiteId={vaccinationSiteId}
      />
      <TableContainer
        component={Paper}
        sx={{ maxHeight: '850px', boxShadow: 'none' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHead.map((value: any, index: number) => (
                <TableCell key={index}>
                  <Trans>{value}</Trans>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataBody?.map((row: VaccinationSite, index: number) => (
              <TableRow
                key={index}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  background: index % 2 === 0 ? colors.grey['100'] : null
                }}>
                <TableCell component="th" scope="row">
                  {index}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.street_name}</TableCell>
                <TableCell>{row.ward.district.province.name}</TableCell>
                <TableCell>{row.ward.district.name}</TableCell>
                <TableCell>{row.ward.name}</TableCell>
                <TableCell>{row.site_manager}</TableCell>
                <TableCell>{row.number_of_vaccination_table}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex' }}>
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
