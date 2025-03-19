import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import ShipmentAllList from "@/components/shipment/allListShipment";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { AuthProvider } from "@/context/AuthContext"; // Adjust the path as necessary

export const metadata: Metadata = {
  title: "All air shipment",
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
        <ShipmentAllList id={"air"} />
      </DefaultLayout>
    </AuthProvider>
  );
};

export default Detail;
