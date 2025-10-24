import { useMutation } from '@tanstack/react-query';
import { mockSignIn } from '../api/auth';
import type { Credentials, LoginResponse, ResponeError } from '../types/auth';
import { setToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();

  const { mutate, isSuccess, isPending, isError, error } = useMutation<
    LoginResponse,
    ResponeError,
    Credentials
  >({
    mutationFn: ({ email, password, code }: Credentials) =>
      mockSignIn({ email, password, code }),

    onSuccess: (data) => {
      if ('token' in data) {
        setToken(data.token);
        navigate('/');
      }
    },

    onError: (error) => {
      console.log(error);
    },
  });

  return {
    login: mutate,
    isSuccessLogin: isSuccess,
    isLoadingLogin: isPending,
    isErrorLogin: isError,
    errorLogin: error,
  };
};
