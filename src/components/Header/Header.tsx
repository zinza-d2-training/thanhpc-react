import { SetStateAction, useState } from 'react';
import { Box, colors, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import headerImg from '../../images/header.png';
import { StyledButton } from '../StyledButton';
import { SidebarMenu } from '../SidebarMenu/SidebarMenu';

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
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box component="img" src={headerImg} sx={{ ml: '36px' }} />
        <Typography variant="h6" sx={{ ...defaultStyle, ml: 2 }}>
          CỔNG THÔNG TIN TIÊM CHỦNG COVID-19
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
        <Typography variant="body1" sx={{ ...defaultStyle, ml: 3 }}>
          Trang chủ
        </Typography>
        <Typography variant="body1" sx={{ ...defaultStyle, ml: 3 }}>
          Đăng ký tiêm
        </Typography>
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
        <StyledButton
          sx={{
            color: colors.indigo['700'],
            background: '#fff',
            '&:hover': {
              color: colors.indigo['700'],
              background: '#fff'
            },
            mr: 4.5,
            ml: 3
          }}
          children="Đăng nhập"
        />
      </Box>
    </Box>
  );
};
