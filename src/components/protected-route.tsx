import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

interface ProtectedRouteProps extends RouteProps {
  role: 'admin' | 'partner';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role, ...rest }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  if (user?.role !== role) {
    return <Redirect to={user?.role === 'admin' ? '/admin' : '/partner'} />;
  }

  return <Route {...rest} />;
};

export default ProtectedRoute;