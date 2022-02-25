import { Typography, TypographyProps, Box, colors } from '@mui/material';

interface LabelProps extends TypographyProps {
  required: boolean;
}
export const Label = (props: LabelProps) => {
  const { required, children } = props;
  return (
    <>
      <Typography component="label" variant="body1">
        {children}{' '}
        {required && (
          <Box component="span" sx={{ color: colors.red['700'] }}>
            (*)
          </Box>
        )}
      </Typography>
    </>
  );
};
