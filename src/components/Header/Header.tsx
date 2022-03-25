import { useCallback } from 'react';
import {
  Box,
  colors,
  Typography,
  Container,
  Stack,
  Link as LinkMui
} from '@mui/material';

import { loginSelector } from '../../features/login/loginSlice';
import {
  i18nextSelector,
  changeLanguage
} from '../../features/i18next/i18nextSlice';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import headerImg from '../../images/header.png';
import { StyledButton } from '../StyledButton';
import { SidebarMenu } from '../SidebarMenu/SidebarMenu';
import { SidebarUserMenu } from '../SidebarUserMenu/SidebarUserMenu';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';

const defaultStyle = {
  color: '#fff',
  cursor: 'pointer'
};

export const Header = () => {
  const loginSelectorResult = useAppSelector(loginSelector);
  const i18nextSelectorResult = useAppSelector(i18nextSelector);
  const { language } = i18nextSelectorResult;
  const dispatch = useAppDispatch();

  const handleChangeVN = useCallback(() => {
    dispatch(changeLanguage('vn'));
  }, [dispatch]);
  const handleChangeEnglish = useCallback(() => {
    dispatch(changeLanguage('en'));
  }, [dispatch]);

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
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center'
              }}>
              <Box component="img" src={headerImg} />
              <Typography variant="h6" sx={{ ...defaultStyle, ml: 2 }}>
                <Trans>CỔNG THÔNG TIN TIÊM CHỦNG COVID-19</Trans>
              </Typography>
            </Link>
          </Box>
          <Box
            sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Link to="/">
                <Typography variant="body1" sx={{ ...defaultStyle }}>
                  <Trans>Trang chủ</Trans>
                </Typography>
              </Link>
              <Link to="/vaccine-registration">
                <Typography
                  variant="body1"
                  sx={{
                    ...defaultStyle,
                    outline: 'none',
                    textDecoration: 'none'
                  }}>
                  <Trans>Đăng ký tiêm</Trans>
                </Typography>
              </Link>
              <Box>
                <SidebarMenu />
              </Box>
              <Link to="/documentation" style={{ textDecoration: 'none' }}>
                <Typography variant="body1" sx={{ ...defaultStyle }}>
                  <Trans>Tài liệu</Trans>
                </Typography>
              </Link>
              {loginSelectorResult.response?.data?.payload.full_name ? (
                <SidebarUserMenu
                  fullName={
                    loginSelectorResult.response?.data?.payload.full_name
                  }
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
                      }
                    }}
                    children={<Trans>Đăng nhập</Trans>}
                  />
                </Link>
              )}
              <Stack
                direction="row"
                spacing={1}
                sx={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
                <LinkMui
                  underline={language === 'vn' ? 'always' : 'none'}
                  sx={{
                    cursor: 'pointer',
                    color: '#fff',
                    textDecorationColor: '#fff'
                  }}
                  onClick={() => handleChangeVN()}>
                  VN
                </LinkMui>
                <Typography>|</Typography>
                <LinkMui
                  underline={language === 'en' ? 'always' : 'none'}
                  sx={{
                    cursor: 'pointer',
                    color: '#fff',
                    textDecorationColor: '#fff'
                  }}
                  onClick={() => handleChangeEnglish()}>
                  EN
                </LinkMui>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
