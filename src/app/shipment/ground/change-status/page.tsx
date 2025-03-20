import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import ChangeStatus from "@/components/shipment/changeStatus";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { AuthProvider } from "@/context/AuthContext"; // Adjust the path as necessary

export const metadata: Metadata = {
  title: "Change status   air shipment",
  description: "Ahununu Express",
};

interface PageProps {
  params: {
    id: string;
  };
}

const Detail: React.FC<PageProps> = ({ params }) => {
  return (
    <AuthProvider>
      <DefaultLayout>
        <ChangeStatus id={"ground"} />
      </DefaultLayout>
    </AuthProvider>
  );
};

export default Detail;
