import { Box, Grid } from '@mui/material';
import loginImg from '../images/login.png';
import styled from '@emotion/styled';

const Login = (): any => {
  const Button = styled.button`
    color: red;
  `;
  return (
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <Box
            component="img"
            sx={{
              height: '100%',
              width: '100%'
            }}
            alt=""
            src={loginImg}
          />
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </Box>
  );
};
export default Login;
