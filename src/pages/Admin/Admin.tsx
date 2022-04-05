import { useState } from 'react';
import { Box, Container } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { HeaderTabs } from '../HeaderTabs/HeaderTabs';
import { UpdateDistributionTable } from '../../components/UpdateDistributionTable/UpdateDistributionTable';
import { useUnitAdministrative } from '../../hooks/useUnitAdministrative';
import { VaccinationSite } from './VaccinationSite';
import { VaccineRegistration } from './VaccineRegistration';
import { PersonalInformation } from './PersonalInformation';

const headerTabs = [
  'Phân bổ',
  'Điểm tiêm',
  'Đăng ký',
  'Chứng nhận',
  'Thông tin cá nhân',
  'Tiền sử',
  'Tài liệu'
];
export const Admin = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  const { listProvince, reFetchListProvince } = useUnitAdministrative();
  const handleRefetch = () => {
    reFetchListProvince();
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
                  dataBody={listProvince}
                  handleRefetch={handleRefetch}
                />
              </TabPanel>
              <TabPanel value="1" sx={{ padding: 0, mb: 10 }}>
                <VaccinationSite />
              </TabPanel>
              <TabPanel value="2" sx={{ padding: 0, mb: 10 }}>
                <VaccineRegistration />
              </TabPanel>
              <TabPanel value="3" sx={{ padding: 0, mb: 10 }}></TabPanel>
              <TabPanel value="4" sx={{ padding: 0, mb: 10 }}>
                <PersonalInformation />
              </TabPanel>
              <TabPanel value="5" sx={{ padding: 0, mb: 10 }}></TabPanel>
              <TabPanel value="6" sx={{ padding: 0, mb: 10 }}></TabPanel>
            </Container>
          </Box>
        </TabContext>
      </Box>

      <Footer />
    </>
  );
};
