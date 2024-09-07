// authReducer.ts
import { LOGIN_SUCCESS, LOGOUT, AuthActionTypes } from "./actionTypes";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

const authReducer = (
  state = initialState,
  action: AuthActionTypes,
): AuthState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
