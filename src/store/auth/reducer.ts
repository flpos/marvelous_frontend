import { Reducer } from 'redux';
import { AuthActions } from './actions';

const INITIAL_STATE = { token: '' };

const authReducer: Reducer<AuthReducer> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthActions.LOGIN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

export default authReducer;
