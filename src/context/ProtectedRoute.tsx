// app/components/ProtectedRoute.tsx
"use client";
import React, { useEffect } from "react";
import { useAuth } from "./AuthContext"; // Adjust the path as necessary
import { useRouter } from "next/navigation";
import { CircularProgress, Box } from "@mui/material";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth();
  console.log("user", user);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (user && !loading) {
    return <>{children}</>;
  }

  return null;
};

export default ProtectedRoute;
