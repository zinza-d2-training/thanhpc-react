import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../src/store/hooks';
import { loginSelector } from '../features/login/loginSlice';

const User = () => {
  const loginSelectorResult = useAppSelector(loginSelector);

  return loginSelectorResult.response?.token ? (
    <h1>hello {loginSelectorResult.response?.fullname}</h1>
  ) : (
    <Navigate to="/login" />
  );
};
export default User;
