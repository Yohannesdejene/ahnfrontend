// authReducer.ts
import {
  LOGIN_SUCCESS,
  SAVE_USER_INFO,
  LOGOUT,
  AuthActionTypes,
  SAVE_USER_PERMISSION,
} from "./actionTypes";
import {
  getUserInfo,
  getSessionKey,
  getPermissionInfo,
} from "../utils/sessionManager";

interface AuthState {
  token: string | null;
  user: any;
  permission: any;
}

const initialState: AuthState = {
  token: getSessionKey() || null,
  user: getUserInfo() || null,
  permission: getPermissionInfo() || null,
};

const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
      };
    case SAVE_USER_INFO:
      return {
        ...state,
        user: action.payload,
      };
    case SAVE_USER_PERMISSION:
      return {
        ...state,
        permission: action.payload,
      };
    case LOGOUT:
      return {
        token: null,
        user: null,
        permission: null,
      };
    default:
      return state;
  }
};

export default authReducer;
