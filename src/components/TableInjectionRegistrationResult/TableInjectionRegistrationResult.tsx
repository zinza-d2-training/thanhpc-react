import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { colors, IconButton, Chip } from '@mui/material';
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
            <TableCell align="center">STT</TableCell>
            <TableCell align="center">Họ và tên</TableCell>
            <TableCell align="center">Ngày sinh </TableCell>
            <TableCell align="center">Giới tính</TableCell>
            <TableCell align="center">Số điện thoại</TableCell>
            <TableCell align="center">Số CMND/CCCD</TableCell>
            <TableCell align="center">Trạng thái</TableCell>
            <TableCell align="center">Thao tác</TableCell>
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
              <TableCell align="center">{row.citizenId}</TableCell>
              <TableCell align="center">
                {row.status === Status.Success ? (
                  <Chip
                    label="Đăng ký thành công"
                    variant="outlined"
                    sx={{
                      border: `1px solid ${colors.blue['500']}`,
                      color: colors.blue['500']
                    }}
                  />
                ) : (
                  <Chip
                    label="Đăng ký thất bại"
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
