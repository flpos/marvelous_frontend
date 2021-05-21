import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import NavBar from '../components/NavBar';
import CharacterPage from '../pages/CharacterPage';
import CharactesSearch from '../pages/CharactesSearch';
import ComicPage from '../pages/ComicPage';
import ComicsSearch from '../pages/ComicsSearch/ComicsSearch';
import Favorites from '../pages/Favorites';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import UserPanel from '../pages/UserPanel';
import { RootState } from '../store/DefaultRootState';

const Routes = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  return token ? (
    <>
      <Router>
        <NavBar />
        <Route path='/' exact component={Favorites} />
        <Route path='/panel' exact component={UserPanel} />
        <Route path='/comics-search' exact component={ComicsSearch} />
        <Route path='/characters-search' exact component={CharactesSearch} />
        <Route path='/characters/:id' exact component={CharacterPage} />
        <Route path='/comics/:id' exact component={ComicPage} />
        <Route path='*' component={() => <Redirect to='/' />} />
      </Router>
    </>
  ) : (
    <>
      <Router>
        <Route path='/login' exact component={Login} />
        <Route path='/signUp' exact component={SignUp} />
        <Route path='*' component={() => <Redirect to='/Login' />} />
      </Router>
    </>
  );
};

export default Routes;
