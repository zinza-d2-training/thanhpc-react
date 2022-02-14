import { Button, ButtonProps } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const CustomButton = (props: ButtonProps) => {
  const useStyles = makeStyles({
    root: {
      borderRadius: '8px 8px 8px 0',
      padding: '6px 32px'
    }
  });
  const classes = useStyles();
  return (
    <Button {...props} className={classes.root}>
      {props.children}
    </Button>
  );
};
