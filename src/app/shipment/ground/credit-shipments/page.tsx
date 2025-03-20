import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import ShipmentCreditList from "@/components/shipment/allCreditShipments";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { AuthProvider } from "@/context/AuthContext"; // Adjust the path as necessary

export const metadata: Metadata = {
  title: "Credit  ground  shipment",
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
        <ShipmentCreditList id={"ground"} />
      </DefaultLayout>
    </AuthProvider>
  );
};

export default Detail;
