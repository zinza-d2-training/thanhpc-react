import Layout from './theme/layout';

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import User from './pages/User/User';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';

function App() {
  return (
    <>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/user" element={<User />}></Route>
          </Routes>
        </BrowserRouter>
      </Layout>
    </>
  );
}

export default App;
