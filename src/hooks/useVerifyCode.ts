import { useMutation } from '@tanstack/react-query';
import { mockVerify2FA } from '../api/auth';
import type { Verify, ResponeError, VerifyResponse } from '../types/auth';

export const useVerifyCode = () => {
  const { mutate, data, isSuccess, isPending, isError, error } = useMutation<
    VerifyResponse,
    ResponeError,
    Verify
  >({
    mutationFn: ({ email, code }: Verify) => mockVerify2FA({ email, code }),
  });

  return {
    verify: mutate,
    dataVerify: data,
    isSuccessVerify: isSuccess,
    isLoadingVerify: isPending,
    isErrorVerify: isError,
    errorVerify: error,
  };
};
