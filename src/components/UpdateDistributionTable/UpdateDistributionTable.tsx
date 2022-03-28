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
  dataHead: unknown[];
  dataBody: ProvinceType[];
}
export const UpdateDistributionTable = (props: Props) => {
  const { dataHead, dataBody } = props;
  const handleCloseModal = () => setOpen(false);
  const [open, setOpen] = useState<boolean>(false);
  const handleConfirmModal = () => {
    console.log('ok');
  };
  const handleOpenModal = (id: number) => {
    setOpen(true);
  };
  return (
    <>
      <UpdateDistributionDialog
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
        open={open}
        data={dataBody}
      />
      <TableContainer
        component={Paper}
        sx={{ maxHeight: '850px', boxShadow: 'none' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {dataHead.map((value: any, index: number) => (
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
                <TableCell>{row.number_of_injected}</TableCell>
                <TableCell>
                  <StyledLinearProgress
                    color="#C65312"
                    number={row.vaccination_rate}
                  />
                </TableCell>
                <TableCell>
                  <StyledLinearProgress
                    color="#0593CF"
                    number={row.vaccine_distribution_rate}
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
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
