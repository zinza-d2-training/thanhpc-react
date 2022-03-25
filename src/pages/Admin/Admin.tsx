import { useState } from 'react';
import { Box, Container } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { HeaderTabs } from '../HeaderTabs/HeaderTabs';
import { UpdateDistributionTable } from '../../components/UpdateDistributionTable/UpdateDistributionTable';
import { manageUpdateDistribution } from '../../db/UpdateDistributionTable';

const headerTabs = [
  'Phân bổ',
  'Điểm tiêm',
  'Đăng ký',
  'Chứng nhận',
  'Người dùng',
  'Tiền sử',
  'Tài liệu'
];
const tableHead = [
  'STT',
  'Tỉnh/Thành phố',
  'Dự kiến KH phân bổ',
  'Phân bổ thực tế',
  'Dân số >= 18 tuổi',
  'Số liều đã tiêm',
  'Tỷ lệ tiêm chủng/ Vắc xin phân bổ thực tế',
  'Tỷ lệ phân bổ vắc xin/Tổng số phân bổ cả nước',
  'Thao tác'
];
export const Admin = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <Header />
      <Box sx={{ minHeight: '671px', mt: '80px' }}>
        <TabContext value={activeTab.toString()}>
          <HeaderTabs
            activeTab={activeTab}
            handleChange={handleChange}
            headerTabs={headerTabs}
          />
          <Box sx={{ marginTop: '48px' }}>
            <Container maxWidth="xl">
              <TabPanel value="0" sx={{ padding: 0, mb: 10 }}>
                <UpdateDistributionTable
                  dataBody={manageUpdateDistribution}
                  dataHead={tableHead}
                />
              </TabPanel>
              <TabPanel value="1"></TabPanel>
              <TabPanel value="2"></TabPanel>
              <TabPanel value="3"></TabPanel>
              <TabPanel value="4"></TabPanel>
              <TabPanel value="5"></TabPanel>
              <TabPanel value="6"></TabPanel>
            </Container>
          </Box>
        </TabContext>
      </Box>

      <Footer />
    </>
  );
};
