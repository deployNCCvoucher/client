import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = (): JSX.Element => {
  const token = window.localStorage.getItem('accessToken')
  return token ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;
