import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import ListSchools from "@/components/basic/school/index";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/context/ProtectedRoute";
export const metadata: Metadata = {
  title: "List Schools",
  description: "School Management system ",
};
const List: React.FC = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <ListSchools />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default List;
