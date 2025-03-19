import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import ShipmentAirList from "@/components/shipment/air/listAirShipment";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { AuthProvider } from "@/context/AuthContext"; // Adjust the path as necessary

export const metadata: Metadata = {
  title: "Arrived air shipment",
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
        <ShipmentAirList id={"ARRIVED"} />
      </DefaultLayout>
    </AuthProvider>
  );
};

export default Detail;
