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
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import loginImg from '../../images/login.png';
import { loginSchema } from './schema';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginSelector, loginAsync } from '../../features/login/loginSlice';
import { User } from '../../models/User';

export const Login = () => {
  const [errMessage, setErrMessage] = useState('');
  const {
    formState: { isValid },
    control,
    handleSubmit
  } = useForm<User>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange'
  });
  const dispatch = useAppDispatch();
  const loginselectorResult = useAppSelector(loginSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (loginselectorResult.response?.data?.accessToken) {
      return navigate('/user');
    }
    if (loginselectorResult.response?.message) {
      setErrMessage(loginselectorResult.response.message as string);
    }
  }, [navigate, loginselectorResult]);

  const formSubmitHandler: SubmitHandler<User> = (data: User) => {
    dispatch(loginAsync(data));
  };

  return !loginselectorResult.response?.data?.accessToken ? (
    <Grid container>
      <Grid item xs={6}>
        <Box
          component="img"
          sx={{
            height: '100vh',
            width: '50%',
            position: 'fixed',
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
            justifyContent: 'center'
          }}>
          <Box
            component="form"
            onSubmit={handleSubmit(formSubmitHandler)}
            sx={{
              width: '376px',
              mt: 6
            }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                mb: 3,
                '@media(min-height: 768px)': { mt: '150px' },
                '@media(min-height: 920px)': { mt: '25vh' }
              }}>
              Đăng nhập vào tài khoản
            </Typography>
            <Box>
              <Box sx={{ mb: 2 }}>
                <Typography component="label" variant="body1">
                  Chứng minh nhân dân/Căn cước công dân
                </Typography>
                <Controller
                  name="citizen_id"
                  control={control}
                  defaultValue="123456789"
                  render={({ field, fieldState: { invalid, error } }) => (
                    <TextField
                      fullWidth
                      helperText={error?.message ? error?.message : null}
                      error={invalid}
                      placeholder="123456789"
                      {...field}
                      sx={{ root: { height: '50px' }, mt: 1 }}
                    />
                  )}
                />
              </Box>
              <Box>
                <Typography component="label" variant="body1">
                  Mật khẩu
                </Typography>
                <Controller
                  name="password"
                  control={control}
                  defaultValue="password123"
                  render={({ field, fieldState: { invalid, error } }) => (
                    <TextField
                      fullWidth
                      type="password"
                      placeholder="***********"
                      helperText={
                        error?.message ? error?.message : errMessage || null
                      }
                      error={invalid || !!errMessage}
                      {...field}
                      sx={{ root: { height: '50px' }, mt: 1 }}
                    />
                  )}
                />
              </Box>
              <Box mt={2} mb={3}>
                <Typography
                  mb={2}
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
                  variant="contained"
                  disabled={Boolean(!isValid || loginselectorResult.loading)}
                  type="submit"
                  startIcon={
                    loginselectorResult.loading && (
                      <CircularProgress size={20} />
                    )
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
                  component={Link}
                  to={'/register'}
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
  ) : null;
};
