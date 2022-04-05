import {
  Box,
  colors,
  Paper,
  MenuItem,
  Popper,
  MenuList,
  Typography
} from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import { Trans } from 'react-i18next';

import { logout } from '../../features/login/loginSlice';
import { useAppDispatch } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
const defaultStyle = {
  color: '#fff',
  cursor: 'pointer'
};

interface Props {
  fullName: string;
}

export const SidebarUserMenu = (props: Props) => {
  const { fullName } = props;
  const anchorRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleOpenMenu = () => {
    setOpen(true);
  };
  const handleCloseMenu = () => {
    setOpen(false);
  };
  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
    navigate('/login');
  };
  return (
    <>
      <Box
        sx={{
          display: 'inline-flex',
          position: 'relative',
          cursor: 'pointer'
        }}
        onMouseLeave={handleCloseMenu}>
        <Box
          sx={{
            display: 'inline-flex'
          }}
          onMouseEnter={handleOpenMenu}>
          <Typography ref={anchorRef} variant="body1" sx={{ ...defaultStyle }}>
            <Trans>Xin chào</Trans> {fullName}
          </Typography>
          <KeyboardArrowDownIcon sx={{ ...defaultStyle }} />
        </Box>
        <Popper
          role={undefined}
          disablePortal
          open={open}
          anchorEl={anchorRef.current}>
          <Paper
            sx={{
              py: 2,
              mt: 1,
              borderRadius: '12px',
              boxShadow: '0 10px 70px rgba(0, 0, 0, 0.15)'
            }}>
            <MenuList onMouseLeave={handleCloseMenu} autoFocusItem={open}>
              <MenuItem
                sx={{
                  background: '#fff',
                  mb: 3,
                  '&:hover': {
                    background: '#fff',
                    '.personal-page': {
                      background: colors.deepPurple['50']
                    },
                    '.personal-page-arrow': {
                      visibility: 'visible',
                      opacity: 1
                    }
                  }
                }}>
                <Box
                  className="personal-page"
                  sx={{
                    borderRadius: '6px',
                    mr: 2,
                    background: '#F8F8F8',
                    padding: '8px',
                    transition: 'all .3s',
                    display: 'flex'
                  }}>
                  <PeopleAltIcon
                    sx={{
                      color: colors.deepPurple['600']
                    }}
                  />
                </Box>
                <Box>
                  <Link to="/user" style={{ textDecoration: 'none' }}>
                    <Typography onClick={handleCloseMenu} variant="body2">
                      <Trans>Trang cá nhân</Trans>
                    </Typography>
                  </Link>
                </Box>
                <Box>
                  <ArrowForwardIcon
                    className="personal-page-arrow"
                    sx={{
                      color: colors.deepPurple['600'],
                      ml: 3.5,
                      opacity: 0,
                      transition: 'all .3s ease-in-out',
                      visibility: 'hidden'
                    }}
                  />
                </Box>
              </MenuItem>
              <MenuItem
                sx={{
                  '&:hover': {
                    background: '#fff',
                    '.log-out': {
                      background: colors.deepPurple['50']
                    },
                    '.log-out-arrow': {
                      visibility: 'visible',
                      opacity: 1
                    }
                  }
                }}>
                <Box
                  className="log-out"
                  sx={{
                    borderRadius: '6px',
                    mr: 2,
                    background: '#F8F8F8',
                    padding: '8px',
                    transition: 'all .3s ease',
                    display: 'flex'
                  }}>
                  <LogoutIcon
                    sx={{
                      color: colors.blue['600'],
                      transition: 'all .3s'
                    }}
                  />
                </Box>
                <Box>
                  <Typography onClick={handleLogout} variant="body2">
                    <Trans>Đăng xuất</Trans>
                  </Typography>
                </Box>
                <Box>
                  <ArrowForwardIcon
                    className="log-out-arrow"
                    sx={{
                      color: colors.blue['600'],
                      ml: 3.5,
                      opacity: 0,
                      transition: 'all .3s',
                      visibility: 'hidden'
                    }}
                  />
                </Box>
              </MenuItem>
            </MenuList>
          </Paper>
        </Popper>
      </Box>
    </>
  );
};
