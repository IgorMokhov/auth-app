import { Button, Form, Input } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { ErrorCode } from '../../types/auth';
import styles from './style.module.css';

type VerifyCodeFormProps = {
  email: string | null;
  password: string | null;
};

export const VerifyCodeForm = ({ email, password }: VerifyCodeFormProps) => {
  const { login, isLoadingLogin, isErrorLogin, errorLogin } = useLogin();

  const [form] = Form.useForm();
  const code = Form.useWatch('code', form);

  const [wasVerified, setWasVerified] = useState(false);
  const prevCode = useRef<string | undefined>(undefined);
  const isComplete = code?.length === 6;
  const canVerify = isComplete && email && !wasVerified && code !== prevCode.current;

  const onLoginHandler = () => {
    if (email && password) {
      setWasVerified(false);
      form.resetFields();
      login({ email, password });
    }
  };

  useEffect(() => {
    if (isErrorLogin && errorLogin?.code) {
      form.setFields([
        {
          name: 'code',
          errors: [errorLogin.message],
        },
      ]);
    }
  }, [isErrorLogin, errorLogin, form]);

  useEffect(() => {
    if (canVerify && email && password) {
      prevCode.current = code;
      login({ email, password, code });
      setWasVerified(true);
    }
  }, [canVerify, email, code, password, wasVerified]);

  useEffect(() => {
    if (wasVerified && code !== prevCode.current) {
      setWasVerified(false);
    }
  }, [code, wasVerified]);

  return (
    <Form form={form} className={styles.verify}>
      <Form.Item<string>
        name="code"
        rules={[{ required: true, message: 'Enter the 6-digit code' }]}
      >
        <Input.OTP size="large" length={6} autoFocus />
      </Form.Item>

      {isErrorLogin && errorLogin?.code === ErrorCode.INVALID_CODE && (
        <Form.Item>
          <Button disabled type="primary" block>
            Continue
          </Button>
        </Form.Item>
      )}
      {isErrorLogin && errorLogin?.code === ErrorCode.TWO_FA_EXPIRED && (
        <Form.Item>
          <Button
            onClick={onLoginHandler}
            type="primary"
            block
            disabled={isLoadingLogin}
            loading={isLoadingLogin}
          >
            Get new
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};
