import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import ListYears from "@/components/basic/year/list/index";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/context/ProtectedRoute";
export const metadata: Metadata = {
  title: "List years",
  description: "School Management system ",
};
const List: React.FC = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <ListYears />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default List;
