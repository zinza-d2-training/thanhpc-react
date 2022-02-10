import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../src/store/hooks';
import { loginSelector } from '../features/login/loginSlice';

const User = () => {
  const login_selector = useAppSelector(loginSelector);

  return login_selector.response?.token ? (
    <h1>hello {login_selector.response?.fullname}</h1>
  ) : (
    <Navigate to="/login" />
  );
};
export default User;
