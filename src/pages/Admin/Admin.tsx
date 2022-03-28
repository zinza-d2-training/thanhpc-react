import { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { HeaderTabs } from '../HeaderTabs/HeaderTabs';
import { UpdateDistributionTable } from '../../components/UpdateDistributionTable/UpdateDistributionTable';
import { ProvinceType } from '../User/types';
import { UseUnitAdministrative } from '../../hooks/useUnitAdministrative';

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
  const [refetch, setRefetch] = useState<boolean>(false);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  const [listProvince, setListProvince] = useState<ProvinceType[]>([]);
  useEffect(() => {
    const fetchListProvince = async () => {
      const result = await UseUnitAdministrative();
      setListProvince(result);
    };
    fetchListProvince();
    setRefetch(false);
  }, [refetch]);
  const handleRefetch = () => {
    setRefetch(true);
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
                  dataHead={tableHead}
                  handleRefetch={handleRefetch}
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
