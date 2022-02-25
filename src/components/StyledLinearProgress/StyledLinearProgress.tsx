import { Box, Stack, Typography } from '@mui/material';

export const StyledLinearProgress = (props: {
  number: number;
  color: string;
}) => {
  const { number, color } = props;
  return (
    <Box component={Stack} direction="column" alignItems="start">
      <Typography variant="bodySmall">{number}%</Typography>
      <Box
        sx={{
          height: '14px',
          background: '#E9ECEF',
          width: '128px',
          borderRadius: '15px',
          overflow: 'hidden'
        }}>
        <Box
          sx={{
            background: color,
            height: '100%',
            width: number < 100 ? `${number}%` : '100%',
            borderRadius: '15px'
          }}></Box>
      </Box>
    </Box>
  );
};
