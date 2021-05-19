export enum AuthActions {
  LOGIN = '@auth/login',
  LOGOUT = '@auth/logout',
}

export const loginAction = (token: string) => ({
  type: AuthActions.LOGIN,
  payload: token,
});

export const logoutAction = () => ({
  type: AuthActions.LOGOUT,
});
