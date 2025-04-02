"use client";
import React, { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import {
  setUser,
  setToken,
  setPermissions,
  setLoggedIn,
  setAuthLoading,
  logout,
} from "@/store/features/auth/authSlice";
import { RootState } from "@/store/store";
import {
  getSessionKey,
  getUserInfo,
  getPermissionInfo,
  setUserInfo,
  setPermissionInfo,
} from "@/utils/sessionManager";
import { apiGetProfile } from "@/store/features/auth/authApi";
interface AuthProviderProps {
  children: ReactNode;
}
function formatPermissions(permissions: any) {
  return permissions.map((permission: any) => ({
    name: permission.name,
    description: permission.description,
    code: permission.code,
    // permissionType: permission.PermissionType.type,
  }));
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, token, permissions, loggedIn, loading } = useSelector(
    (state: RootState) => state.auth,
  );

  // Function to fetch latest permissions from the backend
  const fetchPermissions = async () => {
    try {
      const response = await apiGetProfile();
      if (response?.status == 200) {
        const { user, token } = response?.data;
        const permission = formatPermissions(user?.Role?.Permissions);
        dispatch(setUser(user));
        dispatch(setToken(token));
        dispatch(setLoggedIn(true));
        dispatch(setPermissions(permission));
        dispatch(setAuthLoading(false));
        // const res_0 = setSessionKey(token);
        const user_0 = setUserInfo(user);
        const perm_0 = setPermissionInfo(permission);
      } else {
        router.replace("/auth/login");
      }
    } catch (error: any) {
      router.replace("/auth/login");

      // Optionally log out if the token is invalid (e.g., 401)
    }
  };

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = getSessionKey();
        const storedUser = getUserInfo();
        const storedPermissions = getPermissionInfo();
        if (storedToken && storedUser) {
          dispatch(setToken(storedToken));
          dispatch(setUser(storedUser));
          dispatch(setPermissions(storedPermissions || null));
          dispatch(setLoggedIn(true));

          // Fetch permissions immediately after login
          // fetchPermissions();
        } else {
          dispatch(logout());
          router.replace("/auth/login");
        }
        dispatch(setAuthLoading(false));
      } catch (err) {
        dispatch(logout());
        router.replace("/auth/login");
      }
    };

    initializeAuth();

    // Set up polling for permissions every 60 seconds (adjust as needed)
    let intervalId: NodeJS.Timeout | null = null;
    if (loggedIn && token) {
      intervalId = setInterval(() => {
        fetchPermissions();
      }, 60000); // 60 seconds
    }

    // Cleanup interval on unmount or when loggedIn/token changes
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [dispatch, router, loggedIn, token]); // Dependencies include loggedIn and token

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  return loggedIn ? <>{children}</> : null;
};
