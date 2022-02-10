import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
  colors
} from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import loginImg from '../images/login.png';
import { schema } from '../validations/yups/userSchema';
import { useAppDispatch, useAppSelector } from '../../src/store/hooks';
import { loginSelector, loginAsync } from '../../src/features/login/loginSlice';
import { User } from '../../src/models/User';

const Login = () => {
  const {
    formState: { errors },
    control,
    handleSubmit
  } = useForm<User>({
    resolver: yupResolver(schema)
  });
  const dispatch = useAppDispatch();
  const login_selector = useAppSelector(loginSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (login_selector.response?.token) {
      navigate('/user');
    }
  }, [navigate, login_selector]);

  const formSubmitHandler: SubmitHandler<User> = (data: User) => {
    dispatch(loginAsync(data));
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
                    sx={{
                      color: colors.red['600'],
                      mt: 0.3,
                      display: 'block'
                    }}>
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
                  defaultValue="password123"
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      type="password"
                      placeholder="password123"
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
                {login_selector.response?.statusCode === 401 ? (
                  <Typography
                    component="label"
                    variant="body2"
                    sx={{
                      color: colors.red['600'],
                      mt: 0.3,
                      display: 'block'
                    }}>
                    {login_selector.response?.message}
                  </Typography>
                ) : null}
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
                      background: colors.green['600']
                    }
                  }}
                  disabled={Boolean(
                    !!errors.citizenId?.message ||
                      !!errors.password?.message ||
                      login_selector.loading
                  )}
                  type="submit"
                  startIcon={
                    login_selector.loading && <CircularProgress size={20} />
                  }>
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
                      background: colors.green['100']
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
