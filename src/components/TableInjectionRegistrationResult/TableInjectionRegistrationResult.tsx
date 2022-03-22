import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { colors, IconButton, Chip } from '@mui/material';
import { Trans } from 'react-i18next';
import {
  IInjectionRegistrationResult,
  Status
} from '../../pages/InjectionRegistration/types';

interface Props {
  data: IInjectionRegistrationResult[];
  handleShowInfo: (row: IInjectionRegistrationResult) => void;
}
export const TableInjectionRegistrationResult = (props: Props) => {
  const { data, handleShowInfo } = props;
  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: '850px', boxShadow: 'none', mb: 3 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow
            sx={{
              background: colors.grey['100']
            }}>
            <TableCell align="center">
              <Trans>STT</Trans>
            </TableCell>
            <TableCell align="center">
              <Trans>Họ và tên</Trans>
            </TableCell>
            <TableCell align="center">
              <Trans>Ngày sinh</Trans>
            </TableCell>
            <TableCell align="center">
              <Trans>Giới tính</Trans>
            </TableCell>
            <TableCell align="center">
              <Trans>Số điện thoại</Trans>
            </TableCell>
            <TableCell align="center">
              <Trans>Số CMND/CCCD</Trans>
            </TableCell>
            <TableCell align="center">
              <Trans>Trạng thái</Trans>
            </TableCell>
            <TableCell align="center">
              <Trans>Thao tác</Trans>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: IInjectionRegistrationResult, index: number) => (
            <TableRow
              key={index}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                background: index % 2 === 1 ? colors.grey['100'] : null
              }}>
              <TableCell align="center" component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="center">{row.full_name}</TableCell>
              <TableCell align="center">
                {`${
                  row.dob.getDate().toString().length > 1
                    ? row.dob.getDate()
                    : '0' + row.dob.getDate()
                }/${row.dob.getMonth() + 1}/${row.dob.getFullYear()}`}
              </TableCell>
              <TableCell align="center">{row.gender}</TableCell>
              <TableCell align="center">{row.phone_number}</TableCell>
              <TableCell align="center">{row.citizen_id}</TableCell>
              <TableCell align="center">
                {row.status === Status.Success ? (
                  <Chip
                    label={<Trans>Đăng ký thành công</Trans>}
                    variant="outlined"
                    sx={{
                      border: `1px solid ${colors.blue['500']}`,
                      color: colors.blue['500']
                    }}
                  />
                ) : (
                  <Chip
                    label={<Trans>Đăng ký thất bại</Trans>}
                    variant="outlined"
                    sx={{
                      border: `1px solid ${colors.red['500']}`,
                      color: colors.red['500']
                    }}
                  />
                )}
              </TableCell>
              <TableCell align="center">
                <IconButton onClick={() => handleShowInfo(row)}>
                  <InfoOutlinedIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
