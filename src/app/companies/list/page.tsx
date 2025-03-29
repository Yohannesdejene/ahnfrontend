import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import ListCompany from "@/components/companies/index";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { AuthProvider } from "@/context/AuthContext"; // Adjust the path as necessary

export const metadata: Metadata = {
  title: "List Companies ",
  description: "Ahununu Express",
};
const List: React.FC = () => {
  return (
    <AuthProvider>
      <DefaultLayout>
        <ListCompany />
      </DefaultLayout>
    </AuthProvider>
  );
};

export default List;
