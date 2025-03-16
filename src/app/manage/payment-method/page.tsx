import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import ListPaymentMethod from "@/components/manage/paymentMethod/index";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { AuthProvider } from "@/context/AuthContext"; // Adjust the path as necessary

export const metadata: Metadata = {
  title: "List payment method",
  description: "Ahununu Express",
};
const List: React.FC = () => {
  return (
    <AuthProvider>
      <DefaultLayout>
        <ListPaymentMethod />
      </DefaultLayout>
    </AuthProvider>
  );
};

export default List;
