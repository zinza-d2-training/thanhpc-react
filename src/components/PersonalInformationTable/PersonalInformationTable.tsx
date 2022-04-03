import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { colors, IconButton, Box } from '@mui/material';
import { Trans } from 'react-i18next';
import { PersonalInformation } from '../../pages/Admin/types';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { PersonalInformationUpdateDialog } from '../PersonalInformationUpdateDialog/PersonalInformationUpdateDialog';
import { PersonalInformationDeleteDialog } from '../PersonalInformationDeleteDialog/PersonalInformationDeleteDialog';

interface Props {
  dataBody: PersonalInformation[];
  handleRefetch: () => Promise<void>;
}
const tableHead = [
  'STT',
  'Mũi tiêm',
  'Họ tên',
  'Ngày sinh',
  'Giới tính',
  'Số điện thoại',
  'Email',
  'Số cmnd/căn cước công dân',
  'Số thẻ bhyt',
  'Công việc hiện tại',
  'Nơi làm việc',
  'Địa chỉ',
  'Dân tộc',
  'Quốc tịch',
  'Ngày tiêm dự kiến',
  'Buổi tiêm mong muốn',
  'Nhóm ưu tiên',
  'Xã/Phường',
  'Quận/Huyện',
  'Tỉnh/Thành Phố',
  'Thao tác'
];
export const PersonalInformationTable = (props: Props) => {
  const { dataBody, handleRefetch } = props;
  const [personalInformationId, setPersonalInformationId] = useState<number>(0);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);
  const handleOpenUpdateModal = (id: number) => {
    setPersonalInformationId(id);
    setOpenUpdateModal(true);
  };

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const handleOpenDeleteModal = (id: number) => {
    setPersonalInformationId(id);
    setOpenDeleteModal(true);
  };

  return (
    <>
      <PersonalInformationDeleteDialog
        onClose={handleCloseDeleteModal}
        open={openDeleteModal}
        personalInformationId={personalInformationId}
        handleRefetch={handleRefetch}
      />
      <PersonalInformationUpdateDialog
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        handleRefetch={handleRefetch}
        data={dataBody}
        personalInformationId={personalInformationId}
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
            {dataBody?.map((row: PersonalInformation, index: number) => (
              <TableRow
                key={index}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  background: index % 2 === 0 ? colors.grey['100'] : null
                }}>
                <TableCell component="th" scope="row" align="center">
                  {index}
                </TableCell>
                <TableCell align="center">{row.injection.name}</TableCell>
                <TableCell align="center">{row.full_name}</TableCell>
                <TableCell align="center">{row.dob}</TableCell>
                <TableCell align="center">{row.gender}</TableCell>
                <TableCell align="center">{row.phone_number}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.citizen_id}</TableCell>
                <TableCell align="center">
                  {row.health_insurance_number}
                </TableCell>
                <TableCell align="center">{row.occupation}</TableCell>
                <TableCell align="center">{row.workplace}</TableCell>
                <TableCell align="center">{row.address}</TableCell>
                <TableCell align="center">{row.ethnic}</TableCell>
                <TableCell align="center">{row.nationality}</TableCell>
                <TableCell align="center">{row.expected_date}</TableCell>
                <TableCell align="center">
                  {row.session_id === 1 ? 'Buổi sáng' : 'Buổi chiều'}
                </TableCell>
                <TableCell align="center">{row.priorityGroup.name}</TableCell>
                <TableCell align="center">
                  {row.ward.district.province.name}
                </TableCell>
                <TableCell align="center">{row.ward.district.name}</TableCell>
                <TableCell align="center">{row.ward.name}</TableCell>
                <TableCell align="center">
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
