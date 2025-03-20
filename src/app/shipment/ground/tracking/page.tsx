import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import TrackingPage from "@/components/shipment/ground/tracking";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { AuthProvider } from "@/context/AuthContext"; // Adjust the path as necessary

export const metadata: Metadata = {
  title: "Tracking  ground shipment",
  description: "Ahununu Express",
};

const Detail = () => {
  return (
    <AuthProvider>
      <DefaultLayout>
        <TrackingPage />
      </DefaultLayout>
    </AuthProvider>
  );
};

export default Detail;
