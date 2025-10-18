import Title from 'antd/es/typography/Title';
import { Button } from 'antd';
import { removeToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.css';

export const Home = () => {
  const navigate = useNavigate();

  const onLogoutHandler = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <section className={styles.home}>
      <Title level={1}>Hello World!</Title>
      <Button type="primary" onClick={onLogoutHandler}>
        Log out
      </Button>
    </section>
  );
};
