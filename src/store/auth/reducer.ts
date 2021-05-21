import { Reducer } from 'redux';
import { AuthActions } from './actions';

const INITIAL_STATE = { token: localStorage.getItem('token') ?? '' };

const authReducer: Reducer<AuthReducer> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthActions.LOGIN:
      localStorage.setItem('token', action.payload);
      return { ...state, token: action.payload };
    case AuthActions.LOGOUT:
      localStorage.removeItem('token');
      return { token: '' };
    default:
      return state;
  }
};

export default authReducer;
