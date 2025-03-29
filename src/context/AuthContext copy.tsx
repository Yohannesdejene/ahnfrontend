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
} from "@/utils/sessionManager";
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, token, permissions, loggedIn, loading } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    try {
      const initializeAuth = () => {
        const storedToken = getSessionKey();
        const storedUser = getUserInfo();
        const storedPermissions = getPermissionInfo();
        if (storedToken && storedUser) {
          dispatch(setToken(storedToken));
          dispatch(setUser(storedUser));
          dispatch(setPermissions(storedPermissions || null));
          dispatch(setLoggedIn(true));
        } else {
          dispatch(logout());
          // router.push("/auth/login");
          router.replace("/auth/login");
        }
        dispatch(setAuthLoading(false));
      };
      // if (loading) {
      initializeAuth();
      // }
    } catch (err) {
      dispatch(logout());
      router.replace("/auth/login");
    }
  }, [dispatch, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  return loggedIn ? <>{children}</> : null;
};
