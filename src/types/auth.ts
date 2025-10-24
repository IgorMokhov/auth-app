export type Credentials = {
  email: string;
  password: string;
  code?: string;
};

export type Step = 'login' | 'verify';

export enum ErrorCode {
  TWO_FA_REQUIRED = 'TWO_FA_REQUIRED',
  TWO_FA_EXPIRED = 'TWO_FA_EXPIRED',
  INVALID_CREDENTIALS = 'WRONG_PASSWORD',
  INVALID_CODE = 'INVALID_CODE',
}

export type LoginSuccess = {
  token: string;
};

export type ResponeError = {
  code: ErrorCode;
  message: string;
};

export type LoginResponse = LoginSuccess | ResponeError;

export enum MockUser {
  EMAIL_WITH_CODE = 'info@mail.com',
  EMAIL_WITHOUT_CODE = 'test@mail.com',
  INVALID_EMAIL = 'invalid@mail.com',
  PASSWORD = '123456789',
  CODE = '131311',
  EXPIRED_CODE = '111111',
}
