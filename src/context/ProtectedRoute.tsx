// import React, { useEffect } from "react";
// import { useAuth } from "./AuthContext";
// import { useRouter } from "next/navigation";
// import { CircularProgress } from "@mui/material";

// const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const { user, loggedIn, loading } = useAuth();
//   const router = useRouter();
//   console.log("ProtectedRoute - user:", user);
//   console.log("ProtectedRoute - loggedIn:", loggedIn);
//   console.log("ProtectedRoute - loading:", loading);

//   useEffect(() => {
//     if (!loading && !loggedIn) {
//       console.log("ProtectedRoute - Redirecting to /auth/login");
//       router.push("/auth/login");
//     }
//   }, [loading, loggedIn, router]);

//   if (loading) {
//     console.log("ProtectedRoute - Showing loading spinner");
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <CircularProgress />
//       </div>
//     );
//   }

//   if (loggedIn) {
//     console.log("ProtectedRoute - Rendering children");
//     return <>{children}</>;
//   }
//   console.log("ProtectedRoute - Returning null");
//   return null;
// };

// export default ProtectedRoute;
