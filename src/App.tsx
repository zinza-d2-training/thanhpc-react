import { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Layout from './theme/layout';
import { Login } from './pages/Login/Login';
import { Home } from './pages/Home/Home';
import { User } from './pages/User/User';
import { Admin } from './pages/Admin/Admin';
import { ForgotPassword } from './pages/ForgotPassword/ForgotPassword';
import { Register } from './pages/Register/Register';
import { VaccineCertificate } from './pages/VaccineCertificate/VaccineCertificate';
import { InjectionRegistration } from './pages/InjectionRegistration/InjectionRegistration';
import { VaccineRegistration } from './pages/VaccineRegistration/VaccineRegistration';
import { Documentation } from './pages/Documentation/Documentation';
import { i18nextSelector } from './features/i18next/i18nextSlice';
import i18n from './features/i18next/i18next';
import { useAppSelector } from './store/hooks';

function App() {
  const i18nextSelectorResult = useAppSelector(i18nextSelector);
  const { language } = i18nextSelectorResult;
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/vaccine-certificate"
              element={<VaccineCertificate />}
            />
            <Route
              path="/vaccine-registration"
              element={<VaccineRegistration />}
            />
            <Route
              path="/vaccine-registration"
              element={<VaccineRegistration />}></Route>
            <Route
              path="/injection-registration"
              element={<InjectionRegistration />}
            />
            <Route path="/" element={<Home />} />
            <Route
              path="/injection-registration"
              element={<InjectionRegistration />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/user" element={<User />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </>
  );
}

export default App;
