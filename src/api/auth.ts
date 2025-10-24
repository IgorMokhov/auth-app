import { MockUser, type Credentials, type LoginResponse } from '../types/auth';

export const mockSignIn = async ({
  email,
  password,
  code,
}: Credentials): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === MockUser.EMAIL_WITHOUT_CODE && password === MockUser.PASSWORD) {
        resolve({
          token: 'mock-token',
        });
      }
      if (
        email === MockUser.EMAIL_WITH_CODE &&
        password === MockUser.PASSWORD &&
        code === MockUser.CODE
      ) {
        resolve({
          token: 'mock-token',
        });
      }
      if (
        email === MockUser.EMAIL_WITH_CODE &&
        password === MockUser.PASSWORD &&
        !code
      ) {
        reject({
          message: 'Two factor authentication code required',
          code: 'TWO_FA_REQUIRED',
        });
      }
      if (
        email === MockUser.EMAIL_WITH_CODE &&
        password === MockUser.PASSWORD &&
        code === MockUser.EXPIRED_CODE
      ) {
        reject({
          message: 'Code was expired',
          code: 'TWO_FA_EXPIRED',
        });
      }
      if (
        email === MockUser.EMAIL_WITH_CODE &&
        password === MockUser.PASSWORD &&
        code !== MockUser.CODE
      ) {
        reject({
          message: 'Invalid code',
          code: 'INVALID_CODE',
        });
      }
      if (email == MockUser.INVALID_EMAIL || password !== MockUser.PASSWORD) {
        reject({
          message: 'Invalid username or password',
          code: 'WRONG_PASSWORD',
        });
      }
      reject({
        message: 'Something went wrong',
        code: 'ERROR',
      });
    }, 1000);
  });
};
