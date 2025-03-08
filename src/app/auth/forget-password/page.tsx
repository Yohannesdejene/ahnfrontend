import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import ForgetPassword from "@/components/auth/forgetPassword";

export const metadata: Metadata = {
  title: "Sign in to Ahununu express",
  description:
    "Ahununu Express is a leading provider of courier, logistics, supply chain management, and freight transportation solutions ",
};

const SignIn: React.FC = () => {
  return <ForgetPassword />;
};

export default SignIn;
