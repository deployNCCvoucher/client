import { Navigate } from 'react-router-dom';
import { ReactElement, ReactNode } from 'react';
import MyProfile from '../pages/users/myProfile/MyProfile'
import Login from '../pages/login';
import MyRequest from '../pages/users/request/Request';

interface ListRoute {
  path: string
  component: ReactElement | ReactNode
}

export const publicRoutes: ListRoute[] = [
  { path: '/login', component: <Login /> },
  { path: '/', component: <Navigate to="/app/myProfile" replace={true} /> }
];

export const privateRoutes: ListRoute[] = [
  { path: '/app/myProfile', component: <MyProfile /> },
  { path: '/app/request', component: <MyRequest /> },
];
