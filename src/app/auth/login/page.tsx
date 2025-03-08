import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import Login from "@/components/auth/login";

export const metadata: Metadata = {
  title: "Sign in to Ahunu Express",
  description:
    "Ahununu Express is a leading provider of courier, logistics, supply chain management, and freight transportation solutions ",
};

const SignIn: React.FC = () => {
  return <Login />;
};

export default SignIn;
