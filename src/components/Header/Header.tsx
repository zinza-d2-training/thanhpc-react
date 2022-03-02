import { Box, colors, Typography, Container } from '@mui/material';

import { loginSelector } from '../../features/login/loginSlice';
import { useAppSelector } from '../../store/hooks';
import headerImg from '../../images/header.png';
import { StyledButton } from '../StyledButton';
import { SidebarMenu } from '../SidebarMenu/SidebarMenu';
import { SidebarUserMenu } from '../SidebarUserMenu/SidebarUserMenu';
import { Link } from 'react-router-dom';

const defaultStyle = {
  color: '#fff',
  cursor: 'pointer'
};

export const Header = () => {
  const loginSelectorResult = useAppSelector(loginSelector);

  return (
    <Box
      sx={{
        height: '80px',
        width: '100%',
        position: 'fixed',
        zIndex: 1000,
        top: '0px',
        display: 'flex',
        background:
          'linear-gradient(90deg, #ED1B23 0%, #2E3091 52.08%, #253494 100%)'
      }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box component="img" src={headerImg} />
            <Typography variant="h6" sx={{ ...defaultStyle, ml: 2 }}>
              CỔNG THÔNG TIN TIÊM CHỦNG COVID-19
            </Typography>
          </Box>
          <Box
            sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
            <Link to="/">
              <Typography variant="body1" sx={{ ...defaultStyle, ml: 3 }}>
                Trang chủ
              </Typography>
            </Link>
            <Typography
              variant="body1"
              sx={{
                ...defaultStyle,
                ml: 3,
                outline: 'none',
                textDecoration: 'none'
              }}>
              Đăng ký tiêm
            </Typography>
            <Box>
              <SidebarMenu />
            </Box>
            <Link to="/documentation" style={{ textDecoration: 'none' }}>
              <Typography variant="body1" sx={{ ...defaultStyle, ml: 3 }}>
                Tài liệu
              </Typography>
            </Link>
            {loginSelectorResult.response?.data?.user.full_name ? (
              <SidebarUserMenu
                fullName={loginSelectorResult.response?.data?.user.full_name}
              />
            ) : (
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <StyledButton
                  sx={{
                    color: colors.indigo['700'],
                    background: '#fff',
                    '&:hover': {
                      color: colors.indigo['700'],
                      background: '#fff'
                    },
                    ml: 3
                  }}
                  children="Đăng nhập"
                />
              </Link>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
