import { Button, ButtonProps } from '@mui/material';

export const StyledButton = (props: ButtonProps) => {
  const useStyle = {
    borderRadius: '8px 8px 8px 0',
    padding: '6px 32px'
  };
  return <Button {...props} sx={{ ...useStyle, ...props.sx }} />;
};
