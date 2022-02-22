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

interface Props {
  open: boolean;
  anchorEl: HTMLElement | null;
  handleCloseMenu: () => void;
}

export const StyledMenu = (props: Props) => {
  const { open, anchorEl, handleCloseMenu } = props;

  return (
    <>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        autoFocus={false}
        sx={{
          '.MuiPaper-root': {
            position: 'absolute',
            top: '65px !important',
            left: '65% !important',
            borderRadius: '12px',
            px: 4,
            pt: 3,
            boxShadow: '0px 0px 30px rgba(127, 137, 161, 0.4)'
          }
        }}>
        <MenuList onMouseLeave={handleCloseMenu} sx={{ padding: 0 }}>
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
              <Typography onClick={handleCloseMenu} variant="body2">
                Tra cứu chứng nhận tiêm
              </Typography>
              <Typography onClick={handleCloseMenu} sx={{ fontSize: '12px' }}>
                Cập nhật nhanh và chính xác nhất
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
              mb: 3,
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
              <Typography onClick={handleCloseMenu} variant="body2">
                Tra cứu kết quả đăng ký
              </Typography>
              <Typography onClick={handleCloseMenu} sx={{ fontSize: '12px' }}>
                Cập nhật nhanh và chính xác nhất
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
