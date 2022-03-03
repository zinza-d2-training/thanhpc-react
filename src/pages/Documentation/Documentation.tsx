import DownloadIcon from '@mui/icons-material/Download';
import { Box, Container, Typography, colors, Stack, Link } from '@mui/material';
import { Link as LinkV6 } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Trans } from 'react-i18next';

import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

const documents = [
  {
    id: 'document_id-sdfsdf',
    label: 'Giới thiệu nền tảng quản lý tiêm chủng vắc xin phòng Covid-19',
    linkDocument:
      'https://tiemchungcovid19.gov.vn/assets/portal/document/Gi%E1%BB%9Bi_thi%E1%BB%87u_n%E1%BB%81n_t%E1%BA%A3ng_qu%E1%BA%A3n_l%C3%BD_ti%C3%AAm_ch%E1%BB%A7ng_v%E1%BA%AFc_xin_ph%C3%B2ng_Covid_-_19.pdf'
  },
  {
    id: 'document_id-sdfsdfa',
    label:
      'HD Chuẩn hóa dữ iệu và import danh sách đối tượng tiêm chủng Covid-19, danh sách nhập hồi cứu',
    linkDocument:
      'https://tiemchungcovid19.gov.vn/assets/portal/document/Gi%E1%BB%9Bi_thi%E1%BB%87u_n%E1%BB%81n_t%E1%BA%A3ng_qu%E1%BA%A3n_l%C3%BD_ti%C3%AAm_ch%E1%BB%A7ng_v%E1%BA%AFc_xin_ph%C3%B2ng_Covid_-_19.pdf'
  },
  {
    id: 'document_id-asdasd',
    label: 'HD cài đặt và sử dụng ứng dụng SSKĐT dành cho người dân',
    linkDocument:
      'https://tiemchungcovid19.gov.vn/assets/portal/document/Gi%E1%BB%9Bi_thi%E1%BB%87u_n%E1%BB%81n_t%E1%BA%A3ng_qu%E1%BA%A3n_l%C3%BD_ti%C3%AAm_ch%E1%BB%A7ng_v%E1%BA%AFc_xin_ph%C3%B2ng_Covid_-_19.pdf'
  },
  {
    id: 'document_id-qweqwe',
    label: 'HD đăng ký tiêm chủng Covid-19 dành cho cơ quan, tổ chức',
    linkDocument:
      'https://tiemchungcovid19.gov.vn/assets/portal/document/Gi%E1%BB%9Bi_thi%E1%BB%87u_n%E1%BB%81n_t%E1%BA%A3ng_qu%E1%BA%A3n_l%C3%BD_ti%C3%AAm_ch%E1%BB%A7ng_v%E1%BA%AFc_xin_ph%C3%B2ng_Covid_-_19.pdf'
  },
  {
    id: 'document_id-ghjgh',
    label: 'HD đăng ký cơ sở tiêm chủng Covid-19',
    linkDocument:
      'https://tiemchungcovid19.gov.vn/assets/portal/document/Gi%E1%BB%9Bi_thi%E1%BB%87u_n%E1%BB%81n_t%E1%BA%A3ng_qu%E1%BA%A3n_l%C3%BD_ti%C3%AAm_ch%E1%BB%A7ng_v%E1%BA%AFc_xin_ph%C3%B2ng_Covid_-_19.pdf'
  },
  {
    id: 'document_id-fdbdfb',
    label: 'HD đăng ký tiêm chủng Covid-19',
    linkDocument:
      'https://tiemchungcovid19.gov.vn/assets/portal/document/Gi%E1%BB%9Bi_thi%E1%BB%87u_n%E1%BB%81n_t%E1%BA%A3ng_qu%E1%BA%A3n_l%C3%BD_ti%C3%AAm_ch%E1%BB%A7ng_v%E1%BA%AFc_xin_ph%C3%B2ng_Covid_-_19.pdf'
  },
  {
    id: 'document_id-werer',
    label: 'HD đăng ký tiêm chủng Covid-19 dành cho cơ quan, tổ chức',
    linkDocument:
      'https://tiemchungcovid19.gov.vn/assets/portal/document/Gi%E1%BB%9Bi_thi%E1%BB%87u_n%E1%BB%81n_t%E1%BA%A3ng_qu%E1%BA%A3n_l%C3%BD_ti%C3%AAm_ch%E1%BB%A7ng_v%E1%BA%AFc_xin_ph%C3%B2ng_Covid_-_19.pdf'
  },
  {
    id: 'document_id-axsxz',
    label: 'HD đăng ký tiêm chủng Covid-19 dành cho người dân',
    linkDocument:
      'https://tiemchungcovid19.gov.vn/assets/portal/document/Gi%E1%BB%9Bi_thi%E1%BB%87u_n%E1%BB%81n_t%E1%BA%A3ng_qu%E1%BA%A3n_l%C3%BD_ti%C3%AAm_ch%E1%BB%A7ng_v%E1%BA%AFc_xin_ph%C3%B2ng_Covid_-_19.pdf'
  },
  {
    id: 'document_id-dfgdfg',
    label: 'HDSD ứng dụng SSKĐT trong quá trình tiêm chủng Covid-19',
    linkDocument:
      'https://tiemchungcovid19.gov.vn/assets/portal/document/Gi%E1%BB%9Bi_thi%E1%BB%87u_n%E1%BB%81n_t%E1%BA%A3ng_qu%E1%BA%A3n_l%C3%BD_ti%C3%AAm_ch%E1%BB%A7ng_v%E1%BA%AFc_xin_ph%C3%B2ng_Covid_-_19.pdf'
  },
  {
    id: 'document_id-mbnmb',
    label: 'Quy trình ứng dụng nền tảng quản lý điều hành tiêm chủng Covid-19',
    linkDocument:
      'https://tiemchungcovid19.gov.vn/assets/portal/document/Gi%E1%BB%9Bi_thi%E1%BB%87u_n%E1%BB%81n_t%E1%BA%A3ng_qu%E1%BA%A3n_l%C3%BD_ti%C3%AAm_ch%E1%BB%A7ng_v%E1%BA%AFc_xin_ph%C3%B2ng_Covid_-_19.pdf'
  }
];
export const Documentation = () => {
  return (
    <>
      <Header />
      <Box sx={{ minHeight: '500px' }}>
        <Box
          sx={{
            mt: '112px',
            mb: '40px',
            height: '64px',
            background: colors.grey['100'],
            display: 'flex',
            alignItems: 'center'
          }}>
          <Container maxWidth="xl">
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Trans>
                <Typography variant="h5">
                  <Trans>Tài liệu</Trans>
                </Typography>
              </Trans>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Stack direction="row" spacing={1}>
                  <LinkV6
                    to="/"
                    style={{
                      textDecoration: 'none',
                      color: colors.red['600']
                    }}>
                    <Trans>Trang chủ</Trans>
                  </LinkV6>
                  <Typography variant="body2">/</Typography>
                  <Typography variant="body2">
                    <Trans>Tài liệu</Trans>
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </Container>
        </Box>
        <Container maxWidth="xl" sx={{ mb: 3 }}>
          <TableContainer
            component={Paper}
            sx={{ maxHeight: '850px', boxShadow: 'none' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <Trans>STT</Trans>
                  </TableCell>
                  <TableCell>
                    <Trans>Tên tài liệu</Trans>
                  </TableCell>
                  <TableCell align="center">
                    <Trans>Thao tác</Trans>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {documents.map((row, index: number) => (
                  <TableRow
                    key={index}
                    sx={{
                      background: index % 2 === 1 ? colors.grey['100'] : null,
                      '&:hover': {
                        background: colors.grey['200']
                      }
                    }}>
                    <TableCell component="th" scope="row" align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <Trans>{row.label}</Trans>
                    </TableCell>
                    <TableCell
                      sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Link
                        href={row.linkDocument}
                        sx={{ textDecoration: 'none', display: 'flex' }}>
                        <DownloadIcon sx={{ color: '#333' }} />
                        {'  '}
                        <Typography
                          variant="body1"
                          sx={{ color: colors.red['500'] }}>
                          <Trans>Tải về</Trans>
                        </Typography>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
      <Footer />
    </>
  );
};
