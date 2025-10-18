import { Image, Typography } from 'antd';
import logo from '../../assets/logo.png';
import type { Step } from '../../types/auth';
import styles from './style.module.css';

const { Text } = Typography;

type LoginHeaderProps = {
  step: Step;
};

export const LoginHeader = ({ step }: LoginHeaderProps) => {
  const text =
    step === 'login'
      ? 'Sign in to your account to continue'
      : 'Two-Factor Authentication';

  return (
    <div className={styles.header}>
      <Image src={logo} width={98} preview={false} />
      <Text className={styles.headerTitle}>{text}</Text>
      {step === 'verify' && (
        <Text>Enter the 6-digit code from the Google Authenticator app</Text>
      )}
    </div>
  );
};
