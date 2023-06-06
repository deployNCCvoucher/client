import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hook/useTypedSeletor';

const PublicRoute: React.FC = () => {
  const accessToken: string | null = useAppSelector((state) => state.user.accessToken);
  return (
      !accessToken ? <Outlet /> : <Navigate to="/app/myProfile" />
  )
}
export default PublicRoute;
