import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import ResetPassword from "@/components/auth/resetPassword";

export const metadata: Metadata = {
  title: "Sign in to Ahununu express",
  description:
    "Ahununu Express is a leading provider of courier, logistics, supply chain management, and freight transportation solutions ",
};

const SignIn: React.FC = () => {
  return <ResetPassword />;
};

export default SignIn;
