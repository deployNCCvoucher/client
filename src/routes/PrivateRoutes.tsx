import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hook/useTypedSeletor';

const PrivateRoute: React.FC = () => {
  const accessToken: string | null = useAppSelector((state) => state.user.token);
  return (
      accessToken ? <Outlet /> : <Navigate to="/login" />
  )
}
export default PrivateRoute;
