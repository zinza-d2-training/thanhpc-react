import { User } from '../../models/User';
import { ResponseLogin } from './responseLogin';
import { fakeAccount } from '../../db/fakeAccount';
import { SECRET_KEY } from './secret_key';
export function fetchAccount(value: User) {
  return new Promise<{ data: Partial<ResponseLogin> }>((resolve, reject) => {
    setTimeout(() => {
      if (
        value.citizenId === fakeAccount.citizenId &&
        value.password === fakeAccount.password
      ) {
        const token = value.citizenId + SECRET_KEY;
        resolve({
          data: {
            token,
            fullname: fakeAccount.fullname,
            statusCode: 200,
            message: 'Login success!!'
          }
        });
      } else {
        const data: Partial<ResponseLogin> = {
          token: null,
          fullname: null,
          statusCode: 401,
          message: 'Số chứng minh nhân dân/mật khẩu không chính xác'
        };
        reject({
          data
        });
      }
    }, 2000);
  });
}
