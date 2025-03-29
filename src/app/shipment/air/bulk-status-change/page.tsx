import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import BulkChangeStatus from "@/components/shipment/bukStatusUpdate";
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
        <BulkChangeStatus id={"air"} />
      </DefaultLayout>
    </AuthProvider>
  );
};

export default Detail;
