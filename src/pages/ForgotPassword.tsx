import { Box, Grid, Typography, colors } from '@mui/material';
import loginImg from '../images/login.png';

const ForgotPassword = () => {
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
          component="form"
          // onSubmit={handleSubmit(formSubmitHandler)}

          sx={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Box
            sx={{
              width: '479px'
            }}>
            <Typography
              variant="body1"
              sx={{
                position: 'relative',
                textAlign: 'center',
                width: '80%'
              }}>
              Để khôi phục mật khẩu, vui lòng nhập đúng số CMND/CCCD bạn đã dùng
              để đăng ký
              <Typography
                variant="body1"
                sx={{
                  color: colors.red['600'],
                  position: 'absolute',
                  right: '36px',
                  top: '21px'
                }}>
                (*)
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
export default ForgotPassword;
