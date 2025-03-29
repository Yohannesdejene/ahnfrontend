import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import AddCompany from "@/components/companies/add";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { AuthProvider } from "@/context/AuthContext"; // Adjust the path as necessary

export const metadata: Metadata = {
  title: "Add new  Companies ",
  description: "Ahununu Express",
};
const AddCompanies: React.FC = () => {
  return (
    <AuthProvider>
      <DefaultLayout>
        <AddCompany />
      </DefaultLayout>
    </AuthProvider>
  );
};

export default AddCompanies;
