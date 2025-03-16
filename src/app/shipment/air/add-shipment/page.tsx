import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import AddShipment from "@/components/shipment/addShipment";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

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
    <DefaultLayout>
      <AddShipment id={"air"} />
    </DefaultLayout>
  );
};

export default Detail;
