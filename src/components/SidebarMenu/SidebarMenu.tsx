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
import { Trans } from 'react-i18next';

const defaultStyle = {
  color: '#fff',
  cursor: 'pointer'
};
export const SidebarMenu = () => {
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
        onMouseOver={handleOpenMenu}
        sx={{
          display: 'inline-flex',
          position: 'relative',
          cursor: 'pointer'
        }}>
        <Typography variant="body1" sx={{ ...defaultStyle }}>
          <Trans>Tra cứu</Trans>
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
            left: '60% !important',
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
                '.look-up-confirm': {
                  background: colors.deepPurple['50']
                },
                '.look-up-confirm-arrow': {
                  visibility: 'visible',
                  opacity: 1
                }
              }
            }}>
            <Box
              className="look-up-confirm"
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
              <Link
                to="/vaccine-certificate"
                style={{ textDecoration: 'none' }}>
                <Typography onClick={handleCloseMenu} variant="body2">
                  <Trans>Tra cứu chứng nhận tiêm</Trans>
                </Typography>
              </Link>
              <Typography onClick={handleCloseMenu} sx={{ fontSize: '12px' }}>
                <Trans>Cập nhật nhanh và chính xác nhất</Trans>
              </Typography>
            </Box>
            <Box>
              <ArrowForwardIcon
                className="look-up-confirm-arrow"
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
                '.look-up-register': {
                  background: colors.deepPurple['50']
                },
                '.look-up-register-arrow': {
                  visibility: 'visible',
                  opacity: 1
                }
              }
            }}>
            <Box
              className="look-up-register"
              sx={{
                borderRadius: '6px',
                mr: 2,
                background: '#F8F8F8',
                padding: '8px',
                transition: 'all .3s ease',
                display: 'flex'
              }}>
              <PeopleAltIcon
                sx={{
                  color: colors.blue['600'],
                  transition: 'all .3s'
                }}
              />
            </Box>
            <Box>
              <Link
                to="/injection-registration"
                style={{ textDecoration: 'none' }}>
                <Typography onClick={handleCloseMenu} variant="body2">
                  <Trans>Tra cứu kết quả đăng ký</Trans>
                </Typography>
              </Link>
              <Typography onClick={handleCloseMenu} sx={{ fontSize: '12px' }}>
                <Trans>Cập nhật nhanh và chính xác nhất</Trans>
              </Typography>
            </Box>
            <Box>
              <ArrowForwardIcon
                className="look-up-register-arrow"
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
    </>
  );
};
