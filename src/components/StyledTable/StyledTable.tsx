import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { StyledLinearProgress } from '../StyledLinearProgress/StyledLinearProgress';

interface Props {
  dataHead: unknown[];
  dataBody: unknown[];
}
export const StyledTable = (props: Props) => {
  const { dataHead, dataBody } = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {dataHead.map((value: any, index: number) => (
              <TableCell key={index}>{value}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataBody.map((row: any, index: number) => (
            <TableRow
              key={index}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 }
              }}>
              <TableCell component="th" scope="row">
                {index}
              </TableCell>
              <TableCell>{row.provinceName}</TableCell>
              <TableCell>{row.distributionPlan}</TableCell>
              <TableCell>{row.actualDistribution}</TableCell>
              <TableCell>{row.population}</TableCell>
              <TableCell>{row.numberOfInjected}</TableCell>
              <TableCell>
                <StyledLinearProgress
                  color="#C65312"
                  number={row.expectedRate}
                />
              </TableCell>
              <TableCell>
                <StyledLinearProgress
                  color="#0593CF"
                  number={row.distributedRatio}
                />
              </TableCell>
              <TableCell>
                <StyledLinearProgress
                  color="#00884F"
                  number={row.rateOfInjectionOfAtLeastOneDoseOfVaccine}
                />
              </TableCell>
              <TableCell>
                <StyledLinearProgress
                  color="#AF8612"
                  number={row.vaccinationRate}
                />
              </TableCell>
              <TableCell>
                <StyledLinearProgress
                  color="#2D2188"
                  number={row.vaccineDistributionRate}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
