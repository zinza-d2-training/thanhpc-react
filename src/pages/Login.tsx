import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  colors
} from '@mui/material';
import loginImg from '../images/login.png';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../validations/yups/userInfoSchema';
import { Link } from 'react-router-dom';

interface UserInfo {
  citizenId: string;
  password: string;
}

const Login = () => {
  const {
    formState: { errors },
    control,
    handleSubmit
  } = useForm<UserInfo>({
    resolver: yupResolver(schema)
  });
  const formSubmitHandler: SubmitHandler<UserInfo> = (data: UserInfo) => {
    console.log('data: ', data);
  };

  return (
    <Grid container>
      <Grid item xs={6}>
        <Box
          component="img"
          sx={{
            height: '100vh',
            width: '100%',
            objectFit: 'cover',
            verticalAlign: 'middle'
          }}
          alt=""
          src={loginImg}
        />
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
            onSubmit={handleSubmit(formSubmitHandler)}
            sx={{
              width: '376px'
            }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
              Đăng nhập vào tài khoản
            </Typography>
            <Box>
              <Box sx={{ mb: 2 }}>
                <Typography component="label" variant="body1">
                  Chứng minh nhân dân/Căn cước công dân
                </Typography>
                <Controller
                  name="citizenId"
                  control={control}
                  defaultValue="123456789"
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      placeholder="123456789"
                      {...field}
                      sx={{ root: { height: '50px' } }}
                    />
                  )}
                />
                {errors.citizenId?.message && (
                  <Typography
                    component="label"
                    variant="body2"
                    sx={{ color: colors.red['600'] }}>
                    {errors.citizenId.message}
                  </Typography>
                )}
              </Box>
              <Box>
                <Typography component="label" variant="body1">
                  Mật khẩu
                </Typography>
                <Controller
                  name="password"
                  control={control}
                  defaultValue="thanhhienlanh"
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      placeholder="thanhhienlanh"
                      {...field}
                      sx={{ root: { height: '50px' } }}
                    />
                  )}
                />
                {errors.password?.message && (
                  <Typography
                    component="label"
                    variant="body2"
                    sx={{ color: colors.red['600'] }}>
                    {errors.password.message}
                  </Typography>
                )}
              </Box>
              <Box my={3}>
                <Typography
                  mb={3}
                  align="right"
                  sx={{ cursor: 'pointer', color: colors.indigo['600'] }}>
                  <Link to="/forgot-password">Quên mật khẩu?</Link>
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
                  }}
                  type="submit">
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
                  }}
                  type="submit">
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
