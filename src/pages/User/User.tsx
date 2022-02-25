import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';
import { loginSelector } from '../../features/login/loginSlice';

export const User = () => {
  const loginSelectorResult = useAppSelector(loginSelector);

  return loginSelectorResult.response?.data?.token ? (
    <h1>hello {loginSelectorResult.response?.data.user.full_name}</h1>
  ) : (
    <Navigate to="/login" />
  );
};
