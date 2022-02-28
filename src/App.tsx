import Layout from './theme/layout';

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { Home } from './pages/Home/Home';
import { User } from './pages/User/User';
import { ForgotPassword } from './pages/ForgotPassword/ForgotPassword';
import { Register } from './pages/Register/Register';
import { VaccineCertificate } from './pages/VaccineCertificate/VaccineCertificate';
import { InjectionRegistration } from './pages/InjectionRegistration/InjectionRegistration';

function App() {
  return (
    <>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route
              path="/vaccine-certificate"
              element={<VaccineCertificate />}></Route>
            <Route
              path="/injection-registration"
              element={<InjectionRegistration />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/injection-registration"
              element={<InjectionRegistration />}></Route>
            <Route path="/user" element={<User />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </BrowserRouter>
      </Layout>
    </>
  );
}

export default App;
