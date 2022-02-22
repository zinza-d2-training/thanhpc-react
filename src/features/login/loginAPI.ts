import { User } from '../../models/User';
import {
  LoginQueryResponse,
  LoginQueryResult,
  QueryResult
} from './responseLogin';
import { fakeAccount } from './consts';
import { SECRET_KEY } from './secret_key';
export function fetchAccount(value: User) {
  return new Promise<LoginQueryResponse>((resolve, reject) => {
    setTimeout(() => {
      if (
        value.citizenId === fakeAccount.citizenId &&
        value.password === fakeAccount.password
      ) {
        const token = value.citizenId + SECRET_KEY;
        const data: QueryResult<LoginQueryResult> = {
          user: {
            citizenId: fakeAccount.citizenId,
            full_name: fakeAccount.full_name
          },
          token
        };
        const loginResponse: LoginQueryResponse = {
          data,
          statusCode: 200,
          message: 'Đăng nhập thành công!!!'
        };
        resolve(loginResponse);
      } else {
        const loginResponse: LoginQueryResponse = {
          data: null,
          statusCode: 401,
          message: 'Tên đăng nhập/mật khẩu không chính xác'
        };
        reject(loginResponse);
      }
    }, 2000);
  });
}
