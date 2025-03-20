import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import AddShipment from "@/components/shipment/addShipment";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { AuthProvider } from "@/context/AuthContext"; // Adjust the path as necessary

export const metadata: Metadata = {
  title: "Add Air  Shipment",
  description: "Ahununu Express",
};

interface PageProps {
  params: {
    id: string | number | null;
  };
}

const Detail: React.FC<PageProps> = ({ params }) => {
  return (
    <AuthProvider>
      <DefaultLayout>
        <AddShipment id={"ground"} />
      </DefaultLayout>
    </AuthProvider>
  );
};

export default Detail;
