import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import SetPassword from "@/components/auth/setPassword";

export const metadata: Metadata = {
  title: "Change password ",
  description:
    "HudHud Express is a leading provider of courier, logistics, supply chain management, and freight transportation solutions ",
};

const SignIn: React.FC = () => {
  return <SetPassword />;
};

export default SignIn;
