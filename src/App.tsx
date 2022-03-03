import { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Layout from './theme/layout';
import { Login } from './pages/Login/Login';
import { Home } from './pages/Home/Home';
import { User } from './pages/User/User';
import { ForgotPassword } from './pages/ForgotPassword/ForgotPassword';
import { Register } from './pages/Register/Register';
import { VaccineCertificate } from './pages/VaccineCertificate/VaccineCertificate';
import { InjectionRegistration } from './pages/InjectionRegistration/InjectionRegistration';
import { Documentation } from './pages/Documentation/Documentation';
import { i18nextSelector } from './features/i18next/i18nextSlice';
import i18n from './features/i18next/i18next';
import { useAppSelector } from './store/hooks';

function App() {
  const i18nextSelectorResult = useAppSelector(i18nextSelector);

  useEffect(() => {
    i18n.changeLanguage(i18nextSelectorResult.language);
  }, [i18nextSelectorResult.language]);

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
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/documentation" element={<Documentation />}></Route>
            <Route path="/user" element={<User />}></Route>
          </Routes>
        </BrowserRouter>
      </Layout>
    </>
  );
}

export default App;
