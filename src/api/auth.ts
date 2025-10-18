import {
  MockUser,
  type Credentials,
  type LoginResponse,
  type Verify,
  type VerifyResponse,
} from '../types/auth';

export const mockSignIn = async ({
  email,
  password,
}: Credentials): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === MockUser.EMAIL && password === MockUser.PASSWORD) {
        resolve({
          success: true,
          requires2FA: true,
        });
      } else {
        reject({
          success: false,
          errorCode: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password',
        });
      }
    }, 1000);
  });
};

export const mockVerify2FA = async ({
  email,
  code,
}: Verify): Promise<VerifyResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === MockUser.EMAIL && code === MockUser.CODE) {
        resolve({
          success: true,
          accessToken: 'mock-token',
        });
      }
      if (email === MockUser.EMAIL && code === MockUser.EXPIRED_CODE) {
        reject({
          success: false,
          errorCode: '2FA_EXPIRED',
          message: 'Code has expired',
        });
      }
      if (email === MockUser.EMAIL && code !== MockUser.CODE) {
        reject({
          success: false,
          errorCode: '2FA_INVALID',
          message: 'Invalid code',
        });
      }
    }, 500);
  });
};
