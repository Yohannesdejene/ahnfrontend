import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import ListCourse from "@/components/basic/course/index";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/context/ProtectedRoute";
export const metadata: Metadata = {
  title: "List Course",
  description: "School Management system ",
};
const List: React.FC = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <ListCourse />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default List;
