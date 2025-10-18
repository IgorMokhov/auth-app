import { Button, Form, Input } from 'antd';
import { useVerifyCode } from '../../hooks/useVerifyCode';
import styles from './style.module.css';
import { useEffect, useRef, useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { VerifyErrorCode } from '../../types/auth';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../utils/auth';
import { isVerifySuccess } from '../../utils/typeGuards';

type VerifyCodeFormProps = {
  email: string | null;
  password: string | null;
};

export const VerifyCodeForm = ({ email, password }: VerifyCodeFormProps) => {
  const { verify, dataVerify, isSuccessVerify, isErrorVerify, errorVerify } =
    useVerifyCode();
  const { login, isLoadingLogin, isErrorLogin, errorLogin } = useLogin();

  const [form] = Form.useForm();
  const code = Form.useWatch('code', form);

  const navigate = useNavigate();
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

  const onSuccessVerifyHandler = () => {
    if (isSuccessVerify && dataVerify && isVerifySuccess(dataVerify)) {
      setToken(dataVerify.accessToken);
      navigate('/');
    }
  };

  useEffect(() => {
    if (isErrorVerify && errorVerify?.errorCode) {
      form.setFields([
        {
          name: 'code',
          errors: [errorVerify.message],
        },
      ]);
    }
    if (isErrorLogin && errorLogin?.errorCode) {
      form.setFields([
        {
          name: 'code',
          errors: [errorLogin.message],
        },
      ]);
    }
  }, [isErrorVerify, errorVerify, isErrorLogin, errorLogin, form]);

  useEffect(() => {
    if (canVerify) {
      prevCode.current = code;
      verify({ email, code });
      setWasVerified(true);
    }
  }, [isComplete, email, code, verify, wasVerified]);

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

      {isSuccessVerify && (
        <Form.Item>
          <Button type="primary" block onClick={onSuccessVerifyHandler}>
            Continue
          </Button>
        </Form.Item>
      )}
      {isErrorVerify && errorVerify?.errorCode === VerifyErrorCode.INVALID && (
        <Form.Item>
          <Button disabled type="primary" block>
            Continue
          </Button>
        </Form.Item>
      )}
      {isErrorVerify && errorVerify?.errorCode === VerifyErrorCode.EXPIRED && (
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
