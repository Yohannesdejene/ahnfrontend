import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import ListSemester from "@/components/basic/semester/index";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/context/ProtectedRoute";
export const metadata: Metadata = {
  title: "List Semester",
  description: "School Management system ",
};
const List: React.FC = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <ListSemester />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default List;
