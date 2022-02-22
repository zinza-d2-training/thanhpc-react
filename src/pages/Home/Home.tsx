import { Box, Grid, Typography, colors } from '@mui/material';
import { Header } from '../../components/Header/Header';
import userPlusImg from '../../images/user-plus.png';
import needleImg from '../../images/needle.png';
import protectImg from '../../images/protect.png';

export const Home = () => {
  return (
    <>
      <Header />
      <Box>
        <Box sx={{ background: '#F7FBFE', py: 2, px: 4.5 }}>
          <Box sx={{ background: '#fff' }}>
            <Grid container>
              <Grid item xs={4}>
                <Box
                  sx={{
                    display: 'flex',
                    borderRight: '1px solid',
                    borderColor: colors.grey['300']
                  }}>
                  <Box
                    component="img"
                    src={userPlusImg}
                    sx={{ ml: 2, my: 3.5, mr: 3, objectFit: 'contain' }}
                  />
                  <Box sx={{ my: 3.5 }}>
                    <Typography sx={{ fontWeight: '700', fontSize: '16px' }}>
                      Đối tượng đăng ký tiêm
                    </Typography>
                    <Typography sx={{ fontWeight: '500', fontSize: '28px' }}>
                      11,203,873{' '}
                      <Box component="i" fontSize="14px">
                        (lượt)
                      </Box>
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    display: 'flex',
                    borderRight: '1px solid',
                    borderColor: colors.grey['300']
                  }}>
                  <Box
                    component="img"
                    src={needleImg}
                    sx={{ ml: 2, my: 3.5, mr: 3, objectFit: 'contain' }}
                  />
                  <Box sx={{ my: 3.5 }}>
                    <Typography sx={{ fontWeight: '700', fontSize: '16px' }}>
                      Số mũi tiêm hôm qua
                    </Typography>
                    <Typography sx={{ fontWeight: '500', fontSize: '28px' }}>
                      1,762,119{' '}
                      <Box component="i" fontSize="14px">
                        (mũi)
                      </Box>
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    display: 'flex'
                  }}>
                  <Box
                    component="img"
                    src={protectImg}
                    sx={{ ml: 2, my: 3.5, mr: 3, objectFit: 'contain' }}
                  />
                  <Box sx={{ my: 3.5 }}>
                    <Typography sx={{ fontWeight: '700', fontSize: '16px' }}>
                      Số mũi tiêm toàn quốc
                    </Typography>
                    <Typography sx={{ fontWeight: '500', fontSize: '28px' }}>
                      22,203,153{' '}
                      <Box component="i" fontSize="14px">
                        (mũi)
                      </Box>
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box
          sx={{
            py: 2,
            px: 4.5,
            border: '1px solid rgba(38, 56, 150, 0.14)',
            boxShadow: '0px 4px 12px rgba(34, 41, 47, 0.12)',
            borderradius: '10px'
          }}></Box>
      </Box>
    </>
  );
};
