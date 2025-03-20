import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import AdminShipmentReport from "@/components/report/adminShipmentReport";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { AuthProvider } from "@/context/AuthContext"; // path as necessary

export const metadata: Metadata = {
  title: "Admin shipment report",
  description: "Ahununu Express",
};

const Detail = () => {
  return (
    <AuthProvider>
      <DefaultLayout>
        <AdminShipmentReport />
      </DefaultLayout>
    </AuthProvider>
  );
};

export default Detail;
