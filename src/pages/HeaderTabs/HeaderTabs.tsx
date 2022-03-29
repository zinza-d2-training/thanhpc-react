import { Box, Container, Tab } from '@mui/material';
import TabList from '@mui/lab/TabList';
import { useTranslation } from 'react-i18next';

interface Props {
  activeTab: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  headerTabs: string[];
}
export const HeaderTabs = (props: Props) => {
  const { activeTab, handleChange, headerTabs } = props;
  const { t } = useTranslation();

  return (
    <Box sx={{ boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.1)' }}>
      <Container maxWidth="xl">
        <Box sx={{ color: '#6E6D7A', cursor: 'pointer' }}>
          <TabList
            value={activeTab}
            onChange={handleChange}
            sx={{
              height: '64px',
              '.MuiTabs-scroller': {
                display: 'flex !important'
              }
            }}
            TabIndicatorProps={{
              style: {
                backgroundColor: '#333'
              }
            }}
            aria-label="basic tabs example">
            {headerTabs.map((tab, index) => (
              <Tab
                key={index}
                value={index.toString()}
                label={t(`${tab}`)}
                sx={{
                  color: '#333 !important'
                }}
              />
            ))}
          </TabList>
        </Box>
      </Container>
    </Box>
  );
};
