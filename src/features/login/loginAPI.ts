import { User } from '../../models/User';
import {
  LoginQueryResponse,
  LoginQueryResult,
  QueryResult
} from './responseLogin';
import axios from 'axios';

export async function fetchAccount(value: User) {
  return await axios({
    method: 'POST',
    url: 'http://localhost:4000/auth/login',
    headers: { 'Content-Type': 'application/json' },
    data: {
      citizen_id: value.citizen_id,
      password: value.password
    }
  })
    .then((response) => {
      const token = response.data.accessToken;
      const data: QueryResult<LoginQueryResult> = {
        user: {
          citizen_id: response.data.payload.citizen_id,
          full_name: response.data.payload.full_name
        },
        token
      };
      const loginResponse: LoginQueryResponse = {
        data,
        statusCode: 200,
        message: 'Đăng nhập thành công!!!'
      };
      return loginResponse;
    })
    .catch((err) => {
      const data: QueryResult<LoginQueryResult> = null;
      const loginResponse: LoginQueryResponse = {
        data,
        statusCode: err.statusCode,
        message: 'Mã định danh hoặc mật khẩu không chính xác!'
      };
      return loginResponse;
    });
}
