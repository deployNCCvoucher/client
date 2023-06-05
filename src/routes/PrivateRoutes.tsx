import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hook/useTypedSeletor';

const PrivateRoutes = (): JSX.Element => {
  const token = useAppSelector((state: any) => state.user.token)
  return token ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;
