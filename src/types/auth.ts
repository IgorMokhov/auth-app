export type Credentials = {
  email: string;
  password: string;
};

export type Verify = {
  email: string;
  code: string;
};

export type Step = 'login' | 'verify';

export enum VerifyErrorCode {
  EXPIRED = '2FA_EXPIRED',
  INVALID = '2FA_INVALID',
}

export type VerifySuccess = {
  success: boolean;
  accessToken: string;
};

export type LoginSuccess = {
  success: boolean;
  requires2FA: boolean;
};

export type ResponeError = {
  success: false;
  errorCode: VerifyErrorCode;
  message: string;
};

export type VerifyResponse = VerifySuccess | ResponeError;

export type LoginResponse = LoginSuccess | ResponeError;

export enum MockUser {
  EMAIL = 'info@mail.com',
  PASSWORD = '123456789',
  CODE = '131311',
  EXPIRED_CODE = '111111',
}
