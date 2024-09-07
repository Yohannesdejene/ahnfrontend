// actions.ts
import { LOGIN_SUCCESS, LOGOUT, AuthActionTypes } from "./actionTypes";

export const loginSuccess = (token: string): AuthActionTypes => ({
  type: LOGIN_SUCCESS,
  payload: token,
});

export const logout = (): AuthActionTypes => ({
  type: LOGOUT,
});
