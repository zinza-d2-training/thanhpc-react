import {
  Box,
  colors,
  Menu,
  MenuItem,
  MenuList,
  Typography
} from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { SetStateAction } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import { Trans } from 'react-i18next';

const defaultStyle = {
  color: '#fff',
  cursor: 'pointer'
};

interface Props {
  fullName: string;
}

export const SidebarUserMenu = (props: Props) => {
  const { fullName } = props;
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
    <>
      <Box
        sx={{
          display: 'inline-flex',
          position: 'relative',
          cursor: 'pointer'
        }}>
        <Box
          sx={{
            display: 'inline-flex'
          }}
          onMouseOver={handleOpenMenu}>
          <Typography variant="body1" sx={{ ...defaultStyle }}>
            <Trans>Xin chào</Trans> {fullName}
          </Typography>
          <KeyboardArrowDownIcon sx={{ ...defaultStyle }} />
        </Box>
        <Menu
          variant="selectedMenu"
          open={open}
          anchorEl={anchorEl}
          onClose={handleCloseMenu}
          autoFocus={false}
          sx={{
            '.MuiPaper-root': {
              position: 'absolute',
              top: '60px !important',
              left: '76% !important',
              borderRadius: '12px',
              boxShadow: '0px 0px 30px rgba(127, 137, 161, 0.4)'
            }
          }}>
          <MenuList onMouseLeave={handleCloseMenu} sx={{ padding: 2 }}>
            <MenuItem
              sx={{
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
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <Typography onClick={handleCloseMenu} variant="body2">
                    <Trans>Đăng xuất</Trans>
                  </Typography>
                </Link>
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
        </Menu>
      </Box>
    </>
  );
};
