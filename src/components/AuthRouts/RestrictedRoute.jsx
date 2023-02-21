import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectAuthToken } from 'redux/auth/auth.selectors';

export const RestrictedRoute = () => {
  const token = useSelector(selectAuthToken);
  return token ? <Navigate to="/contacts" /> : <Outlet />;
};
