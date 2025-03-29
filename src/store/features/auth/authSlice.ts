// store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getSessionKey,
  getUserInfo,
  getPermissionInfo,
  // deleteSessionKeys,
} from "@/utils/sessionManager";

interface AuthState {
  user: any | null;
  token: string | null;
  permissions: any | null; // Adjust type based on your permission structure
  loggedIn: boolean | null;
  loading: boolean | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  permissions: null,
  loggedIn: null,
  loading: true,
};

// Helper function to initialize auth state synchronously
const getInitialAuthState = (): AuthState => {
  try {
    const token = getSessionKey();
    const userInfo = getUserInfo();
    const permissionInfo = getPermissionInfo(); // Assuming this exists in sessionManager
    if (token && userInfo) {
      return {
        user: userInfo,
        token,
        permissions: permissionInfo || null,
        loggedIn: true,
        loading: false,
      };
    }
    return initialState;
  } catch (err) {
    console.error("Error initializing auth state:", err);
    return initialState;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialAuthState(),
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.loggedIn = !!action.payload; // loggedIn depends on user presence
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setPermissions: (state, action: PayloadAction<any>) => {
      state.permissions = action.payload;
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
      if (!action.payload) {
        // Reset other fields when logging out
        state.user = null;
        state.token = null;
        state.permissions = null;
      }
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.permissions = null;
      state.loggedIn = false;
      state.loading = false;
      // deleteSessionKeys(); // Clear session storage
    },
  },
});

export const {
  setUser,
  setToken,
  setPermissions,
  setLoggedIn,
  setAuthLoading,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
