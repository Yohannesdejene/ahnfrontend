import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import ListShipmentMode from "@/components/manage/shipmentMode/index";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { AuthProvider } from "@/context/AuthContext"; // Adjust the path as necessary

export const metadata: Metadata = {
  title: "List shipment mode",
  description: "Ahununu Express",
};
const List: React.FC = () => {
  return (
    <AuthProvider>
      <DefaultLayout>
        <ListShipmentMode />
      </DefaultLayout>
    </AuthProvider>
  );
};

export default List;
