import { Navigate, Outlet } from 'react-router-dom';
import { TOKEN_KEY } from '../../utils/auth';

export const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem(TOKEN_KEY);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
