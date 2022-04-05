import { User } from '../../models/User';
import {
  LoginQueryResponse,
  LoginQueryResult,
  QueryResult
} from './responseLogin';
import { useLogin } from '../../hooks/useLogin';

export async function FetchAccount(value: User) {
  const { login } = useLogin();
  const response = await login({
    citizen_id: value.citizen_id,
    password: value.password
  });
  if (response.data.accessToken) {
    const token = response.data.accessToken;
    const data: QueryResult<LoginQueryResult> = {
      payload: {
        citizen_id: response.data.payload.citizen_id,
        full_name: response.data.payload.full_name
      },
      accessToken: token
    };
    const loginResponse: LoginQueryResponse = {
      data,
      statusCode: 200,
      message: 'Đăng nhập thành công!!!'
    };
    return loginResponse;
  } else {
    const data: QueryResult<LoginQueryResult> = null;
    const loginResponse: LoginQueryResponse = {
      data,
      statusCode: 403,
      message: 'Mã định danh hoặc mật khẩu không chính xác!'
    };
    return loginResponse;
  }
}
