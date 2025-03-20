import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import ShipmentGroundList from "@/components/shipment/air/listAirShipment";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { AuthProvider } from "@/context/AuthContext"; // Adjust the path as necessary

export const metadata: Metadata = {
  title: "Delivered ground shipment",
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
        <ShipmentGroundList id={"DELIVERED"} />
      </DefaultLayout>
    </AuthProvider>
  );
};

export default Detail;
