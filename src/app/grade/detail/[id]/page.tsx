import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import GradeDetail from "@/components/grade/detail/index";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/context/ProtectedRoute";

export const metadata: Metadata = {
  title: "Grade Detail",
  description: "School Management System - Grade Detail",
};

interface PageProps {
  params: {
    id: string | number | null;
  };
}

const Detail: React.FC<PageProps> = ({ params }) => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <GradeDetail id={params.id} />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default Detail;
