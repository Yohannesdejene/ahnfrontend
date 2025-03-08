// actions.ts
import {
  LOGIN_SUCCESS,
  SAVE_USER_INFO,
  SAVE_USER_PERMISSION,
  LOGOUT,
  AuthActionTypes,
} from "./actionTypes";
import { deleteSessionKeys, deleteUserIfo } from "@/utils/sessionManager";

export const loginSuccess = (token: string): AuthActionTypes => ({
  type: LOGIN_SUCCESS,
  payload: token,
});
export const saveUserInfo = (user: any): any => {
  return {
    type: SAVE_USER_INFO,
    payload: user,
  };
};
export const saveUserPermission = (permission: any): any => {
  return {
    type: SAVE_USER_PERMISSION,
    payload: permission,
  };
};

export const logout = (): AuthActionTypes => {
  deleteSessionKeys();
  return {
    type: LOGOUT,
  };
};
