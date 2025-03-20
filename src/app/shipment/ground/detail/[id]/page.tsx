import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import ShipmentDetailIndex from "@/components/shipment/detail";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { AuthProvider } from "@/context/AuthContext"; // Adjust the path as necessary

export const metadata: Metadata = {
  title: "Shipment detail ",
  description: "Ahununu Express",
};

interface PageProps {
  params: {
    id: string | number | null;
    type: string;
  };
}

const Detail: React.FC<PageProps> = ({ params }) => {
  return (
    <AuthProvider>
      <DefaultLayout>
        <ShipmentDetailIndex type={"ground"} id={params?.id} />
      </DefaultLayout>
    </AuthProvider>
  );
};

export default Detail;
