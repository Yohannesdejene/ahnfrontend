import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import Signup from "@/components/auth/signup";

export const metadata: Metadata = {
  title: "Sign in to HudHud express",
  description:
    "HudHud Express is a leading provider of courier, logistics, supply chain management, and freight transportation solutions ",
};

const SignIn: React.FC = () => {
  return <Signup />;
};

export default SignIn;
