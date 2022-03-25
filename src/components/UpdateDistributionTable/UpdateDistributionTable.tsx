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

import { StyledLinearProgress } from '../StyledLinearProgress/StyledLinearProgress';

interface Props {
  dataHead: unknown[];
  dataBody: unknown[];
}
export const UpdateDistributionTable = (props: Props) => {
  const { dataHead, dataBody } = props;
  return (
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
              <TableCell>{row.province_name}</TableCell>
              <TableCell>{row.distributionPlan}</TableCell>
              <TableCell>{row.actualDistribution}</TableCell>
              <TableCell>{row.adultPopulation}</TableCell>
              <TableCell>{row.numberOfInjected}</TableCell>
              <TableCell>
                <StyledLinearProgress
                  color="#C65312"
                  number={row.vaccinationRate}
                />
              </TableCell>
              <TableCell>
                <StyledLinearProgress
                  color="#0593CF"
                  number={row.vaccineDistributionRate}
                />
              </TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span">
                  <CreateIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
