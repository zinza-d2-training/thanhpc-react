import { User } from '../../models/User';
import {
  LoginQueryResponse,
  LoginQueryResult,
  QueryResult
} from './responseLogin';
import { useLogin } from '../../hooks/useLogin';

export async function FetchAccount(value: User) {
  const response = await useLogin({
    citizen_id: value.citizen_id,
    password: value.password
  });
  if (response.accessToken) {
    const token = response.accessToken;
    const data: QueryResult<LoginQueryResult> = {
      payload: {
        citizen_id: response.payload.citizen_id,
        full_name: response.payload.full_name
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
