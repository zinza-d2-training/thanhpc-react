import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { colors } from '@mui/material';
import { Trans } from 'react-i18next';
import CreateIcon from '@mui/icons-material/Create';
import IconButton from '@mui/material/IconButton';
import { UpdateDistributionDialog } from '../../components/UpdateDistributionDialog/UpdateDistributionDialog';
import { StyledLinearProgress } from '../StyledLinearProgress/StyledLinearProgress';
import { useState } from 'react';
import { ProvinceType } from '../../pages/User/types';

interface Props {
  dataBody: ProvinceType[];
  handleRefetch: () => void;
}
const tableHead = [
  'STT',
  'Tỉnh/Thành phố',
  'Dự kiến KH phân bổ',
  'Phân bổ thực tế',
  'Dân số >= 18 tuổi',
  'Số liều đã tiêm',
  'Tỷ lệ tiêm chủng/ Vắc xin phân bổ thực tế',
  'Tỷ lệ phân bổ vắc xin/Tổng số phân bổ cả nước',
  'Thao tác'
];
export const UpdateDistributionTable = (props: Props) => {
  const { dataBody, handleRefetch } = props;
  const handleCloseModal = () => setOpen(false);
  const [open, setOpen] = useState<boolean>(false);
  const [provinceId, setProvinceId] = useState<number>(0);
  const handleOpenModal = (id: number) => {
    setOpen(true);
    setProvinceId(id);
  };
  return (
    <>
      <UpdateDistributionDialog
        onClose={handleCloseModal}
        open={open}
        data={dataBody}
        provinceId={provinceId}
        handleRefetch={handleRefetch}
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
            {dataBody.map((row: any, index: number) => (
              <TableRow
                key={index}
                sx={{
                  background: index % 2 === 0 ? colors.grey['100'] : null
                }}>
                <TableCell component="th" scope="row">
                  {index}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.distribution_plan}</TableCell>
                <TableCell>{row.actual_distribution}</TableCell>
                <TableCell>{row.adult_population}</TableCell>
                <TableCell>{row.injected_number}</TableCell>
                <TableCell>
                  <StyledLinearProgress
                    color="#C65312"
                    number={Math.round(
                      (row.injected_number * 100) / row.actual_distribution
                    )}
                  />
                </TableCell>
                <TableCell>
                  <StyledLinearProgress
                    color="#0593CF"
                    number={Math.round(
                      (row.actual_distribution * 100) / row.distribution_plan
                    )}
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenModal(row.id)}
                    component="span">
                    <CreateIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
