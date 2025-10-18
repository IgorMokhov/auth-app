import { useEffect, useState } from 'react';
import { LoginForm } from '../LoginForm/LoginForm';
import type { Credentials, Step } from '../../types/auth';
import { LoginHeader } from '../LoginHeader/LoginHeader';
import { VerifyCodeForm } from '../VerifyCodeForm/VerifyCodeForm';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { getToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.css';

export const LoginProcess = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('login');
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const handleLoginSuccess = (credentials: Credentials) => {
    setStep('verify');
    setEmail(credentials.email);
    setPassword(credentials.password);
  };

  const handleChangeStep = () => {
    setStep('login');
  };

  useEffect(() => {
    if (getToken()) {
      navigate('/');
    }
  }, []);

  return (
    <div className={styles.loginProcess}>
      {step === 'verify' && (
        <ArrowLeftOutlined
          className={styles.loginProcessBack}
          onClick={handleChangeStep}
        />
      )}
      <LoginHeader step={step} />
      {step === 'login' && <LoginForm onSuccess={handleLoginSuccess} />}
      {step === 'verify' && <VerifyCodeForm email={email} password={password} />}
    </div>
  );
};
