import { useEffect } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { Button, Form, Input, type FormProps } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import type { Credentials } from '../../types/auth';
import styles from './style.module.css';

type LoginFormProps = {
  onSuccess: (credentials: Credentials) => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { login, isLoadingLogin, isSuccessLogin, isErrorLogin, errorLogin } =
    useLogin();
  const [form] = Form.useForm();

  const onFinish: FormProps<Credentials>['onFinish'] = ({ email, password }) => {
    login({ email, password });
  };

  const email = Form.useWatch('email', form);
  const password = Form.useWatch('password', form);
  const isDisabled = !email || !password || password?.length < 6;

  useEffect(() => {
    if (isErrorLogin && errorLogin?.message) {
      form.setFields([
        {
          name: 'email',
          errors: [''],
        },
        {
          name: 'password',
          errors: [errorLogin.message],
        },
      ]);
    }
  }, [isErrorLogin, errorLogin, form]);

  useEffect(() => {
    if (isSuccessLogin) onSuccess({ email, password });
  }, [isSuccessLogin]);

  return (
    <Form form={form} name="login" onFinish={onFinish} className={styles.loginForm}>
      <Form.Item<Credentials>
        name="email"
        rules={[{ required: true, message: 'Please input your Email!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item<Credentials>
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button
          block
          disabled={isDisabled}
          loading={isLoadingLogin}
          iconPosition="end"
          type="primary"
          htmlType="submit"
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};
