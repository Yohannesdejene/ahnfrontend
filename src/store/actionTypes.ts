// actionTypes.ts
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const SAVE_USER_INFO = "SAVE_USER_INFO";
export const SAVE_USER_PERMISSION = "SAVE_USER_PERMISSION";
export type AuthActionTypes =
  | { type: typeof LOGIN_SUCCESS; payload: string }
  | { type: typeof LOGOUT };
