import { SetStateAction, useState } from 'react';
import { Box, colors, Typography, Container } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import headerImg from '../../images/header.png';
import { StyledButton } from '../StyledButton';
import { SidebarMenu } from '../SidebarMenu/SidebarMenu';
import { Link } from 'react-router-dom';

const defaultStyle = {
  color: '#fff',
  cursor: 'pointer'
};
export const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpenMenu = (e: {
    currentTarget: SetStateAction<HTMLElement | null>;
  }) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        height: '80px',
        width: '100%',
        position: 'fixed',
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
            <Link to="/vaccine-certificate">
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
            </Link>
            <Box>
              <Box
                onMouseOver={handleOpenMenu}
                sx={{
                  display: 'inline-flex',
                  position: 'relative'
                }}>
                <Typography variant="body1" sx={{ ...defaultStyle, ml: 3 }}>
                  Tra cứu
                </Typography>
                <KeyboardArrowDownIcon sx={{ ...defaultStyle }} />
              </Box>

              <SidebarMenu
                open={open}
                anchorEl={anchorEl}
                handleCloseMenu={handleCloseMenu}
              />
            </Box>
            <Typography variant="body1" sx={{ ...defaultStyle, ml: 3 }}>
              Tài liệu
            </Typography>
            <Link to="/login">
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
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
