import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  colors
} from '@mui/material';
import loginImg from '../images/login.png';

const Login = (): any => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={6}>
        <Box sx={{ fontSize: '0' }}>
          <Box
            component="img"
            sx={{
              height: '100vh',
              width: '100%',
              objectFit: 'cover'
            }}
            alt=""
            src={loginImg}
          />
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Box
            component="form"
            sx={{
              width: '376px'
            }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 'bold', mb: 3 }}
              component="div">
              Đăng nhập vào tài khoản
            </Typography>
            <Box>
              <Box sx={{ mb: 2 }}>
                <Typography component="label" variant="body1">
                  Chứng minh nhân dân/Căn cước công dân
                </Typography>
                <TextField
                  sx={{ root: { height: '50px' } }}
                  fullWidth
                  placeholder="123456789"
                />
              </Box>
              <Box>
                <Typography component="label" variant="body1">
                  Mật khẩu
                </Typography>
                <TextField sx={{ root: { height: '50px' } }} fullWidth />
              </Box>
              <Box my={3}>
                <Typography
                  mb={3}
                  align="right"
                  sx={{ cursor: 'pointer', color: colors.indigo['600'] }}>
                  Quên mật khẩu?
                </Typography>
                <Button
                  fullWidth
                  sx={{
                    background: colors.green['400'],
                    color: '#fff',
                    height: '50px',
                    '&:hover': {
                      background: colors.green['400']
                    }
                  }}>
                  Đăng nhập
                </Button>
              </Box>
              <Box>
                <Typography my={3}>
                  Hoặc đăng ký tài khoản, nếu bạn chưa đăng ký !
                </Typography>
                <Button
                  fullWidth
                  sx={{
                    color: colors.green['400'],
                    height: '50px',
                    '&:hover': {
                      background: '#fff'
                    },
                    borderColor: colors.green['400'],
                    border: 1
                  }}>
                  Đăng ký
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
export default Login;
