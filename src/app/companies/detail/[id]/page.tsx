import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import CompanyDetail from "@/components/companies/detail";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { AuthProvider } from "@/context/AuthContext"; // Adjust the path as necessary

export const metadata: Metadata = {
  title: "Companies  detail ",
  description: "Ahununu Express",
};

interface PageProps {
  params: {
    id: string | number;
  };
}

const Detail: React.FC<PageProps> = ({ params }) => {
  return (
    <AuthProvider>
      <DefaultLayout>
        <CompanyDetail id={params?.id} />
      </DefaultLayout>
    </AuthProvider>
  );
};

export default Detail;
