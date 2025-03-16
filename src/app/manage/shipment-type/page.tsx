import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import ListShipmentType from "@/components/manage/shipmentType/index";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { AuthProvider } from "@/context/AuthContext"; // Adjust the path as necessary

export const metadata: Metadata = {
  title: "List shipment type",
  description: "Ahununu Express",
};
const List: React.FC = () => {
  return (
    <AuthProvider>
      <DefaultLayout>
        <ListShipmentType />
      </DefaultLayout>
    </AuthProvider>
  );
};

export default List;
