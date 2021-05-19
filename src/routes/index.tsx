import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../pages/Login';
import Route from './Route';

const Routes = () => {
  return (
    <Router>
      <Route path='/login' exact component={Login} />
      <Route isPrivate path='/' exact component={() => <div>Root</div>} />
    </Router>
  );
};

export default Routes;
