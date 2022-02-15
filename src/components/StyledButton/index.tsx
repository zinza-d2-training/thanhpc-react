import { Button, ButtonProps } from '@mui/material';

export const StyledButton = (props: ButtonProps) => {
  const useStyle = {
    borderRadius: '8px 8px 8px 0',
    padding: '6px 32px'
  };
  console.log({ ...props.sx, useStyle });
  return <Button {...props} sx={{ ...props.sx, ...useStyle }} />;
};
