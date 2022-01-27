import { FC } from 'react';
import { Box } from '@mui/system';

const Layout: FC = (props) => {
  return <Box className="App">{props.children}</Box>;
};

export default Layout;
