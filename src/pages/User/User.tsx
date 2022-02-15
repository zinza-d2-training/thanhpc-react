import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';
import { loginSelector } from '../../features/login/loginSlice';

const User = () => {
  const login_selector = useAppSelector(loginSelector);

  return login_selector.response?.data?.token ? (
    <h1>hello {login_selector.response?.data.user.full_name}</h1>
  ) : (
    <Navigate to="/login" />
  );
};
export default User;
