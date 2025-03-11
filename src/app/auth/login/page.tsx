import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import Login from "@/components/auth/login";
import { PermissionProvider } from "@/context/PermissionContext"; // New permission provider
import { AuthProvider } from "@/context/AuthContext";
export const metadata: Metadata = {
  title: "Sign in to Ahununu Express",
  description:
    "Ahununu Express is a leading provider of courier, logistics, supply chain management, and freight transportation solutions ",
};

const SignIn: React.FC = () => {
  return (
    // <AuthProvider>
    // <PermissionProvider>
    <Login />
    // </PermissionProvider>
    // </AuthProvider>
  );
};

export default SignIn;
