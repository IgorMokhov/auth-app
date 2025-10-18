import type { VerifyResponse, VerifySuccess } from '../types/auth';

export const isVerifySuccess = (data: VerifyResponse): data is VerifySuccess => {
  return data.success === true;
};
