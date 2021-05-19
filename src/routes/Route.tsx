import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route as RouterRoute, RouteProps } from 'react-router';
import { RootState } from '../store/DefaultRootState';

type CustomRouteProps = {
  isPrivate?: boolean;
};

const Route: React.FC<CustomRouteProps & RouteProps> = ({
  isPrivate,
  ...props
}) => {
  const logged = useSelector((state: RootState) => state.auth.token);
  if (isPrivate && !logged) {
    return <Redirect to='/login' />;
  }
  if (!isPrivate && logged) {
    return <Redirect to='/' />;
  }
  return <RouterRoute {...props} />;
};

export default Route;
