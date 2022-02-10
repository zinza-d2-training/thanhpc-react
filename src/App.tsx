import Layout from './theme/layout';

import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import User from './pages/User';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <>
      <Layout>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/user" element={<User />}></Route>
          </Routes>
        </Router>
      </Layout>
    </>
  );
}

export default App;
