// app/components/ProtectedRoute.tsx
"use client";
import React from "react";
import { useAuth } from "./AuthContext"; // Adjust the path as necessary
import { useRouter } from "next/navigation";
import { CircularProgress, Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth(); // Assuming you have a loading state in your AuthContext
  const router = useRouter();

  React.useEffect(() => {
    if (!user) {
      router.push("/auth/login"); // Redirect to login page if not authenticated
    }
  }, [user, router]);

  // Show loading spinner while checking authentication
  // if (loading) {
  //   return <CircularProgress />; // Show a loading spinner
  // }

  // If user is not authenticated, return null to prevent rendering protected content
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center ">
        <CircularProgress />
        {/* <Box sx={{ width: 300 }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box> */}
      </div>
    ); // Prevent rendering protected content
  }

  return <>{children}</>; // Render the protected content
};

export default ProtectedRoute;
