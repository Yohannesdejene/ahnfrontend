import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import ShipmentList from "@/components/shipment/listShipment";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Add Air  Shipment",
  description: "Ahununu Express",
};

interface PageProps {
  params: {
    id: string;
    type: string;
  };
}

const Detail: React.FC<PageProps> = ({ params }) => {
  return (
    <DefaultLayout>
      <ShipmentList id={"RFP"} type="air" />
    </DefaultLayout>
  );
};

export default Detail;
