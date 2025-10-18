import { useMutation } from '@tanstack/react-query';
import { mockSignIn } from '../api/auth';
import type { Credentials, LoginResponse, ResponeError } from '../types/auth';

export const useLogin = () => {
  const { mutate, isSuccess, isPending, isError, error } = useMutation<
    LoginResponse,
    ResponeError,
    Credentials
  >({
    mutationFn: ({ email, password }: Credentials) =>
      mockSignIn({ email, password }),
  });

  return {
    login: mutate,
    isSuccessLogin: isSuccess,
    isLoadingLogin: isPending,
    isErrorLogin: isError,
    errorLogin: error,
  };
};
